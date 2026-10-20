// Single source of runtime endpoints. Dev defaults to localhost; for prod set
// VITE_SHOP_API_DOMAIN / VITE_WEBRUIT_DOMAIN (or the explicit URLs) at build time.
const env = import.meta.env;
const isProd = env.PROD;

const fromDomain = (domain, path = "") => (domain ? `https://${domain}${path}` : "");

const webruitApi =
  env.VITE_WEBRUIT_API_URL ||
  fromDomain(env.VITE_WEBRUIT_DOMAIN && `api.${env.VITE_WEBRUIT_DOMAIN}`) ||
  (isProd ? "" : "http://localhost:3000");

export const config = {
  apiUrl:
    env.VITE_API_URL || fromDomain(env.VITE_SHOP_API_DOMAIN) || (isProd ? "" : "http://localhost:5000"),
  webruit: {
    projectKey: env.VITE_WEBRUIT_PROJECT_KEY || "",
    trackEndpoint: env.VITE_WEBRUIT_TRACK_ENDPOINT || (webruitApi ? `${webruitApi}/v1/track` : ""),
  },
};