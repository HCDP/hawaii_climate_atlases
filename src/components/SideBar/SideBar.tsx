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
      <Plot station={selectedStation || null} />
    </>
  );
}

export default SideBar;
