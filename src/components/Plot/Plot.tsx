"use client"

import Plot from 'react-plotly.js';
import React from "react";
import { Station } from '@/components/Map';

const emptyData = {

};

export interface Props {
  station: Station | null,
}

const PlotlyPlot: React.FC<Props> = (props) => {
  const { station  } = props;
  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          y: [2, 5, 3,1,4,2,5,6,1,5,3,5]
        },
      ]}
      layout={{
        autosize: true,
        margin: {
          l: 20,
          r: 20,
          t: 60,
        },
        title: {
          text: "Mean Monthly Rainfall (in)",
          subtitle: {
            text: station ? "Station: " + station.Name : "No station selected",
          }
        },

      }}
      scrollZoom
      useResizeHandler
      config={{
        editable: false,
        displayModeBar: false,
        responsive: true,
      }}
      className="w-full h-72"
    />
  );
}

export default PlotlyPlot;
