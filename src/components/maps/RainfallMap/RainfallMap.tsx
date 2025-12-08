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
import "./RainfallColorLayer";
import "./UncertaintyMap/UncertaintyColorLayer";
import { RainfallColorLayer } from "./RainfallColorLayer";
import { UncertaintyColorLayer } from "./UncertaintyMap/UncertaintyColorLayer";

import { renderToStaticMarkup } from "react-dom/server";
import { 
  useRainfallAllGrids, 
  useRainfallComposite,
  useRainfallUncertaintyAllGrids,
  useRainfallUncertaintyComposite
} from "@/hooks/rainfall";
import { defaultSettings } from "@/constants";
import { GridLoader } from "react-spinners";


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
  }: {
    isLoading: boolean,
    selectedUnits: Units,
    selectedPeriod: Period,
    selectedStation?: Station | null,
    setSelectedStation: (station: Station | null) => void,
    setSelectedGridIndex: (index: number) => void,
    location: LatLng | null,
    setLocation: (loc: LatLng) => void,
    grid: AsciiGrid,
  }) => {
  const [clickedOnStation, setClickedOnStation] = useState<boolean>(false);
  const [gridValue, setGridValue] = useState<number | null>(null);
  useEffect(() => {
    if (!location) {
      setGridValue(null);
      return;
    }
    const newLocationOnStation: boolean =
      !!selectedStation &&
      !!location &&
      location.equals(new LatLng(selectedStation.Lat_DD, selectedStation.Lon_DD));
    if (selectedStation && !newLocationOnStation) {
      setClickedOnStation(false);
      setSelectedStation(null);
    }
    if (selectedStation && newLocationOnStation) {
      setClickedOnStation(true);
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
  }, [location, selectedUnits, grid, selectedStation, setSelectedStation, setSelectedGridIndex]);
  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });

  const periodText = Number(selectedPeriod) === Period.Annual ? "annual" : Period[selectedPeriod];
  // Used to remove station data from the sidebar if only a grid is clicked on

  return gridValue && location ? (
    <>
      <Popup position={location}>
        <div className="flex flex-col gap-3">
          Location: Lat: {location.lat.toFixed(4)},
          Lon: {location.lng.toFixed(4)}
          <hr />
          {clickedOnStation && selectedStation && (
            <>
              Station: {selectedStation.Name}<br />
              Status: {selectedStation.StationStatus}<br />
              Record period: {selectedStation.MinYear} - {selectedStation.MaxYear}
              <hr />
            </>
          )}
          {/*Mean annual rainfall: {selectedStation?.AnnAvgIN}*/}
          {isLoading ? `Loading mean ${periodText} rainfall values (in ${selectedUnits.toLocaleLowerCase()})...` : `Mean ${periodText} rainfall: ${gridValue.toFixed(4)} ${selectedUnits.toLocaleLowerCase()}`}
        </div>
      </Popup>
      {/* X marker that indicates where the user last clicked on the map (only valid grid spaces + stations) 
          Some stations may appear off of the grid spaces, so include marker in those cases */}
      {gridValue || clickedOnStation ? <Marker
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

const RainfallMap = () => {
  // useRainfallData(defaultSettings.selectedUnits, defaultSettings.selectedPeriod);

  const [selectedStation, setSelectedStation] = useState<Station | null>(defaultSettings.selectedStation);
  const [selectedUnits, setSelectedUnits] = useState<Units>(defaultSettings.selectedUnits);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultSettings.selectedPeriod);
  const [showIsohyets, setShowIsohyets] = useState<boolean>(defaultSettings.showIsohyets);
  const [showGrids, setShowGrids] = useState<boolean>(defaultSettings.showGrids);
  const [showUncertainty, setShowUncertainty] = useState<boolean>(false);
  const [showRFStations, setShowRFStations] = useState<boolean>(defaultSettings.showRFStations);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(defaultSettings.showOtherStations);
  const [selectedStationIsOther, setSelectedStationIsOther] = useState<boolean>(false);
  const [selectedGridIndex, setSelectedGridIndex] = useState<number>(-1); // -1 = default val or non-grid loc
  const [location, setLocation] = useState<LatLng | null>(null);
  const [tileLayerProps, setTileLayerProps] = useState<TileLayerProps>({
    name: "Street",
    url: "https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Load BOTH unit systems simultaneously for research workflows
  // This ensures instant switching between inches and millimeters
  
  // Load BOTH unit systems simultaneously for instant switching
  const {
    rfStations,
    otherStations,
    featureCollections,
    asciiGrid: asciiGridIN,
    allDataLoaded: rainfallDataLoadedIN,
    isLoading: rainfallIsLoadingIN,
  } = useRainfallComposite(Units.IN, selectedPeriod);

  const {
    asciiGrid: asciiGridMM,
    allDataLoaded: rainfallDataLoadedMM,
    isLoading: rainfallIsLoadingMM,
  } = useRainfallComposite(Units.MM, selectedPeriod);

  const {
    asciiGrids: asciiGridsIN,
    gridsAreLoading: rainfallGridsAreLoadingIN
  } = useRainfallAllGrids(Units.IN);

  const {
    asciiGrids: asciiGridsMM,
    gridsAreLoading: rainfallGridsAreLoadingMM
  } = useRainfallAllGrids(Units.MM);

  const {
    asciiGrid: uncertaintyGridIN,
    allDataLoaded: uncertaintyDataLoadedIN,
    isLoading: uncertaintyIsLoadingIN,
  } = useRainfallUncertaintyComposite(Units.IN, selectedPeriod);

  const {
    asciiGrid: uncertaintyGridMM,
    allDataLoaded: uncertaintyDataLoadedMM,
    isLoading: uncertaintyIsLoadingMM,
  } = useRainfallUncertaintyComposite(Units.MM, selectedPeriod);

  const {
    asciiGrids: uncertaintyGridsIN,
    gridsAreLoading: uncertaintyGridsAreLoadingIN
  } = useRainfallUncertaintyAllGrids(Units.IN);

  const {
    asciiGrids: uncertaintyGridsMM,
    gridsAreLoading: uncertaintyGridsAreLoadingMM
  } = useRainfallUncertaintyAllGrids(Units.MM);

  // Use data for currently selected units
  const asciiGrid = selectedUnits === Units.IN ? asciiGridIN : asciiGridMM;
  const asciiGrids = selectedUnits === Units.IN ? asciiGridsIN : asciiGridsMM;
  const uncertaintyGrid = selectedUnits === Units.IN ? uncertaintyGridIN : uncertaintyGridMM;
  const uncertaintyGrids = selectedUnits === Units.IN ? uncertaintyGridsIN : uncertaintyGridsMM;

  const rainfallIsLoading = selectedUnits === Units.IN ? rainfallIsLoadingIN : rainfallIsLoadingMM;
  const uncertaintyIsLoading = selectedUnits === Units.IN ? uncertaintyIsLoadingIN : uncertaintyIsLoadingMM;
  const rainfallDataLoaded = selectedUnits === Units.IN ? rainfallDataLoadedIN : rainfallDataLoadedMM;
  const uncertaintyDataLoaded = selectedUnits === Units.IN ? uncertaintyDataLoadedIN : uncertaintyDataLoadedMM;
  const rainfallGridsAreLoading = selectedUnits === Units.IN ? rainfallGridsAreLoadingIN : rainfallGridsAreLoadingMM;
  const uncertaintyGridsAreLoading = selectedUnits === Units.IN ? uncertaintyGridsAreLoadingIN : uncertaintyGridsAreLoadingMM;

  const isLoading = rainfallIsLoading || uncertaintyIsLoading;
  const gridsAreLoading = rainfallGridsAreLoading || uncertaintyGridsAreLoading;
  const allDataLoaded = rainfallDataLoaded && uncertaintyDataLoaded;

  // Only show loading screen if BOTH unit systems are still loading (first load only)
  const bothUnitsStillLoading = (rainfallIsLoadingIN && rainfallIsLoadingMM) || (uncertaintyIsLoadingIN && uncertaintyIsLoadingMM);
  const showLoadingScreen = bothUnitsStillLoading;

  const ranges_IN: [number, number][] = [
    [0.8, 32.2],
    [0.4, 26.4],
    [0.6, 51.9],
    [0.3, 38.5],
    [0.1, 30.7],
    [0, 32.8],
    [0, 38.7],
    [0, 34.7],
    [0, 30.1],
    [0.3, 38.3],
    [0.7, 38.6],
    [0.6, 36.4],
    [8, 404.4]
  ];

  const ranges_MM: [number, number][] = [
    [21, 818],       // January
    [11, 669],       // February 
    [16, 1323],      // March
    [7, 978],        // April
    [2, 777],        // May
    [0, 833],        // June
    [0, 984],        // July 
    [1, 881],        // August
    [1, 764],        // September
    [8, 973],        // October
    [19, 980],       // November
    [14, 921],       // December
    [204, 10271]     // Annual
  ];

  const uncertainty_ranges_IN: [number, number][] = [
    [0.0005019, 3.354232],    // January
    [0.0014641, 2.839714],    // February
    [0.0009792, 4.090142],    // March
    [0.0001895, 11.3037],     // April
    [0.0007213, 2.740073],    // May
    [0.0008297, 3.273416],    // June
    [0.0001819, 3.422752],    // July
    [0.00446305, 3.086848],   // August
    [0.0007306, 2.773549],    // September
    [0.0011364, 2.597468],    // October
    [0.004848769, 3.840706],  // November
    [0.001260578, 3.433185],  // December
    [0.05284176, 11.87222]    // Annual
  ];

  const uncertainty_ranges_MM: [number, number][] = [
    [0.01274, 85.18],     // January
    [0.0371, 72.09],      // February
    [0.0248, 103.89],     // March
    [0.0048, 287.11],     // April
    [0.0183, 69.58],      // May
    [0.0210, 83.14],      // June
    [0.0046, 86.98],      // July
    [0.1134, 78.41],      // August
    [0.0185, 70.47],      // September
    [0.0289, 65.92],      // October
    [0.1232, 97.51],      // November
    [0.0320, 87.18],      // December
    [1.3422, 301.5]       // Annual
  ];

  // Memoize rainfall layer
  const rainfallLayer = useMemo(() => {
    // Only render when we have valid data and it's not loading
    if (!showGrids || showUncertainty || !asciiGrid || rainfallIsLoading) return null;
    
    const range = selectedUnits === Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod];
    
    return (
      <RainfallColorLayer
        key={`rainfall-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: {
            colors: [],
            range,
          },
          asciiGrid,
        }}
      />
    );
  }, [showGrids, showUncertainty, asciiGrid, selectedUnits, selectedPeriod, rainfallIsLoading]);

  // Memoize uncertainty layer
  const uncertaintyLayer = useMemo(() => {
    // Only render when we have valid data and it's not loading
    if (!showUncertainty || !uncertaintyGrid || uncertaintyIsLoading) return null;
    
    const range = selectedUnits === Units.IN ? uncertainty_ranges_IN[selectedPeriod] : uncertainty_ranges_MM[selectedPeriod];
    
    return (
      <UncertaintyColorLayer
        key={`uncertainty-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: {
            colors: [],
            range,
          },
          asciiGrid: uncertaintyGrid,
        }}
      />
    );
  }, [showUncertainty, uncertaintyGrid, selectedUnits, selectedPeriod, uncertaintyIsLoading]);

  const rfStationIcons = useMemo(() => {
    return rfStations ? (
      <StationIcons
        stations={rfStations}
        handleClickStation={(station, other) => {
          setSelectedStation(station)
          setSelectedStationIsOther(!!other);
        }}
        show={showRFStations}
      />
    ) : null;
  }, [rfStations, showRFStations]);
  const otherStationIcons = useMemo(() => {
    return otherStations ? (
      <StationIcons
        stations={otherStations}
        other={true}
        handleClickStation={(station, other) => {
          setSelectedStation(station)
          setSelectedStationIsOther(!!other);
        }}
        show={showOtherStations}
      />
    ) : null;
  }, [otherStations, showOtherStations]);
  const isohyetsLayer = useMemo(() => {
    {/* "key" here is a hack to force IsohyetsLayer to re-render when the selected units change */
    }
    return featureCollections ? (
      <IsohyetsLayer
        key={`isohyets-layer-${selectedUnits}-${selectedPeriod}`}
        geojson={featureCollections[selectedPeriod]}
      />
    ) : null;
  }, [featureCollections, selectedPeriod, selectedUnits]);

  if (showLoadingScreen) {
    return (
      <div style={{padding: "20px"}} className="text-center">
        <p style={{padding: "10px"}}>Loading Data</p>
        <GridLoader/>
      </div>
      
    );
  }

  // Determine which grid is active based on user selection
  let activeGrid = showUncertainty ? uncertaintyGrid : asciiGrid;
  let activeGrids = showUncertainty ? uncertaintyGrids : asciiGrids;
  let activeRanges = showUncertainty 
    ? (selectedUnits === Units.IN ? uncertainty_ranges_IN : uncertainty_ranges_MM)
    : (selectedUnits === Units.IN ? ranges_IN : ranges_MM);

  return (
    <div className="flex w-full h-full max-h-full">
      <SideBar
        selectedStation={selectedStation}
        isOtherStation={selectedStationIsOther}
        selectedUnits={selectedUnits}
        selectedPeriod={selectedPeriod}
        asciiGrids={activeGrids}
        canShowGridValues={!gridsAreLoading && selectedGridIndex != -1}
        selectedGridIndex={selectedGridIndex}
        location={location}
        range={activeRanges[selectedPeriod]}
        units={showUncertainty ? (selectedUnits == Units.IN ? 'in²' : 'mm²') : (selectedUnits == Units.IN ? 'in' : 'mm')}
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
          {/* Use key prop to allow basemap to change instantly upon selection (any unique value is good) */}
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

          {activeGrid && <PopupOnClick
            isLoading={isLoading}
            grid={activeGrid}
            selectedUnits={selectedUnits}
            selectedPeriod={selectedPeriod}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
            location={location}
            setLocation={setLocation}
            setSelectedGridIndex={setSelectedGridIndex}
          />}

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
            setLocation={setLocation}
            rfStations={rfStations}
            otherStations={otherStations}
            setSelectedStation={setSelectedStation}
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
}

export default RainfallMap;
