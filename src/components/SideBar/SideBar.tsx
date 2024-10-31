import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PlotProps } from '@/components/Plot';
import { Station } from '@/components/Map';

const SideBar: React.FC<{
  selectedStation: Station,
}> = ({ selectedStation }) => {
  const Plot = useMemo(
    () => dynamic<Partial<PlotProps>>(
      () => import('../Plot'),
      {
        loading: () => (
          <p>
            Loading Plotly
          </p>
        ),
        ssr: false,
      },
    ), []);
  return (
    <>
      <div className="h-[300px]">
        <Plot
          station={selectedStation || null}
          dataUnits="IN"
        />
      </div>
      <div className="overflow-y-auto max-h-[500px] ml-5">
        <div className="text-center">Rainfall Data</div>
        <div className="text-center">Station Information</div>
        <div className="text-center">Legend</div>
      </div>
    </>
  );
}

export default SideBar;
