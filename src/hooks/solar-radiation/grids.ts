import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { AsciiGrid, Units, Period } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = (url: string): Promise<AsciiGrid> => 
  fetch(url).then(res => res.json());

/**
 * Hook to fetch a single solar radiation grid for a specific unit and period
 */
export function useSolarRadiationGrids(units: string, period: string) {
  // : {
  // asciiGrid: AsciiGrid | undefined;
  // isLoading: boolean;
  // error: Error | undefined; } {
  const { data, isLoading, error } = useSWRImmutable<AsciiGrid, Error>(    
    `/api/solar-radiation-grids/\${units}/\${period}`, 
    fetcher
  );
  return {
    asciiGrid: data,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch all solar radiation grids for all periods (Jan-Dec + Annual)
 */
export function useSolarRadiationAllGrids(selectedUnits: Units) {
  type GridFetchResult = { 
    asciiGrid: AsciiGrid | undefined;
    isLoading: boolean;
    error: Error | undefined;
  };

  const results: GridFetchResult[] = [];
  for (let i = 0; i <= 12; i++) {
    results.push(useSolarRadiationGrids(selectedUnits, Period[i]));
  }

  const asciiGrids = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);
  
  return {
    asciiGrids,
    gridsAreLoading: Object.values(results).some(r => r.isLoading),
  };
}