import React, { useEffect, useMemo, useState } from "react";
import Map, { StationIcon } from "../Map";
import {
  Station,
  Units,
  Period,
  AsciiGrid,
} from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, useMapEvents, Marker } from "react-leaflet";
import L, { LatLng, LatLngExpression, Map as LeafletMap, Util } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import formatNum = Util.formatNum;
import { RainfallColorLayer } from "./RainfallColorLayer";
import { Feature, FeatureCollection } from "geojson";
import { useStations } from "@/hooks/useStations";
import { useIsohyets } from "@/hooks/useIsohyets";
import { useGrids } from "@/hooks/useGrids";
import { defaultSettings } from "@/constants";

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
  //console.log(JSON.stringify(geojson, null, 2));
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

const StationIcons = (
  {
    stations, setSelectedStation, zoom, zoomDelta
  }: {
    stations: Station[],
    setSelectedStation: (station: Station) => void,
    zoom: number,
    zoomDelta: number,
  }) => {
  const map = useMap();
  // Credit: https://github.com/ikewai/precipitation_application/blob/prod/src/app/components/map/map.component.ts#L656
  const pivotRadius = 360, pivotZoom = 12, borderPivotZoom = 10.5;
  const scale = map.getZoomScale(12, zoom);
  let radius: number;
  if (zoom >= pivotZoom) {
    radius = pivotRadius * scale;
  } else {
    radius = pivotRadius + (120 * (pivotZoom - zoom) / zoomDelta)
  }
  return (
    <>
      {stations.map((station, index) => (
        <StationIcon
          station={station}
          onClick={setSelectedStation}
          center={new LatLng(formatNum(station.Lat_DD, false), formatNum(station.Lon_DD, false))}
          radius={radius}
          outline={zoom >= borderPivotZoom}
          key={index}
        />
      ))}
    </>
  );
}

const startPosition: LatLngExpression = [21.344875, -157.908248];
const zoomSnap = 0.75,
  zoomDelta = 0.75,
  minZoom = 6;

const RainfallMap = () => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(defaultSettings.selectedStation);
  const [selectedUnits, setSelectedUnits] = useState<Units>(defaultSettings.selectedUnits);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultSettings.selectedPeriod);
  const [showIsohyets, setShowIsohyets] = useState<boolean>(defaultSettings.showIsohyets);
  const [showGrids, setShowGrids] = useState<boolean>(defaultSettings.showGrids);
  const [showRFStations, setShowRFStations] = useState<boolean>(defaultSettings.showRFStations);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(defaultSettings.showOtherStations);
  const [zoom, setZoom] = useState<number>(defaultSettings.zoom);

  const { stations: rfStations } = useStations();
  const { stations: otherStations } = useStations("other");
  const { featureCollections } = useIsohyets(selectedUnits);
  const { asciiGrid } = useGrids(selectedUnits, Period[selectedPeriod]);
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
  ]

  console.log("Current month index: ", selectedPeriod);
  console.log("Current data range: ", ranges_IN[selectedPeriod]);

  const colorLayer = useMemo(() => {
    return asciiGrid ? (
      <RainfallColorLayer
        key={`color-layer-${selectedUnits}-${selectedPeriod}`}
        options={{
          cacheEmpty: true,
          colorScale: {
            colors: [],
            range: selectedUnits == 'IN' ? ranges_IN[selectedPeriod] : ranges_MM[selectedPeriod],
          },
          asciiGrid,
        }}
      />
    ) : null;
  }, [asciiGrid, selectedUnits, selectedPeriod]);
  const rfStationIcons = useMemo(() => {
    return rfStations ? (
      <StationIcons
        stations={rfStations}
        setSelectedStation={setSelectedStation}
        zoom={zoom}
        zoomDelta={zoomDelta}
      />
    ) : null;
  }, [rfStations, zoom]);
  const otherStationIcons = useMemo(() => {
    return otherStations ? (
      <StationIcons
        stations={otherStations}
        setSelectedStation={setSelectedStation}
        zoom={zoom}
        zoomDelta={zoomDelta}
      />
    ) : null;
  }, [otherStations, zoom]);
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
  console.log("Map renderinggg");
  if (!(rfStations && otherStations && featureCollections && asciiGrid)) {
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

          {showRFStations && rfStationIcons}

          {showOtherStations && otherStationIcons}

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
          />
        </Map>
      </div>
    </div>
  );
}

export default RainfallMap;
