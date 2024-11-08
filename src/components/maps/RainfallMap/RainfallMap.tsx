import React from "react";
import Map, { MapProps } from "../Map";

type RainfallMapProps = MapProps

const RainfallMap: React.FC<RainfallMapProps> = ({ position, zoom, stations, setSelectedStation }) => {
  return (
    <Map
      position={position}
      zoom={zoom}
      stations={stations}
      setSelectedStation={setSelectedStation}
    />
  );
}

export default RainfallMap;
