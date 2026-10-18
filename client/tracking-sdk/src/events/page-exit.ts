// tracking-sdk/src/events/page-exit.ts

import type { WebruitClient, TrackingEventPayload } from '../types';

interface PageLoadSession {
  path: string;
  loadTime: number;
}

type TimerId = ReturnType<typeof setTimeout>;

export function setupPageExitTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const pageLoadSessions = new Map<string, PageLoadSession>();
  let currentPageKey: string | null = null;
  let navigationTimeout: TimerId | null = null;

  const getCurrentPageKey = (): string => {
    return `${location.pathname}:${Date.now() % 10000}`;
  };

  const startPageSession = (): void => {
    currentPageKey = getCurrentPageKey();
    pageLoadSessions.set(currentPageKey, {
      path: location.pathname,
      loadTime: Date.now(),
    });
  };

  const handlePageNavigation = (): void => {
    if (navigationTimeout) {
      clearTimeout(navigationTimeout);
    }

    navigationTimeout = setTimeout(() => {
      startPageSession();
    }, 100);
  };

  const handlePageHide = (): void => {
    if (currentPageKey) {
      const session = pageLoadSessions.get(currentPageKey);
      if (session) {
        const timeOnPageMs = Date.now() - session.loadTime;
        const bounced = timeOnPageMs < 30000;

        const event: TrackingEventPayload = {
          type: 'page_exit',
          path: session.path,
          metadata: {
            timeOnPageMs,
            bounced,
          },
          timestamp: Date.now(),
        };

        client.track(event);
        client.flush();
      }

      pageLoadSessions.delete(currentPageKey);
    }
  };

  startPageSession();

  window.addEventListener('popstate', handlePageNavigation);
  window.addEventListener('pagehide', handlePageHide);

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (
    this: typeof window.history,
    ...args: unknown[]
  ) {
    const result = (originalPushState as unknown as (this: typeof window.history, ...args: unknown[]) => unknown).apply(this, args);
    handlePageNavigation();
    return result;
  };

  history.replaceState = function (
    this: typeof window.history,
    ...args: unknown[]
  ) {
    const result = (originalReplaceState as unknown as (this: typeof window.history, ...args: unknown[]) => unknown).apply(this, args);
    handlePageNavigation();
    return result;
  };

  return () => {
    window.removeEventListener('popstate', handlePageNavigation);
    window.removeEventListener('pagehide', handlePageHide);

    history.pushState = originalPushState;
    history.replaceState = originalReplaceState;

    if (navigationTimeout) {
      clearTimeout(navigationTimeout);
    }

    pageLoadSessions.clear();
  };
}