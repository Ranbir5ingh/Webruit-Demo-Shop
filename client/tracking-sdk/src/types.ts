// tracking-sdk/src/types.ts

export interface TrackingConfig {
  projectKey: string;
  endpoint?: string;
  batchSize?: number;
  flushInterval?: number;
  autoTrack?: boolean;
  trackPerformance?: boolean;
  trackVisibility?: boolean;
  trackScrollDepth?: boolean;
  trackRageClicks?: boolean;
  trackExitIntent?: boolean;
  trackFormEvents?: boolean;
  sampleRate?: number;
}

export type TrackingEventType =
  | 'page_view'
  | 'page_exit'
  | 'click'
  | 'rage_click'
  | 'visibility'
  | 'performance'
  | 'scroll_depth'
  | 'exit_intent'
  | 'form_start'
  | 'form_abandon'
  | 'form_submit'
  | 'form_error'
  | 'session_end'
  | 'custom';

export interface ElementRect {
  top: number;
  height: number;
}

export interface TrackingEventMetadata {
  title?: string;
  referrer?: string;
  x?: number;
  y?: number;
  elementType?: string;
  text?: string;
  depth?: number;
  timeToReachMs?: number;
  visibleTimeMs?: number;
  scrollDepth?: number;
  elementRect?: ElementRect;
  cls?: number;
  lcp?: number;
  inp?: number;
  ttfb?: number;
  sessionId?: string;
  durationMs?: number;
  pageCount?: number;
  totalClicks?: number;
  scrolled?: boolean;
  maxScrollDepth?: number;
  bounced?: boolean;
  clickCount?: number;
  timeWindowMs?: number;
  timeOnPageMs?: number;
  mouseY?: number;
  timestamp?: number;
  fieldCount?: number;
  formAction?: string;
  fieldsInteracted?: number;
  timeSpentMs?: number;
  timeToSubmitMs?: number;
  fieldName?: string;
  fieldType?: string;
  validationMessage?: string;
  [key: string]: unknown;
}

export interface TrackingEventPayload {
  type: TrackingEventType;
  path?: string;
  componentId?: string;
  elementId?: string;
  metadata?: TrackingEventMetadata;
  timestamp: number;
}

export interface WebruitClient {
  track(event: TrackingEventPayload): void;
  flush(): void;
  destroy(): void;
}