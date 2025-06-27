import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { Station } from "@/lib";

const fetcher: Fetcher<Station[], string> = (url: string): Promise<Station[]> => fetch(url).then(res => res.json());

export const useStations = (filter?: string): {
  stations: Station[] | undefined,
  isLoading: boolean,
  error: Error | undefined,
} => {
  const { data, isLoading, error } = useSWRImmutable<Station[], Error>(`/rainfall/api/stations${filter ? `?filter=${filter}` : ""}`, fetcher, {
    revalidateOnMount: false,
    keepPreviousData: true
  });
  return {
    stations: data,
    isLoading,
    error,
  }
}
