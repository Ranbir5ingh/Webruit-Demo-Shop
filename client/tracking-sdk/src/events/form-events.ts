// tracking-sdk/src/events/form-events.ts

import type { WebruitClient, TrackingEventPayload } from '../types';

interface FormSession {
  formId: string;
  startTime: number;
  firstFieldFocused: boolean;
  fieldsInteracted: Set<string>;
}

function isValidElementId(id: string): boolean {
  return /^wb_el_[a-f0-9]{8}$/.test(id);
}

export function setupFormTracking(client: WebruitClient): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const formSessions = new Map<string, FormSession>();

  const getFormId = (form: HTMLFormElement): string | null => {
    const formId = form.getAttribute('data-wb-el-id');

    if (formId && isValidElementId(formId)) {
      return formId;
    }

    return form.id || form.name || null;
  };

  const handleFocus = (e: FocusEvent): void => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const isFormField = ['input', 'select', 'textarea'].includes(
      target.tagName.toLowerCase()
    );

    if (!isFormField) return;

    const form = (target as HTMLInputElement).form;
    if (!form) return;

    const formId = getFormId(form);
    if (!formId) return;

    let session = formSessions.get(formId);

    if (!session) {
      session = {
        formId,
        startTime: Date.now(),
        firstFieldFocused: true,
        fieldsInteracted: new Set(),
      };
      formSessions.set(formId, session);

      const sectionElement = form.closest('[data-wb-id]');
      const componentId = sectionElement?.getAttribute('data-wb-id');

      const event: TrackingEventPayload = {
        type: 'form_start',
        elementId: formId,
        componentId: componentId || undefined,
        metadata: {
          fieldCount: form.elements.length,
          formAction: form.action,
        },
        timestamp: Date.now(),
      };

      client.track(event);
    }

    const fieldId = (target as HTMLInputElement).name || 
                    (target as HTMLInputElement).id;

    if (fieldId) {
      session.fieldsInteracted.add(fieldId);
    }
  };

  const handleSubmit = (e: SubmitEvent): void => {
    const form = e.target as HTMLFormElement | null;
    if (!form) return;

    const formId = getFormId(form);
    if (!formId) return;

    const session = formSessions.get(formId);
    const timeToSubmitMs = session 
      ? Date.now() - session.startTime 
      : 0;

    const sectionElement = form.closest('[data-wb-id]');
    const componentId = sectionElement?.getAttribute('data-wb-id');

    const event: TrackingEventPayload = {
      type: 'form_submit',
      elementId: formId,
      componentId: componentId || undefined,
      metadata: {
        timeToSubmitMs,
        fieldsInteracted: session ? session.fieldsInteracted.size : 0,
        fieldCount: form.elements.length,
      },
      timestamp: Date.now(),
    };

    client.track(event);

    formSessions.delete(formId);
  };

  const handleAbandon = (): void => {
    for (const [formId, session] of formSessions.entries()) {
      if (!session.firstFieldFocused) continue;

      const form = document.querySelector(
        `form[data-wb-el-id="${formId}"]`
      ) as HTMLFormElement | null;

      const sectionElement = form?.closest('[data-wb-id]');
      const componentId = sectionElement?.getAttribute('data-wb-id');

      const event: TrackingEventPayload = {
        type: 'form_abandon',
        elementId: formId,
        componentId: componentId || undefined,
        metadata: {
          timeSpentMs: Date.now() - session.startTime,
          fieldsInteracted: session.fieldsInteracted.size,
        },
        timestamp: Date.now(),
      };

      client.track(event);
    }

    client.flush();
  };

  const handleInvalid = (e: Event): void => {
    const target = e.target as HTMLInputElement | null;
    if (!target) return;

    const form = target.form;
    if (!form) return;

    const formId = getFormId(form);
    if (!formId) return;

    const sectionElement = form.closest('[data-wb-id]');
    const componentId = sectionElement?.getAttribute('data-wb-id');

    const event: TrackingEventPayload = {
      type: 'form_error',
      elementId: formId,
      componentId: componentId || undefined,
      metadata: {
        fieldName: target.name || target.id,
        fieldType: target.type,
        validationMessage: target.validationMessage,
      },
      timestamp: Date.now(),
    };

    client.track(event);
  };

  document.addEventListener('focus', handleFocus, { 
    passive: true, 
    capture: true 
  });

  document.addEventListener('submit', handleSubmit);
  document.addEventListener('invalid', handleInvalid, { capture: true });
  window.addEventListener('beforeunload', handleAbandon);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      handleAbandon();
    }
  });

  return () => {
    document.removeEventListener('focus', handleFocus);
    document.removeEventListener('submit', handleSubmit);
    document.removeEventListener('invalid', handleInvalid);
    window.removeEventListener('beforeunload', handleAbandon);

    formSessions.clear();
  };
}