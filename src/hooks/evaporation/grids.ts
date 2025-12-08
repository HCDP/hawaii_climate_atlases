import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { AsciiGrid, Units, Period } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = (url: string): Promise<AsciiGrid> => 
  fetch(url).then(res => res.json());

/**
 * Hook to fetch a single evapotranspiration grid for a specific type, unit, and period
 */
export function useEvapotranspirationGrids(type: string, units: string, period: string): {
  asciiGrid: AsciiGrid | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  const { data, isLoading, error } = useSWRImmutable<AsciiGrid, Error>(
    `/api/evapotranspiration/${type}/${period}?units=${units}`, 
    fetcher
  );
  return {
    asciiGrid: data,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch all evapotranspiration grids for all periods (Jan-Dec + Annual)
 * Note: Calls hooks at top level to comply with React Rules of Hooks
 */
export function useEvapotranspirationAllGrids(type: string, selectedUnits: Units) {
  // Convert units enum to string
  const unitsString = selectedUnits === Units.IN ? 'in' : 'mm';

  // Call all hooks at top level (React Rules of Hooks requirement)
  const jan = useEvapotranspirationGrids(type, unitsString, Period[Period.January]);
  const feb = useEvapotranspirationGrids(type, unitsString, Period[Period.February]);
  const mar = useEvapotranspirationGrids(type, unitsString, Period[Period.March]);
  const apr = useEvapotranspirationGrids(type, unitsString, Period[Period.April]);
  const may = useEvapotranspirationGrids(type, unitsString, Period[Period.May]);
  const jun = useEvapotranspirationGrids(type, unitsString, Period[Period.June]);
  const jul = useEvapotranspirationGrids(type, unitsString, Period[Period.July]);
  const aug = useEvapotranspirationGrids(type, unitsString, Period[Period.August]);
  const sep = useEvapotranspirationGrids(type, unitsString, Period[Period.September]);
  const oct = useEvapotranspirationGrids(type, unitsString, Period[Period.October]);
  const nov = useEvapotranspirationGrids(type, unitsString, Period[Period.November]);
  const dec = useEvapotranspirationGrids(type, unitsString, Period[Period.December]);
  const ann = useEvapotranspirationGrids(type, unitsString, Period[Period.Annual]);

  const results = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, ann];
  const asciiGrids: AsciiGrid[] = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);
  
  return {
    asciiGrids,
    gridsAreLoading: results.some(r => r.isLoading),
  };
}
