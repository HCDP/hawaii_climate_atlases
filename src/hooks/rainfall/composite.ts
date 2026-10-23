import { useRainfallStations } from "./stations";
import { useRainfallIsohyets } from "./isohyets";
import { useRainfallGrids } from "./grids";
import { Units, Period } from "@/lib";

/**
 * Composite hook that fetches all rainfall-related data:
 * - RF Atlas stations
 * - Other stations
 * - Isohyets
 * - Grid data for selected period
 */
export function useRainfallComposite(selectedUnits: Units, selectedPeriod: Period) {
  const {
    stations: rfStations,
    isLoading: rfStationsLoading,
  } = useRainfallStations();
  
  const {
    stations: otherStations,
    isLoading: otherStationsLoading,
  } = useRainfallStations("other");
  
  const {
    featureCollections,
    isLoading: isohyetsLoading,
  } = useRainfallIsohyets(selectedUnits);
  
  const {
    asciiGrid,
    isLoading: gridsLoading,
  } = useRainfallGrids(selectedUnits, Period[selectedPeriod]);
  
  const allDataLoaded =
    !!rfStations &&
    !!otherStations &&
    !!featureCollections &&
    !!asciiGrid;
    
  const isLoading =
    rfStationsLoading ||
    otherStationsLoading ||
    isohyetsLoading ||
    gridsLoading;
    
  return {
    rfStations,
    otherStations,
    featureCollections,
    asciiGrid,
    allDataLoaded,
    isLoading,
  };
}
