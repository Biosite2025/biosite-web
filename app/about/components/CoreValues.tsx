'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion';

// Core Values Data - BIOSITE
const coreValues = [
  { letter: 'B', title: 'Belief', description: 'We believe in our mission to save and improve lives through reliable medical solutions.' },
  { letter: 'I', title: 'Integrity', description: 'We conduct our business with integrity.' },
  { letter: 'O', title: 'Outstanding Service', description: 'We are committed to provide service that exceeds expectations.' },
  { letter: 'S', title: 'Stewardship', description: 'We take responsibility in managing our resources wisely.' },
  { letter: 'I', title: 'Innovation', description: 'We continuously introduce innovative healthcare solutions.' },
  { letter: 'T', title: 'Teamwork', description: 'We unite our strengths, support one another to succeed as ONE BIOSITE.' },
  { letter: 'E', title: 'Excellence', description: 'We strive for excellence in everything we do.' },
];

const BRAND_BLUE = '#22409A';
const ACCENT_RED = '#EE232E';
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The sequence, one stage at a time:
 *   title   "BIOSITE CORE VALUES"
 *   zoom    the value's letter zooms in at the centre while the title fades out
 *   word    the letter glides left as the rest of the word wipes in after it
 *   detail  the description fades in below; hold
 *   retract description and the rest of the word go, the letter returns to the centre
 *   flip    the letter flips over to the next value's letter → word …
 */
type Stage = 'title' | 'zoom' | 'word' | 'detail' | 'retract' | 'flip';
const DURATION: Record<Stage, number> = {
  title: 1800,
  zoom: 1900,
  word: 1100,
  detail: 4200,
  retract: 1000,
  flip: 1200,
};
const NEXT: Record<Stage, Stage> = {
  title: 'zoom',
  zoom: 'word',
  word: 'detail',
  detail: 'retract',
  retract: 'flip',
  flip: 'word',
};

const sizeMax = (title: string) => (title.length <= 9 ? 168 : title.length <= 11 ? 140 : 96);
/** The same size in px for a stage of the given width. */
const wordSizePx = (title: string, stageWidth: number) => Math.min(sizeMax(title), stageWidth / (title.length * 0.6));

/** Font size for a value's word: as large as fits the stage width (container units). */
const wordSize = (title: string) => {
  const max = sizeMax(title);
  return `min(${max}px, calc(100cqw / ${(title.length * 0.6).toFixed(2)}))`;
};

