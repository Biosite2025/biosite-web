'use client';

import HamamatsuSlideScanner from './hamamatsusliderscanner';
import Footer from './Footer';


export default function ProductPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      <HamamatsuSlideScanner />
      <Footer />
    </div>
  );
}
