import type { ImageLoaderProps } from 'next/image';

/**
 * Custom next/image loader — keeps ALL image processing off our server.
 *
 * Every image the site shows is already web-sized: local files in /public and
 * pre-optimised WebP/JPEG on the DigitalOcean Spaces CDN. Letting Next.js
 * re-encode them on the server (sharp, AVIF) was a major source of RAM use and
 * adds nothing, so every src is served exactly as-is.
 */
export default function passthroughLoader({ src }: ImageLoaderProps): string {
  return src;
}
