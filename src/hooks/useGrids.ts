import useSWR, { Fetcher } from "swr";
import { AsciiGrid, Units } from "@/lib";

const fetcher: Fetcher<AsciiGrid, string> = (url: string): Promise<AsciiGrid> => fetch(url).then(res => res.json());

export const useGrids = (units: Units, period: string): {
  asciiGrid: AsciiGrid | undefined;
  isLoading: boolean;
  error: Error | undefined,
} => {
  const { data, isLoading, error } = useSWR<AsciiGrid, Error>(`/api/grids/${units}/${period}`, fetcher, {
    keepPreviousData: true
  });
  return {
    asciiGrid: data,
    isLoading,
    error,
  }
}
