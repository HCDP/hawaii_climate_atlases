"use client"

import Plot from 'react-plotly.js';
import React from "react";

export interface Props {
  title: string,
}

const PlotlyPlot: React.FC<Props> = (props) => {
  const { title  } = props;
  return (
    <Plot
      data={[
        {
          type: 'bar',
          xaxis: "asjidp",
          x: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          y: [2, 5, 3]
        },
      ]}
      layout={{
        autosize: true,
        title: title,
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
