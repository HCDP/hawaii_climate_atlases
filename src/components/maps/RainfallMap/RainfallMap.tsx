import React, { useState } from "react";
import Map, { MapProps } from "../Map";
import { Station, Units } from "@/lib";
import SideBar from "@/components/SideBar";

type Props = Pick<MapProps,
  "startPosition" |
  "startZoom" |
  "rfStations" |
  "otherStations" |
  "isohyets" |
  "mapMaximized" |
  "toggleMapMaximized"
>;

const RainfallMap: React.FC<Props> = (
  props: Props
) => {
  const [selectedStation, setSelectedStation] = useState<Station>();
  const [selectedUnits, setSelectedUnits] = useState<Units>("IN");
  const [showIsohyets, setShowIsohyets] = useState<boolean>(false);
  const [showRFStations, setShowRFStations] = useState<boolean>(true);
  const [showOtherStations, setShowOtherStations] = useState<boolean>(false);

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
          showRFStations={showRFStations}
          setShowRFStations={setShowRFStations}
          showOtherStations={showOtherStations}
          setShowOtherStations={setShowOtherStations}
          setSelectedUnits={setSelectedUnits}
          showIsohyets={showIsohyets}
          setShowIsohyets={setShowIsohyets}
        />
      </div>
    </div>
  );
}

export default RainfallMap;
