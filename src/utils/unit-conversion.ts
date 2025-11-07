// Utility for background prefetching of unit data for research workflows
import { Units, Period } from "@/lib/types";

export class ResearchDataManager {
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
  public getCacheKey(type: 'grids' | 'isohyets' | 'uncertainty', units: Units, period?: Period): string {
    return `${type}-${units}${period !== undefined ? `-${period}` : ''}`;
  }

  // Background prefetch alternate unit system after initial load
  public async prefetchAlternateUnits(currentUnits: Units, currentPeriod: Period): Promise<void> {
    const alternateUnits = currentUnits === Units.IN ? Units.MM : Units.IN;
    
    // Priority order: current period first, then annual, then other periods
    const prefetchOrder: Period[] = [
      currentPeriod, // Same period, different units
      Period.Annual, // Annual data (most important for researchers)
      ...Object.values(Period).filter((p): p is Period => 
        typeof p === 'number' && p !== currentPeriod && p !== Period.Annual
      )
    ];

    // Queue prefetch tasks
    for (const period of prefetchOrder) {
      this.queuePrefetch('grids', alternateUnits, period);
      this.queuePrefetch('uncertainty', alternateUnits, period);
    }
    
    // Prefetch isohyets (not period-specific)
    this.queuePrefetch('isohyets', alternateUnits);
    
    this.processPrefetchQueue();
  }

  private queuePrefetch(type: string, units: Units, period?: Period): void {
    const key = this.getCacheKey(type as any, units, period);
    
    // Skip if already loaded or loading
    if (this.loadingStates.has(key)) return;
    
    const prefetchFn = () => {
      switch (type) {
        case 'grids':
          return this.loadWithDeduplication(key, () => 
            fetch(`/api/grids/${units}/${Period[period!]}`).then(res => res.json())
          );
        case 'uncertainty':
          return this.loadWithDeduplication(key, () => 
            fetch(`/api/uncertainty-grids/${units}/${Period[period!]}`).then(res => res.json())
          );
        case 'isohyets':
          return this.loadWithDeduplication(key, () => 
            fetch(`/api/isohyets/${units}`).then(res => res.json())
          );
        default:
          return Promise.resolve(null);
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
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.warn('Background prefetch failed:', result.reason);
        }
      });
      
      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    this.isPrefetching = false;
  }

  // Call this when user first loads data to start background prefetching
  public startResearchPrefetch(initialUnits: Units, initialPeriod: Period): void {
    // Start prefetching immediately but with lower priority
    setTimeout(() => {
      this.prefetchAlternateUnits(initialUnits, initialPeriod);
    }, 500); // Reduced delay to 500ms
  }

  // Aggressive prefetch for immediate unit switching
  public prefetchCurrentPeriodAlternateUnit(currentUnits: Units, currentPeriod: Period): Promise<void> {
    const alternateUnits = currentUnits === Units.IN ? Units.MM : Units.IN;
    
    // Prefetch only the current period data for immediate switching
    const promises = [
      this.queuePrefetchImmediate('grids', alternateUnits, currentPeriod),
      this.queuePrefetchImmediate('uncertainty', alternateUnits, currentPeriod),
      this.queuePrefetchImmediate('isohyets', alternateUnits)
    ];
    
    return Promise.allSettled(promises).then(() => void 0);
  }

  private queuePrefetchImmediate(type: string, units: Units, period?: Period): Promise<any> {
    const key = this.getCacheKey(type as any, units, period);
    
    // If already loaded or loading, return existing promise
    if (this.loadingStates.has(key)) {
      return this.loadingStates.get(key)!;
    }
    
    switch (type) {
      case 'grids':
        return this.loadWithDeduplication(key, () => 
          fetch(`/api/grids/${units}/${Period[period!]}`).then(res => res.json())
        );
      case 'uncertainty':
        return this.loadWithDeduplication(key, () => 
          fetch(`/api/uncertainty-grids/${units}/${Period[period!]}`).then(res => res.json())
        );
      case 'isohyets':
        return this.loadWithDeduplication(key, () => 
          fetch(`/api/isohyets/${units}`).then(res => res.json())
        );
      default:
        return Promise.resolve(null);
    }
  }
}

export const researchDataManager = new ResearchDataManager();