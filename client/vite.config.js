import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { webruit } from "@webruit/build-plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      // Must run before the React plugin: injects data-wb-* ids, and on
      // `vite build` writes + uploads .webruit/manifest.json.
      webruit({
        projectId: env.WEBRUIT_PROJECT_ID || env.VITE_WEBRUIT_PROJECT_ID,
        secretKey: env.WEBRUIT_SECRET_KEY,
        apiUrl: env.WEBRUIT_API_URL,
        // Prod: set WEBRUIT_DOMAIN=example.com -> uploads to https://api.example.com
        domain: env.WEBRUIT_DOMAIN || env.VITE_WEBRUIT_DOMAIN,
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});