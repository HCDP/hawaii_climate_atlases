import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map from "../Map";
import {
  Station,
  Units,
  Period,
  AsciiGrid,
} from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, useMapEvents, Marker } from "react-leaflet";
import L, { LatLng, LatLngExpression, Map as LeafletMap } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import { RainfallColorLayer } from "./RainfallColorLayer";
import { Feature, FeatureCollection } from "geojson";
import { defaultSettings } from "@/constants";
import useRainfallData from "@/hooks/useRainfallData";

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
    zoom,
  }: {
    geojson: FeatureCollection,
    zoom: number,
  }) => {
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
    grid,
  }: {
    selectedUnits: Units,
    grid: AsciiGrid,
  }) => {
  const [location, setLocation] = useState<LatLng | null>(null);
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
      } else {
        setGridValue(null);
      }
    } else {
      setGridValue(null);
    }
  }, [location, selectedUnits, grid]);
  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });

  return location ? (
    <Popup position={location}>
      {gridValue ? `Mean annual rainfall: ${gridValue.toFixed(3)} ${selectedUnits.toLocaleLowerCase()}` : "No data here"}
    </Popup>
  ) : null;
}

const ZoomendHandler = ({ onZoomEnd }: {
  onZoomEnd: (zoom: number) => void,
}) => {
  const map: LeafletMap = useMapEvents({
    zoomend: () => {
      const zoom = map.getZoom();
      onZoomEnd(zoom);
    }
  });
  return null;
}

const startPosition: LatLngExpression = [21.344875, -157.908248];
const zoomSnap = 0.75,
  zoomDelta = 0.75,
  minZoom = 6;

const pivotZoom = 12, hideBorderZoom = 9;

