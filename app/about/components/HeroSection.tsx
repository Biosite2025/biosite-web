'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { EASE, FOCUS_RING } from './motionShared';

// Building slideshow — three real facilities. Meaningful alt text per slide.
const slides = [
  { src: '/asset/slides/luzonbuilding.jpg', alt: 'Biosite Luzon headquarters building' },
  { src: '/asset/slides/slide_2.webp', alt: 'Biosite office facility' },
  { src: '/asset/slides/visminbuilding.webp', alt: 'Biosite Visayas–Mindanao office building' },
];

const SLIDE_DURATION = 5000;

const PARTNER_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScR4HEaBgpTHZUr85wM3j-y5vB3TblbZ7BUTt6zjkhahUlYFA/viewform';

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  // Autoplay — paused for reduced-motion users, and while the hero is
  // scrolled out of view (each slide runs a crossfade + zoom animation).
  useEffect(() => {
    if (reducedMotion || !inView) return;
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), SLIDE_DURATION);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reducedMotion, inView]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden lg:h-[calc(var(--vh,1vh)*100)] h-[calc(calc(var(--vh,1vh)*100)-64px)] lg:mt-0 mt-[-64px] flex items-center justify-center"
    >
      {/* Building slideshow — crossfade + gentle Ken Burns drift (drift off for reduced-motion) */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slides[current].src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: EASE } }}
          >
            {/* Ken Burns drift is a CSS animation (globals.css .hero-kenburns),
                so it runs on the compositor instead of JS every frame. */}
            <div className="hero-kenburns absolute inset-0">
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Scrim: keeps the dark-blue headline legible while the building stays visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-[#22409A]/10" />
      </div>

      {/* Centered content lockup — the bear "presents" the single tagline */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center -mt-[50px] sm:-mt-[50px] lg:-mt-[130px] ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          {/* Gentle float is a CSS loop (globals.css) — no per-frame JS. */}
          <motion.div className="bear-float">
            <Image
              src="/asset/biosite Bear (1).webp"
              alt="Biosite bear mascot"
              width={440}
              height={311}
              priority
              className="h-auto w-[250px] sm:w-[540px] lg:w-[640px] object-contain drop-shadow-[0_16px_30px_rgba(34,64,154,0.22)]"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          id="hero-title"
          className="-mt-[50px] sm:-mt-[50px] lg:-mt-[90px] font-extrabold leading-[1.08] tracking-tight text-[#22409A]"
          style={{ fontSize: 'clamp(1.9rem, calc(var(--vw,1vw)*5.2), 3.6rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          Because Every Life
          <br className="hidden sm:block" /> Deserves the Best Care
        </motion.h1>

        <motion.a
          href={PARTNER_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative isolate mt-8 inline-flex items-center gap-2 rounded-full bg-[#22409A] px-7 py-3 text-sm font-semibold text-white shadow-lg transition-[background-color,box-shadow] duration-300 hover:bg-[#1A3078] hover:shadow-[0_12px_32px_rgba(34,64,154,0.45)] sm:text-base ${FOCUS_RING}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={reducedMotion ? undefined : { y: -3, scale: 1.05 }}
          whileTap={reducedMotion ? undefined : { scale: 0.96 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45, y: { type: 'spring', stiffness: 400, damping: 22 }, scale: { type: 'spring', stiffness: 400, damping: 22 } }}
        >
          {/* Attention cues — a soft ring that radiates out, and a light
              sweep across the face. Both off for reduced-motion users. */}
          {!reducedMotion && (
            <>
              {/* Both loops are CSS (globals.css: partner-ring / partner-shine) —
                  same timing as before, but no per-frame JS. */}
              <span
                aria-hidden="true"
                className="partner-ring pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#22409A]"
              />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <span className="partner-shine absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              </span>
            </>
          )}
          <span className="relative">Be Our Partner</span>
          <svg
            className="relative transition-transform duration-300 group-hover:translate-x-1"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">(opens in a new tab)</span>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
