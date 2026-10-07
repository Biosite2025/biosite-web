import type { ImageLoaderProps } from 'next/image';

/**
 * Custom next/image loader — keeps ALL image processing off our server.
 *
 * Why this exists: by default Next.js optimises every <Image> on the server.
 * For a remote image that means downloading the original into the app, decoding
 * it with sharp, re-encoding to AVIF/WebP, and caching it. AVIF encoding in
 * particular is very memory hungry, and this project points ~418 <Image> usages
 * at remote CDNs (DigitalOcean Spaces + Cloudinary). That work was a primary
 * driver of the app's RAM usage — and it is redundant, because those assets are
 * already sitting on a CDN.
 *
 * With this loader the app server never touches image bytes:
 *   • Cloudinary  → hand the resize to Cloudinary via URL transforms (free,
 *                   still fully responsive per breakpoint).
 *   • Spaces CDN  → serve straight from the CDN, untouched.
 *   • local files → serve the static file from /public, untouched.
 */

const CLOUDINARY_HOST = 'res.cloudinary.com';
const UPLOAD_MARK = '/image/upload/';

/** Detects an existing Cloudinary transform segment, e.g. "w_800,q_auto,f_auto". */
const isTransformSegment = (segment: string) => /(^|,)[a-z]{1,2}_/.test(segment);

export default function cdnImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // ---- Cloudinary: let their CDN do the resizing --------------------------
  if (src.includes(CLOUDINARY_HOST) && src.includes(UPLOAD_MARK)) {
    const [base, rest] = src.split(UPLOAD_MARK);
    const segments = rest.split('/');
    const first = segments[0];

    if (isTransformSegment(first)) {
      // Preserve the author's transforms (q_auto, f_auto, crops…) but swap in
      // the width Next asks for, so srcset stays genuinely responsive.
      const params = first
        .split(',')
        .filter((p) => !p.startsWith('w_'))
        .concat(`w_${width}`);
      return `${base}${UPLOAD_MARK}${params.join(',')}/${segments.slice(1).join('/')}`;
    }

    const q = quality ?? 'auto';
    return `${base}${UPLOAD_MARK}w_${width},q_${q},f_auto/${rest}`;
  }

  // ---- Spaces CDN and local /public assets: pass straight through ---------
  return src;
}
