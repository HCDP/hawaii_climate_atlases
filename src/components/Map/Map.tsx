"use client"

import React, { useMemo, useState } from 'react';
import {MapContainer, TileLayer, useMapEvents, Polygon } from "react-leaflet";
import { LatLng, Map } from "leaflet";
import { Circle, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

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
    stations = null,
    setSelectedStation,
  } = props;
  const [mp, setMap] = useState<Map>(null);
  const ClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        console.log(map.getCenter());
      },
      locationfound: (location) => {
        console.log('Location of cursor:', location);
      },
    });
    return null;
  }
  const handleLocationChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const input: string = new FormData(e.target).get("locationInput") as string;
    const parsedLatLng = parseLocation(input);
    if (parsedLatLng !== null) {
      console.log(parsedLatLng);
      console.log(mp.getCenter());
      mp.setView(parsedLatLng);
    }
  };
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
      {/*<Marker position={position}>*/}
      {/*  <Popup>*/}
      {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
      {/*  </Popup>*/}
      {/*</Marker>*/}
      {/*<ClickHandler />*/}
      {stations && stations.map((station) => {
        const radius = 100;
        switch (station.StationStatus) {
          case "Current": return (
            <Rectangle
              bounds={[[station.Lat_DD - 0.001, station.Lon_DD - 0.001], [station.Lat_DD + 0.001, station.Lon_DD + 0.001]]}
              pathOptions={{ color: 'green' }}
              eventHandlers={{
                click: () => {
                  setSelectedStation(station);
                },
              }}
              key={station.SKN + ' ' + station.Name}
            />
          );
          case "Discontinued": return (
            <Circle
              center={[station.Lat_DD, station.Lon_DD]}
              radius={radius}
              pathOptions={{ color: 'red' }}
              key={station.SKN + ' ' + station.Name}
            />
          );

          case "Virtual": return (
            <Polygon
              positions={[
                [station.Lat_DD + 0.002, station.Lon_DD],
                [station.Lat_DD, station.Lon_DD + 0.002],
                [station.Lat_DD - 0.002, station.Lon_DD],
                [station.Lat_DD, station.Lon_DD - 0.002],
              ]}
              pathOptions={{ color: 'magenta' }}
              key={station.SKN + ' ' + station.Name}
            />
          );
        }
      })}
    </MapContainer>
  ), [stations]);
  return (
    <>
      <div className="absolute z-20 p-3">
        {mp && (
          <form onSubmit={handleLocationChange}>
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
