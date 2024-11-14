"use client"

import React, { useRef, useState } from 'react';
import {MapContainer, TileLayer, useMapEvents, ZoomControl} from "react-leaflet";
import { LatLng, Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { StationIcon } from "@/components/maps/Map/index";
import FitScreenOutlined from "@mui/icons-material/FitScreenOutlined";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export interface Station {
  SKN: number,
  Name: string,
  Lat_DD: number,
  Lon_DD: number,
  Observer: string,
  MinYear: number,
  MaxYear: number,
  JanAvgIN: number,
  FebAvgIN: number,
  MarAvgIN: number,
  AprAvgIN: number,
  MayAvgIN: number,
  JunAvgIN: number,
  JulAvgIN: number,
  AugAvgIN: number,
  SepAvgIN: number,
  OctAvgIN: number,
  NovAvgIN: number,
  DecAvgIN: number,
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

const Map: React.FC<Props> = (
  {
    position = [21.344875, -157.908248],
    zoom = 7,
    stations = [],
    setSelectedStation
  }: Props
) => {
  const [mp, setMp] = useState<Map>(null);
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
  const displayMap = (
    <MapContainer
      center={position}
      zoom={zoom}
      dragging={true}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full z-10 focus:outline-none"
      ref={setMp}
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
      <ZoomControl position="bottomleft" />
      <ZoomendHandler />
    </MapContainer>
  );

  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full z-20">
        {mp && (
          <div className="flex justify-between m-4">
            <form onSubmit={e => handleLocationChange(e, mp)}>
              <Input
                name="locationInput"
                color="default"
                radius="sm"
                placeholder="Location: Latitude, Longitude (degrees)"
                className="shadow-md rounded-lg"
                style={{ width: "20rem" }}
              />
            </form>
            <div className="rounded-full shadow-md">
              <Button
                onPress={() => mp.getContainer().focus()}
                radius="full"
                size="lg"
                isIconOnly
                title="Fit to screen"
                className="bg-white shadow-md"
              >
                <FitScreenOutlined />
              </Button>
            </div>
          </div>
        )}
      </div>
      {displayMap}
    </div>
  );
}

export default Map;
