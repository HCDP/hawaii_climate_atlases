import React from "react";
import ClimateMap from "../ClimateMap";
import { ClimateMapConfig } from "../ClimateMap/ClimateMap";
import { useEvapComposite, useAETAllGrids, useAETAllHourGrids } from "@/hooks/evaporation";
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
  // Use evapotranspiration data hooks instead of rainfall
  useEvapComposite: useEvapComposite,
  useAllGrids: useAETAllGrids,
  useEvapAllHourGrids: useAETAllHourGrids,
  // Evap maps don't use the rainfall uncertainty endpoints — provide no-op hooks
  useUncertaintyComposite: (units, period) => ({ asciiGrid: undefined, allDataLoaded: true, isLoading: false }),
  useUncertaintyAllGrids: (units) => ({ asciiGrids: [], gridsAreLoading: false }),
};

/**
 * EvapotranspirationMap - Interactive map for evapotranspiration data
 * 
 * This component provides ET visualization with:
 * - Grid-based ET values (as well as other variables like Transpiration, etc.)
 * - Unit switching (mm/day vs inches/day)    
    * - although sometimes only one unit is available for certain variables
    * - also there's another unit wm2 (w/m^2)
 * - Month selection (monthly/annual averages)
 * - Hourly data (00 = All to 24 = specific hour)  
 * - Weather station data overlay
 */
const EvapotranspirationMap: React.FC = () => {
  return <ClimateMap config={EVAPOTRANSPIRATION_CONFIG} />;
};

export default EvapotranspirationMap;