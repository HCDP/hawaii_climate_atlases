import { useMemo } from "react";
import { Period, AsciiGrid } from "@/lib";
import {
  useSolarRadiationGrids,
  useDiffuseRadiationGrids,
  useLongwaveDownGrids,
  useLongwaveUpGrids,
  useNetRadiationGrids,
} from "./grids";

export function useSolarRadiationComposite(
  type: string,
  period: Period
) {
  // Fetch data based on the selected type
  const radiationData = useSolarRadiationGrids(period);
  const diffuseData = useDiffuseRadiationGrids(period);
  const longwaveDownData = useLongwaveDownGrids(period);
  const longwaveUpData = useLongwaveUpGrids(period);
  const netRadiationData = useNetRadiationGrids(period);

  // Select the correct data based on type
  const selectedData = useMemo(() => {
    switch (type) {
      case 'diffuse':
        return diffuseData;
      case 'longwave-down':
        return longwaveDownData;
      case 'longwave-up':
        return longwaveUpData;
      case 'net-radiation':
        return netRadiationData;
      case 'radiation':
      default:
        return radiationData;
    }
  }, [type, radiationData, diffuseData, longwaveDownData, longwaveUpData, netRadiationData]);

  const { asciiGrid, isLoading: gridsLoading, error: gridsError } = selectedData;

  const allDataLoaded = useMemo(
    () => !gridsLoading && !!asciiGrid,
    [gridsLoading, asciiGrid]
  );

  return {
    asciiGrid,
    allDataLoaded,
    isLoading: gridsLoading,
    error: gridsError,
    // Empty arrays for compatibility with ClimateMap interface
    rfStations: [],
    otherStations: [],
    featureCollections: [],
  };
}
