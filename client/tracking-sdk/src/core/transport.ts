// tracking-sdk/src/core/transport.ts

import type { TrackingEventPayload } from '../types';

const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000];

export async function sendBatch(
  projectKey: string,
  endpoint: string,
  events: TrackingEventPayload[],
  attempt: number = 0
): Promise<void> {
  if (events.length === 0) return;

  try {
    const visitorId = events[0]?.metadata?.visitorId;
    const sessionId = events[0]?.metadata?.sessionId;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-project-key': projectKey,
    };

    if (visitorId) {
      headers['x-visitor-id'] = String(visitorId);
    }

    if (sessionId) {
      headers['x-session-id'] = String(sessionId);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ events }),
      keepalive: true,
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok && response.status >= 500 && attempt < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAYS[attempt])
      );
      return sendBatch(projectKey, endpoint, events, attempt + 1);
    }
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAYS[attempt])
      );
      return sendBatch(projectKey, endpoint, events, attempt + 1);
    }

    if (typeof console !== 'undefined' && console.warn) {
      console.warn('[Webruit] Track failed after retries:', error);
    }
  }
}