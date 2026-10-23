import { useRainfallUncertaintyGrids } from "./grids";
import { Units, Period } from "@/lib";

/**
 * Composite hook that fetches rainfall uncertainty data for selected period
 */
export function useRainfallUncertaintyComposite(selectedUnits: Units, selectedPeriod: Period) {
  const {
    asciiGrid,
    isLoading: gridsLoading,
  } = useRainfallUncertaintyGrids(selectedUnits, Period[selectedPeriod]);
  
  const allDataLoaded = !!asciiGrid;
  const isLoading = gridsLoading;
  
  return {
    asciiGrid,
    allDataLoaded,
    isLoading,
  };
}
