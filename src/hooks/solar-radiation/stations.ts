import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { Station } from "@/lib";

const fetcher: Fetcher<Station[], string> = (url: string): Promise<Station[]> => 
  fetch(url).then(res => res.json());

export function useSolarRadiationStations(filter?: string) {
  const { data, isLoading, error } = useSWRImmutable<Station[], Error>(
    `/api/solar-radiation-stations\${filter ? \`?filter=\${filter}\` : ""}`, 
    fetcher,
    { keepPreviousData: true }
  );
  return {
    stations: data,
    isLoading,
    error,
  };
}