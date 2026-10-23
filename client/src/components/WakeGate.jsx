import { useEffect, useState } from "react";
import {
  WAKE_GRACE_MS,
  WAKE_TIMEOUT_MS,
  formatElapsed,
  hostShouldGate,
  probeWake,
  resetWakeHolds,
  wakeDelayMs,
  wakeMessage,
  wakeProgress,
} from "@/lib/wake";

// Wake-up gate: this demo is tracked by the live Webruit backend, which
// runs on free hosting and naps when idle. The gate wakes it (and proves
// tracking is live) before the shop renders. The shop itself is fully
// static — after a long wait the visitor can enter anyway.
function WakeScreen({ message, elapsedLabel, progress, failed, leaving, onRetry, onEnterAnyway }) {
  const percent = Math.round(progress * 100);
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#fafafa] px-6 transition-opacity duration-700"
      style={{ opacity: leaving ? 0 : 1, pointerEvents: leaving ? "none" : "auto" }}
    >
      <div className="w-full max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-black/50 font-medium">
          ResumeKit <span className="bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">Pro</span>
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-toboggan-medium text-[#0a0a0a]">
          Getting the store ready
        </h1>
        <div className="mt-5" role="status" aria-live="polite" aria-busy={!failed}>
          <p className="text-[0.95rem] leading-7 text-black/60">
            {failed ? "The Webruit engine did not wake in time." : message}
          </p>
        </div>
        <div
          className="mt-8 h-[3px] rounded-full bg-black/10 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Server wake-up"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-[0.7rem] uppercase tracking-[0.16em] text-black/40">
          Elapsed {elapsedLabel}
        </p>
        <p className="mt-6 text-[0.8rem] leading-6 text-black/45">
          This demo is tracked live by Webruit. Its backend sleeps on free
          hosting — this screen holds it awake so your visit is measured
          for real.
        </p>
        {failed ? (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRetry}
              autoFocus
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-[0.9rem] font-medium px-5 py-3 rounded-xl hover:opacity-90 transition font-toboggan-regular"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={onEnterAnyway}
              className="bg-white text-[#0a0a0a] text-[0.9rem] font-medium px-5 py-3 rounded-xl border border-black/10 hover:bg-gray-50 transition font-toboggan-regular"
            >
              Enter the store anyway
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function WakeGate({ children }) {
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState("checking"); // checking | ready | failed
  const [elapsed, setElapsed] = useState(0);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!hostShouldGate(window.location.hostname)) {
      setPhase("ready");
      return;
    }
    let cancelled = false;
    const started = Date.now();
    setPhase("checking");
    setElapsed(0);
    setArmed(false);
    const grace = setTimeout(() => {
      if (!cancelled) setArmed(true);
    }, WAKE_GRACE_MS);
    const clock = setInterval(() => {
      if (!cancelled) setElapsed(Date.now() - started);
    }, 1000);

    async function run() {
      let tries = 0;
      while (!cancelled) {
        const up = await probeWake();
        if (cancelled) return;
        const elapsedMs = Date.now() - started;
        setElapsed(elapsedMs);
        if (up) {
          setPhase("ready");
          clearInterval(clock);
          return;
        }
        if (elapsedMs > WAKE_TIMEOUT_MS) {
          setPhase("failed");
          clearInterval(clock);
          return;
        }
        tries += 1;
        await new Promise((resolve) => setTimeout(resolve, wakeDelayMs(tries)));
      }
    }

    run();
    return () => {
      cancelled = true;
      clearTimeout(grace);
      clearInterval(clock);
      resetWakeHolds();
    };
  }, [attempt]);

  const block = !dismissed && phase !== "ready" && (phase === "failed" || armed);

  useEffect(() => {
    if (block) {
      setShown(true);
      setLeaving(false);
      return;
    }
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(false);
      return;
    }
    setLeaving(true);
    const timer = window.setTimeout(() => {
      setShown(false);
      setLeaving(false);
    }, 720);
    return () => window.clearTimeout(timer);
  }, [block, shown]);

  const screen = (
    <WakeScreen
      message={wakeMessage(elapsed, phase === "ready")}
      elapsedLabel={formatElapsed(elapsed)}
      progress={wakeProgress(elapsed, phase === "ready")}
      failed={phase === "failed"}
      leaving={leaving}
      onRetry={() => setAttempt((v) => v + 1)}
      onEnterAnyway={() => setDismissed(true)}
    />
  );

  if (!shown) return children;
  if (block && !leaving) return screen;
  return (
    <>
      {children}
      {screen}
    </>
  );
}
