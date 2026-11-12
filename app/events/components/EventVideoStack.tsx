'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { FOCUS_RING } from '../../about/components/motionShared';

/**
 * Highlight videos: text on the left, a turning stack of videos on the right.
 * The video in front plays for PLAY_SECONDS, then the stack turns. The next
 * video waits tilted at the top right and the previous one tilted at the
 * bottom right, overlapping toward the right corner; on each turn the next
 * card swings to the front, the front card tips down into the previous spot,
 * the old previous card slides out and a new next card slides in. Motion uses
 * the flow curve from taste-skill's showcase (cubic-bezier(0.16, 1, 0.3, 1)).
 */
const PLAY_SECONDS = 10;
/** A video that stalls (slow connection) still hands over after this long. */
const STALL_LIMIT_MS = (PLAY_SECONDS + 6) * 1000;
const FLOW = { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const };

type Role = 'current' | 'next' | 'prev';

// Poses, in percent of the card's own size. Sized with the stage so every card,
// tilt included, stays whole on screen: the front card is 76% of the stage's
// width and the stage is a little taller than wide, leaving room above and
// below for the tilted cards, which reach out past the stage to the right.
const POSES: Record<Role, { x: string; y: string; rotate: number; scale: number; opacity: number }> = {
  current: { x: '0%', y: '0%', rotate: 0, scale: 1, opacity: 1 },
  next: { x: '52%', y: '-45%', rotate: 18, scale: 0.85, opacity: 1 },
  prev: { x: '48%', y: '48%', rotate: -14, scale: 0.85, opacity: 1 },
};

// Cards arrive from beyond the next spot and leave past the previous spot
// (mirrored when stepping backwards), fading so they never linger off screen.
const cardVariants: Variants = {
  enter: (dir: 1 | -1) =>
    dir > 0 ? { x: '70%', y: '-75%', rotate: 28, scale: 0.8, opacity: 0 } : { x: '66%', y: '78%', rotate: -24, scale: 0.8, opacity: 0 },
  exit: (dir: 1 | -1) => ({
    ...(dir > 0 ? { x: '66%', y: '78%', rotate: -24 } : { x: '70%', y: '-75%', rotate: 28 }),
    scale: 0.8,
    opacity: 0,
    transition: FLOW,
  }),
};

const Z: Record<Role, number> = { current: 3, next: 2, prev: 1 };

const pad = (n: number) => String(n).padStart(2, '0');

/** A readable title from the file name ("1Compress_Luzon Kick Off 2026.mp4"). */
const videoTitle = (url: string, n: number) => {
  let name = url.split('/').pop() || '';
  try {
    name = decodeURIComponent(name);
  } catch {
    /* keep the raw name */
  }
  const clean = name
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\d+\s*/, '')
    .replace(/^compress(ed)?[_\s-]*/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return !clean || /^(my\s*)?video\s*\d*$/i.test(clean) ? `Event highlight ${n}` : clean;
};

