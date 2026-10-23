"use client"

import React from 'react';
import { MapContainer } from "react-leaflet";
import { LatLngBounds, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export interface Props {
  startPosition?: LatLngExpression,
  startZoom?: number,
  zoomSnap?: number,
  zoomDelta?: number,
  minZoom?: number,
  maxBounds?: LatLngBounds,
  children?: React.ReactNode,
}

const Map: React.FC<Props> = (
  {
    startPosition = [21.344875, -157.908248],
    startZoom = 7.5,
    zoomSnap = 0.75,
    zoomDelta = 0.75,
    minZoom = 6,
    maxBounds,
    children,
  }: Props
) => {
  return (
    <MapContainer
      center={startPosition}
      zoom={startZoom}
      dragging={true}
      scrollWheelZoom={true}
      zoomControl={false}
      zoomSnap={zoomSnap}
      zoomDelta={zoomDelta}
      minZoom={minZoom}
      maxBounds={maxBounds}
      maxBoundsViscosity={0.75}
      className="w-full h-full focus:outline-none z-40"
    >
      {children}
    </MapContainer>
  );
}

export default Map;
