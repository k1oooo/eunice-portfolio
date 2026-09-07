import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All project imagery is local static assets. Skip Next's built-in
    // re-encode/resize pass so every image is served at its original file
    // resolution and quality instead of a recompressed, potentially
    // upscaled variant.
    unoptimized: true,
  },
};

export default nextConfig;
