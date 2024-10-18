import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PlotProps } from "@/components/Plot";

export default function SideBar () {
  const Plot = useMemo(
    () => dynamic<Partial<PlotProps>>(
      () => import('../Plot'),
      {
        ssr: false,
        loading: () => (
          <p>
            Loading Plotly
          </p>),
      },
    ), []);
  return (
    <>
      <Plot />
    </>
  );
}
