"use client"

import Plot from 'react-plotly.js';
import React from "react";

export interface Props {
  name: string,
}

const PlotlyPlot: React.FC = (props: Props) => {
  const { name } = props;
  console.log("Plotly plot loaded, name is ", name);
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},
        },
        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
      ]}
      layout={ {width: 320, height: 240, title: 'Mean Monthly Rainfall'} }
    />
  );
}

export default PlotlyPlot;
