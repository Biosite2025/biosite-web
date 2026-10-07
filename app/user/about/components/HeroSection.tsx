'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE, FOCUS_RING } from './motionShared';

// Building slideshow — three real facilities. Meaningful alt text per slide.
const slides = [
  { src: '/asset/slides/luzonbuilding.jpg', alt: 'Biosite Luzon headquarters building' },
  { src: '/asset/slides/slide_2.png', alt: 'Biosite office facility' },
  { src: '/asset/slides/visminbuilding.png', alt: 'Biosite Visayas–Mindanao office building' },
];

const SLIDE_DURATION = 5000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((idx: number) => setCurrent(((idx % slides.length) + slides.length) % slides.length), []);

  // Autoplay — paused for reduced-motion users, who navigate via the dots.
  useEffect(() => {
    if (reducedMotion) return;
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), SLIDE_DURATION);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden lg:h-screen h-[calc(100vh-64px)] lg:mt-0 mt-[-64px] flex items-center justify-center"
    >
      {/* Building slideshow — crossfade + gentle Ken Burns drift (drift off for reduced-motion) */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slides[current].src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: reducedMotion ? 1 : [1.04, 1.12] }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2, ease: EASE }, scale: { duration: 6.5, ease: 'linear' } }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
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
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/asset/biosite Bear (1).png"
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
          style={{ fontSize: 'clamp(1.9rem, 5.2vw, 3.6rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          Because Every Life
          <br className="hidden sm:block" /> Deserves the Best Care
        </motion.h1>

      </div>

      {/* Slide controls — real buttons, keyboard-focusable, labelled */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5" role="group" aria-label="Choose building photo">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${s.alt}`}
            aria-current={i === current}
            className={`h-2.5 rounded-full transition-all duration-300 ${FOCUS_RING} ${
              i === current ? 'w-7 bg-[#EE232E]' : 'w-2.5 bg-[#22409A]/40 hover:bg-[#22409A]/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
