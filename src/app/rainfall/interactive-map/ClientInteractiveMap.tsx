"use client"

import React from "react";
import { Grids, Isohyets, Station } from '@/lib';
import dynamic from "next/dynamic";

const RainfallMap = dynamic(
  () => import("@/components/maps/RainfallMap"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>
  }
);

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

export default ClientInteractiveMap;
