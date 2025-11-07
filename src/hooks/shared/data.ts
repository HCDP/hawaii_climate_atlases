import { Units, Period } from '@/lib/types';
import { useDataPrefetch, useSmartLoading } from '../rainfall/prefetch';

/**
 * Climate data hook with background prefetching for any climate data type
 * This wrapper adds smart prefetching and loading states to any existing data hook
 */
export function useClimateData<T>(
  selectedUnits: Units,
  selectedPeriod: Period,
  dataHook: (units: Units) => { 
    data: T; 
    isLoading: boolean;
    gridsAreLoading?: boolean;
  },
  category: 'rainfall' | 'solar' | 'evapotranspiration'
) {
  const { data, isLoading, gridsAreLoading } = dataHook(selectedUnits);
  const initialLoadComplete = !isLoading && data !== null && data !== undefined;
  
  // Enable prefetching when initial data is loaded
  useDataPrefetch(
    selectedUnits, 
    selectedPeriod,
    initialLoadComplete,
    category
  );

  // Smart loading states - gives prefetch time to complete before showing loading screen
  const { showFullLoading, showPrefetchIndicator, isAnyLoading } = useSmartLoading(
    isLoading,
    selectedUnits,
    selectedPeriod,
    category
  );

  return {
    data,
    isLoading: isAnyLoading,
    gridsAreLoading: gridsAreLoading || false,
    showFullLoading,
    showPrefetchIndicator,
    initialLoadComplete
  };
}

/**
 * Type definition for climate data hooks
 */
export type ClimateDataHook<T> = (units: Units) => {
  data: T;
  isLoading: boolean;
  gridsAreLoading?: boolean;
};