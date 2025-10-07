"use client"

// import RainfallMap from "@/components/maps/RainfallMap";

import dynamic from "next/dynamic";



const RainfallMap = dynamic(
  () => import("@/components/maps/RainfallMap"),
  {
    ssr: false,
    loading: () => <p className="text-center">Loading map...</p>
  }
);


const ClientInteractiveMap = () => {
  return (
    // UH Manoa coordinates: 21.297, -157.817
    <RainfallMap />
  );
}

export default ClientInteractiveMap;
