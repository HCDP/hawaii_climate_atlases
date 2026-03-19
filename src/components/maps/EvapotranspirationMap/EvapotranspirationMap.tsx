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
  enableEvap: true,               // ET supports hourly data and variable selection
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
      [0.0003937454, 6.874778], [0.0002190502, 7.314825], [0.0003937571, 8.97647], [0.0003937601, 9.598801], [0.0003937646, 10.41035],
      [0.0003937656, 10.53799], [0.000393768, 10.49136], [0.0003937681, 10.45319], [0.000393764, 10.08205], [0.0001922575, 8.467991],
      [0.0003937464, 6.84592], [0.0003937433, 6.41634], [0.004721604, 106.4701],
    ],
    MM: [
      [0.01000113, 174.6194], [0.005563876, 185.7965], [0.01000143, 228.0023], [0.01000151, 243.8095], [0.01000162, 264.4229],
      [0.01000165, 267.6649], [0.01000171, 266.4807], [0.01000171, 265.511], [0.01000161, 256.084], [0.00488334, 215.087],
      [0.01000116, 173.8864], [0.01000108, 162.975], [0.1199287, 2300], 
    ],
  },
  // Use evapotranspiration data hooks instead of rainfall
  useComposite: useEvapComposite,
  useAllGrids: useAETAllGrids,
  // Evap maps don't use the rainfall uncertainty endpoints — provide no-op hooks
  useUncertaintyComposite: (units, period) => ({ asciiGrid: undefined, allDataLoaded: true, isLoading: false }),
  useUncertaintyAllGrids: (units) => ({ asciiGrids: [], gridsAreLoading: false }),
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