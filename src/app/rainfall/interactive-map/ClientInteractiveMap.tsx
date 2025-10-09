"use client"

// import RainfallMap from "@/components/maps/RainfallMap";
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


const ClientInteractiveMap = () => {
  useRequiredConditionsOfUse();
  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap />
  );
}

export default ClientInteractiveMap;
