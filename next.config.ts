import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Custom loader → the app server NEVER downloads/decodes/re-encodes images.
    // Cloudinary resizes via URL transforms; Spaces CDN and /public are served
    // as-is. This removes sharp from the request path entirely, which was the
    // single largest source of RAM growth. See ./image-loader.ts.
    loader: 'custom',
    loaderFile: './image-loader.ts',
    // Still used to build the srcset width candidates handed to the loader.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Production optimizations
  reactStrictMode: true,
  // Ships only the files actually needed to run, which trims the container's
  // resident footprint on App Platform.
  output: 'standalone',
  // Reduce memory usage
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  // Allow build to succeed with warnings
  typescript: {
    ignoreBuildErrors: false,
  },
  // 3D models are immutable content-addressed assets — cache them hard so the
  // trophy is only ever downloaded once per visitor.
  async headers() {
    return [
      {
        source: '/asset/:path*.glb',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
