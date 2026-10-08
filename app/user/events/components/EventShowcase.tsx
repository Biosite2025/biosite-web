'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, FOCUS_RING } from '../../about/components/motionShared';

/** How long the "See the highlights" scroll takes, in ms. Raise to slow it. */
const SCROLL_DURATION = 1400;

/** Slow start, slow finish — reads as a deliberate glide rather than a jump. */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const EventShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  /**
   * The anchor's default behaviour is an instant jump. This tweens the scroll
   * over a fixed duration instead, offset by the sticky nav so the section
   * heading isn't left underneath it.
   */
  const scrollToHighlights = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById('snaps');
      if (!target) return; // let the browser handle it normally
      e.preventDefault();

      const nav = document.querySelector('[data-topnav="true"]');
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const destination = Math.max(0, window.scrollY + target.getBoundingClientRect().top - navHeight);

      if (reducedMotion) {
        window.scrollTo({ top: destination, behavior: 'auto' });
        return;
      }

      const start = window.scrollY;
      const distance = destination - start;
      let startTime: number | null = null;
      let cancelled = false;

      // Let the viewer take back control the moment they scroll themselves.
      const cancel = () => {
        cancelled = true;
      };
      window.addEventListener('wheel', cancel, { passive: true, once: true });
      window.addEventListener('touchstart', cancel, { passive: true, once: true });

      const step = (now: number) => {
        if (cancelled) return cleanup();
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / SCROLL_DURATION, 1);
        window.scrollTo({ top: start + distance * easeInOutCubic(progress), behavior: 'auto' });
        if (progress < 1) requestAnimationFrame(step);
        else cleanup();
      };

      const cleanup = () => {
        window.removeEventListener('wheel', cancel);
        window.removeEventListener('touchstart', cancel);
      };

      requestAnimationFrame(step);
    },
    [reducedMotion]
  );

  // Pause the background video while the hero is scrolled out of view (and
  // resume when it's back), so it isn't decoding frames nobody can see.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const t = setTimeout(() => {
      video.play().catch(() => {});
    }, 100);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  return (
    <section
      id="events-hero"
      aria-labelledby="events-hero-title"
      className="relative w-full overflow-hidden lg:h-screen h-[calc(100vh-64px)] lg:mt-0 mt-[-64px] flex items-center justify-center"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          preload="auto"
          poster="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/image.webp"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source src="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/My_Video10.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient while the video loads */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#22409A] via-[#2B7CD3] to-[#1A3078] transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} />
        {/* Legibility scrim — dark brand wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1633]/70 via-[#0d1633]/55 to-[#0d1633]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center text-white">
        

        <motion.h1
          id="events-hero-title"
          className="font-extrabold leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5.4vw, 3.6rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        >
          Moments that move healthcare forward
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-blue-50/90"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          Conferences, trainings, and community outreach capturing the energy, innovation, and
          connections that make our events truly special.
        </motion.p>

        <motion.a
          href="#snaps"
          onClick={scrollToHighlights}
          className={`mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#22409A] shadow-lg transition-all duration-300 hover:bg-blue-50 ${FOCUS_RING} focus-visible:ring-offset-transparent`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
        >
          See the highlights
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
};

export default EventShowcase;
