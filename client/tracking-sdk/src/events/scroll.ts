// tracking-sdk/src/events/scroll.ts

import type { WebruitClient, TrackingEventPayload } from '../types';

type TimerId = ReturnType<typeof setTimeout>;

export function setupScrollTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  let maxScrollDepth = 0;
  let lastReportedDepth = 0;
  const depthMilestones = new Map<number, number>();
  let lastScrollTime = Date.now();
  let throttleTimer: TimerId | null = null;

  const calculateScrollDepth = (): number => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight <= windowHeight) return 100;

    return Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
  };

  const handleScroll = (): void => {
    if (throttleTimer) return;

    throttleTimer = setTimeout(() => {
      throttleTimer = null;
    }, 1000);

    const currentDepth = calculateScrollDepth();

    if (currentDepth > maxScrollDepth) {
      maxScrollDepth = currentDepth;
    }

    const currentMilestone = Math.floor(currentDepth / 10) * 10;
    const lastMilestone = Math.floor(lastReportedDepth / 10) * 10;

    if (currentMilestone > lastMilestone && currentMilestone > 0) {
      const now = Date.now();
      const timeToReach = depthMilestones.get(currentMilestone) 
        ? 0 
        : now - lastScrollTime;

      if (!depthMilestones.has(currentMilestone)) {
        depthMilestones.set(currentMilestone, now);
      }

      const event: TrackingEventPayload = {
        type: 'scroll_depth',
        path: location.pathname,
        metadata: {
          depth: currentMilestone,
          timeToReachMs: timeToReach,
        },
        timestamp: now,
      };

      client.track(event);

      lastReportedDepth = currentDepth;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (throttleTimer) {
      clearTimeout(throttleTimer);
    }
  };
}