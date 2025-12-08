"use client"

import { ConditionsOfUseProvider } from "@/components/ConditionsOfUse";
import useRequiredConditionsOfUse from "@/hooks/useRequiredConditionsOfUse";
import dynamic from "next/dynamic";
import { GridLoader } from "react-spinners";


const EvapotranspirationMap = dynamic(
  () => import("@/components/maps/EvapotranspirationMap"),
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
      <EvapotranspirationMap />
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
