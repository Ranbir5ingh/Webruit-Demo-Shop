// tracking-sdk/src/events/rage-click.ts

import type { WebruitClient, TrackingEventPayload } from '../types';

interface ClickRecord {
  elementId: string;
  timestamps: number[];
}

type TimerId = ReturnType<typeof setInterval>;

const RAGE_THRESHOLD = 3;
const TIME_WINDOW = 1000;
const CLEANUP_INTERVAL = 5000;

function isValidElementId(id: string): boolean {
  return /^wb_el_[a-f0-9]{8}$/.test(id);
}

export function setupRageClickTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const clickRecords = new Map<string, ClickRecord>();
  let cleanupTimer: TimerId | null = null;

  const handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const elementId = target.getAttribute('data-wb-el-id');

    if (!elementId || !isValidElementId(elementId)) {
      return;
    }

    const now = Date.now();
    const record = clickRecords.get(elementId);

    if (!record) {
      clickRecords.set(elementId, {
        elementId,
        timestamps: [now],
      });
      return;
    }

    record.timestamps.push(now);

    const recentClicks = record.timestamps.filter(
      (timestamp) => now - timestamp < TIME_WINDOW
    );
    record.timestamps = recentClicks;

    if (recentClicks.length >= RAGE_THRESHOLD) {
      const sectionElement = target.closest('[data-wb-id]');
      const componentId = sectionElement?.getAttribute('data-wb-id');

      const event: TrackingEventPayload = {
        type: 'rage_click',
        elementId,
        componentId: componentId || undefined,
        metadata: {
          clickCount: recentClicks.length,
          timeWindowMs: now - (recentClicks[0] ?? now),
          elementType: target.tagName.toLowerCase(),
          text: target.textContent?.trim().substring(0, 50),
        },
        timestamp: now,
      };

      client.track(event);

      clickRecords.delete(elementId);
    }
  };

  const cleanupOldRecords = (): void => {
    const now = Date.now();
    const expiryThreshold = now - TIME_WINDOW * 2;

    for (const [elementId, record] of clickRecords.entries()) {
      const recentTimestamps = record.timestamps.filter(
        (timestamp) => timestamp > expiryThreshold
      );

      if (recentTimestamps.length === 0) {
        clickRecords.delete(elementId);
      } else {
        record.timestamps = recentTimestamps;
      }
    }
  };

  document.addEventListener('click', handleClick, { passive: true });
  cleanupTimer = setInterval(cleanupOldRecords, CLEANUP_INTERVAL);

  return () => {
    document.removeEventListener('click', handleClick);

    if (cleanupTimer) {
      clearInterval(cleanupTimer);
    }

    clickRecords.clear();
  };
}