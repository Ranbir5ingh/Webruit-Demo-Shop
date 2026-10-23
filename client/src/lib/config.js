// Single source of runtime endpoints — Webruit only.
// This demo shop has NO backend of its own: payments/checkout are dummy
// flows stored in the browser (see store/admin/payment-slice). The only
// server this site talks to is the Webruit API, via @webruit/tracking.
//
// Prod needs no URL config at all: the tracking package defaults to
// https://api.webruit.tech. The vars below only point the demo at a LOCAL
// Webruit API during development.
const env = import.meta.env;
const isProd = env.PROD;

const fromDomain = (domain, path = "") => (domain ? `https://${domain}${path}` : "");

const webruitApi =
  env.VITE_WEBRUIT_API_URL ||
  fromDomain(env.VITE_WEBRUIT_DOMAIN && `api.${env.VITE_WEBRUIT_DOMAIN}`) ||
  (isProd ? "" : "http://localhost:3000");

/** Webruit API base — the production cloud whenever nothing overrides it.
 *  Used by the wake-up gate to ping /health. */
export const webruitApiBase = webruitApi || "https://api.webruit.tech";

export const config = {
  webruit: {
    projectKey: env.VITE_WEBRUIT_PROJECT_KEY || "",
    trackEndpoint: env.VITE_WEBRUIT_TRACK_ENDPOINT || (webruitApi ? `${webruitApi}/v1/track` : ""),
  },
};
