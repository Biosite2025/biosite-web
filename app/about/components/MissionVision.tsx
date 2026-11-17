'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Mission and Vision: two full-width photo rows, each with a translucent blue
 * panel laid over the side of the photo that has the least going on.
 *
 * One orchestrated reveal per row as it scrolls into view: the photo settles
 * from a slight zoom, the panel opens from the photo's edge, then the heading,
 * the red rule and the statement rise in. While scrolling, the photo drifts a
 * little slower than the page. Reduced motion: a plain fade, no drift.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

// The Biomi index (scripts/build-biomi-index.js) reads the two statements
// from this file: keep each one a single quoted string starting with "To ...".
const ROWS = [
  {
    id: 'mission',
    heading: 'Our mission',
    statement:
      'To deliver innovative medical solutions and exceptional customer service that empower healthcare professionals, institutions, and partners.',
    image: '/asset/mission.webp',
    imageSm: '/asset/mission-sm.webp',
    alt: 'A Biosite specialist demonstrating an analyzer to visitors at a trade show booth',
    side: 'left',
    // Keep the demo (right of centre) in frame on narrow screens.
    focus: '62% 40%',
  },
  {
    id: 'vision',
    heading: 'Our vision',
    statement:
      'To be the most trusted partner in advancing healthcare — providing innovative medical solutions that ensure every life receives the best care.',
    image: '/asset/vision.webp',
    imageSm: '/asset/vision-sm.webp',
    alt: 'A Biosite specialist walking a group of clients through an analyzer in the Biosite showroom',
    side: 'right',
    focus: '38% 45%',
  },
] as const;

type Row = (typeof ROWS)[number];

// The row that isn't in focus: photo blurred and darkened, panel faded back.
const DIM_PHOTO = 'blur(6px) brightness(0.55) saturate(0.75)';
const DIM_PANEL = 'blur(2px)';
const FOCUS_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

function StatementRow({ row, dimmed, rowRef }: { row: Row; dimmed: boolean; rowRef: (el: HTMLDivElement | null) => void }) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-5%', '5%']);
  const left = row.side === 'left';

  // One trigger for the whole row (a fully clipped panel never counts as in view itself).
  const shown = useInView(ref, { once: true, amount: 0.35 });
  // The panel opens from the photo's outer edge towards the middle.
  const closed = left ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: shown ? { opacity: 1 } : undefined, transition: { duration: 0.3 } }
      : { initial: { opacity: 0, y: 18 }, animate: shown ? { opacity: 1, y: 0 } : undefined, transition: { duration: 0.8, ease: EASE, delay } };

  return (
    <div
      ref={(el) => {
        ref.current = el;
        rowRef(el);
      }}
      className="relative bg-[#0f1f5c] lg:h-[600px]"
    >
      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto">
        <motion.div
          className="absolute inset-x-0 -inset-y-[6%]"
          style={{
            y: drift,
            // CSS scale (separate from the drift transform) hides the blur's soft edges.
            scale: dimmed ? 1.04 : 1,
            filter: dimmed ? DIM_PHOTO : 'none',
            transition: `filter 0.7s ${FOCUS_EASE}, scale 0.7s ${FOCUS_EASE}`,
          }}
        >
          <motion.img
            src={row.image}
            srcSet={`${row.imageSm} 960w, ${row.image} 1920w`}
            sizes="100vw"
            alt={row.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: row.focus }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
            animate={shown ? { opacity: 1, scale: 1 } : undefined}
            transition={{ opacity: { duration: 0.6 }, scale: { duration: 1.8, ease: EASE } }}
          />
        </motion.div>
        {/* Deepens the panel side a touch so the panel edge reads against busy photos. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 hidden lg:block ${
            left ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
          } from-[#0f1f5c]/35 via-transparent to-transparent`}
        />
      </div>

      {/* Panel */}
      <motion.div
        style={{
          opacity: dimmed ? 0.45 : 1,
          filter: dimmed ? DIM_PANEL : 'none',
          transition: `opacity 0.7s ${FOCUS_EASE}, filter 0.7s ${FOCUS_EASE}`,
        }}
        className={`relative z-10 mx-4 -mt-14 sm:mx-8 lg:absolute lg:inset-y-[72px] lg:mx-0 lg:mt-0 lg:w-[44%] ${
          left ? 'lg:left-[6%]' : 'lg:right-[6%]'
        }`}
        initial={reduced ? { opacity: 0 } : { clipPath: closed }}
        animate={shown ? (reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }) : undefined}
        transition={{ duration: reduced ? 0.3 : 1.1, ease: EASE, delay: reduced ? 0 : 0.15 }}
      >
        <div className="flex h-full flex-col justify-center bg-[linear-gradient(135deg,rgba(38,190,226,0.86)_0%,rgba(30,111,214,0.88)_55%,rgba(28,72,190,0.92)_100%)] px-6 py-9 sm:px-10 lg:bg-[linear-gradient(135deg,rgba(38,190,226,0.72)_0%,rgba(30,111,214,0.8)_55%,rgba(28,72,190,0.88)_100%)] lg:px-16 lg:py-0">
          <motion.h3 className="text-lg font-semibold uppercase tracking-[0.08em] text-white/90 lg:text-[22px]" {...rise(0.55)}>
            {row.heading}
          </motion.h3>
          <motion.span
            aria-hidden="true"
            className="mt-3 block h-[3px] w-14 origin-left bg-[#E3262B]"
            initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
            animate={shown ? (reduced ? { opacity: 1 } : { scaleX: 1 }) : undefined}
            transition={{ duration: reduced ? 0.3 : 0.7, ease: EASE, delay: reduced ? 0 : 0.7 }}
          />
          <motion.p
            className="mt-5 max-w-[22em] text-balance text-[1.35rem] font-semibold leading-[1.3] text-white sm:text-[1.6rem] lg:mt-6 lg:text-[34px]"
            {...rise(0.8)}
          >
            {row.statement}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

const MissionVision = () => {
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  // The row nearest the middle of the screen stays sharp; the other one recedes.
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2 / (parseFloat(document.documentElement.style.zoom) || 1);
      let best = 0;
      let bestGap = Infinity;
      rows.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const gap = Math.abs((r.top + r.bottom) / 2 - mid);
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      });
      setFocus(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section id="mission-vision" aria-labelledby="mission-vision-title" className="relative bg-[#0f1f5c]">
      <h2 id="mission-vision-title" className="sr-only">
        Our Mission and Vision
      </h2>
      <div className="flex flex-col gap-10 pb-10 lg:gap-0 lg:pb-0">
        {ROWS.map((row, i) => (
          <StatementRow
            key={row.id}
            row={row}
            dimmed={focus !== i}
            rowRef={(el) => {
              rows.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
