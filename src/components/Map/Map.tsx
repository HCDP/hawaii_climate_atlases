"use client"

import React, {useState} from 'react'
import { MapContainer, Marker, TileLayer, Popup, Tooltip, useMapEvents } from "react-leaflet"
import { LatLngExpression, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface Props {
  position: number[],
  zoom: number,
}

const Map: React.FC<Props> = (props: Props) => {
  const {
    position = [21.344875, -157.908248],
    zoom = 50,
  } = props;
  const [currentPos, setCurrentPos] = useState(new LatLng(0, 0));
  const ClickComponent = () => {
    const map = useMapEvents({
      click(e) {
        setCurrentPos(e.latlng);
        map.locate();
      },
      locationfound: (location) => {
        console.log('location found:', location)
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
        <ClickComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/*<div>{currentPos.toString()}</div>*/}
    </>
  );
}

export default Map;
