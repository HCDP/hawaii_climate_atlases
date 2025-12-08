"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const SolarRadiationMap = dynamic(
  () => import("@/components/maps/SolarMap"),
  { ssr: false }
);

export default function ClientInteractiveMap() {
  return <SolarRadiationMap />;
}
