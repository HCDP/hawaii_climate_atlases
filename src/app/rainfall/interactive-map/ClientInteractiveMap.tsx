"use client"

import React, { useEffect, useState } from "react";
import { 
  Grids, 
  Isohyets, 
  Station,
  getStations,
  getOtherStations,
  getIsohyets,
  getGrids 
} from '@/lib';
import RainfallMap from "@/components/maps/RainfallMap";
//import dynamic from "next/dynamic";


/*const RainfallMap = dynamic(
  () => import("@/components/maps/RainfallMap"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>
  }
);*/


const ClientInteractiveMap = () => {
  const [rfStations, setRfStations] = useState<Station[] | null>(null);
  const [otherStations, setOtherStations] = useState<Station[] | null>(null);
  const [isohyets, setIsohyets] = useState<Isohyets | null>(null);
  const [grids, setGrids] = useState<Grids | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      const [rfStations, otherStations, isohyets, grids] = await Promise.all([
        getStations(),
        getOtherStations(),
        getIsohyets(),
        getGrids(),
      ]);
      setRfStations(rfStations);
      setOtherStations(otherStations);
      setIsohyets(isohyets);
      setGrids(grids);
    };

    fetchData();
  }, []);

  if(!rfStations && !otherStations && !isohyets && !grids) {
    return (
      <p className="text-center">Loading map...</p>
    );
  }

  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap
      startPosition={[20.750, -157.317]}
      startZoom={7.5}
      rfStations={rfStations}
      otherStations={otherStations}
      isohyets={isohyets}
      grids={grids}
    />
  );
}


/*
const ClientInteractiveMap: React.FC<{
  rfStations: Station[],
  otherStations: Station[],
  isohyets: Isohyets,
  grids: Grids,
}> = ({ rfStations, otherStations, isohyets, grids }) => {
  // const [mapMaximized, setMapMaximized] = useState<boolean>(false);
  // const toggleMapMaximized = () => setMapMaximized(mapMaximized => !mapMaximized);

  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap
      startPosition={[20.750, -157.317]}
      startZoom={7.5}
      rfStations={rfStations}
      otherStations={otherStations}
      isohyets={isohyets}
      grids={grids}
    />
  );
}
*/

export default ClientInteractiveMap;
