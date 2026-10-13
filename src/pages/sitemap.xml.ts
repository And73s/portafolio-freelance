import type { APIRoute } from "astro";
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["es", "en"].map((lang) => `<url><loc>${new URL(`${import.meta.env.BASE_URL.replace(/\/$/, "")}/${lang}/`, site)}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
