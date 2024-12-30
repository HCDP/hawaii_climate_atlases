"use client"

import React, { useContext } from "react";
import { Station } from '@/lib';
import dynamic from "next/dynamic";
import {LayoutContext} from "@/components/LayoutControlContext";

const RainfallMap = dynamic(
  () => import("@/components/maps/RainfallMap"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>
  }
);

const ClientInteractiveMap: React.FC<{
  stations: Station[],
}> = ({ stations }) => {
  // const [mapMaximized, setMapMaximized] = useState<boolean>(false);
  // const toggleMapMaximized = () => setMapMaximized(mapMaximized => !mapMaximized);

  const { maximized, setMaximized } = useContext(LayoutContext);
  const toggleMapMaximized = () => setMaximized(oldMax => !oldMax);

  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap
      position={[20.750, -157.317]}
      zoom={7.75}
      stations={stations}
      mapMaximized={maximized}
      toggleMapMaximized={toggleMapMaximized}
    />
  );
}

export default ClientInteractiveMap;
