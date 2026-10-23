// Wake-up gate logic — the Webruit API runs on free hosting that naps when
// idle, and Render only spins an instance up while a request stays
// connected. So the gate (1) holds a no-cors request open against /health
// to trigger the spin-up, and (2) polls /health until it answers
// { ok: true }, then lets the site render. Same strategy as RTO Shield's
// WakeGate, pointed at the Webruit backend — which is also the service
// that tracks this demo, so a woken API means live tracking too.
import { webruitApiBase } from "./config";

export const HEALTH_URL = `${webruitApiBase}/health`;
export const WAKE_TIMEOUT_MS = 150_000;
export const WAKE_GRACE_MS = 400;
export const WAKE_PING_MS = 8_000;
export const WAKE_HOLD_MS = 75_000;

export const WAKE_MESSAGES = [
  "Waking up the Webruit engine (free hosting naps when idle)…",
  "Warming up live tracking…",
  "Almost there — usually under a minute",
];

export function wakeDelayMs(attempt) {
  const steps = [3_000, 4_000, 5_000];
  return steps[Math.min(Math.max(attempt, 0), steps.length - 1)];
}

export function formatElapsed(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function wakeMessage(elapsedMs, up) {
  if (elapsedMs >= 70_000) {
    return "Still waking. Free servers sometimes need a bit over a minute.";
  }
  if (up) return WAKE_MESSAGES[1];
  const index = Math.floor(elapsedMs / 4_500) % WAKE_MESSAGES.length;
  return WAKE_MESSAGES[index];
}

export function wakeProgress(elapsedMs, up) {
  if (up) return 1;
  return Math.min(0.9, 0.18 + elapsedMs / 140_000);
}

/** Local dev never gates — the developer runs their own API. */
export function hostShouldGate(hostname) {
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") return false;
  return true;
}

function responseIsUp(status, body) {
  if (status < 200 || status >= 300) return false;
  return body?.ok === true;
}

async function readHealth(url, timeoutMs) {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      credentials: "omit",
      signal: AbortSignal.timeout(timeoutMs),
    });
    const body = await response.json().catch(() => null);
    return responseIsUp(response.status, body);
  } catch {
    return false;
  }
}

const holds = new Map();

/** One in-flight no-cors request per URL, held open up to WAKE_HOLD_MS.
 *  Its completion is ignored — readiness is read separately. */
export function holdWake(url, holdMs = WAKE_HOLD_MS) {
  if (!url || holds.has(url)) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), holdMs);
  holds.set(url, { controller });
  fetch(url, {
    mode: "no-cors",
    cache: "no-store",
    credentials: "omit",
    keepalive: true,
    signal: controller.signal,
  })
    .catch(() => undefined)
    .finally(() => {
      clearTimeout(timer);
      const current = holds.get(url);
      if (current?.controller === controller) holds.delete(url);
    });
}

export function resetWakeHolds() {
  for (const hold of holds.values()) hold.controller.abort();
  holds.clear();
}

/** Hold the wake request open, then ask whether the API is healthy. */
export async function probeWake() {
  holdWake(HEALTH_URL);
  return readHealth(HEALTH_URL, WAKE_PING_MS);
}
