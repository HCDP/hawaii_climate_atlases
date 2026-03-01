import React from "react";
import ClimateMap from "../ClimateMap";
import { useEvapComposite, useEvapAllGrids } from "@/hooks/evaporation";

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
const EVAPOTRANSPIRATION_CONFIG = {
  enableStations: true,            // Some weather stations measure ET
  enableIsohyets: false,          // No isohyets for ET data
  enableUncertaintyToggle: true,  // ET has modeling uncertainty
  enableDualLoading: true,        // Different units: mm/day vs inches/day
  defaultShowStations: false,     // Start with grid view
  defaultShowOtherStations: false,
  defaultShowIsohyets: false,
  defaultShowUncertainty: false,
  // Use evapotranspiration data hooks instead of rainfall
  useComposite: useEvapComposite,
  useAllGrids: useEvapAllGrids,
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