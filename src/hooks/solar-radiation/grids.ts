import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { AsciiGrid, Period } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = (url: string): Promise<AsciiGrid> => 
  fetch(url).then(res => res.json());

type SolarRadiationType = 'radiation' | 'diffuse' | 'longwave-down' | 'longwave-up' | 'net-radiation';

/**
 * Generic hook to fetch any solar radiation type
 */
function useSolarData(type: SolarRadiationType, period: Period) {
  const { data, isLoading, error } = useSWRImmutable<AsciiGrid, Error>(    
    `/api/solar/${type}/${period}`, 
    fetcher
  );
  return {
    asciiGrid: data,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch solar radiation grids
 */
export function useSolarRadiationGrids(period: Period) {
  return useSolarData('radiation', period);
}

/**
 * Hook to fetch diffuse radiation grids
 */
export function useDiffuseRadiationGrids(period: Period) {
  return useSolarData('diffuse', period);
}

/**
 * Hook to fetch longwave down radiation grids
 */
export function useLongwaveDownGrids(period: Period) {
  return useSolarData('longwave-down', period);
}

/**
 * Hook to fetch longwave up radiation grids
 */
export function useLongwaveUpGrids(period: Period) {
  return useSolarData('longwave-up', period);
}

/**
 * Hook to fetch net radiation grids
 */
export function useNetRadiationGrids(period: Period) {
  return useSolarData('net-radiation', period);
}

/**
 * Hook to fetch all solar radiation grids for all periods (Jan-Dec + Annual)
 */
export function useSolarRadiationAllGrids() {
  type GridFetchResult = { 
    asciiGrid: AsciiGrid | undefined;
    isLoading: boolean;
    error: Error | undefined;
  };

  const results: GridFetchResult[] = [];
  for (let i = 0; i <= 12; i++) {
    results.push(useSolarRadiationGrids(i as Period));
  }

  const asciiGrids = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);
  
  return {
    asciiGrids,
    gridsAreLoading: Object.values(results).some(r => r.isLoading),
  };
}