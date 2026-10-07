import { notFound } from 'next/navigation';

// Hamamatsu Slide Scanners page is disabled — visitors get a 404.
// To restore, render <HamamatsuSlideScanner /> and <Footer /> again
// (see ./hamamatsusliderscanner.tsx) and re-add the nav/sitemap entries.
export default function ProductPage() {
  notFound();
}
