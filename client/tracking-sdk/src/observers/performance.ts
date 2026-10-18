// tracking-sdk/src/observers/performance.ts

import type { TrackingEventMetadata } from '../types';

export function setupPerformanceObserver(
  callback: (metric: TrackingEventMetadata) => void,
): () => void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return () => {};
  }

  const observers: PerformanceObserver[] = [];
  let maxInp = 0;
  let finalCls = 0;
  let lcpValue = 0;
  let ttfbValue = 0;
  let metricsReported = false;

  const reportMetrics = (): void => {
    if (metricsReported) return;
    metricsReported = true;

    const metrics: TrackingEventMetadata = {};

    if (ttfbValue > 0) {
      metrics.ttfb = ttfbValue;
    }

    if (maxInp > 0) {
      metrics.inp = maxInp;
    }

    if (finalCls > 0) {
      metrics.cls = finalCls;
    }

    if (lcpValue > 0) {
      metrics.lcp = lcpValue;
    }

    if (Object.keys(metrics).length > 0) {
      callback(metrics);
    }
  };

  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      if (lastEntry && 'renderTime' in lastEntry && 'loadTime' in lastEntry) {
        lcpValue = (lastEntry.renderTime as number) || (lastEntry.loadTime as number);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    observers.push(lcpObserver);
  } catch {
    //
  }

  try {
    const inpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      for (const entry of entries) {
        if ('duration' in entry) {
          const duration = entry.duration as number;
          if (duration > maxInp) {
            maxInp = duration;
          }
        }
      }
    });
    inpObserver.observe({
      type: 'event',
      buffered: true,
      durationThreshold: 16,
    } as PerformanceObserverInit);
    observers.push(inpObserver);
  } catch {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if ('processingStart' in entry && 'startTime' in entry) {
            const fidValue = (entry.processingStart as number) - (entry.startTime as number);
            if (fidValue > maxInp) {
              maxInp = fidValue;
            }
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      observers.push(fidObserver);
    } catch {
      //
    }
  }

  try {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ('hadRecentInput' in entry && 'value' in entry) {
          const hadRecentInput = entry.hadRecentInput as boolean;
          const value = entry.value as number;
          if (!hadRecentInput) {
            finalCls += value;
          }
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    observers.push(clsObserver);
  } catch {
    //
  }

  try {
    const navigationEntry = performance.getEntriesByType('navigation')[0];

    if (navigationEntry && 'responseStart' in navigationEntry && 'requestStart' in navigationEntry) {
      ttfbValue = (navigationEntry.responseStart as number) - (navigationEntry.requestStart as number);
    }
  } catch {
    //
  }

  const handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      reportMetrics();
    }
  };

  window.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch {
        //
      }
    });

    window.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}