import { useEffect, useRef, useState } from 'react';
import { Units, Period } from '@/lib/types';
import { dataManager } from '@/utils/unit-conversion';

/**
 * Hook to manage background prefetching for any climate data type
 * Automatically prefetches alternate unit data after initial load
 */
export function useDataPrefetch(
  currentUnits: Units,
  currentPeriod: Period,
  initialLoadComplete: boolean,
  category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
) {
  const prefetchStarted = useRef(false);
  const lastUnits = useRef(currentUnits);
  const lastPeriod = useRef(currentPeriod);

  useEffect(() => {
    if (!initialLoadComplete || prefetchStarted.current) return;
    
    // Start background prefetching when initial data loads
    dataManager.startBackgroundPrefetch(currentUnits, currentPeriod, category);
    
    // Also prefetch current period alternate unit immediately for quick switching
    dataManager.prefetchCurrentPeriodAlternateUnit(currentUnits, currentPeriod, category);
    
    prefetchStarted.current = true;
  }, [currentUnits, currentPeriod, initialLoadComplete, category]);

  useEffect(() => {
    if (!initialLoadComplete) return;
    
    // When user changes period, immediately prefetch alternate unit for new period
    if (lastPeriod.current !== currentPeriod) {
      dataManager.prefetchCurrentPeriodAlternateUnit(currentUnits, currentPeriod, category);
    }
    
    // When user changes units, immediately start prefetching the alternate for current period
    if (lastUnits.current !== currentUnits) {
      dataManager.prefetchCurrentPeriodAlternateUnit(currentUnits, currentPeriod, category);
    }
    
    lastUnits.current = currentUnits;
    lastPeriod.current = currentPeriod;
  }, [currentUnits, currentPeriod, initialLoadComplete, category]);
}

/**
 * Smart loading state that gives prefetch time to complete before showing loading screen
 */
export function useSmartLoading(
  isLoading: boolean,
  currentUnits: Units,
  currentPeriod: Period,
  category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
) {
  const [showLoading, setShowLoading] = useState(false);
  const [isPrefetchLoading, setIsPrefetchLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isLoading) {
      // Give background prefetch 1 second to complete before showing full loading screen
      setIsPrefetchLoading(true);
      
      const timeout = setTimeout(() => {
        setShowLoading(true);
        setIsPrefetchLoading(false);
      }, 1000);
      
      timeoutRef.current = timeout;
    } else {
      // Data loaded - clear timeout and hide loading
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setShowLoading(false);
      setIsPrefetchLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  return {
    showFullLoading: showLoading,
    showPrefetchIndicator: isPrefetchLoading,
    isAnyLoading: isLoading || isPrefetchLoading
  };
}