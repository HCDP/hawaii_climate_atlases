import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PlotProps } from "@/components/Plot";

export default function SideBar () {
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
      <Plot title="Mean Monthly Rainfall" />
    </>
  );
}
