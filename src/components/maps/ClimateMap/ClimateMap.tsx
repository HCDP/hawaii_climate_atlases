import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@/lib/leaflet-path-drag-patch";
import Map, { StationIcon } from "../Map";
import {
  Station,
  Units,
  Period,
  AsciiGrid,
  TileLayerProps,
} from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, Marker } from "react-leaflet";
import L, { LatLng, LatLngBounds } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import { Feature, FeatureCollection } from "geojson";

// Import layer definitions to register them with Leaflet (side effects needed)
import "../RainfallMap/RainfallColorLayer";
import "../RainfallMap/UncertaintyMap/UncertaintyColorLayer";
import { RainfallColorLayer } from "../RainfallMap/RainfallColorLayer";
import { UncertaintyColorLayer } from "../RainfallMap/UncertaintyMap/UncertaintyColorLayer";

import { renderToStaticMarkup } from "react-dom/server";
import { 
  useRainfallAllGrids, 
  useRainfallComposite,
  useRainfallUncertaintyAllGrids,
  useRainfallUncertaintyComposite
} from "@/hooks/rainfall";
import { defaultSettings } from "@/constants";
import { GridLoader } from "react-spinners";

// Types for configuration
interface ClimateMapConfig {
  // Feature toggles
  enableStations?: boolean;
  enableIsohyets?: boolean;
  enableUncertaintyToggle?: boolean;
  enableDualLoading?: boolean;
  
  // Default states
  defaultShowStations?: boolean;
  defaultShowOtherStations?: boolean;
  defaultShowIsohyets?: boolean;
  defaultShowUncertainty?: boolean;
  
  // Data ranges
  rainfallRanges?: {
    IN: [number, number][];
    MM: [number, number][];
  };
  uncertaintyRanges?: {
    IN: [number, number][];
    MM: [number, number][];
  };
}

// Default configuration for full-featured rainfall map
const DEFAULT_CONFIG: ClimateMapConfig = {
  enableStations: true,
  enableIsohyets: true,
  enableUncertaintyToggle: true,
  enableDualLoading: true,
  defaultShowStations: defaultSettings.showRFStations,
  defaultShowOtherStations: defaultSettings.showOtherStations,
  defaultShowIsohyets: defaultSettings.showIsohyets,
  defaultShowUncertainty: false,
};

// Configuration for uncertainty-only map (legacy UncertaintyMap behavior)
export const UNCERTAINTY_CONFIG: ClimateMapConfig = {
  enableStations: false,
  enableIsohyets: false,
  enableUncertaintyToggle: false,
  enableDualLoading: false,
  defaultShowStations: false,
  defaultShowOtherStations: false,
  defaultShowIsohyets: false,
  defaultShowUncertainty: true,
};

