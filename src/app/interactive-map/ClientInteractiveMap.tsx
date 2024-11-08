"use client"

import React, { useState } from "react";
import { Station } from '@/components/maps/Map';
import SideBar from "@/components/SideBar";
import RainfallMap from "@/components/maps/RainfallMap";

const ClientInteractiveMap: React.FC<{
  stations: Station[],
}> = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState<Station>(null);
  const [selectedUnits, setSelectedUnits] = useState<"IN" | "MM">("IN");

  return (
    <div className="flex font-sans">
      <div className="min-w-[24rem] max-h-screen">
        <SideBar selectedStation={selectedStation} selectedUnits={selectedUnits} />
      </div>
      <div className="w-full h-full max-h-screen bg-gray-200">
        <div className="w-full h-full flex justify-center">
          <div className="mt-24 w-[1366px] h-[768px]">
            <RainfallMap
              position={[21.297, -157.817]}
              zoom={7}
              stations={stations}
              setSelectedStation={setSelectedStation}
              setSelectedUnits={setSelectedUnits}
            />
          </div>
        </div>
        <div className="min-h-24 p-4">Units</div>
      </div>
    </div>
  );
}

export default ClientInteractiveMap;
