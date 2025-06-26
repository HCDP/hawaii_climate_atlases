import { useStations } from "@/hooks/useStations";
import { useIsohyets } from "@/hooks/useIsohyets";
import { useGrids } from "@/hooks/useGrids";
import { Units, Period } from "@/lib";

export default function useRainfallData(selectedUnits: Units, selectedPeriod: Period) {
  const {
    stations: rfStations,
    isLoading: rfStationsLoading,
  } = useStations();
  const {
    stations: otherStations,
    isLoading: otherStationsLoading,
  } = useStations("other");
  const {
    featureCollections,
    isLoading: isohyetsLoading,
  } = useIsohyets(selectedUnits);
  const {
    asciiGrid,
    isLoading: gridsLoading,
  } = useGrids(selectedUnits, Period[selectedPeriod]);
  const allDataLoaded =
    !!rfStations &&
    !!otherStations &&
    !!featureCollections &&
    !!asciiGrid;
  const isLoading =
    rfStationsLoading ||
    otherStationsLoading ||
    isohyetsLoading ||
    gridsLoading;
  return {
    rfStations,
    otherStations,
    featureCollections,
    asciiGrid,
    allDataLoaded,
    isLoading,
  }
}
