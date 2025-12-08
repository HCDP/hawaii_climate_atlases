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
 * Note: Calls hooks at top level to comply with React Rules of Hooks
 */
export function useSolarRadiationAllGrids() {
  // Call all hooks at top level (React Rules of Hooks requirement)
  const jan = useSolarRadiationGrids(Period.January);
  const feb = useSolarRadiationGrids(Period.February);
  const mar = useSolarRadiationGrids(Period.March);
  const apr = useSolarRadiationGrids(Period.April);
  const may = useSolarRadiationGrids(Period.May);
  const jun = useSolarRadiationGrids(Period.June);
  const jul = useSolarRadiationGrids(Period.July);
  const aug = useSolarRadiationGrids(Period.August);
  const sep = useSolarRadiationGrids(Period.September);
  const oct = useSolarRadiationGrids(Period.October);
  const nov = useSolarRadiationGrids(Period.November);
  const dec = useSolarRadiationGrids(Period.December);
  const ann = useSolarRadiationGrids(Period.Annual);

  const results = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, ann];
  const asciiGrids = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);
  
  return {
    asciiGrids,
    gridsAreLoading: results.some(r => r.isLoading),
  };
}