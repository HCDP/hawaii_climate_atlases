import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { MapProps } from "@/components/Map";

export default function InteractiveMap() {
  const Map = useMemo(
    () => dynamic<Partial<MapProps>>(
      () => import('@/components/Map'),
      {
        loading: () => (
          <p className="text-center">
            Loading map
          </p>
        ),
        ssr: false,
      }
  ), []);

  return (
      <div className="flex justify-center">
        <div className="min-w-full" style={{ width: "100%", height: "800px" }}>
          <Map
            position={[21.297, -157.817]}
            zoom={7.2}
          />
        </div>
      </div>
  );
}
