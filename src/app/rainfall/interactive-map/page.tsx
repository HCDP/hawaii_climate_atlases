import React from "react";
import {
  Station,
  Isohyets,
  Grids,
  getStations,
  getOtherStations,
  getIsohyets,
  getGrids
} from "@/lib";
import ClientInteractiveMap from "./ClientInteractiveMap";

// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {
  const rfStations: Station[] = await getStations();
  const otherStations: Station[] = await getOtherStations();
  const isohyets: Isohyets = await getIsohyets();
  const asciiGrids: Grids = await getGrids();
  return (
    <ClientInteractiveMap rfStations={rfStations} otherStations={otherStations} isohyets={isohyets} grids={asciiGrids} />
  );
}
