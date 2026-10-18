// tracking-sdk/src/core/client.ts

import { EventQueue } from "./queue";
import { sendBatch } from "./transport";
import { SessionManager } from "./session-manager";
import { setupPerformanceObserver } from "../observers/performance";
import { setupVisibilityTracking } from "../observers/visibility";
import { setupSessionHeartbeat } from "../observers/session-heartbeat";
import { setupSessionTracking } from "../events/session-tracking";
import type {
  TrackingConfig,
  WebruitClient,
  TrackingEventPayload,
} from "../types";

export function createClient(config: TrackingConfig): WebruitClient {
  if (!config.projectKey || config.projectKey.length < 10) {
    throw new Error("[Webruit] Invalid project key");
  }

  const endpoint = config.endpoint || "http://localhost:3000/v1/track";
  const sampleRate = config.sampleRate ?? 1.0;

  const sessionManager = new SessionManager();

  const queue = new EventQueue(
    (events) => sendBatch(config.projectKey, endpoint, events),
    config.batchSize || 50,
    config.flushInterval || 15000
  );

  const cleanupFunctions: (() => void)[] = [];

  /**
   * 🔒 SINGLE ENRICHMENT + SAFETY GATE
   */
  const trackInternal = (event: TrackingEventPayload): void => {
    if (sessionManager.isEnded() && event.type !== "session_end") return;
    if (sampleRate < 1.0 && Math.random() > sampleRate) return;

    sessionManager.recordActivity();

    if (event.type === "click") sessionManager.recordClick();
    if (event.type === "page_view") sessionManager.recordPageView();
    if (
      event.type === "scroll_depth" &&
      typeof event.metadata?.depth === "number"
    ) {
      sessionManager.recordScroll(event.metadata.depth);
    }

    if (event.elementId && !/^wb_el_[a-f0-9]{8}$/.test(event.elementId)) return;
    if (event.componentId && !/^wb_c_[a-f0-9]{8}$/.test(event.componentId))
      return;

    const referrer = (() => {
      try {
        return new URL(document.referrer).hostname;
      } catch {
        return undefined;
      }
    })();

    const enriched: TrackingEventPayload = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      metadata: {
        ...event.metadata,
        ...(referrer && { referrer }),
        visitorId: sessionManager.getVisitorId(),
        sessionId: sessionManager.getSessionId(),
      },
    };

    queue.push(enriched);
  };

  // ===========================
  // AUTO TRACKING
  // ===========================
  if (config.autoTrack !== false) {
    if (config.trackPerformance !== false) {
      cleanupFunctions.push(
        setupPerformanceObserver((metric) => {
          trackInternal({
            type: "performance",
            metadata: metric,
            timestamp: Date.now(),
          });
        })
      );
    }

    if (config.trackVisibility !== false) {
      cleanupFunctions.push(
        setupVisibilityTracking((event) => {
          trackInternal(event);
        })
      );
    }

    cleanupFunctions.push(setupSessionHeartbeat(sessionManager));

    cleanupFunctions.push(
      setupSessionTracking(
        {
          track: trackInternal,
          flush: () => queue.flush(),
        },
        sessionManager
      )
    );
  }

  return {
    track: trackInternal,
    flush: () => queue.flush(),
    destroy(): void {
      sessionManager.endSession();
      cleanupFunctions.forEach((cleanup) => {
        try {
          cleanup();
        } catch {}
      });
      queue.destroy();
    },
  };
}
