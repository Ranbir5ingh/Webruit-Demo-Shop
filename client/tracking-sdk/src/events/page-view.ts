// tracking-sdk/src/events/page-view.ts

import { WebruitClient } from '../types';

export function trackPageView(client: WebruitClient): void {
  client.track({
    type: 'page_view',
    path: location.pathname,
    metadata: {
      title: document.title,
      referrer: document.referrer || undefined,
    },
    timestamp: Date.now(),
  });
}

export function setupSPAPageViewTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let lastPath = location.pathname;

  const fire = (): void => {
    const path = location.pathname;
    if (path === lastPath) return;

    lastPath = path;
    trackPageView(client);
  };

  const wrap = (method: 'pushState' | 'replaceState'): ((args: unknown[]) => unknown) => {
    const original = history[method];
    
    history[method] = function (
      this: typeof window.history,
      ...args: unknown[]
    ) {
      const result = (original as unknown as (this: typeof window.history, ...args: unknown[]) => unknown).apply(this, args);
      queueMicrotask(fire);
      return result;
    };

    return original as unknown as (args: unknown[]) => unknown;
  };

  const originalPush = wrap('pushState');
  const originalReplace = wrap('replaceState');

  window.addEventListener('popstate', fire);

  return () => {
    history.pushState = originalPush as unknown as typeof history.pushState;
    history.replaceState = originalReplace as unknown as typeof history.replaceState;
    window.removeEventListener('popstate', fire);
  };
}