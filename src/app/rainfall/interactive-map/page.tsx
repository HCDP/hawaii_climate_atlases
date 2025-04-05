import React from "react";
import { getIsohyets, Isohyets, Station, AsciiGrids, getStations, getOtherStations, getInchesAsciiGrids } from "@/lib";
import ClientInteractiveMap from "./ClientInteractiveMap";

// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {
  //const test: AsciiGrids = await getInchesAsciiGrids();
  const rfStations: Station[] = await getStations();
  const otherStations: Station[] = await getOtherStations();
  const isohyets: Isohyets = await getIsohyets();

  // const fetchedStations = await fetchRainfallData(
  //   "new", // "new" or "legacy"
  //   "month", // "month" or "day"
  //   "statewide", // "statewide", "bi", "ka", "mn", "oa"
  //   "partial", // "raw" or "partial"
  //   "station_data", // "data_map", "se", "anom", "anom_se", "metadata", "station_data"
  //   "1990", // 4-digit year, e.g., "2022
  //   "csv",
  // );

  // const fetchedMetaData = await fetchRainfallData();

  return (
    <ClientInteractiveMap rfStations={rfStations} otherStations={otherStations} isohyets={isohyets} />
  );
}
