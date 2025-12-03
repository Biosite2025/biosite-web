import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // CORS headers for API routes
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Allow all origins (or specify: 'https://biosite-admin.onrender.com')
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Cache for 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dmvyhrewy/**',
      },
    ],
    unoptimized: false, // Ensure Next.js optimization is enabled
  },
  // Enable compression
  compress: true,
  // Production optimizations
  reactStrictMode: true,
  // Output configuration for better performance
  output: 'standalone',
  // Reduce memory usage
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  // Allow build to succeed with warnings
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
