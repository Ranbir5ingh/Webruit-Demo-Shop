// tracking-sdk/src/index.ts

import { createClient } from './core/client';
import { trackPageView, setupSPAPageViewTracking } from './events/page-view';
import { setupPageExitTracking } from './events/page-exit';
import { setupClickTracking } from './events/click';
import { setupScrollTracking } from './events/scroll';
import { setupRageClickTracking } from './events/rage-click';
import { setupExitIntentTracking } from './events/exit-intent';
import { setupFormTracking } from './events/form-events';
import type { WebruitClient, TrackingConfig } from './types';

declare global {
  interface Window {
    webruit?: WebruitClient & { destroy(): void };
  }
}

(function bootstrap() {
  const script = document.currentScript as HTMLScriptElement | null;
  const projectKey = script?.getAttribute('data-project-key');

  if (!projectKey) {
    console.warn('[Webruit] No project key provided');
    return;
  }

  try {
    const config: TrackingConfig = {
      projectKey,
      autoTrack: true,
      trackPerformance: true,
      trackVisibility: true,
    };

    const client = createClient(config);
    
    trackPageView(client);

    const cleanupFunctions: (() => void)[] = [];

    const isSPA = 
      typeof history.pushState === 'function' && 
      typeof history.replaceState === 'function';

    if (isSPA) {
      cleanupFunctions.push(setupSPAPageViewTracking(client));
    }

    cleanupFunctions.push(setupPageExitTracking(client));
    cleanupFunctions.push(setupClickTracking(client));

    if (config.trackScrollDepth !== false) {
      cleanupFunctions.push(setupScrollTracking(client));
    }

    if (config.trackRageClicks !== false) {
      cleanupFunctions.push(setupRageClickTracking(client));
    }

    if (config.trackExitIntent !== false) {
      cleanupFunctions.push(setupExitIntentTracking(client));
    }

    if (config.trackFormEvents !== false) {
      cleanupFunctions.push(setupFormTracking(client));
    }

    window.webruit = {
      track: client.track.bind(client),
      flush: client.flush.bind(client),
      destroy: () => {
        client.destroy();
        cleanupFunctions.forEach((cleanup) => {
          try {
            cleanup();
          } catch (e) {
            console.warn('[Webruit] Cleanup error:', e);
          }
        });
      },
    };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Webruit] Failed to initialize:', error);
  }
})();

export { createClient } from './core/client';
export { trackPageView } from './events/page-view';
export { setupPageExitTracking } from './events/page-exit';
export { setupClickTracking } from './events/click';
export { setupRageClickTracking } from './events/rage-click';
export { setupExitIntentTracking } from './events/exit-intent';
export { setupFormTracking } from './events/form-events';

export type {
  TrackingConfig,
  TrackingEventType,
  TrackingEventPayload,
  WebruitClient,
} from './types';