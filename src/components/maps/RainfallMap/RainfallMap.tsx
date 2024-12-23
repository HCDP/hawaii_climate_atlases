import React, {useState} from "react";
import Map, { MapProps } from "../Map";
import {Station, Units} from "@/lib";
import SideBar from "@/components/SideBar";

type Props = Omit<MapProps, "setSelectedStation" | "selectedUnits" | "setSelectedUnits">;

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
      <div className="w-full h-full">
        <Map
          {...props}
          setSelectedStation={setSelectedStation}
          selectedUnits={selectedUnits}
          setSelectedUnits={setSelectedUnits}
        />
      </div>
      <svg width="25" height="25">
        <defs></defs>
        <path fill="rgb(90, 180, 0)" fill-opacity="0.85" stroke="none" stroke-opacity="0" stroke-width="1"
              stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4"
              path="M -2.02,2.02 L -2.02,-2.02 L 2.02,-2.02 L 2.02,2.02 L -2.02,2.02 E"
              d="M-2.02 2.02L-2.02-2.02L 2.02-2.02L 2.02 2.02L-2.02 2.02" fill-rule="evenodd"
              transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,12.50000000,12.50000000)"></path>
      </svg>
    </div>
  );
}

export default RainfallMap;
