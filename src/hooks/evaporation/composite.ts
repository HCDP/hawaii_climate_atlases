import { useAETGrids } from "./grids";
import { Units, Period } from "@/lib";

/**
 * Composite hook that fetches all evapotranspiration-related data:
 * - ET stations
 * - Other stations
 * - Grid data for selected period
 * 
 * Note: No isohyets for ET data (not applicable)
 */
export function useEvapComposite(selectedUnits: Units, selectedPeriod: Period) {
  
  const {
    asciiGrid,
    isLoading: gridsLoading,
  } = useAETGrids(selectedUnits, Period[selectedPeriod]);
  
  const allDataLoaded =
    !!asciiGrid;
    
  const isLoading =
    gridsLoading;
    
  return {
    rfStations: undefined,          // No station data for ET
    otherStations: undefined,       // No station data for ET
    featureCollections: undefined,  // No isohyets for ET
    asciiGrid,
    allDataLoaded,
    isLoading,
  };
}
