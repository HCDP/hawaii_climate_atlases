import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, { StationIcon } from "../Map";
import {
  Station,
  Units,
  Period,
  AsciiGrid,
} from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, Marker } from "react-leaflet";
import L, { LatLng, LatLngBounds } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import { RainfallColorLayer } from "./RainfallColorLayer";
import { Feature, FeatureCollection } from "geojson";
import { defaultSettings } from "@/constants";
import useRainfallData from "@/hooks/useRainfallData";
import { renderToStaticMarkup } from "react-dom/server";
import useAllGrids from "@/hooks/useAllGrids";

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

const IsohyetsLayer = (
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

const PopupOnClick = (
  {
    selectedUnits,
    selectedPeriod,
    selectedStation,
    setSelectedStation,
    location,
    setLocation,
    setSelectedGridIndex,
    grid,
  }: {
    selectedUnits: Units,
    selectedPeriod: Period,
    selectedStation?: Station | null,
    setSelectedStation: (station: Station | null) => void,
    setSelectedGridIndex: (index: number) => void,
    location: LatLng | null,
    setLocation: (loc: LatLng) => void,
    grid: AsciiGrid,
  }) => {
  // const [location, setLocation] = useState<LatLng | null>(null);
  const [gridValue, setGridValue] = useState<number | null>(null);
  useEffect(() => {
    if (!location) {
      setGridValue(null);
      return;
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
  }, [location, selectedUnits, grid]);
  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });

  const periodText = Number(selectedPeriod) === Period.Annual ? "annual" : Period[selectedPeriod];
  const clickedOnStation: boolean =
    !!selectedStation &&
    !!location &&
    location.equals(new LatLng(selectedStation.Lat_DD, selectedStation.Lon_DD));

  // Used to remove station data from the sidebar if only a grid is clicked on
  if (!clickedOnStation) setSelectedStation(null);

  return location ? (
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
          {gridValue ? `Mean ${periodText} rainfall: ${gridValue.toFixed(4)} ${selectedUnits.toLocaleLowerCase()}` : "No data here"}
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

const StationIcons = ({
  stations,
  other,
  setSelectedStation,
  show,
}: {
  stations: Station[],
  other?: boolean,
  setSelectedStation: (station: Station) => void,
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
        setSelectedStation(station);
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
  }, [map, renderMarkers, stations, show, setSelectedStation]);

  return null;
}

const RainfallMap = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(defaultSettings.selectedStation);
  const [selectedUnits, setSelectedUnits] = useState<Units>(defaultSettings.selectedUnits);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultSettings.selectedPeriod);
  const [showIsohyets, setShowIsohyets] = useState<boolean>(defaultSettings.showIsohyets);
  const [showGrids, setShowGrids] = useState<boolean>(defaultSettings.showGrids);
  const [showRFStations, setShowRFStations] = useState<boolean>(defaultSettings.showRFStations);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(defaultSettings.showOtherStations);
  const [selectedGridIndex, setSelectedGridIndex] = useState<number>(-1); // -1 = default val or non-grid loc
  const [location, setLocation] = useState<LatLng | null>(null);

  const {
    rfStations,
    otherStations,
    featureCollections,
    asciiGrid,
    allDataLoaded,
    isLoading,
  } = useRainfallData(selectedUnits, selectedPeriod);

  const { 
    asciiGrids, 
    gridsAreLoading 
  } = useAllGrids(selectedUnits);

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
    [21, 818],
    [11, 669],
    [16, 1323],
    [7, 978],
    [2, 777],
    [0, 833],
    [0, 984],
    [1, 881],
    [1, 764],
    [8, 973],
    [19, 980],
    [14, 921],
    [204, 10271]
  ];

  const colorLayer = useMemo(() => {
    return asciiGrid ? (
      <RainfallColorLayer
        key={`color-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: {
            colors: [],
            range: selectedUnits == Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod],
          },
          asciiGrid,
        }}
      />
    ) : null;
    // eslint-disable-next-line
  }, [asciiGrid]);
  const rfStationIcons = useMemo(() => {
    return rfStations ? (
      <StationIcons
        stations={rfStations}
        setSelectedStation={setSelectedStation}
        show={showRFStations}
      />
    ) : null;
  }, [rfStations, showRFStations]);
  const otherStationIcons = useMemo(() => {
    return otherStations ? (
      <StationIcons
        stations={otherStations}
        other={true}
        setSelectedStation={setSelectedStation}
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

  if (!allDataLoaded) {
    return (
      <p className="text-center">Loading data...</p>
    );
  }

  return (
    <div className="flex w-full h-full max-h-full">
      <SideBar
        selectedStation={selectedStation}
        selectedUnits={selectedUnits}
        selectedPeriod={selectedPeriod}
        asciiGrids={asciiGrids}
        canShowGridValues={!gridsAreLoading && selectedGridIndex != -1}
        selectedGridIndex={selectedGridIndex}
        location={location}
        range={selectedUnits == Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod]}
        units={selectedUnits == Units.IN ? 'in' : 'mm'}
      />
      <div className="w-full h-full">
        <Map
          startPosition={defaultSettings.startPosition}
          startZoom={defaultSettings.zoom}
          zoomSnap={zoomSnap}
          zoomDelta={zoomDelta}
          minZoom={minZoom}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}"
          />

          {showGrids && colorLayer}

          {rfStationIcons}

          {otherStationIcons}

          {showIsohyets && isohyetsLayer}

          {asciiGrid && <PopupOnClick
            grid={asciiGrid}
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
            showGrids={showGrids}
            setShowGrids={setShowGrids}
            isLoading={isLoading}
            gridsAreLoading={gridsAreLoading}
          />
        </Map>
      </div>
    </div>
  );
}

export default RainfallMap;
