// tracking-sdk/src/events/click.ts

import type { WebruitClient, TrackingEventPayload } from '../types';

function isValidComponentId(id: string): boolean {
  return /^wb_c_[a-f0-9]{8}$/.test(id);
}

function isValidElementId(id: string): boolean {
  return /^wb_el_[a-f0-9]{8}$/.test(id);
}

export function setupClickTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const elementId = target.getAttribute('data-wb-el-id');

    if (!elementId || !isValidElementId(elementId)) {
      return;
    }

    const sectionElement = target.closest('[data-wb-id]');
    const componentId = sectionElement?.getAttribute('data-wb-id');

    if (componentId && !isValidComponentId(componentId)) {
      return;
    }

    const elementType = target.tagName.toLowerCase();

    const event: TrackingEventPayload = {
      type: 'click',
      elementId,
      componentId: componentId || undefined,
      metadata: {
        x: e.clientX,
        y: e.clientY,
        elementType,
        ...((['a', 'button'].includes(elementType)) && {
          text: target.textContent?.trim().substring(0, 50),
        }),
      },
      timestamp: Date.now(),
    };

    client.track(event);
  };

  document.addEventListener('click', handleClick, { passive: true });

  return () => {
    document.removeEventListener('click', handleClick);
  };
}