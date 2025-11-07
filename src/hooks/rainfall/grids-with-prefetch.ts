import { Units, Period } from '@/lib/types';
import { useRainfallAllGrids } from './grids';
import { useClimateData } from '../shared/data';

/**
 * Rainfall grids with smart prefetching for instant unit switching
 */
export function useRainfallGrids(selectedUnits: Units, selectedPeriod: Period = Period.Annual) {
  return useClimateData(
    selectedUnits,
    selectedPeriod,
    (units: Units) => {
      const { asciiGrids, gridsAreLoading } = useRainfallAllGrids(units);
      return {
        data: asciiGrids,
        isLoading: gridsAreLoading,
        gridsAreLoading
      };
    },
    'rainfall'
  );
}

/**
 * Solar grids with smart prefetching (template for when you add solar data)
 */
export function useSolarGrids(selectedUnits: Units, selectedPeriod: Period = Period.Annual) {
  return useClimateData(
    selectedUnits,
    selectedPeriod,
    (units: Units) => {
      // Replace with your actual solar hook when available
      // const { asciiGrids, gridsAreLoading } = useSolarAllGrids(units);
      return {
        data: [], // placeholder
        isLoading: false, // placeholder
        gridsAreLoading: false
      };
    },
    'solar'
  );
}

/**
 * Evapotranspiration grids with smart prefetching (template for when you add ET data)
 */
export function useEvapotranspirationGrids(selectedUnits: Units, selectedPeriod: Period = Period.Annual) {
  return useClimateData(
    selectedUnits,
    selectedPeriod,
    (units: Units) => {
      // Replace with your actual ET hook when available
      // const { asciiGrids, gridsAreLoading } = useETAllGrids(units);
      return {
        data: [], // placeholder
        isLoading: false, // placeholder
        gridsAreLoading: false
      };
    },
    'evapotranspiration'
  );
}