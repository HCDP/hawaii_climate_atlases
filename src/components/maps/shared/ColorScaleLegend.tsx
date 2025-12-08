import React from 'react';
import chroma from 'chroma-js';

interface ColorScaleLegendProps {
  min: number;
  max: number;
  unit: string;
  label: string;
  colorScheme?: string[];
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

/**
 * A simple color scale legend component that displays a gradient bar with min/max values
 */
export const ColorScaleLegend: React.FC<ColorScaleLegendProps> = ({
  min,
  max,
  unit,
  label,
  colorScheme = ['red', 'yellow', 'green', 'blue', 'purple', 'indigo'],
  position = 'bottom-right',
}) => {
  // Generate gradient colors for the legend
  const gradientColors = React.useMemo(() => {
    const scale = chroma.scale(colorScheme);
    const steps = 20;
    return Array.from({ length: steps }, (_, i) => {
      const color = scale(i / (steps - 1));
      return color.hex();
    });
  }, [colorScheme]);

  const gradientString = `linear-gradient(to right, ${gradientColors.join(', ')})`;

  const positionStyles = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
  };

  return (
    <div 
      className={`absolute ${positionStyles[position]} z-[1000] bg-white rounded-lg shadow-lg p-3 min-w-[200px]`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="text-sm font-semibold mb-2 text-gray-800">{label}</div>
      <div 
        className="h-4 rounded mb-1"
        style={{ background: gradientString }}
      />
      <div className="flex justify-between text-xs text-gray-600">
        <span>{min.toFixed(1)} {unit}</span>
        <span>{max.toFixed(1)} {unit}</span>
      </div>
    </div>
  );
};

export default ColorScaleLegend;
