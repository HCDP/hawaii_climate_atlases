"use client"

import Plot from 'react-plotly.js';
import React from 'react';
import { Units } from "@/lib";
import { LatLng } from 'leaflet';

const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export interface Props {
  stationName: string,
  xdata: string[],
  stationData: number[],
  gridData: number[],
  units: Units,
  location: LatLng | null,
}

const PlotlyPlot: React.FC<Props> = (
  {
    stationName,
    xdata,
    stationData,
    gridData,
    units,
    location
  }: Props
) => {
  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: xdata,
          y: stationData || emptyData,
          name: `Station: ${stationName}`,
          showlegend: true
        },
        {
          type: 'bar',
          x: xdata,
          y: gridData || emptyData,
          name: `Map: ${location?.lat.toFixed(4)}, ${location?.lng.toFixed(4)}`,
          showlegend: true
        },
      ]}
      layout={{
        title: {
          text: 'Mean Monthly Rainfall (' + units.toLocaleLowerCase() + ')',
        },
        legend: {
          x: 0.5,
          y: -0.2,
          xanchor: 'center',
          yanchor: 'top', 
          orientation: 'h',
        },
        annotations: [
          {
            xref: "paper",
            yref: "paper",
            x: 0.5,
            y: 1.15,
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
          t: 80,
          b: 30,
        },
      }}
      useResizeHandler
      config={{
        editable: false,
        displayModeBar: false,
        responsive: true,
        scrollZoom: false,
      }}
      className="w-full h-full"
    />
  );
}

export default PlotlyPlot;