export default function EventVideoStack({ videos, loading }: { videos: string[]; loading: boolean }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1 through the front video's turn
  const stageRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef<HTMLVideoElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  // The video that already moved the stack on, so repeated time updates past
  // the mark don't skip several videos at once.
  const advancedFrom = useRef<string | null>(null);
  const inView = useInView(stageRef, { amount: 0.4 });
  const reduced = useReducedMotion();
  const n = videos.length;
  const current = n ? index % n : 0;

  const go = (to: number, d: 1 | -1) => {
    if (n < 2) return;
    setDir(d);
    setProgress(0);
    setIndex(((to % n) + n) % n);
  };
  const next = () => go(current + 1, 1);
  const prev = () => go(current - 1, -1);

  useEffect(() => {
    const sync = () => setPageHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // The front video plays only while it can be seen and isn't paused.
  const shouldPlay = !reduced && inView && !paused && !pageHidden;
  useEffect(() => {
    const v = playingRef.current;
    if (!v) return;
    if (shouldPlay) v.play().catch(() => {});
    else v.pause();
  }, [shouldPlay, current]);

  // Safety net: a video still buffering after STALL_LIMIT_MS of play time
  // hands over anyway, so a slow connection never freezes the stack.
  useEffect(() => {
    if (!shouldPlay || n < 2) return;
    const src = videos[current];
    const t = window.setTimeout(() => {
      if (advancedFrom.current === src) return;
      advancedFrom.current = src;
      setDir(1);
      setProgress(0);
      setIndex((i) => (i + 1) % n);
    }, STALL_LIMIT_MS);
    return () => window.clearTimeout(t);
  }, [shouldPlay, current, n, videos]);

  // Each video may advance the stack once per turn in front.
  useEffect(() => {
    if (advancedFrom.current !== videos[current]) advancedFrom.current = null;
  }, [current, videos]);

  // Which card plays which role this turn.
  const roles: { i: number; role: Role }[] = [{ i: current, role: 'current' }];
  if (n >= 2) roles.push({ i: (current + 1) % n, role: 'next' });
  if (n >= 3) roles.push({ i: (current - 1 + n) % n, role: 'prev' });

  if (!loading && n === 0) return null;

  const title = n ? videoTitle(videos[current], current + 1) : '';

  return (
    <section id="event-videos" aria-labelledby="videos-title" className="relative overflow-x-clip py-16 md:py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* ---------- Text ---------- */}
        <div className="lg:col-span-4">
          <h2
            id="videos-title"
            className="font-extrabold leading-[1.05] tracking-tight text-[#0d1633] [text-wrap:balance]"
            style={{ fontSize: 'clamp(1.9rem, calc(var(--vw,1vw)*3.6), 3rem)' }}
          >
            Event highlights
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-[#374151] [text-wrap:pretty]">
            Short recaps from our kick-offs, trainings and company days. Each one plays for {PLAY_SECONDS} seconds,
            then the next comes forward.
          </p>

          {n > 0 && (
            <div className="mt-8 max-w-sm border-t border-[#0d1633]/10 pt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold tabular-nums text-[#6B7280]" aria-hidden="true">
                  {pad(current + 1)} / {pad(n)}
                </p>
                {!reduced && n > 1 && (
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-pressed={paused}
                    aria-label={paused ? 'Play the highlight videos' : 'Pause the highlight videos'}
                    className={`inline-flex size-9 items-center justify-center rounded-full border border-[#22409A]/25 text-[#22409A] transition-[transform,border-color] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#22409A] active:translate-y-px active:scale-[.985] ${FOCUS_RING}`}
                  >
                    {paused ? (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M4 2l8 5-8 5z" /></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2h3v10H3zM8 2h3v10H8z" /></svg>
                    )}
                  </button>
                )}
              </div>
              {/* The title rises out of its mask on each turn. */}
              <div className="mt-2 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={title + current}
                    className="text-xl font-bold leading-snug text-[#0d1633] sm:text-2xl"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-110%' }}
                    transition={{ duration: 0.5, ease: FLOW.ease }}
                  >
                    {title}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="sr-only" aria-live="polite">{`Highlight video ${current + 1} of ${n}: ${title}`}</p>
              {/* How far through this video's turn. */}
              {!reduced && n > 1 && (
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#0d1633]/10" aria-hidden="true">
                  <div
                    className="h-full origin-left rounded-full bg-[#EE232E] transition-transform duration-300 ease-linear"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---------- Stack ---------- */}
        <div className="lg:col-span-8">
          <div
            ref={stageRef}
            className="relative aspect-[5/4] lg:aspect-[20/19]"
            style={{ touchAction: 'pan-y' }}
            onTouchStart={(e) => {
              const t = e.touches[0];
              touch.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchEnd={(e) => {
              const start = touch.current;
              touch.current = null;
              if (!start) return;
              const t = e.changedTouches[0];
              const dx = t.clientX - start.x;
              const dy = t.clientY - start.y;
              if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return; // a tap or a vertical scroll
              if (dx < 0) next();
              else prev();
            }}
          >
            {loading ? (
              <div className="absolute left-[2%] top-1/2 aspect-video w-[62%] -translate-y-1/2 animate-pulse lg:left-0 lg:w-[76%] rounded-2xl bg-[#E5E7EB]" aria-hidden="true" />
            ) : (
              <AnimatePresence initial={false} custom={dir}>
                {roles.map(({ i, role }) => {
                  const src = videos[i];
                  const front = role === 'current';
                  return (
                    <div
                      key={src}
                      className="pointer-events-none absolute left-[2%] top-1/2 w-[62%] -translate-y-1/2 lg:left-0 lg:w-[76%]"
                      style={{ zIndex: Z[role] }}
                    >
                      <motion.div
                        custom={dir}
                        variants={cardVariants}
                        initial="enter"
                        animate={POSES[role]}
                        exit="exit"
                        transition={FLOW}
                        className="pointer-events-auto relative aspect-video overflow-hidden rounded-2xl bg-[#0d1633] shadow-[0_24px_50px_-24px_rgba(13,22,51,0.6)] ring-1 ring-black/10"
                      >
                        {front ? (
                          <>
                            <video
                              key={`${src}-front`}
                              ref={(el) => {
                                playingRef.current = el;
                              }}
                              src={src}
                              muted
                              playsInline
                              preload="auto"
                              autoPlay={shouldPlay}
                              controls={!!reduced}
                              aria-label={videoTitle(src, i + 1)}
                              className="absolute inset-0 h-full w-full object-cover"
                              onTimeUpdate={(e) => {
                                const t = e.currentTarget.currentTime;
                                setProgress(Math.min(1, t / PLAY_SECONDS));
                                if (reduced || t < PLAY_SECONDS || advancedFrom.current === src) return;
                                advancedFrom.current = src;
                                next();
                              }}
                              onEnded={() => {
                                if (reduced || advancedFrom.current === src) return;
                                advancedFrom.current = src;
                                next();
                              }}
                            />
                            {/* Click the playing video to pause or resume the stack. */}
                            {!reduced && (
                              <button
                                type="button"
                                onClick={() => setPaused((p) => !p)}
                                aria-pressed={paused}
                                aria-label={paused ? 'Play the highlight videos' : 'Pause the highlight videos'}
                                tabIndex={-1}
                                className="absolute inset-0 z-[1] cursor-pointer"
                              />
                            )}
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={role === 'next' ? next : prev}
                            aria-label={role === 'next' ? 'Next highlight video' : 'Previous highlight video'}
                            className={`absolute inset-0 block cursor-pointer ${FOCUS_RING}`}
                          >
                            {/* A still from the video under a grey wash. */}
                            <video
                              key={`${src}-still`}
                              src={`${src}#t=1`}
                              muted
                              playsInline
                              preload="metadata"
                              tabIndex={-1}
                              aria-hidden="true"
                              className="absolute inset-0 h-full w-full object-cover grayscale"
                            />
                            <span className="absolute inset-0 bg-[#DADBDE]/55" aria-hidden="true" />
                          </button>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
