// tracking-sdk/src/events/exit-intent.ts

import type { WebruitClient, TrackingEventPayload } from '../types';

const EXIT_THRESHOLD = 10;
const DEBOUNCE_DELAY = 2000;

export function setupExitIntentTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  let lastExitEvent = 0;
  let pageLoadTime = Date.now();
  let maxScrollDepth = 0;

  const updateScrollDepth = (): void => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight > windowHeight) {
      const depth = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );
      maxScrollDepth = Math.max(maxScrollDepth, depth);
    }
  };

  const handleMouseLeave = (e: MouseEvent): void => {
    if (e.clientY > EXIT_THRESHOLD) {
      return;
    }

    const now = Date.now();
    if (now - lastExitEvent < DEBOUNCE_DELAY) {
      return;
    }

    lastExitEvent = now;

    const timeOnPageMs = now - pageLoadTime;

    if (timeOnPageMs < 5000) {
      return;
    }

    const event: TrackingEventPayload = {
      type: 'exit_intent',
      path: location.pathname,
      metadata: {
        timeOnPageMs,
        scrollDepth: maxScrollDepth,
        mouseY: e.clientY,
        timestamp: now,
      },
      timestamp: now,
    };

    client.track(event);
  };

  const handleScroll = (): void => {
    updateScrollDepth();
  };

  const handleNavigation = (): void => {
    pageLoadTime = Date.now();
    maxScrollDepth = 0;
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('popstate', handleNavigation);

  return () => {
    document.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('popstate', handleNavigation);
  };
}