const CoreValues = () => {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  // Starts once the section is mostly on screen; leaving rewinds to the title,
  // so every visit begins again at "BIOSITE CORE VALUES".
  const inView = useInView(sectionRef, { amount: 0.6 });
  const [stage, setStage] = useState<Stage>('title');
  const [index, setIndex] = useState(0);
  // A value picked from the B-I-O-S-I-T-E row: reached through the same
  // retract → centre → flip → word transition as the automatic sequence.
  const [jumpTo, setJumpTo] = useState<number | null>(null);
  // Where the B of the title sits, relative to where the big letter will land:
  // the big letter starts there, so the title's own B travels to the centre.
  const [fromTitle, setFromTitle] = useState<{ x: number; y: number; scale: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const titleB = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => {
      let next = NEXT[stage];
      const picked = jumpTo !== null && jumpTo !== index ? jumpTo : null;
      // A letter picked while the letter is centred (zoom, or mid-flip): flip (again) to it.
      if (picked !== null && (stage === 'zoom' || stage === 'flip')) next = 'flip';
      if (next === 'zoom') {
        const b = titleB.current;
        const st = stageRef.current;
        const row = rowRef.current;
        if (b && st && row) {
          const z = parseFloat(document.documentElement.style.zoom) || 1;
          const br = b.getBoundingClientRect();
          const sr = st.getBoundingClientRect();
          const rr = row.getBoundingClientRect();
          const css = getComputedStyle(b);
          const spacing = parseFloat(css.letterSpacing) || 0; // trailing tracking after the glyph
          const bx = br.left + br.width / 2 - (spacing * z) / 2;
          const by = br.top + br.height / 2;
          setFromTitle({
            x: (bx - (sr.left + sr.width / 2)) / z,
            y: (by - (rr.top + rr.height / 2)) / z,
            scale: parseFloat(css.fontSize) / wordSizePx(coreValues[0].title, st.offsetWidth),
          });
        }
      }
      if (next === 'flip') {
        setIndex((i) => picked ?? (i + 1) % coreValues.length);
        setJumpTo(null);
      }
      setStage(next);
    }, reduced ? Math.min(DURATION[stage], stage === 'detail' ? DURATION.detail : 400) : DURATION[stage]);
    return () => window.clearTimeout(timer);
  }, [stage, index, jumpTo, inView, reduced]);

  // Rewind when the section leaves the screen (state is reset outside the effect body).
  const [wasInView, setWasInView] = useState(inView);
  if (wasInView !== inView) {
    setWasInView(inView);
    if (!inView) {
      setStage('title');
      setIndex(0);
      setJumpTo(null);
    }
  }

  const value = coreValues[index];
  const showLetter = stage !== 'title';
  const showWord = stage === 'word' || stage === 'detail';
  const showDetail = stage === 'detail';
  // The letter is large on its own at the centre; it grows only once the rest of the word has gone.
  const centred = stage === 'zoom' || stage === 'flip';

  // Horizontal slide of the letter + word line: half the rest-of-word width
  // centres the letter; 0 shows the whole word centred.
  const restRef = useRef<HTMLSpanElement>(null);
  const lineX = useMotionValue(0);
  const restWidth = useRef(0);
  // Measure the new word before paint; while the letter sits at the centre
  // (zoom / flip) jump to the new centring offset so the letter doesn't drift.
  useLayoutEffect(() => {
    restWidth.current = restRef.current?.offsetWidth ?? 0;
    if (stage === 'zoom' || stage === 'flip') lineX.set(restWidth.current / 2);
  }, [index, showLetter, stage, lineX]);
  useEffect(() => {
    const target = showWord ? 0 : restWidth.current / 2;
    if (stage === 'word' || stage === 'retract') {
      const controls = animate(lineX, target, { duration: reduced ? 0 : 0.9, ease: EASE });
      return () => controls.stop();
    }
  }, [stage, showWord, reduced, lineX]);

  const choose = (i: number) => {
    if (i === index && jumpTo === null && stage !== 'title') return;
    setJumpTo(i);
    // Showing a word: start the retract now. Otherwise the pick is taken up
    // when the current step ends (the title's B still travels to the centre first).
    if (stage === 'word' || stage === 'detail') setStage('retract');
  };
  // The value the row highlights: the one picked, else the one showing.
  const current = jumpTo ?? index;

  return (
    <section
      ref={sectionRef}
      id="core-values"
      aria-labelledby="core-values-title"
      className="relative overflow-hidden border-t border-[#E5E7EB] bg-[#F8FAFC]/70 px-4 sm:px-6 lg:px-8"
    >
      <h2 id="core-values-title" className="sr-only">
        BIOSITE Core Values
      </h2>

      {/* Fixed-height stage, so nothing below the section ever moves. */}
      <div ref={stageRef} aria-hidden="true" className="relative mx-auto flex h-[501px] w-full max-w-6xl flex-col items-center justify-center [container-type:inline-size] sm:h-[600px] lg:h-[737px]">
        {/* Title. Its B is the letter that travels to the centre, so it hides
            the moment the big letter takes its place; the rest fades slowly. */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center [will-change:transform,opacity]"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          // Transform + opacity only (no letter-spacing or blur), so the fade stays on the GPU.
          animate={stage === 'title' && inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 0, scale: reduced ? 1 : 0.97 }}
          transition={stage === 'title' ? { duration: 0.9, ease: EASE } : { duration: reduced ? 0.4 : 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="font-extrabold uppercase leading-[1.1]"
            style={{ color: BRAND_BLUE, fontSize: 'clamp(1.6rem, 5cqw, 4rem)', letterSpacing: '0.18em' }}
          >
            <span ref={titleB} style={{ opacity: stage === 'title' ? 1 : 0 }}>
              B
            </span>
            IOSITE
            <br className="sm:hidden" />
            <span className="sm:ml-4">CORE VALUES</span>
          </p>
          <motion.span
            className="mt-6 block h-1 rounded-full"
            style={{ backgroundColor: ACCENT_RED }}
            initial={{ width: 0 }}
            animate={{ width: stage === 'title' && inView ? 96 : 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: stage === 'title' ? 0.35 : 0 }}
          />
        </motion.div>

        {/* Letter + rest of the word. The rest of the word always keeps its
            place and is only revealed or hidden by a wipe; the whole line slides
            by half the rest's width, which puts the letter exactly at the centre
            when the word is hidden. So the letter glides back to the centre
            while the word wipes away, and flips only once it's there. */}
        <div ref={rowRef} className="flex h-[150px] w-full items-center justify-center sm:h-[190px] lg:h-[220px]">
          {showLetter && (
            <motion.div className="flex items-baseline justify-center whitespace-nowrap font-extrabold leading-none" style={{ x: lineX }}>
              {/* The letter: zooms in at the centre, then sits at the front of the word. */}
              <motion.span
                className="relative inline-block [perspective:900px] [will-change:transform]"
                initial={
                  fromTitle && !reduced
                    ? { opacity: 1, x: fromTitle.x, y: fromTitle.y, scale: fromTitle.scale, color: BRAND_BLUE, textShadow: '0 0 0px rgba(238, 35, 46, 0)' }
                    : { opacity: 0, scale: reduced ? 1 : 0.25 }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: reduced ? 1 : centred ? 1.35 : 1,
                  color: ACCENT_RED,
                  textShadow: '0 0 28px rgba(238, 35, 46, 0.28)',
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  // First the B turns red in place while the rest of the title clears,
                  // then it glides and grows to the centre over a clear stage.
                  x: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: stage === 'zoom' ? 0.45 : 0 },
                  y: { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: stage === 'zoom' ? 0.45 : 0 },
                  scale: stage === 'zoom' ? { duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.45 } : { duration: 0.8, ease: EASE },
                  color: { duration: 0.5, ease: 'easeOut' },
                  textShadow: { duration: 0.8, delay: 0.4 },
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={index}
                    className="inline-block origin-center"
                    style={{
                      fontSize: wordSize(value.title),
                      backfaceVisibility: 'hidden',
                    }}
                    initial={reduced ? { opacity: 0 } : { rotateX: -90, opacity: 0.2 }}
                    animate={reduced ? { opacity: 1 } : { rotateX: 0, opacity: 1 }}
                    exit={reduced ? { opacity: 0 } : { rotateX: 90, opacity: 0.2 }}
                    transition={{ duration: reduced ? 0.2 : 0.55, ease: [0.45, 0, 0.55, 1] }}
                  >
                    {value.letter}
                  </motion.span>
                </AnimatePresence>
              </motion.span>

              {/* The rest of the word wipes in after the letter (and back out). */}
              <motion.span
                ref={restRef}
                className="inline-block"
                style={{ color: BRAND_BLUE, fontSize: wordSize(value.title) }}
                initial={false}
                animate={
                  reduced
                    ? { opacity: showWord ? 1 : 0 }
                    : { clipPath: showWord ? 'inset(-20% 0% -20% 0%)' : 'inset(-20% 100% -20% 0%)', opacity: showWord ? 1 : 0 }
                }
                transition={
                  reduced
                    ? { duration: 0.2 }
                    : showWord
                      ? { duration: 1.0, ease: EASE, delay: 0.1, opacity: { duration: 0.3, delay: 0.1 } }
                      : { duration: 0.7, ease: [0.4, 0, 0.2, 1], opacity: { duration: 0.3, delay: 0.5 } }
                }
              >
                {value.title.slice(1)}
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <div className="flex h-[110px] w-full max-w-3xl items-start justify-center px-2 pt-2 text-center lg:pt-4">
          <AnimatePresence mode="wait">
            {showDetail && (
              <motion.p
                key={index}
                className="text-lg font-medium leading-relaxed text-[#374151] md:text-xl lg:text-[28px] lg:leading-snug"
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8, transition: { duration: 0.35 } }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                {value.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress through B-I-O-S-I-T-E; each letter goes to its value with the
          same transition. Left / right arrow keys step through them. */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center sm:bottom-10 lg:bottom-14">
        <motion.div
          role="group"
          aria-label="Core values"
          className="flex gap-1"
          initial={false}
          animate={{ opacity: stage === 'title' ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: stage === 'title' ? 'none' : 'auto' }}
        >
          {coreValues.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                e.preventDefault();
                const n = (current + (e.key === 'ArrowRight' ? 1 : -1) + coreValues.length) % coreValues.length;
                choose(n);
                (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
              }}
              aria-label={`Show ${v.title}`}
              aria-current={i === current ? 'true' : undefined}
              tabIndex={i === current ? 0 : -1}
              className="flex h-10 w-9 items-center justify-center rounded-md text-lg font-extrabold transition-colors duration-500 hover:bg-[#22409A]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22409A] lg:h-12 lg:w-11 lg:text-2xl"
              style={{ color: i === current ? ACCENT_RED : 'rgba(34, 64, 154, 0.45)' }}
            >
              {v.letter}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Semantic, always-present content for assistive tech and crawlers. */}
      <ol className="sr-only">
        {coreValues.map((v) => (
          <li key={v.title}>
            <strong>
              {v.letter} — {v.title}.
            </strong>{' '}
            {v.description}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CoreValues;
