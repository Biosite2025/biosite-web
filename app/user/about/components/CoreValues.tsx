'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';

// Core Values Data - BIOSITE
const coreValues = [
  { letter: 'B', title: 'Belief', description: 'We believe in our mission to save and improve lives through reliable medical solutions.', letterIndex: 0 },
  { letter: 'I', title: 'Integrity', description: 'We conduct our business with integrity.', letterIndex: 1 },
  { letter: 'O', title: 'Outstanding Service', description: 'We are committed to provide service that exceeds expectations.', letterIndex: 2 },
  { letter: 'S', title: 'Stewardship', description: 'We take responsibility in managing our resources wisely.', letterIndex: 3 },
  { letter: 'I', title: 'Innovation', description: 'We continuously introduce innovative healthcare solutions.', letterIndex: 4 },
  { letter: 'T', title: 'Teamwork', description: 'We unite our strengths, support one another to succeed as ONE BIOSITE.', letterIndex: 5 },
  { letter: 'E', title: 'Excellence', description: 'We strive for excellence in everything we do.', letterIndex: 6 },
];

/** Brand blue — letters sit at full opacity so they stay clearly legible. */
const BRAND_BLUE = '#22409A';
/** Red accent marks the value currently being shown. */
const ACCENT_RED = '#EE232E';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Core Values Slideshow Component
const CoreValuesSlideshow = ({ currentIndex }: { currentIndex: number }) => {
  return (
    <div className="relative h-72 md:h-80 lg:h-96 flex items-center justify-center overflow-hidden px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.9 }}
          transition={{
            duration: 0.9,
            ease: [0.43, 0.13, 0.23, 0.96],
            opacity: { duration: 0.6 },
            scale: { duration: 0.7, ease: 'easeOut' },
          }}
          className="absolute text-center max-w-5xl"
        >
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] mb-5 md:mb-7">
            {coreValues[currentIndex]?.title}
          </h3>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-[#374151] font-medium leading-relaxed px-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {coreValues[currentIndex]?.description}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/**
 * 0 = "BIOSITE CORE VALUES" title (shown once the section is scrolled into view)
 * 1 = title hands off, the BIOSITE letters flip in and rise
 * 2 = value slideshow running
 */
type Phase = 0 | 1 | 2;

const CoreValues = () => {
  const [phase, setPhase] = useState<Phase>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  // Everything is gated on the section entering the viewport. `once` is off so
  // the whole sequence replays each time the section is scrolled back into
  // view — from either direction.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();

  // The section itself only fades in once; it must not fade back out when the
  // viewer scrolls past, so this is tracked separately from `inView`.
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  // Phase progression restarts on every entry. Leaving the viewport rewinds to
  // phase 0 so the next entry begins again at "BIOSITE CORE VALUES".
  // Reduced motion skips the choreography and goes straight to the slideshow.
  useEffect(() => {
    if (!inView) {
      setPhase(0);
      setCurrentLetterIndex(0);
      return;
    }
    if (reducedMotion) {
      setPhase(2);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 1800); // hold the title, then hand off
    const t2 = setTimeout(() => setPhase(2), 3400); // letters settled → slideshow
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reducedMotion]);

  // Loop slideshow once phase 2 is active
  useEffect(() => {
    if (phase < 2) return;
    const timer = setInterval(() => {
      setCurrentLetterIndex((prev) => (prev + 1) % coreValues.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [phase]);

  const currentLetterPosition = phase >= 2 ? coreValues[currentLetterIndex]?.letterIndex ?? -1 : -1;

  return (
    <motion.section
      ref={sectionRef}
      id="core-values"
      aria-labelledby="core-values-title"
      className="relative flex items-center justify-center overflow-hidden border-t border-[#E5E7EB] bg-[#F8FAFC]/70 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 id="core-values-title" className="sr-only">
        BIOSITE Core Values
      </h2>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Animated display is decorative — the semantic list below carries the
            same content for screen readers and crawlers. */}
        <div aria-hidden="true" className="relative">
          {/* ---- PHASE 0: intro title, revealed on scroll-in --------------- */}
          <AnimatePresence>
            {inView && phase === 0 && (
              <motion.div
                key="intro-title"
                className="absolute inset-0 z-20 flex items-center justify-center"
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -32, filter: 'blur(8px)' }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
              >
                <div className="text-center">
                  <p
                    className="font-extrabold uppercase leading-[1.1] tracking-[0.18em] text-[#22409A]"
                    style={{ fontSize: 'clamp(1.6rem, 5vw, 4rem)' }}
                  >
                    BIOSITE
                    <br className="sm:hidden" />
                    <span className="sm:ml-4">CORE VALUES</span>
                  </p>
                  {/* Red rule draws out beneath the title */}
                  <motion.span
                    className="mx-auto mt-6 block h-1 rounded-full bg-[#EE232E]"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- PHASE 1+: letters, then the slideshow --------------------- */}
          <motion.div
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* BIOSITE Letters */}
            <motion.div
              className="text-center mb-6 md:mb-8"
              initial={{ y: reducedMotion ? 0 : 160 }}
              animate={{ y: phase >= 1 || reducedMotion ? 0 : 160 }}
              transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                {['B', 'I', 'O', 'S', 'I', 'T', 'E'].map((letter, index) => {
                  const isActive = index === currentLetterPosition;
                  const revealed = phase >= 1 || reducedMotion;
                  return (
                    <motion.span
                      key={index}
                      className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold"
                      initial={{ opacity: 0, scale: 0.5, rotateY: reducedMotion ? 0 : -180 }}
                      animate={
                        revealed
                          ? {
                              opacity: 1,
                              scale: isActive && !reducedMotion ? 1.15 : 1,
                              rotateY: 0,
                              color: isActive ? ACCENT_RED : BRAND_BLUE,
                              textShadow: isActive
                                ? '0 0 24px rgba(238, 35, 46, 0.30), 0 0 48px rgba(238, 35, 46, 0.16)'
                                : '0 0 0px rgba(238, 35, 46, 0)',
                            }
                          : { opacity: 0, scale: 0.5, rotateY: reducedMotion ? 0 : -180 }
                      }
                      transition={{
                        opacity: { duration: 0.9, delay: 0.1 + index * 0.12 },
                        rotateY: { duration: 1.0, delay: 0.1 + index * 0.12, type: 'spring', stiffness: 120, damping: 18 },
                        scale: { duration: 0.6, ease: 'easeOut' },
                        color: { duration: 0.5, ease: 'easeInOut' },
                        textShadow: { duration: 0.5 },
                      }}
                      whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>

            {/* Core Values Slideshow — always rendered to reserve space, opacity animates in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <CoreValuesSlideshow currentIndex={currentLetterIndex} />
            </motion.div>
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
      </div>
    </motion.section>
  );
};

export default CoreValues;
