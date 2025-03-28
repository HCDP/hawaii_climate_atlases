"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, GeoJSON } from "react-leaflet";
import { FeatureCollectionWithFilename } from "shpjs";
import { LatLng, LatLngBounds, LatLngExpression, Map as LeafletMap, Util } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { StationIcon } from "@/components/maps/Map";
import { Station, Units } from "@/lib";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";
import formatNum = Util.formatNum;

export interface Props {
  startPosition: number[],
  startZoom: number,
  stations: Station[],
  setSelectedStation: (station: Station) => void,
  selectedUnits: Units,
  setSelectedUnits: (units: Units) => void,
  isohyets: FeatureCollectionWithFilename[],
  showIsohyets: boolean,
  setShowIsohyets: (show: boolean) => void,
  mapMaximized: boolean,
  toggleMapMaximized: () => void,
}

const GeoJSONLayer = ({ geojson }: { geojson: FeatureCollectionWithFilename }) => {
  // const map = useMap();
  // const geoJSON = L.geoJSON(geojson, {
  //   interactive: false,
  //   style: {
  //     color: 'black',
  //     weight: 1,
  //   }
  // });
  // geoJSON.addTo(map);
  // return null;
  return (
    <GeoJSON
      interactive={false}
      data={geojson}
      style={{
        color: 'black',
        weight: 1,
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
      // console.log(map.getZoomScale(12.75, 12))
      console.log(zoom);
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

const Map: React.FC<Props> = (
  {
    startPosition = [21.344875, -157.908248],
    startZoom = 7.5,
    stations = [],
    isohyets,
    showIsohyets,
    setShowIsohyets,
    setSelectedStation,
    selectedUnits,
    setSelectedUnits,
    mapMaximized,
    toggleMapMaximized,
  }: Props
) => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [zoom, setZoom] = useState<number>(startZoom);
  const zoomSnap = 0.75, zoomDelta = 0.75, minZoom = 6;

  useEffect(() => {
    if (map) {
      const oldBounds: LatLngBounds = map.getBounds(),
        oldSouthWest = oldBounds.getSouthWest(),
        oldNorthEast = oldBounds.getNorthEast();
      const newSouthWest: LatLng = new LatLng(oldSouthWest.lat - 5, oldSouthWest.lng - 5);
      const newNorthEast: LatLng = new LatLng(oldNorthEast.lat + 5, oldNorthEast.lng + 5);
      const newBounds: LatLngBounds = new LatLngBounds(newSouthWest, newNorthEast);
      map.setMaxBounds(newBounds);
    }
  }, [map]);

  return (
    <MapContainer
      center={startPosition as LatLngExpression}
      zoom={zoom}
      dragging={true}
      scrollWheelZoom={true}
      zoomControl={false}
      zoomSnap={zoomSnap}
      zoomDelta={zoomDelta}
      minZoom={minZoom}
      maxBoundsViscosity={0.75}
      ref={map => setMap(map)}
      className="w-full h-full focus:outline-none"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}"
      />
      <StationIcons stations={stations} setSelectedStation={setSelectedStation} zoom={zoom} zoomDelta={zoomDelta} />
      {showIsohyets && <GeoJSONLayer geojson={isohyets[12]} />}
      <ZoomendHandler onZoomEnd={setZoom} />
      <MapOverlay
        selectedUnits={selectedUnits}
        setSelectedUnits={setSelectedUnits}
        showIsohyets={showIsohyets}
        setShowIsohyets={setShowIsohyets}
        mapMaximized={mapMaximized}
        onToggleMaximize={toggleMapMaximized}
      />
      {/*<StationIcon*/}
      {/*  station={{*/}
      {/*    "SKN": 514,*/}
      {/*    "Name": "Gage 40",*/}
      {/*    "Lat_DD": 21.137,*/}
      {/*    "Lon_DD": -157.20442,*/}
      {/*    "DataSources": "Fill, State",*/}
      {/*    "StationStatus": "Current"*/}

      {/*  }}*/}
      {/*  onClick={setSelectedStation}*/}
      {/*  scale={1}*/}
      {/*  key={"asdfasfasdfasfasfdsafsafas"}*/}
      {/*/>*/}
      {/*<StationIcon*/}
      {/*  station={{*/}
      {/*    "SKN": 514,*/}
      {/*    "Name": "Gage 40",*/}
      {/*    "Lat_DD": 21.137,*/}
      {/*    "Lon_DD": -157.20442,*/}
      {/*    "DataSources": "Fill, State",*/}
      {/*    "StationStatus": "Discontinued"*/}

      {/*  }}*/}
      {/*  onClick={setSelectedStation}*/}
      {/*  scale={1}*/}
      {/*  key={"asdfasfasdfasfasfdsafsafasa"}*/}
      {/*/>*/}
    </MapContainer>
  );
}

export default Map;
