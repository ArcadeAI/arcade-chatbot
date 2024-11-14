import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
    ],
  },
};

export default nextConfig;