function createStationMarker(station: Station, zoom: number): L.Marker {
  const baseSize = 12;
  let size: number;
  if (zoom >= pivotZoom) {
    size = baseSize;
  } else {
    size = baseSize - (3 * (pivotZoom - zoom) * 0.75);
  }
  const showBorder = zoom > hideBorderZoom;
  const scale = size / 12;
  const stationIconHtml: {
    [key: string]: string
  } = {
    "Current": `
      <path
        fill="rgb(90, 180, 0)"
        fill-opacity="0.75"
        stroke="rgb(0, 0, 0)"
        stroke-opacity="${showBorder ? "1" : 0}"
        stroke-width="3"
        stroke-linecap="square"
        stroke-linejoin={undefined}
        stroke-miterlimit="4"
        path="M 0,0 12,0 12,12 0,12 Z"
        d="M 0 0 12 0 12 12 0 12Z"
        fill-rule="evenodd"
        stroke-dasharray="none"
      />`,
    "Discontinued": `
      <circle
        key={index}
        fill="rgb(180, 90, 0)"
        fill-opacity="0.755"
        stroke="rgb(0, 0, 0)"
        stroke-opacity="${showBorder ? "1" : 0}"
        stroke-width="1.5"
        stroke-linecap="square"
        stroke-linejoin={undefined}
        stroke-miterlimit="4"
        cx="6"
        cy="6"
        r="5.5"
        fill-rule="evenodd"
        stroke-dasharray="none"
      />
    `,
    "Virtual": `
      <path
        fill="rgb(180, 0, 115)"
        fill-opacity="0.75"
        stroke="rgb(0, 0, 0)"
        stroke-opacity="${showBorder ? "1" : 0}"
        stroke-width="1.5"
        stroke-linecap="square"
        stroke-linejoin={undefined}
        stroke-miterlimit="4"
        path="M 0,6 6,12 12,6 6,0 Z"
        d="M 0 6 6 12 12 6 6 0Z"
        fill-rule="evenodd"
        stroke-dasharray="none"
      />
    `,
  }
  const icon = L.divIcon({
    html: `<svg width="12" height="12" viewBox="0 0 12 12" style="transform: scale(${scale}); transform-origin: center;">
        ${stationIconHtml[station.StationStatus]}
      </svg>`,
    className: "",
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
  return L.marker([station.Lat_DD, station.Lon_DD], {
    bubblingMouseEvents: true,
    icon,
  });
}

const StationIcons = ({
  stations,
  setSelectedStation,
  show,
}: {
  stations: Station[],
  setSelectedStation: (station: Station) => void,
  show: boolean,
}) => {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());

  // Credit: https://medium.com/@silvajohnny777/optimizing-leaflet-performance-with-a-large-number-of-markers-0dea18c2ec99
  const allMarkersRef = useRef<L.Marker[]>(
    stations.map(station => {
      return createStationMarker(station, zoom)
        .addEventListener("click", () => {
          setSelectedStation(station);
        })
    })
  );
  const markersGroupRef = useRef<L.LayerGroup>(L.layerGroup());

  const renderMarkers = useCallback(() => {
    const newZoom = map.getZoom();
    // Either newZoom < pivotZoom, in which case we want to recalculate regardless, or newZoom > pivotZoom.
    // In this case, either the old zoom was < pivotZoom, in which case we want to recalculate so that the icons
    // become their base size, or the old zoom >= pivotZoom, in which case we don't need to recalculate.
    if (newZoom !== zoom) {
      if (newZoom < pivotZoom || zoom < pivotZoom) {
        // recalculate
        markersGroupRef.current.clearLayers();
        allMarkersRef.current = stations.map(station => {
          return createStationMarker(station, newZoom)
            .addEventListener("click", () => {
              setSelectedStation(station);
            })
        })
      }
    }
    setZoom(newZoom);

    const bounds = map.getBounds();
    allMarkersRef.current.forEach((marker) => {
      const markerLocation = marker.getLatLng();
      if (bounds.contains(markerLocation)) {
        if (!markersGroupRef.current.hasLayer(marker)) {
          markersGroupRef.current.addLayer(marker);
        }
      } else {
        if (markersGroupRef.current.hasLayer(marker)) {
          markersGroupRef.current.removeLayer(marker);
        }
      }
    });
  }, [map, setSelectedStation, stations, zoom]);

  useEffect(() => {
    if (!show) {
      markersGroupRef.current.clearLayers();
      return;
    }
    if (!map) return;
    if (!map.hasLayer(markersGroupRef.current)) {
      map.addLayer(markersGroupRef.current);
    }
    renderMarkers();
    map.on("moveend", renderMarkers);
    return () => {
      map.off("moveend", renderMarkers);
    }
  }, [map, renderMarkers, stations, show]);

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
  const [zoom, setZoom] = useState<number>(defaultSettings.zoom);

  const {
    rfStations,
    otherStations,
    featureCollections,
    asciiGrid,
    allDataLoaded,
    isLoading,
  } = useRainfallData(selectedUnits, selectedPeriod);

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
        setSelectedStation={setSelectedStation}
        show={showOtherStations}
      />
    ) : null;
  }, [otherStations, showOtherStations]);
  const isohyetsLayer = useMemo(() => {
    {/* "key" here is a hack to force IsohyetsLayer to re-render when the selected units change */}
    return featureCollections ? (
      <IsohyetsLayer
        key={`isohyets-layer-${selectedUnits}-${selectedPeriod}`}
        geojson={featureCollections[selectedPeriod]}
        zoom={zoom}
      />
    ) : null;
  }, [featureCollections, selectedPeriod, selectedUnits, zoom]);

  if (!allDataLoaded) {
    return (
      <p className="text-center">Loading data...</p>
    );
  }

  return (
    <div className="flex w-full h-full max-h-full">
      <div className="min-w-[24rem]">
        <SideBar
          selectedStation={selectedStation}
          selectedUnits={selectedUnits}
          selectedPeriod={selectedPeriod}
          range={selectedUnits == Units.IN ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod]}
        />
      </div>
      <div className="w-full h-full">
        <Map
          startPosition={startPosition}
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
          />}

          <ZoomendHandler onZoomEnd={setZoom} />
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
          />
        </Map>
      </div>
    </div>
  );
}

export default RainfallMap;
