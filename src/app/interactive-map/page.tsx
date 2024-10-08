import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import {useMemo} from "react";
import dynamic from "next/dynamic";

export default function InteractiveMap() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map/Map'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), []);

  return (
      <div className="flex justify-center">
        This is the interactive map
        <div>
          <Map />
        </div>
        {/*<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>*/}
        {/*  <TileLayer*/}
        {/*    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
        {/*    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
        {/*  />*/}
        {/*  <Marker position={[51.505, -0.09]}>*/}
        {/*    <Popup>*/}
        {/*      A pretty CSS3 popup. <br /> Easily customizable.*/}
        {/*    </Popup>*/}
        {/*  </Marker>*/}
        {/*</MapContainer>*/}
      </div>
  );
}
