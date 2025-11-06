"use client"

import Plot from 'react-plotly.js';
import React, { useMemo } from 'react';

type HistogramProps = {
    data: number[];
    units: string;
    title?: string;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const UncertaintyHistogram: React.FC<HistogramProps> = ({ data, units, title }) => {
    
    // Create a unique key based on data to force proper re-render
    const dataKey = useMemo(() => data.join(','), [data]);
    
    // Build histogram showing uncertainty values across all months
    return (
        <Plot
            key={dataKey}
            data={[
                {
                    type: 'bar',
                    x: months,
                    y: data,
                    name: 'Uncertainty',
                    marker: {
                        color: 'rgba(255, 140, 0, 0.7)',
                    },
                    showlegend: false,
                },
            ]}
            layout={{
                title: {
                    text: title || `Monthly Uncertainty (${units})`,
                },
                yaxis: {
                    title: {
                        text: `Uncertainty (${units})`,
                    },
                    rangemode: 'nonnegative',
                },
                xaxis: {
                    title: {
                        text: 'Month',
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
