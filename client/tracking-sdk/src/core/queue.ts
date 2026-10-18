// tracking-sdk/src/core/queue.ts

import type { TrackingEventPayload } from '../types';

type TimerId = ReturnType<typeof setTimeout>;

export class EventQueue {
  private queue: TrackingEventPayload[] = [];
  private timer: TimerId | null = null;
  private seenEvents = new Map<string, number>();
  private readonly MAX_SEEN_EVENTS = 10000;
  private destroyed = false;

  constructor(
    private flushFn: (events: TrackingEventPayload[]) => Promise<void>,
    private maxBatchSize: number = 50,
    private flushInterval: number = 15000,
  ) {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
    }
  }

  push(event: TrackingEventPayload): void {
    if (this.destroyed) return;

    const eventKey = this.getEventKey(event);
    const now = Date.now();

    if (this.seenEvents.size > this.MAX_SEEN_EVENTS) {
      this.cleanupOldEvents(now);
    }

    const lastSeen = this.seenEvents.get(eventKey);
    if (lastSeen && now - lastSeen < 2000) {
      return;
    }

    this.seenEvents.set(eventKey, now);

    this.queue.push(event);

    if (this.queue.length >= this.maxBatchSize) {
      this.flush();
    } else {
      this.schedule();
    }
  }

  private getEventKey(event: TrackingEventPayload): string {
    const bucket = Math.floor(event.timestamp / 1000);
    return `${event.type}:${event.path || ''}:${event.componentId || ''}:${event.elementId || ''}:${bucket}`;
  }

  private cleanupOldEvents(now: number): void {
    const expiryThreshold = now - 2000;

    for (const [key, timestamp] of this.seenEvents.entries()) {
      if (timestamp < expiryThreshold) {
        this.seenEvents.delete(key);
      }
    }

    if (this.seenEvents.size > this.MAX_SEEN_EVENTS) {
      const entries = Array.from(this.seenEvents.entries()).sort(
        (a, b) => a[1] - b[1],
      );

      const toRemove = entries.slice(0, Math.floor(this.MAX_SEEN_EVENTS / 2));
      toRemove.forEach(([key]) => this.seenEvents.delete(key));
    }
  }

  private schedule(): void {
    if (this.timer) return;

    if (typeof window !== 'undefined') {
      this.timer = window.setTimeout(() => {
        this.flush();
      }, this.flushInterval);
    }
  }

  flush(): void {
    if (this.queue.length === 0 || this.destroyed) return;

    const batch = this.queue.splice(0);

    this.flushFn(batch).catch((err) => {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[Webruit] Failed to send batch:', err);
      }
    });

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  destroy(): void {
    this.destroyed = true;
    this.flush();
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.seenEvents.clear();
  }
}