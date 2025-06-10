"use client"

import RainfallMap from "@/components/maps/RainfallMap";
import useRequiredConditionsOfUse from "@/hooks/useRequiredConditionsOfUse";
//import dynamic from "next/dynamic";


/*const RainfallMap = dynamic(
  () => import("@/components/maps/RainfallMap"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>
  }
);*/


const ClientInteractiveMap = () => {
  useRequiredConditionsOfUse();

  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap />
  );
}


/*
const ClientInteractiveMap: React.FC<{
  rfStations: Station[],
  other_stations: Station[],
  isohyets: Isohyets,
  grids: Grids,
}> = ({ rfStations, other_stations, isohyets, grids }) => {
  // const [mapMaximized, setMapMaximized] = useState<boolean>(false);
  // const toggleMapMaximized = () => setMapMaximized(mapMaximized => !mapMaximized);

  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap
      startPosition={[20.750, -157.317]}
      startZoom={7.5}
      rfStations={rfStations}
      other_stations={other_stations}
      isohyets={isohyets}
      grids={grids}
    />
  );
}
*/

export default ClientInteractiveMap;
