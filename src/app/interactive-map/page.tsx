import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Station, MapProps } from "@/components/Map";
import { promises as fs } from 'fs';
import SideBar from "@/components/SideBar";

async function loadData () {
  const file = await fs.readFile(process.cwd() + '/public/FinalStationData_Used_json.json', 'utf8');
  const stations: Station[] = JSON.parse(file);
  return stations;
}

export default async function InteractiveMap() {
  const Map = useMemo(
    () => dynamic<Partial<MapProps>>(
      () => import('@/components/Map'),
      {
        loading: () => (
          <p className="text-center">
            Loading map
          </p>
        ),
        ssr: false,
      }
  ), []);
  await useMemo(() => {
    loadData().then((stations) => {
      console.log(stations);
    });
  }, []);

  return (
      <div className="flex">
        <div className="min-w-[24rem]">
          <SideBar />
        </div>
        <div className="min-w-full w-full" style={{ width: "100%", height: "800px" }}>
          <Map
            position={[21.297, -157.817]}
            zoom={7.2}
          />
        </div>
      </div>
  );
}
