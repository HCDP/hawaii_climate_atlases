import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { AsciiGrid, Units, Period } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = (url: string): Promise<AsciiGrid> => 
  fetch(url).then(res => res.json());

/**
 * Hook to fetch a single rainfall grid for a specific unit and period
 */
export function useRainfallGrids(units: string, period: string): {
  asciiGrid: AsciiGrid | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  const { data, isLoading, error } = useSWRImmutable<AsciiGrid, Error>(
    `/api/grids/${units}/${period}`, 
    fetcher
  );
  return {
    asciiGrid: data,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch all rainfall grids for all periods (Jan-Dec + Annual)
 */
export function useRainfallAllGrids(selectedUnits: Units) {
  type GridFetchResult = { 
    asciiGrid: AsciiGrid | undefined;
    isLoading: boolean;
    error: Error | undefined;
  };

  const results: GridFetchResult[] = [];
  for (let i = 0; i <= 12; i++) {
    results.push(useRainfallGrids(selectedUnits, Period[i]));
  }

  const asciiGrids: AsciiGrid[] = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);
  
  return {
    asciiGrids,
    gridsAreLoading: Object.values(results).some(r => r.isLoading),
  };
}
