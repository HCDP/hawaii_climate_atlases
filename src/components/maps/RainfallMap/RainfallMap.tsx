import React, { useContext, useState } from "react";
import Map, { MapProps, StationIcon } from "../Map";
import { Station, Units, Period, Isohyets, Grids } from "@/lib";
import SideBar from "@/components/SideBar";
import { GeoJSON, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression, Map as LeafletMap, Util } from "leaflet";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import formatNum = Util.formatNum;
import { LayoutContext } from "@/components/LayoutContext";

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

const PopupOnClick = () => {
  // const map = useMapEvent("click", (e) => {
  //   L.popup()
  //     .setContent("<p>this is a popup</p>")
  //     .setLatLng(e.latlng).
  //   openOn(map);
  // });
  const [location, setLocation] = useState<LatLng>();
  useMapEvent("click", (e) => {
    setLocation(e.latlng);
  });
  return location && (
    <Popup position={location}>
      The location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
    </Popup>
  );
}

interface Props extends MapProps {
  rfStations: Station[],
  otherStations: Station[],
  isohyets: Isohyets,
  grids: Grids,
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
          {showRFStations && (
            <StationIcons
              stations={rfStations}
              setSelectedStation={setSelectedStation}
              zoom={zoom}
              zoomDelta={zoomDelta}
            />
          )}
          {showOtherStations && (
            <StationIcons
              stations={otherStations}
              setSelectedStation={setSelectedStation}
              zoom={zoom}
              zoomDelta={zoomDelta}
            />
          )}
          {/* "key" here is a hack to force IsohyetsLayer to re-render when the selected units change */}
          {showIsohyets && (
            <IsohyetsLayer
              key={`${selectedUnits}${selectedPeriod}`}
              isohyets={isohyets} selectedUnits={selectedUnits}
              selectedPeriod={selectedPeriod}
            />
          )}
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
            mapMaximized={maximized}
            onToggleMaximize={toggleMapMaximized}
          />
          <PopupOnClick/>
        </Map>
      </div>
    </div>
  );
}

export default RainfallMap;
