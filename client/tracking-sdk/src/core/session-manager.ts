// tracking-sdk/src/core/session-manager.ts

const VISITOR_KEY = '__webruit_visitor_id';
const SESSION_KEY = '__webruit_session_id';
const SESSION_START_KEY = '__webruit_session_start';
const LAST_ACTIVITY_KEY = '__webruit_last_activity';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

interface SessionEndCallback {
  (session: SessionMetrics): void;
}

export interface SessionMetrics {
  visitorId: string;
  sessionId: string;
  startTime: number;
  endTime: number;
  durationMs: number;
  pageCount: number;
  clickCount: number;
  scrollDepth: number;
  hasScrolled: boolean;
  bounced: boolean;
}

export class SessionManager {
  private visitorId: string;
  private sessionId: string;
  private sessionStartTime: number;
  private lastActivityTime: number;
  private sessionEnded = false;
  private endCallbacks = new Set<SessionEndCallback>();

  private pageCount = 0;
  private clickCount = 0;
  private scrollDepth = 0;
  private hasScrolled = false;

  constructor() {
    this.visitorId = this.initVisitorId();
    const { sessionId, startTime } = this.initSession();
    this.sessionId = sessionId;
    this.sessionStartTime = startTime;
    this.lastActivityTime = Date.now();
  }

  isEnded(): boolean {
    return this.sessionEnded;
  }

  private initVisitorId(): string {
    let id = this.getFromStorage(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      this.setToStorage(VISITOR_KEY, id);
    }
    return id;
  }

  private initSession(): { sessionId: string; startTime: number } {
    const now = Date.now();
    let sessionId = this.getFromStorage(SESSION_KEY);
    let startTime = this.getStorageNumber(SESSION_START_KEY);
    const lastActivity = this.getStorageNumber(LAST_ACTIVITY_KEY);

    const expired =
      lastActivity > 0 && now - lastActivity > SESSION_TIMEOUT_MS;

    if (!sessionId || !startTime || expired) {
      sessionId = crypto.randomUUID();
      startTime = now;
      this.setToStorage(SESSION_KEY, sessionId);
      this.setToStorage(SESSION_START_KEY, String(startTime));
    }

    this.setToStorage(LAST_ACTIVITY_KEY, String(now));
    return { sessionId, startTime };
  }

  getVisitorId(): string {
    return this.visitorId;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  recordActivity(): void {
    if (this.sessionEnded) return;
    this.lastActivityTime = Date.now();
    this.setToStorage(LAST_ACTIVITY_KEY, String(this.lastActivityTime));
  }

  recordPageView(): void {
    if (!this.sessionEnded) this.pageCount++;
  }

  recordClick(): void {
    if (!this.sessionEnded) this.clickCount++;
  }

  recordScroll(depth: number): void {
    if (this.sessionEnded) return;
    this.hasScrolled = true;
    this.scrollDepth = Math.max(this.scrollDepth, depth);
  }

  checkTimeout(): void {
    if (this.sessionEnded) return;
    if (Date.now() - this.lastActivityTime > SESSION_TIMEOUT_MS) {
      this.endSession();
    }
  }

  onSessionEnd(cb: SessionEndCallback): void {
    this.endCallbacks.add(cb);
  }

  endSession(): void {
    if (this.sessionEnded) return;
    this.sessionEnded = true;

    const endTime = Date.now();
    const durationMs = endTime - this.sessionStartTime;
    const bounced = durationMs < 30000 || this.pageCount <= 1;

    const metrics: SessionMetrics = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      startTime: this.sessionStartTime,
      endTime,
      durationMs,
      pageCount: this.pageCount,
      clickCount: this.clickCount,
      scrollDepth: this.scrollDepth,
      hasScrolled: this.hasScrolled,
      bounced,
    };

    this.endCallbacks.forEach((cb) => {
      try {
        cb(metrics);
      } catch {}
    });

    this.removeFromStorage(SESSION_KEY);
    this.removeFromStorage(SESSION_START_KEY);
    this.removeFromStorage(LAST_ACTIVITY_KEY);
  }

  private getFromStorage(key: string): string | null {
    try {
      return sessionStorage.getItem(key) || localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private getStorageNumber(key: string): number {
    const value = this.getFromStorage(key);
    return value ? parseInt(value, 10) : 0;
  }

  private setToStorage(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      try {
        localStorage.setItem(key, value);
      } catch {}
    }
  }

  private removeFromStorage(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  }
}
