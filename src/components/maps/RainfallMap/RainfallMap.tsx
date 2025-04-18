import React, { useContext, useState } from "react";
import Map, { MapProps, StationIcon } from "../Map";
import { Station, Units, Period, Isohyets, Grids } from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import L, { LatLng, LatLngExpression, Map as LeafletMap, Util } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import formatNum = Util.formatNum;
import { LayoutContext } from "@/components/LayoutContext";
import { RasterOptions, ColorScale, RainfallColorLayer } from "./RainfallColorLayer";

const IsohyetsLayer = (
  {
    isohyets,
    selectedUnits,
    selectedPeriod,
  }: {
    isohyets: Isohyets,
    selectedUnits: Units,
    selectedPeriod: Period,
  }) => {
  const geojson = isohyets[selectedUnits][selectedPeriod];
  return (
    <GeoJSON
      interactive={false}
      data={geojson}
      style={{
        color: 'black',
        weight: 0.7,
      }}
    />
  );
}

const PopupOnClick = (
  {
    selectedUnits,
    // selectedPeriod,
    grids,
  }: {
    selectedUnits: Units,
    selectedPeriod: Period,
    grids: Grids,
  }) => {

  const [location, setLocation] = useState<LatLng>();
  const [gridValue, setGridValue] = useState<number | null>(null);
  useMapEvent("click", (e) => {
    // Credit: https://github.com/ikewai/precipitation_application/blob/prod/src/app/services/util/data-retreiver.service.ts#L34
    // const grid = grids[selectedUnits][selectedPeriod];
    const grid = grids[selectedUnits][0];
    const location = e.latlng;
    setLocation(location);
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
    stations, setSelectedStation, zoomDelta
  }: {
    stations: Station[],
    setSelectedStation: (station: Station) => void,
    zoom: number,
    zoomDelta: number,
  }) => {
  const map = useMap();
  const zoom = map.getZoom();
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

interface Props extends MapProps {
  rfStations: Station[] | null,
  otherStations: Station[] | null,
  isohyets: Isohyets | null,
  grids: Grids | null,
}

const RainfallMap: React.FC<Props> = (
  {
    rfStations,
    otherStations,
    isohyets,
    grids,
  }: Props
) => {
  const [selectedStation, setSelectedStation] = useState<Station>();
  const [selectedUnits, setSelectedUnits] = useState<Units>("IN");
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.Annual);
  const [showIsohyets, setShowIsohyets] = useState<boolean>(false);
  const [showGrids, setShowGrids] = useState<boolean>(true);
  const [showRFStations, setShowRFStations] = useState<boolean>(true);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(false);

  const { maximized, setMaximized } = useContext(LayoutContext);
  const toggleMapMaximized = () => setMaximized(oldMax => !oldMax);

  const startPosition: LatLngExpression = [21.344875, -157.908248];
  const startZoom = 7.5,
    zoomSnap = 0.75,
    zoomDelta = 0.75,
    minZoom = 6;
  const [zoom, setZoom] = useState<number>(startZoom);
  
  /*const rasterOptions: RasterOptions = {
    cacheEmpty: true,
    colorScale: {
      colors: [],
      range: [8, 404.4],
    },
    asciiGrid: grids[selectedUnits][0],
  };*/

  return (
    <div className="flex w-full h-full max-h-full">
      <div className="min-w-[24rem]">
        <SideBar selectedStation={selectedStation} selectedUnits={selectedUnits}/>
      </div>
      <div className="w-full h-full">
        <Map
          startPosition={startPosition}
          startZoom={startZoom}
          zoomSnap={zoomSnap}
          zoomDelta={zoomDelta}
          minZoom={minZoom}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}"
          />

          {showGrids && grids && <RainfallColorLayer options={
            {
              cacheEmpty: true,
              colorScale: {
                colors: [],
                range: [8, 404.4],
              },
              asciiGrid: grids[selectedUnits][0],
            }
          } />}

          {showRFStations && rfStations && (
            <StationIcons
              stations={rfStations}
              setSelectedStation={setSelectedStation}
              zoom={zoom}
              zoomDelta={zoomDelta}
            />
          )}

          {showOtherStations && otherStations && (
            <StationIcons
              stations={otherStations}
              setSelectedStation={setSelectedStation}
              zoom={zoom}
              zoomDelta={zoomDelta}
            />
          )}

          {/* "key" here is a hack to force IsohyetsLayer to re-render when the selected units change */}
          {showIsohyets && isohyets && (
            <IsohyetsLayer
              key={`${selectedUnits}${selectedPeriod}`}
              isohyets={isohyets} selectedUnits={selectedUnits}
              selectedPeriod={selectedPeriod}
            />
          )}

          {grids && <PopupOnClick
            selectedUnits={selectedUnits}
            selectedPeriod={selectedPeriod}
            grids={grids}
          />}

          <ZoomendHandler onZoomEnd={setZoom}/>
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
            mapMaximized={maximized}
            onToggleMaximize={toggleMapMaximized}
          />
        </Map>
      </div>
    </div>
  );
}

export default RainfallMap;
