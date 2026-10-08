'use client';

import { MotionConfig } from 'framer-motion';
import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Stats from './components/Stats';
import AwardsRecognitions from './components/AwardsRecognitions';
import MissionVision from './components/MissionVision';
import CoreValues from './components/CoreValues';
import Community from './components/Community';
import OurOffices from './components/OurOffices';
import Footer from './components/Footer';

// Decorative WebGL backdrop — loaded client-side only, as its own chunk, so
// three.js never blocks the hero's first paint.
const FloatingLines = dynamic(() => import('./components/FloatingLines'), { ssr: false });

export default function AboutPage() {
  return (
    // reducedMotion="user" makes every framer-motion animation drop transform
    // (x/y/scale/rotate) for visitors who prefer reduced motion — only opacity
    // fades remain. Honors WCAG 2.1 across all sections from one place.
    <MotionConfig reducedMotion="user">
      <div className="relative">
        {/* One shared, fixed animated backdrop (white base + soft brand-blue
            floating lines) sits behind every non-hero section. The hero, the
            solid Stats band, and the footer are opaque and cover it; the body
            sections are translucent so the lines read across the whole page.
            Single WebGL context = performant; honors prefers-reduced-motion. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-white">
          <FloatingLines lineColor="#16A4FF" altColor="#005EFF" opacity={0.55} altOpacity={0.5} pauseWhileCoveredBy="#hero" />
        </div>

        <main className="relative z-10 min-h-screen pt-16 lg:pt-0">
          <HeroSection />
          <AboutUs />
          <Stats />
          <AwardsRecognitions />
          <MissionVision />
          <CoreValues />
          <Community />
          <OurOffices />
          <Footer />
        </main>
      </div>
    </MotionConfig>
  );
}
