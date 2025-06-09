"use client"

import Plot from 'react-plotly.js';
import React from 'react';
import { Units } from "@/lib";

const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export interface Props {
  stationName: string,
  xdata: string[],
  ydata: number[],
  units: Units,
}

const PlotlyPlot: React.FC<Props> = (
  {
    stationName,
    xdata,
    ydata,
    units
  }: Props
) => {
  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: xdata,
          y: ydata || emptyData,
        },
      ]}
      layout={{
        title: {
          text: 'Mean Monthly Rainfall (' + units.toLocaleLowerCase() + ')',
        },
        annotations: [
          {
            xref: "paper",
            yref: "paper",
            x: 0.5,
            y: 1.025,
            text: stationName ? 'Station: ' + stationName : 'No station selected',
            showarrow: false,
            font: {
              size: 14,
              color: "gray",
            },
          },
        ],
        yaxis: {
          rangemode: 'nonnegative',
        },
        autosize: true,
        margin: {
          l: 30,
          r: 30,
          t: 30,
          b: 30,
        },
      }}
      useResizeHandler
      config={{
        editable: false,
        displayModeBar: false,
        responsive: true,
      }}
      className="w-full h-full"
    />
  );
}

export default PlotlyPlot;
