import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { FeatureCollection } from "geojson";

const fetcher: Fetcher<FeatureCollection[], string> = (url: string): Promise<FeatureCollection[]> => 
  fetch(url).then(res => res.json());

/**
 * Hook to fetch rainfall isohyets (contour lines) for a specific unit
 */
export function useRainfallIsohyets(units: string): {
  featureCollections: FeatureCollection[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  const { data, isLoading, error } = useSWRImmutable<FeatureCollection[], Error>(
    `/api/isohyets/${units}`, 
    fetcher, 
    {
      keepPreviousData: true
    }
  );
  return {
    featureCollections: data,
    isLoading,
    error,
  };
}
