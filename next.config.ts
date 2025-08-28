import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove output: 'export' to enable API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['cdn.sanity.io'], // Add your Sanity CDN domain
  },
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  },
  // Ensure static assets are properly copied for Cloudflare Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  serverExternalPackages: [],
};

export default nextConfig;
