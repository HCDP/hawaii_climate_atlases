import React from "react";
import ClientInteractiveMap from "./ClientInteractiveMap";

// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {
  /*
  const rfStations: Station[] = await getStations();
  const other_stations: Station[] = await getOtherStations();
  const isohyets: Isohyets = await getIsohyets();
  const asciiGrids: Grids = await getGrids();
  return (
    <ClientInteractiveMap rfStations={rfStations} other_stations={other_stations} isohyets={isohyets} grids={asciiGrids} />
  );
  */
  return (
    <ClientInteractiveMap />
  );
}
