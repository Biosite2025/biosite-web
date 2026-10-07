'use client';

import { MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';
import EventShowcase from './components/EventShowcase';
import EventGallery from './components/EventGallery';
import EventCalendar from './components/EventCalendar';
import Footer from './components/Footer';

// Shared decorative backdrop (same as the About page) — client-only chunk.
const FloatingLines = dynamic(() => import('../about/components/FloatingLines'), { ssr: false });

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        {/* Fixed animated backdrop behind every non-hero section. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-white">
          <FloatingLines lineColor="#16A4FF" altColor="#005EFF" opacity={0.55} altOpacity={0.5} />
        </div>

        <main className="relative z-10 min-h-screen pt-16 lg:pt-0">
          <EventShowcase />
          <EventGallery />
          <EventCalendar />
          <Footer />
        </main>
      </div>
    </MotionConfig>
  );
}
