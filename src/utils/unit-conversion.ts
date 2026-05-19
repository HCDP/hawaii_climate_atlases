import { Units, Period } from '@/lib/types';

export class DataManager {
  private loadingStates = new Map<string, Promise<any>>();
  private prefetchQueue: Array<() => Promise<any>> = [];
  private isPrefetching = false;
  
  // Prevent duplicate requests for same data
  public async loadWithDeduplication<T>(
    key: string, 
    loadFn: () => Promise<T>
  ): Promise<T> {
    if (this.loadingStates.has(key)) {
      return this.loadingStates.get(key) as Promise<T>;
    }
    
    const promise = loadFn();
    this.loadingStates.set(key, promise);
    
    // Clean up after completion
    promise.finally(() => {
      this.loadingStates.delete(key);
    });
    
    return promise;
  }
  
  // Generate cache keys for data requests
  public getCacheKey(
    dataType: 'grids' | 'isohyets' | 'uncertainty', 
    units: Units, 
    period?: Period,
    category?: 'rainfall' | 'solar' | 'evapotranspiration'
  ): string {
    const categoryPrefix = category ? `${category}-` : '';
    return `${categoryPrefix}${dataType}-${units}${period !== undefined ? `-${period}` : ''}`;
  }

  // Background prefetch alternate unit system after initial load
  public async prefetchAlternateUnits(
    currentUnits: Units, 
    currentPeriod: Period,
    category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
  ): Promise<void> {
    const alternateUnits = currentUnits === Units.IN ? Units.MM : Units.IN;
    
    // Priority order: current period first, then annual, then other periods
    const prefetchOrder: Period[] = [
      currentPeriod,
      Period.Annual,
      ...Object.values(Period).filter((p): p is Period => 
        typeof p === 'number' && p !== currentPeriod && p !== Period.Annual
      )
    ];

    // Queue prefetch tasks based on category
    for (const period of prefetchOrder) {
      this.queuePrefetch('grids', alternateUnits, period, category);
      if (category === 'rainfall') {
        this.queuePrefetch('uncertainty', alternateUnits, period, category);
      }
    }
    
    // Prefetch isohyets (rainfall only, not period-specific)
    if (category === 'rainfall') {
      this.queuePrefetch('isohyets', alternateUnits, undefined, category);
    }
    
    this.processPrefetchQueue();
  }

  private queuePrefetch(
    type: string, 
    units: Units, 
    period?: Period, 
    category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
  ): void {
    const key = this.getCacheKey(type as any, units, period, category);
    
    // Skip if already loaded or loading
    if (this.loadingStates.has(key)) return;

    const prefetchFn = () => {
      switch (type) {
        case 'grids':
          return this.loadWithDeduplication(key, () => 
            fetch(`/rainfall/api/grids/${units}/${period !== undefined ? Period[period] : ''}`).then(res => res.json())
          );
        case 'uncertainty':
          return this.loadWithDeduplication(key, () => 
            fetch(`/rainfall/api/uncertainty-grids/${units}/${Period[period!]}`).then(res => res.json())
          );
        case 'isohyets':
          return this.loadWithDeduplication(key, () => 
            fetch(`/rainfall/api/isohyets/${units}`).then(res => res.json())
          );
        default:
          return Promise.resolve();
      }
    };
    
    this.prefetchQueue.push(prefetchFn);
  }

  private async processPrefetchQueue(): Promise<void> {
    if (this.isPrefetching || this.prefetchQueue.length === 0) return;
    
    this.isPrefetching = true;
    
    // Process queue with controlled concurrency (max 2 concurrent requests)
    while (this.prefetchQueue.length > 0) {
      const batch = this.prefetchQueue.splice(0, 2); // Process 2 at a time
      const results = await Promise.allSettled(batch.map(fn => fn()));
      
      // Log any failures silently (don't throw errors for background prefetch)
      results.forEach((result) => {
        if (result.status === 'rejected') {
          console.warn('Background prefetch failed:', result.reason);
        }
      });
      
      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    this.isPrefetching = false;
  }

  // Start background prefetching after initial load
  public startBackgroundPrefetch(
    initialUnits: Units, 
    initialPeriod: Period,
    category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
  ): void {
    // Start prefetching with slight delay to prioritize initial load
    setTimeout(() => {
      this.prefetchAlternateUnits(initialUnits, initialPeriod, category);
    }, 500); 
  }

  // Immediate prefetch for current period when user switches
  public prefetchCurrentPeriodAlternateUnit(
    currentUnits: Units, 
    currentPeriod: Period,
    category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
  ): Promise<void> {
    const alternateUnits = currentUnits === Units.IN ? Units.MM : Units.IN;
    
    // Prefetch only the current period data for immediate switching
    const promises = [
      this.queuePrefetchImmediate('grids', alternateUnits, currentPeriod, category)
    ];
    
    if (category === 'rainfall') {
      promises.push(
        this.queuePrefetchImmediate('uncertainty', alternateUnits, currentPeriod, category),
        this.queuePrefetchImmediate('isohyets', alternateUnits, undefined, category)
      );
    }
    
    return Promise.allSettled(promises).then(() => {});
  }

  private queuePrefetchImmediate(
    type: string, 
    units: Units, 
    period?: Period, 
    category: 'rainfall' | 'solar' | 'evapotranspiration' = 'rainfall'
  ): Promise<any> {
    const key = this.getCacheKey(type as any, units, period, category);
    
    switch (type) {
      case 'grids':
        return this.loadWithDeduplication(key, () => 
          fetch(`/rainfall/api/grids/${units}/${period !== undefined ? Period[period] : ''}`).then(res => res.json())
        );
      case 'uncertainty':
        return this.loadWithDeduplication(key, () => 
          fetch(`/rainfall/api/uncertainty-grids/${units}/${Period[period!]}`).then(res => res.json())
        );
      case 'isohyets':
        return this.loadWithDeduplication(key, () => 
          fetch(`/rainfall/api/isohyets/${units}`).then(res => res.json())
        );
      default:
        return Promise.resolve();
    }
  }
}

export const dataManager = new DataManager();