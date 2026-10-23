import React from "react";
import ClimateMap from "../ClimateMap";

/**
 * Solar Radiation Map Configuration
 * 
 * Solar radiation maps typically don't need:
 * - Station data (limited solar monitoring stations)
 * - Isohyet lines (not applicable to solar data)  
 * - Uncertainty layers (different uncertainty modeling)
 * - Dual loading (can be simpler since no rainfall conversion patterns)
 */
const SOLAR_CONFIG = {
  enableStations: false,           // Solar stations are rare
  enableIsohyets: false,          // No isohyets for solar data
  enableUncertaintyToggle: false, // Different uncertainty approach needed
  enableDualLoading: false,       // Simpler loading for solar data
  defaultShowStations: false,
  defaultShowOtherStations: false,
  defaultShowIsohyets: false,
  defaultShowUncertainty: false,
};

/**
 * SolarRadiationMap - Interactive map for solar radiation data
 * 
 * This component provides solar radiation visualization with:
 * - Grid-based solar radiation values
 * - Unit switching (W/m² vs kWh/m²/day)
 * - Period selection (monthly/annual averages)
 * - Click-to-query functionality
 * - Optimized for solar-specific use cases
 */
const SolarRadiationMap: React.FC = () => {
  return <ClimateMap config={SOLAR_CONFIG} />;
};

export default SolarRadiationMap;