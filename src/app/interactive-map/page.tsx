import React from "react";
import { Station } from "@/components/maps/Map";
import dynamic from "next/dynamic";
import { getDefaultData, fetchStations } from "@/lib";

// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {
  const stations: Station[] = await getDefaultData();

  let fetchedStations;
  if (!process.env.HCDP_API_KEY) {
    console.log("No api key, loading default data.");
    fetchedStations = await getDefaultData();
  } else {
    console.log("Fetching stations");
    fetchedStations = await fetchStations();
  }

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
      <ClientInteractiveMap stations={stations} testStations={fetchedStations} />
  );
}
