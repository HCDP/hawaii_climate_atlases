import React from "react";
import { Station } from "@/components/Map";
import { promises as fs } from 'fs';
import ClientInteractiveMap from "@/app/interactive-map/ClientInteractiveMap";

async function loadData () {
  const file = await fs.readFile(process.cwd() + '/public/FinalStationData_Used_json.json', 'utf8');
  const stations: Station[] = JSON.parse(file);
  return stations;
}
// fetch the stations and passes it to the client-rendered ClientInteractiveMap
// this is because we want to use useState which can only be used in a client component
export default async function InteractiveMap() {
  const stations: Station[] = await loadData();
  return (
      <ClientInteractiveMap stations={stations} />
  );
}
