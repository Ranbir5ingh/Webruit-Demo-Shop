// tracking-sdk/src/events/session-tracking.ts

import type { WebruitClient, TrackingEventPayload } from '../types';
import type { SessionManager } from '../core/session-manager';

export function setupSessionTracking(
  client: Pick<WebruitClient, 'track' | 'flush'>,
  sessionManager: SessionManager
): () => void {
  if (typeof window === 'undefined') return () => {};

  sessionManager.onSessionEnd((metrics) => {
    const event: TrackingEventPayload = {
      type: 'session_end',
      metadata: {
        visitorId: metrics.visitorId,
        sessionId: metrics.sessionId,
        durationMs: metrics.durationMs,
        pageCount: metrics.pageCount,
        totalClicks: metrics.clickCount,
        scrolled: metrics.hasScrolled,
        maxScrollDepth: metrics.scrollDepth,
        bounced: metrics.bounced,
      },
      timestamp: metrics.endTime,
    };

    client.track(event);
    client.flush();
  });

  const handlePageHide = (e: PageTransitionEvent): void => {
    if (e.persisted) return;
    sessionManager.endSession();
  };

  window.addEventListener('pagehide', handlePageHide);

  return () => {
    window.removeEventListener('pagehide', handlePageHide);
  };
}
