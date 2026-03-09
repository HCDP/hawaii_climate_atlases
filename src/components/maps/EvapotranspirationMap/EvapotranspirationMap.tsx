import React from "react";
import ClimateMap from "../ClimateMap";
import { ClimateMapConfig } from "../ClimateMap/ClimateMap";
import { useEvapComposite, useAETAllGrids } from "@/hooks/evaporation";
import { EvapColorLayer } from "./EvapColorLayer";

/**
 * Evapotranspiration Map Configuration
 * 
 * ET maps use:
 * - ET-specific station data (weather stations that measure ET)
 * - No isohyets (not applicable)
 * - Potential uncertainty layers (modeling uncertainty)
 * - Dual loading for different ET units
 * - Evapotranspiration data hooks (not rainfall)
 */
const EVAPOTRANSPIRATION_CONFIG: ClimateMapConfig = {
  enableStations: false,           // No station data for ET
  enableUncertaintyToggle: true,  // ET has modeling uncertainty
  enableDualLoading: true,        // Different units: mm/day vs inches/day
  enableHourSelection: true,      // ET supports hourly data
  enableVariableSelection: true,  // ET has multiple variables
  defaultShowStations: false,     // Start with grid view
  defaultShowOtherStations: false,
  defaultShowIsohyets: false,
  defaultShowUncertainty: false,
  mode: 'evap',
  // Use evap-specific color layer
  ColorLayerComponent: EvapColorLayer,
  // Evapotranspiration-specific data ranges
  dataRanges: {
    IN: [
      [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7],
      [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7],
      [0.0000254, 12.7], [0.0000254, 12.7], [0.0000254, 12.7],
    ],
    MM: [
      [-0.01, 0.1], [-0.07, 0.07], [-0.07, 0.07], [-0.07, 0.07], [-0.07, 0.07],
      [-0.07, 0.07], [-0.07, 0.07], [-0.07, 0.07], [-0.07, 0.07], [-0.07, 0.07],
      [-0.07, 0.07], [-0.07, 0.07], [-0.00002, 0.4],
    ],
  },
  // Use evapotranspiration data hooks instead of rainfall
  useComposite: useEvapComposite,
  useAllGrids: useAETAllGrids,
};

/**
 * EvapotranspirationMap - Interactive map for evapotranspiration data
 * 
 * This component provides ET visualization with:
 * - Grid-based ET values
 * - Unit switching (mm/day vs inches/day)
 * - Period selection (monthly/annual averages)  
 * - Weather station data overlay
 * - Uncertainty analysis capability
 */
const EvapotranspirationMap: React.FC = () => {
  return <ClimateMap config={EVAPOTRANSPIRATION_CONFIG} />;
};

export default EvapotranspirationMap;