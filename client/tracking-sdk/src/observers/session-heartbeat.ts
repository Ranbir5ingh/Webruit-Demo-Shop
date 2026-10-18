// tracking-sdk/src/observers/session-heartbeat.ts

import type { SessionManager } from '../core/session-manager';

const HEARTBEAT_INTERVAL_MS = 60000;

export function setupSessionHeartbeat(sessionManager: SessionManager): () => void {
  if (typeof window === 'undefined') return () => {};

  let timer: ReturnType<typeof setInterval> | null = null;

  const start = () => {
    if (timer) return;
    timer = setInterval(() => {
      sessionManager.checkTimeout();
    }, HEARTBEAT_INTERVAL_MS);
  };

  const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

  activityEvents.forEach((event) => {
    document.addEventListener(event, () => sessionManager.recordActivity(), {
      passive: true,
    });
  });

  start();

  return () => {
    if (timer) clearInterval(timer);
    activityEvents.forEach((event) =>
      document.removeEventListener(event, () => sessionManager.recordActivity())
    );
  };
}
