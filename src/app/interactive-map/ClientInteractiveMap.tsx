"use client"

import React, { useState } from "react";
import { Station } from '@/lib';
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";

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
  const [mapMaximized, setMapMaximized] = useState<boolean>(false);
  const toggleMapMaximized = () => setMapMaximized(mapMaximized => !mapMaximized);

  return (
    <div className="flex flex-col h-screen min-h-screen">
      {!mapMaximized && (
        <NavBar
          navLinks={[
            {text: 'Home', path: '/'},
            {text: 'Interactive Map', path: '/interactive-map'},
            {text: 'Downloads', path: '/downloads'},
            {text: 'How to cite', path: '/how-to-cite'},
            {text: 'History', path: '/history'},
            {text: 'Methods', path: '/methods'},
            {text: 'Rainfall', path: '/rainfall'},
            {text: 'Acknowledgements', path: '/acknowledgements'},
            {text: 'People', path: '/people'},
          ]}
          img="rainfall"
        />
      )}
      <main className="flex-grow overflow-y-hidden max-w-screen h-full">
        <RainfallMap
          position={[21.297, -157.817]}
          zoom={7}
          stations={stations}
          mapMaximized={mapMaximized}
          toggleMapMaximized={toggleMapMaximized}
        />
      </main>
      {!mapMaximized && (
        <footer className="flex justify-center bg-[#708090] text-white font-bold">
          Footer
        </footer>
      )}
    </div>
  );
}

export default ClientInteractiveMap;
