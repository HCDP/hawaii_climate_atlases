import React, {useState} from "react";
import Map, { MapProps } from "../Map";
import {Station, Units} from "@/lib";
import SideBar from "@/components/SideBar";

type Props = Omit<MapProps, "setSelectedStation" | "setSelectedUnits">;

const RainfallMap: React.FC<Props> = (
  props: Props
) => {
  const [selectedStation, setSelectedStation] = useState<Station>();
  const [selectedUnits, setSelectedUnits] = useState<Units>("IN");

  return (
    <div className="flex w-full h-full max-h-full">
      <div className="min-w-[24rem]">
        <SideBar selectedStation={selectedStation} selectedUnits={selectedUnits}/>
      </div>
      <div className="w-full h-full bg-gray-200">
        <Map
          {...props}
          setSelectedStation={setSelectedStation}
          setSelectedUnits={setSelectedUnits}
        />
      </div>
    </div>
  );
}

export default RainfallMap;
