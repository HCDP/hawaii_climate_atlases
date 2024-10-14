"use client"

import React, {useState} from 'react'
import { MapContainer, Marker, TileLayer, Popup, Tooltip, useMapEvents } from "react-leaflet"
import { LatLngExpression, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

export interface Props {
  position: number[],
  zoom: number,
}

const Map: React.FC<Props> = (props: Props) => {
  const {
    position = [21.344875, -157.908248],
    zoom = 50,
  } = props;
  const ClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        map.locate();
      },
      locationfound: (location) => {
        console.log('Location of cursor:', location)
      },
    });
    return null;
  }
  return (
    <>
      <MapContainer
        center={position}
        zoom={zoom}
        dragging={true}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ClickHandler />
      </MapContainer>
    </>
  );
}

export default Map;
