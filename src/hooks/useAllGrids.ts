import { useGrids } from "@/hooks/useGrids";
import { Units, Period, AsciiGrid } from "@/lib";

export default function useAllGrids(selectedUnits: Units) {
  type GridFetchResult = { 
    asciiGrid: AsciiGrid | undefined,
    isLoading: boolean,
    error: Error | undefined
  };

  const results: GridFetchResult[] = [
    useGrids(selectedUnits, Period[0]),
    useGrids(selectedUnits, Period[1]),
    useGrids(selectedUnits, Period[2]),
    useGrids(selectedUnits, Period[3]),
    useGrids(selectedUnits, Period[4]),
    useGrids(selectedUnits, Period[5]),
    useGrids(selectedUnits, Period[6]),
    useGrids(selectedUnits, Period[7]),
    useGrids(selectedUnits, Period[8]),
    useGrids(selectedUnits, Period[9]),
    useGrids(selectedUnits, Period[10]),
    useGrids(selectedUnits, Period[11]),
    useGrids(selectedUnits, Period[12]),
  ];
  
  return {
    gridsAreLoading: Object.values(results).some(r => r.isLoading)
  }
}
