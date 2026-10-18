// tracking-sdk/src/observers/visibility.ts

import type { TrackingEventPayload } from '../types';

type TimerId = ReturnType<typeof setTimeout>;

function isValidComponentId(id: string): boolean {
  return /^wb_c_[a-f0-9]{8}$/.test(id);
}

interface VisibilityRecord {
  startTime: number;
  path: string;
}

export function setupVisibilityTracking(callback: (event: TrackingEventPayload) => void): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {};
  }

  const visibilityMap = new Map<Element, VisibilityRecord>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        const componentId = element.getAttribute('data-wb-id');

        if (!componentId || !isValidComponentId(componentId)) {
          return;
        }

        if (entry.isIntersecting) {
          visibilityMap.set(element, {
            startTime: Date.now(),
            path: location.pathname,
          });
        } else {
          const record = visibilityMap.get(element);

          if (record) {
            const visibleTimeMs = Date.now() - record.startTime;

            if (visibleTimeMs >= 500) {
              const scrollTop = window.scrollY;
              const windowHeight = window.innerHeight;
              const documentHeight = document.documentElement.scrollHeight;

              const scrollDepth = documentHeight > windowHeight
                ? Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
                : 100;

              const event: TrackingEventPayload = {
                type: 'visibility',
                componentId,
                path: record.path,
                metadata: {
                  visibleTimeMs,
                  scrollDepth,
                  elementRect: {
                    top: entry.boundingClientRect.top,
                    height: entry.boundingClientRect.height,
                  },
                },
                timestamp: Date.now(),
              };

              callback(event);
            }

            visibilityMap.delete(element);
          }
        }
      });
    },
    {
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
      rootMargin: '0px',
    }
  );

  let mutationObserver: MutationObserver | null = null;
  let mutationTimeout: TimerId | null = null;

  const observeElements = () => {
    observer.disconnect();

    document.querySelectorAll('[data-wb-id]').forEach((el) => {
      const componentId = el.getAttribute('data-wb-id');

      if (componentId && isValidComponentId(componentId)) {
        observer.observe(el);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
  } else {
    observeElements();
  }

  mutationObserver = new MutationObserver(() => {
    if (mutationTimeout) clearTimeout(mutationTimeout);

    mutationTimeout = setTimeout(() => {
      observeElements();
      mutationTimeout = null;
    }, 1000);
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    try {
      observer.disconnect();
    } catch {
      // Ignore cleanup errors
    }

    if (mutationObserver) {
      try {
        mutationObserver.disconnect();
      } catch {
        // Ignore cleanup errors
      }
    }

    if (mutationTimeout) {
      clearTimeout(mutationTimeout);
    }

    visibilityMap.clear();
    document.removeEventListener('DOMContentLoaded', observeElements);
  };
}