import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { AsciiGrid, Units, Period, Hour } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = async (url: string): Promise<AsciiGrid> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch grid: ${response.status}`);
  return response.json();
};

export type AETPointValues = {
  monthly: (number | null)[];
  hourly: (number | null)[];
};

const pointValuesFetcher: Fetcher<AETPointValues, string> = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch point values: ${response.status}`);
  return response.json();
};

export function useAETPointValues(
  selectedUnits: Units,
  latitude: number | null,
  longitude: number | null,
  varName: string,
) {
  const key = latitude !== null && longitude !== null
    ? `/evap/api/point-values/${selectedUnits}?lat=${latitude}&lng=${longitude}&var=${encodeURIComponent(varName)}&v=2`
    : null;
  const { data, isLoading, error } = useSWRImmutable<AETPointValues, Error>(key, pointValuesFetcher);
  return {
    monthly: data?.monthly ?? [],
    hourly: data?.hourly ?? [],
    isLoading,
    error,
  };
}

/**
 * Hook to fetch a single evapotranspiration grid for a specific unit, month, and hour
 */
export function useAETGrid(units: string, month: string, hour: string, varName: string = 'Evapotranspiration', enabled: boolean = true): {
  asciiGrid: AsciiGrid | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  const key = enabled
    ? `/evap/api/grids/${units}/${month}/${hour}?var=${encodeURIComponent(varName)}`
    : null;
  const { data, isLoading, error } = useSWRImmutable<AsciiGrid, Error>(
    key, 
    fetcher
  );
  return {
    asciiGrid: data,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch all evapotranspiration grids for all months (Jan-Dec and Annual) for a specific unit
 */
export function useAETAllGrids(selectedUnits: Units, selectedHour: string = Hour.HR_00, varName: string = 'Evapotranspiration', enabled: boolean = true) {
  type GridFetchResult = { 
    asciiGrid: AsciiGrid | undefined;
    isLoading: boolean;
    error: Error | undefined;
  };

  const results: GridFetchResult[] = [];
  for (let i = 0; i <= 12; i++) {
    results.push(useAETGrid(selectedUnits, Period[i], selectedHour, varName, enabled));
  }

  const asciiGrids: AsciiGrid[] = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);
  
  return {
    asciiGrids,
    gridsAreLoading: Object.values(results).some(r => r.isLoading),
  };
}

/**
 * Hook to fetch evapotranspiration grids for all 24 hours for a specific month.
 * Used to provide hourly data for the HourPlot.
 */
export function useAETAllHourGrids(selectedUnits: Units, selectedMonth: string = 'Annual', varName: string = 'Evapotranspiration', enabled: boolean = true) {
  type GridFetchResult = {
    asciiGrid: AsciiGrid | undefined;
    isLoading: boolean;
    error: Error | undefined;
  };

  const hourKeys = Object.values(Hour).filter(h => h !== Hour.HR_00);
  const results: GridFetchResult[] = [];
  for (const hour of hourKeys) {
    results.push(useAETGrid(selectedUnits, selectedMonth, hour, varName, enabled));
  }

  const asciiGrids: AsciiGrid[] = results.flatMap(r => r.asciiGrid ? [r.asciiGrid] : []);

  return {
    asciiGrids,
    gridsAreLoading: results.some(r => r.isLoading),
  };
}
