import { useEvapStations } from "./stations";
import { useEvapGrids } from "./grids";
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
    stations: rfStations,
    isLoading: rfStationsLoading,
  } = useEvapStations();
  
  const {
    stations: otherStations,
    isLoading: otherStationsLoading,
  } = useEvapStations("other");
  
  const {
    asciiGrid,
    isLoading: gridsLoading,
  } = useEvapGrids(selectedUnits, Period[selectedPeriod]);
  
  const allDataLoaded =
    !!rfStations &&
    !!otherStations &&
    !!asciiGrid;
    
  const isLoading =
    rfStationsLoading ||
    otherStationsLoading ||
    gridsLoading;
    
  return {
    rfStations,
    otherStations,
    featureCollections: undefined,  // No isohyets for ET
    asciiGrid,
    allDataLoaded,
    isLoading,
  };
}
