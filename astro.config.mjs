import { defineConfig } from "astro/config";
export default defineConfig({
  site: process.env.SITE_URL || "https://example.com",
  base: process.env.BASE_PATH || "/",
  output: "static",
  trailingSlash: "always",
  vite: { worker: { format: "es" } },
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
