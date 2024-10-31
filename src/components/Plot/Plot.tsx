"use client"

import Plot from 'react-plotly.js';
import React from 'react';
import { Station } from '@/components/Map';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export interface Props {
  station: Station | null,
  dataUnits: 'IN' | 'MM',
}

const PlotlyPlot: React.FC<Props> = (props) => {
  const { station, dataUnits  } = props;

  const stationData = station ? months.map(month =>
    station[`${month}Avg${dataUnits}`]
  ) : emptyData;

  console.log(stationData);
  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: months,
          y: stationData,
        },
      ]}
      layout={{
        title: {
          text: 'Mean Monthly Rainfall (in)',
          subtitle: {
            text: station ? 'Station: ' + station.Name : 'No station selected',
          }
        },
        yaxis: {
          rangemode: 'nonnegative',
        },
        autosize: true,
        margin: {
          l: 20,
          r: 20,
          t: 60,
          b: 20,
        },
      }}
      scrollZoom
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
