import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable Edge runtime for faster response times if needed
  // experimental: {
  //   runtime: 'edge',
  // },
};

export default nextConfig;
