"use client"

import React, { useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import StationIcon from "@/components/Map/StationIcon";

export interface Station {
  SKN: number,
  Name: string,
  Lat_DD: number,
  Lon_DD: number,
  Observer: string,
  MinYear: number,
  MaxYear: number,
  JanAvgIn: number,
  FebAvgIn: number,
  MarAvgIn: number,
  AprAvgIn: number,
  MayAvgIn: number,
  JunAvgIn: number,
  JulAvgIn: number,
  AugAvgIn: number,
  SepAvgIn: number,
  OctAvgIn: number,
  NovAvgIn: number,
  DecAvgIn: number,
  DataSources: string,
  StationStatus: 'Current' | 'Discontinued' | 'Virtual',
}

const parseLocation = (input: string): LatLng | null => {
  const [lat, lng] = input.split(",").map(s => parseFloat(s));
  if (lat && lng) {
    return new LatLng(lat, lng);
  } else {
    return null;
  }
}

const handleLocationChange = (e: React.SyntheticEvent, map: Map) => {
  e.preventDefault();
  const input: string = new FormData(e.target).get("locationInput") as string;
  const parsedLatLng = parseLocation(input);
  if (parsedLatLng !== null) {
    console.log(parsedLatLng);
    console.log(map.getCenter());
    map.setView(parsedLatLng);
  }
};

export interface Props {
  position: number[],
  zoom: number,
  stations: Station[],
  setSelectedStation: (station: Station) => void,
}

const Map: React.FC<Props> = (props) => {
  // default position and zoom values
  const {
    // coordinates of UH Manoa
    position = [21.344875, -157.908248],
    zoom = 7.2,
    stations = [],
    setSelectedStation,
  } = props;
  const [mp, setMap] = useState<Map>(null);
  const iconRefs = useRef([]);

  const ZoomendHandler = () => {
    const map = useMapEvents({
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

  // this useMemo might be useless because we're already memoizing the map in interactive-map/page.tsx
  const displayMap = useMemo(() => (
    <MapContainer
      center={position}
      zoom={zoom}
      dragging={true}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full z-10 focus:outline-none"
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
      <ZoomendHandler />
    </MapContainer>
  ), [stations]);

  return (
    <>
      <div className="absolute z-20 p-3">
        {mp && (
          <form onSubmit={e => handleLocationChange(e, mp)}>
            <label className="font-bold">
              Location: <input
                type="text"
                className="border-2 border-gray-500 pl-1 w-[20rem]"
                name="locationInput"
                placeholder="Degrees: Latitude, Longitude"
              />
            </label>
          </form>
        )}
      </div>
      {displayMap}
    </>
  );
}

export default Map;
