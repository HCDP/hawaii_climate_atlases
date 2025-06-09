import useSWR, { Fetcher } from "swr";
import { FeatureCollection } from "geojson";

const fetcher: Fetcher<FeatureCollection[], string> = (url: string): Promise<FeatureCollection[]> => fetch(url).then(res => res.json());

export const useIsohyets = (units: string): {
  featureCollections: FeatureCollection[] | undefined,
  isLoading: boolean,
  error: Error | undefined,
} => {
  const { data, isLoading, error } = useSWR<FeatureCollection[], Error>(`/api/isohyets/${units}`, fetcher, {
    keepPreviousData: true
  });
  return {
    featureCollections: data,
    isLoading,
    error,
  }
}
