import React from "react";
import ClimateMap from "../ClimateMap";

/**
 * RainfallMap - Full-featured climate map for rainfall data
 * 
 * This component provides the complete rainfall mapping experience including:
 * - Dual loading for instant unit switching (IN/MM)
 * - Station data with interactive markers
 * - Isohyet lines with labels
 * - Uncertainty layer toggle
 * - Background prefetch optimization
 */
const RainfallMap: React.FC = () => {
  // Use the generic ClimateMap with default (full-featured) configuration
  return <ClimateMap />;
}

export default RainfallMap;
