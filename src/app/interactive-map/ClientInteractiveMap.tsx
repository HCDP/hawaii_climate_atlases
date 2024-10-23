"use client"

import React, {useMemo, useState} from "react";
import { MapProps, Station } from '@/components/Map';
import SideBar from "@/components/SideBar";
import dynamic from "next/dynamic";

interface Props {
  stations: Station[],
}

const ClientInteractiveMap: React.FC<Props> = (props: Props) => {
  const { stations } = props;
  const [selectedStation, setSelectedStation] = useState<Station>(null);
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
    <div className="flex">
      <div className="min-w-[24rem]">
        <SideBar />
      </div>
      <div className="w-full h-[800px]">
        <Map
          position={[21.297, -157.817]}
          zoom={7.2}
          stations={stations}
        />
      </div>
    </div>
  );
}

export default ClientInteractiveMap;
