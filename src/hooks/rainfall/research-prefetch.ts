import { useEffect, useRef } from 'react';
import { Units, Period } from '@/lib/types';
import { researchDataManager } from '@/utils/unit-conversion';
import { useRainfallAllGrids } from './grids';

/**
 * Hook to manage background prefetching for research workflows
 * Automatically prefetches alternate unit data after initial load
 */
export function useResearchDataPrefetch(
  currentUnits: Units,
  currentPeriod: Period,
  initialLoadComplete: boolean
) {
  const prefetchStarted = useRef(false);
  const lastUnits = useRef(currentUnits);
  const lastPeriod = useRef(currentPeriod);

  useEffect(() => {
    if (!initialLoadComplete || prefetchStarted.current) return;
    
    // Start background prefetching immediately when data loads
    researchDataManager.startResearchPrefetch(currentUnits, currentPeriod);
    
    // Also prefetch current period alternate unit immediately for quick switching
    researchDataManager.prefetchCurrentPeriodAlternateUnit(currentUnits, currentPeriod);
    
    prefetchStarted.current = true;
  }, [currentUnits, currentPeriod, initialLoadComplete]);

  useEffect(() => {
    if (!initialLoadComplete) return;
    
    // When user changes period, immediately prefetch alternate unit for new period
    if (lastPeriod.current !== currentPeriod) {
      researchDataManager.prefetchCurrentPeriodAlternateUnit(currentUnits, currentPeriod);
    }
    
    // When user changes units, immediately start prefetching the alternate for current period
    if (lastUnits.current !== currentUnits) {
      researchDataManager.prefetchCurrentPeriodAlternateUnit(currentUnits, currentPeriod);
    }
    
    lastUnits.current = currentUnits;
    lastPeriod.current = currentPeriod;
  }, [currentUnits, currentPeriod, initialLoadComplete]);
}

/**
 * Enhanced version of useRainfallAllGrids with background prefetching
 */
export function useResearchRainfallGrids(selectedUnits: Units) {
  const { asciiGrids, gridsAreLoading } = useRainfallAllGrids(selectedUnits);
  
  // Enable prefetching when initial grids are loaded
  useResearchDataPrefetch(
    selectedUnits, 
    Period.Annual, // Start with annual as it's most important for researchers
    !gridsAreLoading && asciiGrids.length > 0
  );

  return {
    asciiGrids,
    gridsAreLoading,
  };
}