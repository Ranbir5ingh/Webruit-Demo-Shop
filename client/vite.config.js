// vite.config.ts - CLEAN OUT-OF-THE-BOX SETUP
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import webruit from "@webruit/build-plugin/vite";
import {webruitBabelPlugin} from "@webruit/build-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              webruitBabelPlugin,
              {
                debug: true,
              },
            ],
          ],
        },
      }),
      webruit({
        projectId: env.VITE_WEBRUIT_PROJECT_ID || "test-project",
        uploadEndpoint: env.VITE_WEBRUIT_UPLOAD_ENDPOINT,
        projectKey: env.VITE_WEBRUIT_PROJECT_KEY,
        debug: true,
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});