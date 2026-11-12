/** Single source for SEO metadata, the sitemap, JSON-LD and share images. */

// Set NEXT_PUBLIC_SITE_URL to the real domain (e.g. https://example.com) in the
// hosting dashboard. On Vercel it falls back to the production URL it provides.
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  url: fromEnv.replace(/\/$/, ""),
  name: "Eunice Moh Hau Yan",
  shortName: "Eunice Moh",
  role: "Assistant Architect & Interior Designer",
  locality: "Kuala Lumpur",
  country: "MY",
};
