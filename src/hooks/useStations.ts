import useSWR, { Fetcher } from "swr";
import { Station } from "@/lib";

const fetcher: Fetcher<Station[], string> = (url: string): Promise<Station[]> => fetch(url).then(res => res.json());

export const useStations = (filter?: string): {
  stations: Station[] | undefined,
  isLoading: boolean,
  error: Error | undefined,
} => {
  const { data, isLoading, error } = useSWR<Station[], Error>(`/api/stations${filter ? `?filter=${filter}` : ""}`, fetcher, {
    keepPreviousData: true
  });
  return {
    stations: data,
    isLoading,
    error,
  }
}
