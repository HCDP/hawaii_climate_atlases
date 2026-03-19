import { useAETGrids } from "./grids";
import { Units, Period, Month, Hour } from "@/lib";

/**
 * Composite hook that fetches all evapotranspiration-related data:
 * - ET stations
 * - Other stations
 * - Grid data for selected period
 * 
 * Note: No isohyets for ET data (not applicable)
 */
export function useEvapComposite(selectedUnits: Units, _selectedPeriod: Period, selectedMonth: Month = Month.Annual, selectedHour: Hour = Hour.HR_00) {
  // Convert Month enum value (e.g. "jan") to key name (e.g. "January") for the API URL
  const monthKeyName = Object.entries(Month).find(([_, value]) => value === selectedMonth)?.[0] ?? selectedMonth;

  const {
    asciiGrid,
    isLoading: gridsLoading,
  } = useAETGrids(selectedUnits, monthKeyName, selectedHour);
  
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
