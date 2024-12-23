"use client"

import React, { useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { LatLng, LatLngBounds, LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { StationIcon } from "@/components/maps/Map";
import { Station, Units } from "@/lib";
import MapOverlay from "@/components/leaflet-controls/MapOverlay";

export interface Props {
  position: number[],
  zoom: number,
  stations: Station[],
  setSelectedStation: (station: Station) => void,
  selectedUnits: Units,
  setSelectedUnits: (units: Units) => void,
  mapMaximized: boolean,
  toggleMapMaximized: () => void,
}

const ZoomendHandler = ({ iconRefs }) => {
  const map: LeafletMap = useMapEvents({
    zoomend: () => {
      const icons = iconRefs.current;
      const zoom = map.getZoom();
      const pivotZoom = 13;
      const scale = zoom > pivotZoom ? map.getZoomScale(pivotZoom, map.getZoom()) : 1;
      icons.forEach(icon => {
        icon.reSize(scale);
      });
    }
  });
  return null;
}

const MaxBoundsSetter = () => {
  const map: LeafletMap = useMap();
  const oldBounds: LatLngBounds = map.getBounds(),
    oldSouthWest = oldBounds.getSouthWest(),
    oldNorthEast = oldBounds.getNorthEast();
  const newSouthWest: LatLng = new LatLng(oldSouthWest.lat - 5, oldSouthWest.lng - 5);
  const newNorthEast: LatLng = new LatLng(oldNorthEast.lat + 5, oldNorthEast.lng + 5);
  const newBounds: LatLngBounds = new LatLngBounds(newSouthWest, newNorthEast);
  map.setMaxBounds(newBounds);
  return null;
};

const Map: React.FC<Props> = (
  {
    position = [21.344875, -157.908248],
    zoom = 7,
    stations = [],
    setSelectedStation,
    selectedUnits,
    setSelectedUnits,
    mapMaximized,
    toggleMapMaximized,
  }: Props
) => {
  const iconRefs = useRef([]);

  return (
    <MapContainer
      center={position as LatLngExpression}
      zoom={zoom}
      dragging={true}
      scrollWheelZoom={true}
      zoomControl={false}
      zoomSnap={0.75}
      zoomDelta={1}
      minZoom={5.75}
      className="w-full h-full focus:outline-none"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://www.google.com/maps/vt?lyrs=m@221097413,traffic&x={x}&y={y}&z={z}"
      />
      {stations.map((station, index) => (
        <StationIcon
          station={station}
          onClick={setSelectedStation}
          ref={element => {
            iconRefs.current[index] = element;
          }}
          scale={1}
          key={index}
        />
      ))}
      <ZoomendHandler iconRefs={iconRefs} />
      <MaxBoundsSetter />
      <MapOverlay
        selectedUnits={selectedUnits}
        setSelectedUnits={setSelectedUnits}
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
