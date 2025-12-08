import { useMemo } from "react";
import { Units, Period, AsciiGrid } from "@/lib";
import { useEvapotranspirationGrids } from "./grids";

export function useEvapotranspirationComposite(
  type: string,
  units: Units,
  period: Period
) {
  const unitsString = units === Units.IN ? 'in' : 'mm';
  
  const { 
    asciiGrid, 
    isLoading: gridsLoading, 
    error: gridsError 
  } = useEvapotranspirationGrids(type, unitsString, Period[period]);

  const allDataLoaded = useMemo(
    () => !gridsLoading && !!asciiGrid,
    [gridsLoading, asciiGrid]
  );

  return {
    asciiGrid,
    allDataLoaded,
    isLoading: gridsLoading,
    error: gridsError,
    // Empty arrays for compatibility with ClimateMap interface
    rfStations: [],
    otherStations: [],
    featureCollections: [],
  };
}
