'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { EASE } from '../../about/components/motionShared';
import { BUTTON_BASE, WRAP } from './EventsHeading';

const HERO_POSTER = 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/image.webp';
/** The heading, one entry per line: each line rises out of its own mask. */
const HERO_LINES = ['Moments that move', 'healthcare forward'];

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
  const glideTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
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

  // The entrance, once on load (taste-skill's hero timing): each line of the
  // heading rises out of its own mask, 80ms apart; then the lead and the
  // buttons fade up 12px, 60ms apart; the picture settles from 1.05 to 1.
  const lineIn = (i: number) => ({
    initial: { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.08 },
  });
  const fadeUp = (i: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.52, ease: EASE, delay: 0.5 + i * 0.06 },
  });

  return (
    <section
      id="events-hero"
      aria-labelledby="events-hero-title"
      className="relative flex w-full items-end overflow-hidden lg:h-[calc(var(--vh,1vh)*100)] h-[calc(calc(var(--vh,1vh)*100)-64px)] lg:mt-0 mt-[-64px]"
    >
      {/* Background: the poster photograph shows at once, the video fades in over it. */}
      <motion.div
        className="absolute inset-0 bg-[#0d1633]"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Image src={HERO_POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source src="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/events-hero-web.mp4" type="video/mp4" />
        </video>
        {/* Legibility scrim: darkest behind the words at the bottom left. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1633]/90 via-[#0d1633]/45 to-[#0d1633]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1633]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content, on the same left edge as every section below */}
      <div className={`relative z-10 pb-14 text-white sm:pb-16 lg:pb-24 ${WRAP}`}>
        <h1
          id="events-hero-title"
          className="max-w-4xl font-extrabold leading-[1.02] tracking-tight"
          style={{ fontSize: 'clamp(2rem, calc(var(--vw,1vw)*6.2), 5.25rem)' }}
        >
          {HERO_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span className="hero-line block" {...lineIn(i)}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl leading-relaxed text-white/85 [text-wrap:pretty]"
          style={{ fontSize: 'clamp(1rem, calc(var(--vw,1vw)*1.5), 1.2rem)' }}
          {...fadeUp(0)}
        >
          Photos and videos from our trainings, conferences, company days and outreach, and the
          calendar of what comes next.
        </motion.p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <motion.a
            href="#snaps"
            onClick={(e) => glideTo(e, 'snaps')}
            className={`${BUTTON_BASE} bg-white text-[#22409A] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#e8edfa] focus-visible:ring-offset-[#0d1633]`}
            {...fadeUp(1)}
          >
            See the photos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
          <motion.a
            href="#event-calendar"
            onClick={(e) => glideTo(e, 'event-calendar')}
            className={`${BUTTON_BASE} border border-white/50 text-white [@media(hover:hover)_and_(pointer:fine)]:hover:border-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/10 focus-visible:ring-offset-[#0d1633]`}
            {...fadeUp(2)}
          >
            Open the calendar
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default EventShowcase;
