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

type Pose = { x: string; y: string; rotate: number; scale: number; opacity: number };

// Poses, in percent of the card's own size.
// Phone: everything stays whole on screen (front card 62% wide, 5:4 stage).
const POSES: Record<Role, Pose> = {
  current: { x: '0%', y: '0%', rotate: 0, scale: 1, opacity: 1 },
  next: { x: '52%', y: '-45%', rotate: 18, scale: 0.85, opacity: 1 },
  prev: { x: '48%', y: '48%', rotate: -14, scale: 0.85, opacity: 1 },
};
// Desktop: a bigger stack on the right whose tilted cards run off the right
// edge of the screen (front card 118% of its column, about half the screen; the stage is tall enough
// that nothing is cut at the top or bottom).
const POSES_WIDE: Record<Role, Pose> = {
  current: { x: '0%', y: '0%', rotate: 0, scale: 1, opacity: 1 },
  next: { x: '58%', y: '-36%', rotate: 14, scale: 1, opacity: 1 },
  prev: { x: '55%', y: '38%', rotate: -11, scale: 1, opacity: 1 },
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
  // Desktop gets the bigger stack that runs off the right edge.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
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
    setIndex(((to % n) + n) % n);
  };
  const next = () => go(current + 1, 1);
  const prev = () => go(current - 1, -1);

  useEffect(() => {
    const sync = () => setPageHidden(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // Clicking the front video opens it full screen with sound and controls.
  // While it's being watched the stack holds; leaving full screen mutes it
  // again and the stack carries on.
  const [watching, setWatching] = useState(false);
  const stopWatching = () => {
    const v = playingRef.current;
    if (v) {
      v.muted = true;
      v.controls = !!reduced;
    }
    setWatching(false);
  };
  const watchFullScreen = () => {
    const v = playingRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    setWatching(true);
    v.muted = false;
    v.controls = true;
    v.play().catch(() => {
      v.muted = true; // a browser that refuses sound still shows the video
      v.play().catch(() => {});
    });
    if (v.requestFullscreen) {
      // Refused (e.g. inside an iframe that disallows it): back to normal.
      v.requestFullscreen().catch(stopWatching);
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen(); // iPhone: the native player
    } else {
      stopWatching();
    }
  };
  // Leaving full screen in any way (Esc, the browser's button, the video's own
  // control, the iPhone player's Done) turns the sound off again.
  useEffect(() => {
    if (!watching) return;
    const v = playingRef.current;
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    const onChange = () => {
      if (!doc.fullscreenElement && !doc.webkitFullscreenElement) stopWatching();
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    v?.addEventListener('webkitendfullscreen', stopWatching);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      v?.removeEventListener('webkitendfullscreen', stopWatching);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watching]);

  // Belt and braces: outside full screen the front video is always silent.
  useEffect(() => {
    if (watching) return;
    const v = playingRef.current;
    if (v && !v.muted) v.muted = true;
  });

  // The front video plays only while it can be seen and isn't paused. While
  // it's being watched full screen the visitor is in charge of it.
  const shouldPlay = !reduced && inView && !paused && !pageHidden && !watching;
  useEffect(() => {
    const v = playingRef.current;
    if (!v || watching) return;
    if (shouldPlay) v.play().catch(() => {});
    else v.pause();
  }, [shouldPlay, current, watching]);

  // Safety net: a video still buffering after STALL_LIMIT_MS of play time
  // hands over anyway, so a slow connection never freezes the stack.
  useEffect(() => {
    if (!shouldPlay || n < 2) return;
    const src = videos[current];
    const t = window.setTimeout(() => {
      if (advancedFrom.current === src) return;
      advancedFrom.current = src;
      setDir(1);
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
      {/* Desktop: the text is centred in the space left of the video, which keeps
          the size and place it had (the stack column is 60% of the screen). */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:max-w-none lg:grid-cols-[40%_60%] lg:gap-0 lg:px-0">
        {/* ---------- Text ---------- */}
        <div className="lg:flex lg:justify-center lg:px-10">
          <div className="lg:max-w-sm">
          <h2
            id="videos-title"
            className="max-w-[9ch] font-extrabold leading-[1.1] tracking-tight text-[#0d1633]"
            style={{ fontSize: 'clamp(2.1rem, calc(var(--vw,1vw)*3.8), 3.25rem)' }}
          >
            Event Highlights
          </h2>
          <p className="mt-3 max-w-sm leading-relaxed text-[#4B5563] [text-wrap:pretty]">
            Check out the highlights from our recent events. Click a video to watch it full screen.
          </p>
          <p className="sr-only" aria-live="polite">{n > 0 ? `Highlight video ${current + 1} of ${n}: ${title}` : ''}</p>
          {/* No visible controls: clicking the playing video opens it full
              screen. This pause button appears only for keyboard users who tab to it. */}
          {!reduced && n > 1 && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className={`sr-only focus-visible:not-sr-only focus-visible:mt-4 focus-visible:inline-block focus-visible:rounded-full focus-visible:bg-[#0d1633] focus-visible:px-4 focus-visible:py-2 focus-visible:text-xs focus-visible:font-semibold focus-visible:text-white ${FOCUS_RING}`}
            >
              {paused ? 'Play the highlight videos' : 'Pause the highlight videos'}
            </button>
          )}
          </div>
        </div>

        {/* ---------- Stack ---------- */}
        <div>
          <div
            ref={stageRef}
            className="relative aspect-[5/4] lg:aspect-[8/7]"
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
              <div className="absolute left-[2%] top-1/2 aspect-video w-[62%] -translate-y-1/2 animate-pulse lg:left-[1%] lg:w-[73%] rounded-2xl bg-[#E5E7EB]" aria-hidden="true" />
            ) : (
              <AnimatePresence initial={false} custom={dir}>
                {roles.map(({ i, role }) => {
                  const src = videos[i];
                  const front = role === 'current';
                  return (
                    <div
                      key={src}
                      className="pointer-events-none absolute left-[2%] top-1/2 w-[62%] -translate-y-1/2 lg:left-[1%] lg:w-[73%]"
                      style={{ zIndex: Z[role] }}
                    >
                      <motion.div
                        custom={dir}
                        variants={cardVariants}
                        initial="enter"
                        animate={(wide ? POSES_WIDE : POSES)[role]}
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
                              className="absolute inset-0 h-full w-full object-cover [&:fullscreen]:bg-black [&:fullscreen]:object-contain"
                              onTimeUpdate={(e) => {
                                const t = e.currentTarget.currentTime;
                                if (reduced || watching || t < PLAY_SECONDS || advancedFrom.current === src) return;
                                advancedFrom.current = src;
                                next();
                              }}
                              onEnded={() => {
                                if (reduced || watching || advancedFrom.current === src) return;
                                advancedFrom.current = src;
                                next();
                              }}
                            />
                            {/* Click the playing video to watch it full screen with sound. */}
                            {!reduced && !watching && (
                              <button
                                type="button"
                                onClick={watchFullScreen}
                                aria-label={`Watch ${videoTitle(src, i + 1)} full screen with sound`}
                                className={`group/play absolute inset-0 z-[1] flex cursor-pointer items-center justify-center ${FOCUS_RING}`}
                              >
                                {/* A play mark that shows on hover or keyboard focus. */}
                                <span className="flex size-16 scale-90 items-center justify-center rounded-full bg-white/95 text-[#22409A] opacity-0 shadow-xl transition-[opacity,transform] duration-200 ease-[cubic-bezier(.2,.8,.2,1)] group-hover/play:scale-100 group-hover/play:opacity-100 group-focus-visible/play:scale-100 group-focus-visible/play:opacity-100" aria-hidden="true">
                                  <svg className="ml-1 size-7" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>
                                </span>
                              </button>
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
