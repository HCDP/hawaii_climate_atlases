"use client"

import { ConditionsOfUseProvider } from "@/components/ConditionsOfUse";
import useRequiredConditionsOfUse from "@/hooks/useRequiredConditionsOfUse";
import dynamic from "next/dynamic";
import { GridLoader } from "react-spinners";


const RainfallMap = dynamic(
  () => import("@/components/maps/RainfallMap"),
  {
    ssr: false,
    loading: () => {
      return <div style={{padding: "20px"}} className="text-center">
        <p style={{padding: "10px"}}>Loading Map</p>
        <GridLoader/>
      </div>
    }
  }
);

const MapContent = () => {
  useRequiredConditionsOfUse();
  return (
    <>
      {/* UH Manoa coordinates: 21.297, -157.817 */}
      <RainfallMap />
    </>
  );
}

const ClientInteractiveMap = () => {
  return (
    <ConditionsOfUseProvider>
      <MapContent />
    </ConditionsOfUseProvider>
  );
}

export default ClientInteractiveMap;