import { useState, useEffect, useRef } from 'react';
import { Units, Period } from '@/lib/types';
import { researchDataManager } from '@/utils/unit-conversion';

/**
 * Hook to manage smart loading states for unit switching
 * Reduces loading screen appearance when data is being prefetched
 */
export function useSmartLoadingState(
  currentUnits: Units,
  currentPeriod: Period,
  isActuallyLoading: boolean
) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(isActuallyLoading);
  const [isQuickSwitching, setIsQuickSwitching] = useState(false);
  const loadingTimeout = useRef<NodeJS.Timeout>();
  const switchStartTime = useRef<number>();

  useEffect(() => {
    if (isActuallyLoading) {
      // If user just switched units, give prefetch a chance before showing loading screen
      if (isQuickSwitching) {
        // Clear any existing timeout
        if (loadingTimeout.current) {
          clearTimeout(loadingTimeout.current);
        }
        
        // Only show loading screen if still loading after 1 second
        loadingTimeout.current = setTimeout(() => {
          if (isActuallyLoading) {
            setShowLoadingScreen(true);
          }
        }, 1000);
      } else {
        // Normal loading - show immediately
        setShowLoadingScreen(true);
      }
    } else {
      // Data loaded - hide loading screen
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
      setShowLoadingScreen(false);
      setIsQuickSwitching(false);
    }

    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, [isActuallyLoading, isQuickSwitching]);

  // Track when user switches units to enable smart loading
  const lastUnits = useRef(currentUnits);
  const lastPeriod = useRef(currentPeriod);
  
  useEffect(() => {
    const unitsChanged = lastUnits.current !== currentUnits;
    const periodChanged = lastPeriod.current !== currentPeriod;
    
    if (unitsChanged || periodChanged) {
      switchStartTime.current = Date.now();
      setIsQuickSwitching(true);
      
      // Reset after 3 seconds max
      setTimeout(() => {
        setIsQuickSwitching(false);
      }, 3000);
    }
    
    lastUnits.current = currentUnits;
    lastPeriod.current = currentPeriod;
  }, [currentUnits, currentPeriod]);

  return {
    showLoadingScreen,
    isQuickSwitching,
    switchDuration: switchStartTime.current ? Date.now() - switchStartTime.current : 0
  };
}