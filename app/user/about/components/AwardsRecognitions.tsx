'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { EASE, FOCUS_RING } from './motionShared';
import BmiLoader from '@/src/components/ui/BmiLoader';

// 3D scene is isolated in its own chunk and never loads until the section is
// scrolled near — keeps r3f + the 248KB model off the initial About bundle.
const TrophyCanvas = dynamic(() => import('./TrophyCanvas'), { ssr: false });

/** Auto-advance cadence for the award showcase. */
const CYCLE_MS = 5000;

// All eight awards, newest first. Fields kept exactly as approved — nothing invented.
const awards = [
  { year: '2024', partner: 'FujiFilm Philippines', title: 'Top Channel Partner — Overall Medical Business', detail: 'Okada, Manila' },
  { year: '2024', partner: 'Haier Biomedical', title: 'Strategic Partnership Award', detail: 'Two consecutive years' },
  { year: '2023', partner: 'FujiFilm Philippines', title: 'First Installation Award for Echelon Smart', detail: 'Okada, Manila' },
  { year: '2023', partner: 'Haier Biomedical', title: 'Strategic Partnership Award', detail: '' },
  { year: '2023', partner: 'Werfen', title: 'Highest Sales in Clinical Chemistry, Asia Pacific', detail: 'Renaissance Pattaya Resort & Spa, Thailand' },
  { year: '2023', partner: 'Tosoh', title: 'AIA Top Sales Award in South East Asia', detail: 'Paradox Hotel, Singapore' },
  { year: '2023', partner: 'Aeon', title: 'Award of Excellence in Performance', detail: '' },
  { year: '2022', partner: 'Werfen', title: 'Best in Clinical Chemistry Partner in South East Asia', detail: 'Pullman Resort, Phuket, Thailand' },
];

const LAST = awards.length - 1;
const pad = (n: number) => String(n + 1).padStart(2, '0');

/** Fallback mark when WebGL is unavailable. */
const TrophyIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
    <path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 5H4a2 2 0 0 0 0 4h1M18 5h2a2 2 0 0 1 0 4h-1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AwardsRecognitions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion() ?? false;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  /** Latches true on first view so the canvas isn't torn down when scrolled past. */
  const [mounted3D, setMounted3D] = useState(false);
  /** Desktop gets drag-to-rotate; touch gets spin-only so page scroll works. */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (inView) setMounted3D(true);
  }, [inView]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Auto-advance — halted while off screen, focused, or reduced-motion.
  // `active` is a dependency on purpose: the timer restarts after every slide,
  // so a manual jump still gets a full CYCLE_MS before the next auto-advance
  // instead of inheriting whatever was left of the previous interval.
  useEffect(() => {
    if (!inView || paused || reducedMotion) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % awards.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [inView, paused, reducedMotion, active]);

  const go = useCallback((i: number) => setActive(((i % awards.length) + awards.length) % awards.length), []);
  const current = awards[active];

  return (
    <section
      ref={sectionRef}
      id="awards"
      aria-labelledby="awards-title"
      // overflow-x-clip: the copy's soft bloom is deliberately wider than its
      // column; without this it pushes the page wider than the screen.
      className="overflow-x-clip border-t border-[#E5E7EB] bg-[#F8FAFC]/70"
    >
      {/* ============ SHOWCASE: 3D trophy left, award card right ============ */}
      {/* Deliberately no hover-pause: the cursor sits over this showcase
          whenever someone is reading it, so pausing on hover meant it never
          advanced. Focus still pauses, so keyboard users aren't yanked between
          slides mid-interaction. */}
      <div
        className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2"
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Trophy — bleeds to the left edge */}
        <div
          className="relative h-[320px] w-full sm:h-[420px] lg:h-[620px]"
          style={{ cursor: isDesktop ? 'grab' : undefined }}
        >
          {/* Soft bloom so the trophy sits on light rather than on the wave lines */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute left-1/2 top-1/2 block h-[85%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/70 blur-[60px]" />
          </span>
          {mounted3D ? (
            <TrophyCanvas
              interactive={isDesktop && !reducedMotion}
              paused={reducedMotion}
              active={inView}
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <TrophyIcon className="h-28 w-28 text-[#22409A]" />
                </div>
              }
            />
          ) : (
            // Pre-mount placeholder — reuses the BMI burst loader.
            <div className="flex h-full w-full items-center justify-center">
              <BmiLoader size="30px" className="!text-[#22409A]" label="Loading trophy" />
            </div>
          )}
        </div>

        {/* Award copy — a soft white bloom rather than a hard card, so the
            background wave lines keep reading through the edges. */}
        <div className="relative px-6 pb-14 sm:px-8 lg:px-14 lg:py-20">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="absolute left-1/2 top-1/2 block h-[115%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/75 blur-[70px]" />
          </span>

          <div className="relative">
            <h2
              id="awards-title"
              className="font-extrabold uppercase tracking-wide text-[#111827]"
              style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)' }}
            >
              Awarded by the brands we represent
            </h2>

          {/* Cycling award detail — decorative; the <ol> below is the real content. */}
          <div aria-hidden="true" className="relative mt-8 min-h-[280px] sm:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.42, ease: EASE }}
              >
                <motion.p
                  className="font-mono text-sm tracking-[0.25em] text-[#6B7280]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  {pad(active)} <span className="text-[#6B7280]/50">/ {pad(LAST)}</span>
                </motion.p>
                <motion.p
                  className="mt-2 font-extrabold leading-none tracking-tight text-[#22409A]"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, ease: EASE }}
                >
                  {current.year}
                </motion.p>
                <motion.p
                  className="mt-4 font-extrabold text-[#111827]"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.19, ease: EASE }}
                >
                  {current.partner}
                </motion.p>
                <motion.p
                  className="mt-3 max-w-xl leading-relaxed text-[#374151]"
                  style={{ fontSize: 'clamp(1rem, 1.4vw, 1.35rem)' }}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, ease: EASE }}
                >
                  {current.title}
                </motion.p>
                {current.detail && (
                  <motion.p
                    className="mt-4 italic text-[#6B7280]"
                    style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)' }}
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.33, ease: EASE }}
                  >
                    {current.detail}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-5">
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous award"
                className={`rounded-full border border-[#E5E7EB] bg-white p-3 text-[#22409A] shadow-sm transition hover:border-[#22409A] ${FOCUS_RING}`}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2" role="group" aria-label="Choose an award">
                {awards.map((a, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show award ${i + 1} of ${awards.length}: ${a.year} ${a.partner}`}
                    aria-current={i === active}
                    // Colour is inline rather than an arbitrary Tailwind class so
                    // the active pill can never be dropped by class detection.
                    className={`h-3 rounded-full transition-all duration-300 ${FOCUS_RING} ${
                      i === active ? 'w-9' : 'w-3 hover:opacity-70'
                    }`}
                    style={{ backgroundColor: i === active ? '#EE232E' : 'rgba(34, 64, 154, 0.3)' }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next award"
                className={`rounded-full border border-[#E5E7EB] bg-white p-3 text-[#22409A] shadow-sm transition hover:border-[#22409A] ${FOCUS_RING}`}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* The visible list was removed by design. The showcase above shows one
          award at a time and is aria-hidden, so this carries the full set for
          screen readers and crawlers — otherwise the section would expose no
          award content at all. */}
      <ol className="sr-only">
        {awards.map((a, i) => (
          <li key={i}>
            <strong>
              {a.year} — {a.partner}.
            </strong>{' '}
            {a.title}
            {a.detail ? ` (${a.detail}).` : '.'}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default AwardsRecognitions;
