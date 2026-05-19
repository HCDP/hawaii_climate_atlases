import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { Station } from "@/lib";

const fetcher: Fetcher<Station[], string> = (url: string): Promise<Station[]> => 
  fetch(url).then(res => res.json());

/**
 * Hook to fetch rainfall stations
 * @param filter - Optional filter (e.g., "other" for non-RF Atlas stations)
 */
export function useRainfallStations(filter?: string): {
  stations: Station[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  const { data, isLoading, error } = useSWRImmutable<Station[], Error>(
    `/rainfall/api/stations${filter ? `?filter=${filter}` : ""}`, 
    fetcher, 
    {
      keepPreviousData: true
    }
  );
  return {
    stations: data,
    isLoading,
    error,
  };
}
