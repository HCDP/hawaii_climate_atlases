"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer } from "react-leaflet";
import { LatLng, LatLngBounds, LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export interface Props {
  startPosition?: LatLngExpression,
  startZoom?: number,
  zoomSnap?: number,
  zoomDelta?: number,
  minZoom?: number,
  children?: React.ReactNode,
}

const Map: React.FC<Props> = (
  {
    startPosition = [21.344875, -157.908248],
    startZoom = 7.5,
    zoomSnap = 0.75,
    zoomDelta = 0.75,
    minZoom = 6,
    children,
  }: Props
) => {
  const [map, setMap] = useState<LeafletMap | null>(null);

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
      center={startPosition}
      zoom={startZoom}
      dragging={true}
      scrollWheelZoom={true}
      zoomControl={false}
      zoomSnap={zoomSnap}
      zoomDelta={zoomDelta}
      minZoom={minZoom}
      maxBoundsViscosity={0.75}
      ref={map => setMap(map)}
      className="w-full h-full focus:outline-none z-40"
    >
      {children}
    </MapContainer>
  );
}

export default Map;
