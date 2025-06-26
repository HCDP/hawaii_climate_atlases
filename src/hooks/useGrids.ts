import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import { AsciiGrid } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = (url: string): Promise<AsciiGrid> => fetch(url).then(res => res.json());

export const useGrids = (units: string, period: string): {
  asciiGrid: AsciiGrid | undefined;
  isLoading: boolean;
  error: Error | undefined,
} => {
  const { data, isLoading, error } = useSWRImmutable<AsciiGrid, Error>(`/api/grids/${units}/${period}`, fetcher, {
    keepPreviousData: true
  });
  return {
    asciiGrid: data,
    isLoading,
    error,
  }
}
