import React from "react";
import { Station } from "@/components/maps/Map";
import dynamic from "next/dynamic";
import { getDefaultData, fetchRainfallData, test } from "@/lib";

// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {
  const stations: Station[] = await getDefaultData();

  // const fetchedStations = await fetchRainfallData(
  //   "new", // "new" or "legacy"
  //   "month", // "month" or "day"
  //   "statewide", // "statewide", "bi", "ka", "mn", "oa"
  //   "partial", // "raw" or "partial"
  //   "station_data", // "data_map", "se", "anom", "anom_se", "metadata", "station_data"
  //   "1990", // 4-digit year, e.g., "2022
  //   "csv",
  // );

  const fetchedMetaData = await fetchRainfallData();

  const ClientInteractiveMap = dynamic<Partial<{ stations: Station[] }>>(
    () => import('./ClientInteractiveMap'),
    {
      loading: () => {
        return <p className="text-center">
          Loading map
        </p>
      },
      ssr: false,
    }
  );

  return (
      <ClientInteractiveMap stations={stations} />
  );
}
