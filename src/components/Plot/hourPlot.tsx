"use client"

import Plot from 'react-plotly.js';
import React, { useMemo } from 'react';

type HistogramProps = {
    data: number[];
    units: string;
    selectedVariable: string;
<<<<<<< HEAD
    hours?: string[];
    title?: string;
};

const allHours = Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, '0'));

export const HourPlot: React.FC<HistogramProps> = ({ data, units, selectedVariable, hours = allHours, title }) => {
=======
    title?: string;
};

const hours = Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, '0'));

export const HourPlot: React.FC<HistogramProps> = ({ data, units, selectedVariable, title }) => {
>>>>>>> 41ac3342763d5684dbbe569d0abdd195664577f3
    
    // Create a unique key based on data to force proper re-render
    const dataKey = useMemo(() => data.join(','), [data]);
    
    // Build histogram showing uncertainty values across all months
    return (
        <Plot
            key={dataKey}
            data={[
                {
                    type: 'bar',
                    x: hours,
                    y: data,
                    name: 'Data',
                    marker: {
                        color: 'rgba(255, 140, 0, 0.7)',
                    },
                    showlegend: false,
                },
            ]}
            layout={{
                title: {
                    text: title || `Annual ${selectedVariable} By Hour (${units})`,
                },
                yaxis: {
                    title: {
                        text: `${units}`,
                    },
                    rangemode: 'nonnegative',
                },
                xaxis: {
                    title: {
                        text: 'Hour',
                    },
                },
                autosize: true,
                margin: {
                    l: 50,
                    r: 30,
                    t: 60,
                    b: 50,
                },
            }}
            useResizeHandler
            config={{
                editable: false,
                displayModeBar: true,
                modeBarButtonsToRemove: [
                    'zoomIn2d', 
                    'zoomOut2d', 
                    'zoom2d',
                    'autoScale2d', 
                    'select2d', 
                    'lasso2d', 
                    'pan2d', 
                    'resetScale2d',
                ],
                responsive: true,
                displaylogo: false,
            }}
            className="w-full h-full"
        />
    );
}