const IsohyetLabels = ({
  features,
  zoom
}: {
  features: Feature[],
  zoom: number
}) => {
  // to prevent cluttered view, only show at certain zoom levels
  if (zoom < 10) return null;

  return (
    <>
      {features.map((feature, index) => {
        const value = feature.properties?.CONTOUR;

        if (feature.geometry.type === 'LineString') {
          const coords = feature.geometry.coordinates;
          const mid = Math.floor(coords.length / 2);
          const [lng, lat] = coords[mid];

          return (
            <Marker
              key={`label-${index}`}
              position={[lat, lng]}
              icon={
                L.divIcon({
                  html: `<div style="
                    font-size: 10px;
                    font-weight: bold;
                    color: white;
                    text-shadow:
                      -1px -1px 0 black,
                      1px -1px 0 black,
                      -1px  1px 0 black,
                      1px  1px 0 black;
                    white-space: nowrap;
                  ">${value}</div>`,
                  className: '', // prevent default Leaflet styles
                  iconSize: [20, 10], // box containing the value label
                  iconAnchor: [7, 7], // position of label in box (middle)
                })}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const IsohyetsLayer = (
  {
    geojson,
  }: {
    geojson: FeatureCollection,
  }) => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());
  useMapEvent("zoomend", () => {
    setZoom(map.getZoom());
  });
  return (
    <>
      <GeoJSON
        interactive={false}
        data={geojson}
        style={{
          color: 'black',
          weight: 0.7,
        }}
      />
      <IsohyetLabels features={geojson.features} zoom={zoom} />
    </>
  );
}

export const PopupOnClick = (
  {
    isLoading,
    selectedUnits,
    selectedPeriod,
    selectedStation,
    setSelectedStation,
    location,
    setLocation,
    setSelectedGridIndex,
    grid,
    enableStations = true,
  }: {
    isLoading: boolean,
    selectedUnits: Units,
    selectedPeriod: Period,
    selectedStation?: Station | null,
    setSelectedStation?: (station: Station | null) => void,
    setSelectedGridIndex: (index: number) => void,
    location: LatLng | null,
    setLocation: (loc: LatLng) => void,
    grid: AsciiGrid,
    enableStations?: boolean,
  }) => {
  const [clickedOnStation, setClickedOnStation] = useState<boolean>(false);
  const [gridValue, setGridValue] = useState<number | null>(null);
  
  useEffect(() => {
    if (!location) {
      setGridValue(null);
      return;
    }
    
    if (enableStations) {
      const newLocationOnStation: boolean =
        !!selectedStation &&
        !!location &&
        location.equals(new LatLng(selectedStation.Lat_DD, selectedStation.Lon_DD));
      if (selectedStation && !newLocationOnStation && setSelectedStation) {
        setClickedOnStation(false);
        setSelectedStation(null);
      }
      if (selectedStation && newLocationOnStation) {
        setClickedOnStation(true);
      }
    }
    
    // Credit: https://github.com/ikewai/precipitation_application/blob/prod/src/app/services/util/data-retreiver.service.ts#L34
    const { ncols, nrows, xllcorner, yllcorner, cellsize } = grid.header;
    const offset = new LatLng(location.lat - yllcorner, location.lng - xllcorner);

    let coords = null;
    const x = Math.floor(offset.lng / cellsize);
    const y = Math.floor(nrows - offset.lat / cellsize);
    //check if in grid range, if not return null (otherwise will provide erroneous results when flattened)
    const xValid: boolean = x >= 0 && x < ncols;
    const yValid = y >= 0 && y < nrows;
    if (!xValid || !yValid) {
      setGridValue(null);
    } else {
      coords = {
        x: x,
        y: y,
      }
    }
    let index: number;
    if (coords !== null) {
      index = ncols * coords.y + coords.x;
      const value: number | undefined = grid.values[index];
      if (value) {
        setGridValue(value);
        setSelectedGridIndex(index);
      } else {
        setGridValue(null);
        setSelectedGridIndex(-1);
      }
    } else {
      setGridValue(null);
    }
  }, [location, selectedUnits, grid, selectedStation, setSelectedStation, setSelectedGridIndex, enableStations]);
  
  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });

  const periodText = Number(selectedPeriod) === Period.Annual ? "annual" : Period[selectedPeriod];

  return gridValue && location ? (
    <>
      <Popup position={location}>
        <div className="flex flex-col gap-3">
          Location: Lat: {location.lat.toFixed(4)},
          Lon: {location.lng.toFixed(4)}
          <hr />
          {enableStations && clickedOnStation && selectedStation && (
            <>
              Station: {selectedStation.Name}<br />
              Status: {selectedStation.StationStatus}<br />
              Record period: {selectedStation.MinYear} - {selectedStation.MaxYear}
              <hr />
            </>
          )}
          {isLoading ? `Loading mean ${periodText} rainfall values (in ${selectedUnits.toLocaleLowerCase()})...` : `Mean ${periodText} rainfall: ${gridValue.toFixed(4)} ${selectedUnits.toLocaleLowerCase()}`}
        </div>
      </Popup>
      {/* X marker that indicates where the user last clicked on the map (only valid grid spaces + stations) 
          Some stations may appear off of the grid spaces, so include marker in those cases */}
      {(gridValue || (enableStations && clickedOnStation)) ? <Marker
        position={location}
        icon={
          L.divIcon({
            html:
              `<svg width="25" height="25" viewBox="0 0 100 100">
                <path 
                  d="M10 10 L90 90 M90 10 L10 90"
                  stroke="red"
                  stroke-width="25"
                  stroke-opacity="0.9"
                  fill="none" 
                />
              </svg>`,
            className: '',
            iconSize: [25, 25],
            iconAnchor: [12.5, 12.5],
          })}
      /> : <></>}
    </>
  ) : null;
}

const zoomSnap = 0.75,
  zoomDelta = 0.75,
  minZoom = 6;

const pivotZoom = 12, hideBorderZoom = 9;

function createStationIcon(stationStatus: string, zoom: number, other?: boolean): L.DivIcon {
  const baseSize = 12;
  let size: number;
  if (zoom >= pivotZoom) {
    size = baseSize;
  } else {
    size = baseSize - (3 * (pivotZoom - zoom) * zoomDelta);
  }
  const showBorder = zoom > hideBorderZoom;
  const scale = size / baseSize;
  const currentIcon = (
    <StationIcon
      stationStatus={stationStatus}
      other={other}
      showBorder={showBorder}
      transform="translate(2, 2)"
    />
  );
  const stationIconHtml = renderToStaticMarkup(currentIcon);
  return L.divIcon({
    html: `<svg width="16" height="16" viewBox="0 0 16 16" style="transform: scale(${scale}); transform-origin: center;">
        ${stationIconHtml}
      </svg>`,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function createStationMarker(station: Station, zoom: number, other?: boolean): L.Marker {
  const icon = createStationIcon(station.StationStatus, zoom, other);
  return L.marker([station.Lat_DD, station.Lon_DD], {
    zIndexOffset: other ? 30 : 40,
    bubblingMouseEvents: true,
    icon,
  });
}

export const StationIcons = ({
  stations,
  other,
  handleClickStation,
  show,
}: {
  stations: Station[],
  other?: boolean,
  handleClickStation: (station: Station, other?: boolean) => void,
  show: boolean,
}) => {
  // Credit: https://medium.com/@silvajohnny777/optimizing-leaflet-performance-with-a-large-number-of-markers-0dea18c2ec99
  const map = useMap();
  const zoom = map.getZoom();

  type StationIcon = {
    station: Station,
    marker: L.Marker
  }
  /* allStationIconsRef represents every station icon, along with its corresponding station, that will be added or
     removed to the map. */
  const allStationIconsRef = useRef<StationIcon[]>(
    stations.map(station => {
      const marker = createStationMarker(station, zoom, other)
      return { station, marker }
    })
  );
  // markersGroupRef is the reference to the layer group that contains the icons.
  const markersGroupRef = useRef<L.LayerGroup>(L.layerGroup());

  const renderMarkers = useCallback((
    oldZoom: number,
    newZoom: number,
    oldBounds: LatLngBounds,
    newBounds: LatLngBounds,
  ) => {
    /* objectives:
       remove no longer visible markers
       add newly visible markers
       restyle new markers if needed
       restyle current markers only if zoom has changed */

    /* newStationIcons represents the icons, along with their corresponding station, that will be visible by the end of
       this render. */
    const newStationIcons: StationIcon[] = [];

    const markersToRemove: L.Marker[] = [];
    const markersToAdd: L.Marker[] = [];

    const markersGroup = markersGroupRef.current;
    const allStationIcons = allStationIconsRef.current;

    // Figure out which icons need to be removed and which ones need to be added
    allStationIcons.forEach((stationIcon) => {
      const { marker } = stationIcon;
      const markerLocation = marker.getLatLng();
      if (newBounds.contains(markerLocation)) {
        newStationIcons.push(stationIcon);
        if (!markersGroup.hasLayer(marker)) {
          markersToAdd.push(marker);
        }
      } else {
        if (markersGroup.hasLayer(marker)) {
          markersToRemove.push(marker);
        }
      }
    });

    function restyleIcon(stationIcon: StationIcon) {
      const { station, marker } = stationIcon;
      marker.setIcon(createStationIcon(station.StationStatus, newZoom, other));
    }

    // Restyle icons that need it
    // If a zoom occurred we want to restyle all currently visible markers regardless of whether they're new or not:
    // Either newZoom < pivotZoom, in which case we want to restyle regardless, or newZoom > pivotZoom.
    // In this case, either the old zoom was < pivotZoom, in which case we want to restyle so that the icons
    // become their base size, or the old zoom >= pivotZoom, in which case we don't need to restyle.
    if (newZoom !== oldZoom) {
      if (newZoom < pivotZoom || oldZoom < pivotZoom) {
        newStationIcons.forEach(stationIcon => {
          restyleIcon(stationIcon);
        });
      }
      // Else, we only want to restyle the newly added markers
    } else {
      newStationIcons.forEach(stationIcon => {
        if (!oldBounds.contains(stationIcon.marker.getLatLng())) {
          restyleIcon(stationIcon);
        }
      });
    }

    markersToAdd.forEach(marker => markersGroup.addLayer(marker));
    markersToRemove.forEach(marker => markersGroup.removeLayer(marker));
  }, [other]);
  
  useEffect(() => {
    if (!map) return;
    if (!show) {
      if (map.hasLayer(markersGroupRef.current)) {
        map.removeLayer(markersGroupRef.current);
      }
      return;
    }
    if (!map.hasLayer(markersGroupRef.current)) {
      map.addLayer(markersGroupRef.current);
    }
    const allStationIcons = allStationIconsRef.current;
    allStationIcons.forEach(icon => {
      const { station, marker } = icon;
      marker.addEventListener("click", () => {
        handleClickStation(station, other);
      });
    });

    let oldZoom = map.getZoom();
    let oldBounds = map.getBounds();
    renderMarkers(0, oldZoom, oldBounds, oldBounds);
    function render() {
      const newZoom = map.getZoom();
      const newBounds = map.getBounds();
      renderMarkers(oldZoom, newZoom, oldBounds, newBounds);

      oldZoom = newZoom;
      oldBounds = newBounds;
    }

    map.on("moveend", render);
    return () => {
      map.off("moveend", render);
      allStationIcons.forEach(icon => {
        const { marker } = icon;
        marker.off();
      });
    }
  }, [map, renderMarkers, stations, show, handleClickStation, other]);

  return null;
}

interface ClimateMapProps {
  config?: ClimateMapConfig;
}

const ClimateMap: React.FC<ClimateMapProps> = ({ config = DEFAULT_CONFIG }) => {
  // Merge config with defaults
  const {
    enableStations = DEFAULT_CONFIG.enableStations,
    enableIsohyets = DEFAULT_CONFIG.enableIsohyets,
    enableDualLoading = DEFAULT_CONFIG.enableDualLoading,
    defaultShowStations = DEFAULT_CONFIG.defaultShowStations,
    defaultShowOtherStations = DEFAULT_CONFIG.defaultShowOtherStations,
    defaultShowIsohyets = DEFAULT_CONFIG.defaultShowIsohyets,
    defaultShowUncertainty = DEFAULT_CONFIG.defaultShowUncertainty,
  } = { ...DEFAULT_CONFIG, ...config };

  // State management
  const [selectedStation, setSelectedStation] = useState<Station | null>(
    enableStations ? defaultSettings.selectedStation : null
  );
  const [selectedUnits, setSelectedUnits] = useState<Units>(defaultSettings.selectedUnits);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultSettings.selectedPeriod);
  const [showIsohyets, setShowIsohyets] = useState<boolean>(defaultShowIsohyets ?? false);
  const [showGrids, setShowGrids] = useState<boolean>(defaultSettings.showGrids);
  const [showUncertainty, setShowUncertainty] = useState<boolean>(defaultShowUncertainty ?? false);
  const [showRFStations, setShowRFStations] = useState<boolean>(defaultShowStations ?? false);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(defaultShowOtherStations ?? false);
  const [selectedStationIsOther, setSelectedStationIsOther] = useState<boolean>(false);
  const [selectedGridIndex, setSelectedGridIndex] = useState<number>(-1);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [tileLayerProps, setTileLayerProps] = useState<TileLayerProps>({
    name: "Street",
    url: "https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Data loading hooks - conditional based on configuration
  const rainfallData = useRainfallComposite(
    enableDualLoading ? Units.IN : selectedUnits, 
    selectedPeriod
  );
  const rainfallDataMM = useRainfallComposite(
    enableDualLoading ? Units.MM : selectedUnits, 
    selectedPeriod
  );
  const rainfallGridsIN = useRainfallAllGrids(enableDualLoading ? Units.IN : selectedUnits);
  const rainfallGridsMM = useRainfallAllGrids(enableDualLoading ? Units.MM : selectedUnits);

  const uncertaintyDataIN = useRainfallUncertaintyComposite(
    enableDualLoading ? Units.IN : selectedUnits,
    selectedPeriod
  );
  const uncertaintyDataMM = useRainfallUncertaintyComposite(
    enableDualLoading ? Units.MM : selectedUnits,
    selectedPeriod
  );
  const uncertaintyGridsIN = useRainfallUncertaintyAllGrids(enableDualLoading ? Units.IN : selectedUnits);
  const uncertaintyGridsMM = useRainfallUncertaintyAllGrids(enableDualLoading ? Units.MM : selectedUnits);

  // Select appropriate data based on units and dual loading configuration
  const currentRainfallData = enableDualLoading 
    ? (selectedUnits === Units.IN ? rainfallData : rainfallDataMM)
    : rainfallData;
  const currentUncertaintyData = enableDualLoading
    ? (selectedUnits === Units.IN ? uncertaintyDataIN : uncertaintyDataMM)
    : uncertaintyDataIN;
  const currentRainfallGrids = enableDualLoading
    ? (selectedUnits === Units.IN ? rainfallGridsIN : rainfallGridsMM)
    : rainfallGridsIN;
  const currentUncertaintyGrids = enableDualLoading
    ? (selectedUnits === Units.IN ? uncertaintyGridsIN : uncertaintyGridsMM)
    : uncertaintyGridsIN;

  // Default data ranges
  const ranges_IN: [number, number][] = [
    [0.8, 32.2], [0.4, 26.4], [0.6, 51.9], [0.3, 38.5], [0.1, 30.7], [0, 32.8],
    [0, 38.7], [0, 34.7], [0, 30.1], [0.3, 38.3], [0.7, 38.6], [0.6, 36.4], [8, 404.4]
  ];

  const ranges_MM: [number, number][] = [
    [21, 818], [11, 669], [16, 1323], [7, 978], [2, 777], [0, 833],
    [0, 984], [1, 881], [1, 764], [8, 973], [19, 980], [14, 921], [204, 10271]
  ];

  const uncertainty_ranges_IN: [number, number][] = [
    [0.0005019, 3.354232], [0.0014641, 2.839714], [0.0009792, 4.090142], [0.0001895, 11.3037],
    [0.0007213, 2.740073], [0.0008297, 3.273416], [0.0001819, 3.422752], [0.00446305, 3.086848],
    [0.0007306, 2.773549], [0.0011364, 2.597468], [0.004848769, 3.840706], [0.001260578, 3.433185],
    [0.05284176, 11.87222]
  ];

  const uncertainty_ranges_MM: [number, number][] = [
    [0.01274, 85.18], [0.0371, 72.09], [0.0248, 103.89], [0.0048, 287.11], [0.0183, 69.58],
    [0.0210, 83.14], [0.0046, 86.98], [0.1134, 78.41], [0.0185, 70.47], [0.0289, 65.92],
    [0.1232, 97.51], [0.0320, 87.18], [1.3422, 301.5]
  ];

  // Determine loading states
  const rainfallIsLoading = enableDualLoading 
    ? (selectedUnits === Units.IN ? rainfallData.isLoading : rainfallDataMM.isLoading)
    : rainfallData.isLoading;
  const uncertaintyIsLoading = enableDualLoading
    ? (selectedUnits === Units.IN ? uncertaintyDataIN.isLoading : uncertaintyDataMM.isLoading)
    : uncertaintyDataIN.isLoading;

  const isLoading = rainfallIsLoading || uncertaintyIsLoading;
  const gridsAreLoading = currentRainfallGrids.gridsAreLoading || currentUncertaintyGrids.gridsAreLoading;

  // Only show loading screen if BOTH unit systems are still loading (first load only) when dual loading enabled
  const bothUnitsStillLoading = enableDualLoading 
    ? (rainfallData.isLoading && rainfallDataMM.isLoading) || (uncertaintyDataIN.isLoading && uncertaintyDataMM.isLoading)
    : isLoading;
  const showLoadingScreen = bothUnitsStillLoading;

  // Memoize layers
  const rainfallLayer = useMemo(() => {
    if (!showGrids || showUncertainty || !currentRainfallData.asciiGrid || rainfallIsLoading) return null;
    
    const range = selectedUnits === Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod];
    
    return (
      <RainfallColorLayer
        key={`rainfall-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: { colors: [], range },
          asciiGrid: currentRainfallData.asciiGrid,
        }}
      />
    );
  }, [showGrids, showUncertainty, currentRainfallData.asciiGrid, selectedUnits, selectedPeriod, rainfallIsLoading]);

  const uncertaintyLayer = useMemo(() => {
    if (!showUncertainty || !currentUncertaintyData.asciiGrid || uncertaintyIsLoading) return null;
    
    const range = selectedUnits === Units.IN ? uncertainty_ranges_IN[selectedPeriod] : uncertainty_ranges_MM[selectedPeriod];
    
    return (
      <UncertaintyColorLayer
        key={`uncertainty-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: { colors: [], range },
          asciiGrid: currentUncertaintyData.asciiGrid,
        }}
      />
    );
  }, [showUncertainty, currentUncertaintyData.asciiGrid, selectedUnits, selectedPeriod, uncertaintyIsLoading]);

  const rfStationIcons = useMemo(() => {
    if (!enableStations || !currentRainfallData.rfStations) return null;
    
    return (
      <StationIcons
        stations={currentRainfallData.rfStations}
        handleClickStation={(station, other) => {
          setSelectedStation(station);
          setSelectedStationIsOther(!!other);
        }}
        show={showRFStations}
      />
    );
  }, [enableStations, currentRainfallData.rfStations, showRFStations]);

  const otherStationIcons = useMemo(() => {
    if (!enableStations || !currentRainfallData.otherStations) return null;
    
    return (
      <StationIcons
        stations={currentRainfallData.otherStations}
        other={true}
        handleClickStation={(station, other) => {
          setSelectedStation(station);
          setSelectedStationIsOther(!!other);
        }}
        show={showOtherStations}
      />
    );
  }, [enableStations, currentRainfallData.otherStations, showOtherStations]);

  const isohyetsLayer = useMemo(() => {
    if (!enableIsohyets || !currentRainfallData.featureCollections) return null;
    
    return (
      <IsohyetsLayer
        key={`isohyets-layer-${selectedUnits}-${selectedPeriod}`}
        geojson={currentRainfallData.featureCollections[selectedPeriod]}
      />
    );
  }, [enableIsohyets, currentRainfallData.featureCollections, selectedPeriod, selectedUnits]);

  if (showLoadingScreen) {
    return (
      <div style={{padding: "20px"}} className="text-center">
        <p style={{padding: "10px"}}>Loading Data</p>
        <GridLoader/>
      </div>
    );
  }

  // Determine which grid is active based on user selection
  const activeGrid = showUncertainty ? currentUncertaintyData.asciiGrid : currentRainfallData.asciiGrid;
  const activeGrids = showUncertainty ? currentUncertaintyGrids.asciiGrids : currentRainfallGrids.asciiGrids;
  const activeRanges = showUncertainty 
    ? (selectedUnits === Units.IN ? uncertainty_ranges_IN : uncertainty_ranges_MM)
    : (selectedUnits === Units.IN ? ranges_IN : ranges_MM);

  return (
    <div className="flex w-full h-full max-h-full">
      <SideBar
        selectedStation={enableStations ? selectedStation : undefined}
        isOtherStation={enableStations ? selectedStationIsOther : false}
        selectedUnits={selectedUnits}
        selectedPeriod={selectedPeriod}
        asciiGrids={activeGrids}
        canShowGridValues={!gridsAreLoading && selectedGridIndex !== -1}
        selectedGridIndex={selectedGridIndex}
        location={location}
        range={activeRanges[selectedPeriod]}
        units={showUncertainty ? (selectedUnits === Units.IN ? 'in²' : 'mm²') : (selectedUnits === Units.IN ? 'in' : 'mm')}
      />
      <div className="w-full h-full">
        <Map
          startPosition={defaultSettings.startPosition}
          startZoom={defaultSettings.zoom}
          zoomSnap={zoomSnap}
          zoomDelta={zoomDelta}
          minZoom={minZoom}
          maxBounds={defaultSettings.maxBounds}
        >
          <TileLayer
            key={tileLayerProps.name}
            url={tileLayerProps.url}
            attribution={tileLayerProps.attribution}
            maxZoom={tileLayerProps.maxZoom ?? 13}
          />

          {/* Render either rainfall or uncertainty layer (mutually exclusive) */}
          {rainfallLayer}
          {uncertaintyLayer}

          {rfStationIcons}
          {otherStationIcons}

          {showIsohyets && isohyetsLayer}

          {activeGrid && (
            <PopupOnClick
              isLoading={isLoading}
              grid={activeGrid}
              selectedUnits={selectedUnits}
              selectedPeriod={selectedPeriod}
              selectedStation={enableStations ? selectedStation : undefined}
              setSelectedStation={enableStations ? setSelectedStation : undefined}
              location={location}
              setLocation={setLocation}
              setSelectedGridIndex={setSelectedGridIndex}
              enableStations={enableStations}
            />
          )}

          <MapOverlay
            selectedUnits={selectedUnits}
            setSelectedUnits={setSelectedUnits}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            showRFStations={showRFStations}
            setShowRFStations={setShowRFStations}
            showOtherStations={showOtherStations}
            setShowOtherStations={setShowOtherStations}
            showIsohyets={showIsohyets}
            setShowIsohyets={setShowIsohyets}
            tileLayerProps={tileLayerProps}
            setTileLayerProps={setTileLayerProps}
            showGrids={showGrids}
            setShowGrids={setShowGrids}
            showUncertainty={showUncertainty}
            setShowUncertainty={setShowUncertainty}
            isLoading={isLoading}
            gridsAreLoading={gridsAreLoading}
            minimap={true}
          />
        </Map>
        
        {/* Background prefetch indicator */}
        {isLoading && !showLoadingScreen && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 1000
          }}>
            Loading {selectedUnits === Units.IN ? 'inches' : 'millimeters'} data...
          </div>
        )}
      </div>
    </div>
  );
};

export default ClimateMap;