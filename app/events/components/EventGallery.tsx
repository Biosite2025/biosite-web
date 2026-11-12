'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence, type PanInfo, type Variants } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../../about/components/SectionHeading';
import { FOCUS_RING } from '../../about/components/motionShared';
import BmiLoader from '@/src/components/ui/BmiLoader';

const BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

/**
 * Photo deck flow, matched to taste-skill's before-and-after showcase on
 * tasteskill.dev: cards rise in from below, tilted, and settle over 0.9s on
 * cubic-bezier(0.16, 1, 0.3, 1); on the way out they drop through the foot of
 * the frame, tipping the other way. Each card starts a beat after the last.
 */
const DECK_HOLD_MS = 4200;
const FLOW_EASE = [0.16, 1, 0.3, 1] as const;
const DROP_EASE = [0.7, 0, 0.84, 0] as const;
const TILT = [-5, 3.5, -2.5];

type CardFlow = { i: number; n: number; dir: 1 | -1 };
const staggerIndex = ({ i, n, dir }: CardFlow) => (dir > 0 ? i : n - 1 - i);
const cardVariants: Variants = {
  enter: ({ i }: CardFlow) => ({ y: '115%', rotate: TILT[i % TILT.length] * 1.4, opacity: 0 }),
  center: (c: CardFlow) => ({
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: FLOW_EASE, delay: staggerIndex(c) * 0.09 },
  }),
  exit: (c: CardFlow) => ({
    y: '125%',
    rotate: -TILT[c.i % TILT.length],
    opacity: 0,
    transition: { duration: 0.5, ease: DROP_EASE, delay: staggerIndex(c) * 0.07 },
  }),
};

const DECK_BUTTON =
  'inline-flex size-11 items-center justify-center rounded-full border border-[#22409A]/25 bg-white text-[#22409A] ' +
  'transition-[transform,border-color] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] ' +
  '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#22409A] active:translate-y-px active:scale-[.985]';

/** Takes photos from each folder in turn, so every set mixes events. */
const interleave = (rows: string[][]) => {
  const out: string[] = [];
  const total = rows.reduce((s, r) => s + r.length, 0);
  for (let i = 0; out.length < total; i++) {
    for (const row of rows) if (i < row.length) out.push(row[i]);
  }
  return out;
};

/** Swipe threshold: a short flick or a deliberate drag both count. 1 = next, -1 = prev, 0 = neither. */
const swipeDirection = (info: PanInfo): 1 | -1 | 0 => {
  if (info.offset.x < -50 || info.velocity.x < -400) return 1;
  if (info.offset.x > 50 || info.velocity.x > 400) return -1;
  return 0;
};

/**
 * Highlight-video carousel: both pairs move together — the new pair slides
 * in from one side while the old one slides out the other, on one eased curve.
 */
const pairVariants = {
  enter: (dir: 1 | -1) => ({ x: `${dir * 100}%`, opacity: 0.4 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: 1 | -1) => ({ x: `${dir * -100}%`, opacity: 0.4 }),
};
// Long, gentle ease-in-out so the slide reads as a glide, not a snap.
const PAIR_SLIDE = { duration: 1.1, ease: [0.45, 0, 0.2, 1] as const };

const EventGallery: React.FC = () => {
  const [topRowImages, setTopRowImages] = useState<string[]>([]);
  const [bottomRowImages, setBottomRowImages] = useState<string[]>([]);
  const [largeOf, setLargeOf] = useState<Record<string, string>>({});
  const [imagesLoading, setImagesLoading] = useState(true);
  const [videoSources, setVideoSources] = useState<string[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);


  // Swipe navigation is for touch devices only (iOS/Android phones & tablets);
  // mouse users keep the arrow buttons.
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const sync = () => setIsTouch(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  // Video carousel swipe uses plain touch events rather than framer drag: the
  // outgoing and incoming pairs are briefly mounted together, and a shared drag
  // controller could leave framer's global drag lock held, which then blocked
  // the photo lightbox's swipe.
  const videoTouch = useRef<{ x: number; y: number } | null>(null);

  // ---- data ----
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/event-gallery');
        const data = await res.json();
        // Rows show the small web copy; the lightbox swaps in the large one.
        // Both fall back to the original if no web copy has been generated.
        type GalleryItem = { url: string; thumbUrl?: string; largeUrl?: string };
        const thumb = (i: GalleryItem) => i.thumbUrl || i.url;
        const large: Record<string, string> = {};
        (data.folders || []).flat().forEach((i: GalleryItem) => (large[thumb(i)] = i.largeUrl || i.url));
        setLargeOf(large);
        if (data.folders?.[0]?.length) setTopRowImages(data.folders[0].map(thumb));
        if (data.folders?.[1]?.length) setBottomRowImages(data.folders[1].map(thumb));
      } catch (err) {
        console.error('[EventGallery] gallery fetch failed:', err);
      } finally {
        setImagesLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/event-videos');
        const data = await res.json();
        if (data.videos?.length) setVideoSources(data.videos.map((v: { url: string }) => v.url));
      } catch (err) {
        console.error('[EventGallery] videos fetch failed:', err);
      } finally {
        setVideosLoading(false);
      }
    })();
  }, []);

  // ---- photo deck ----
  // The flow of taste-skill's before-and-after showcase (tasteskill.dev): on
  // each step the cards drop out through the foot of the frame one after
  // another, tipping slightly, then the next cards rise in from below, tilted,
  // and settle on the long soft curve. Three photos a step on desktop, one on
  // a phone; a step every DECK_HOLD_MS while the deck is on screen.
  const [perStep, setPerStep] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const sync = () => setPerStep(mq.matches ? 3 : 1);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const order = useMemo(() => interleave([topRowImages, bottomRowImages]), [topRowImages, bottomRowImages]);
  const stepCount = Math.max(1, Math.ceil(order.length / perStep));
  const [stepIndex, setStepIndex] = useState(0);
  const [deckDir, setDeckDir] = useState<1 | -1>(1);
  const deckStep = Math.min(stepIndex, stepCount - 1); // stays valid when perStep changes
  const deck = order.slice(deckStep * perStep, deckStep * perStep + perStep);
  const goStep = (next: number, dir: 1 | -1) => {
    setDeckDir(dir);
    setStepIndex(((next % stepCount) + stepCount) % stepCount);
  };

  // `paused`: the pointer or focus is on the deck, or the viewer is open.
  const [paused, setPaused] = useState(false);
  const [deckPaused, setDeckPaused] = useState(false); // the visitor's pause button
  const snapsRef = useRef<HTMLElement>(null);
  const snapsInView = useInView(snapsRef, { amount: 0.3 });
  const reducedMotion = useReducedMotion();
  const autoplay = stepCount > 1 && !paused && !deckPaused && snapsInView && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => goStep(deckStep + 1, 1), DECK_HOLD_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, deckStep, stepCount]);

  // Touch: a mostly-horizontal swipe of 50px or more changes step.
  const deckTouch = useRef<{ x: number; y: number } | null>(null);

  // ---- modal ----
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);
  const allImages = [...topRowImages, ...bottomRowImages];

  // Full-size gallery images are large; show the BMI loader until one decodes
  // rather than leaving the lightbox blank.
  const [imgLoading, setImgLoading] = useState(false);

  const loadDims = (src: string) => {
    setImgLoading(true);
    const img = new window.Image();
    img.onload = () => {
      setDims({ width: img.naturalWidth, height: img.naturalHeight });
      setImgLoading(false);
    };
    img.onerror = () => setImgLoading(false); // never strand the viewer on a spinner
    img.src = largeOf[src] || src;
  };
  const openModal = (image: string) => {
    loadDims(image);
    setSelectedImage(image);
    setIsModalOpen(true);
    setPaused(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setDims(null);
    setImgLoading(false);
    setPaused(false);
    document.body.style.overflow = 'unset';
  };
  const step = (dir: 1 | -1) => {
    if (!selectedImage) return;
    const i = allImages.indexOf(selectedImage);
    const n = (i + dir + allImages.length) % allImages.length;
    loadDims(allImages[n]);
    setSelectedImage(allImages[n]);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, selectedImage]);

  // ---- videos ----
  const [videoPairIndex, setVideoPairIndex] = useState(0);
  const totalPairs = Math.ceil(videoSources.length / 2);
  const [pairDir, setPairDir] = useState<1 | -1>(1);
  // Every page change remounts the videos (paused, at 0:00), so bring every
  // cover back too — otherwise a previously played video returns as a bare,
  // paused black frame.
  const goToPair = (next: number, dir: 1 | -1) => {
    setPairDir(dir);
    setVideoPairIndex(next);
    setStartedVideos({});
  };
  const prevPair = () => goToPair(videoPairIndex === 0 ? totalPairs - 1 : videoPairIndex - 1, -1);
  const nextPair = () => goToPair(videoPairIndex === totalPairs - 1 ? 0 : videoPairIndex + 1, 1);
  // Videos are looked up from the clicked element, not shared refs: during the
  // pair slide the outgoing and incoming pairs are mounted together, and the
  // outgoing pair unmounting would null a shared ref the new pair relies on.
  const toggleVideo = (v: HTMLVideoElement) => {
    if (v.paused) v.play();
    else v.pause();
  };
  // Videos sit behind a branded cover until played; keyed by src so each
  // video gets its cover back when it ends or the carousel moves on.
  const [startedVideos, setStartedVideos] = useState<Record<string, boolean>>({});
  const setStarted = (src: string, started: boolean) => setStartedVideos((s) => ({ ...s, [src]: started }));
  const playFromCover = (cover: HTMLElement, src: string) => {
    const v = cover.parentElement?.querySelector('video');
    if (!v) return;
    setStarted(src, true);
    v.muted = false; // the visitor chose to play it — let them hear it
    v.play().catch(() => {
      // Some browsers refuse unmuted playback; fall back to muted.
      v.muted = true;
      v.play().catch(() => {});
    });
  };

  const renderDeck = () => (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* The frame: cards fall out through its foot and rise in from below it. */}
      <div
        className="relative overflow-hidden rounded-3xl bg-white/85 p-4 shadow-[0_24px_60px_-30px_rgba(13,22,51,0.35)] ring-1 ring-black/5 backdrop-blur-[2px] sm:p-6 lg:p-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          deckTouch.current = stepCount > 1 ? { x: t.clientX, y: t.clientY } : null;
        }}
        onTouchEnd={(e) => {
          const start = deckTouch.current;
          deckTouch.current = null;
          if (!start) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - start.x;
          const dy = t.clientY - start.y;
          if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return; // a tap or a vertical scroll
          goStep(deckStep + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        }}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Holds the deck's height while one set has left and the next has not arrived. */}
        <div className={`grid gap-4 sm:gap-5 lg:gap-6 ${perStep === 3 ? 'grid-cols-3' : 'grid-cols-1'}`} aria-hidden="true">
          {Array.from({ length: perStep }).map((_, i) => (
            <div key={i} className="aspect-[4/3] sm:aspect-[4/5]" />
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={`${perStep}-${deckStep}`}
            className={`absolute inset-4 grid gap-4 sm:inset-6 sm:gap-5 lg:inset-8 lg:gap-6 ${perStep === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}
            custom={deckDir}
            initial="enter"
            animate="center"
            exit="exit"
            aria-live="polite"
          >
            {deck.map((image, i) => (
              <motion.li
                key={image}
                custom={{ i, n: deck.length, dir: deckDir }}
                variants={cardVariants}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => openModal(image)}
                  aria-label={`Open photo ${allImages.indexOf(image) + 1} of ${allImages.length}`}
                  className={`group relative block h-full w-full overflow-hidden rounded-2xl bg-[#E5E7EB] shadow-[0_14px_30px_-18px_rgba(13,22,51,0.55)] ring-1 ring-black/5 ${FOCUS_RING}`}
                >
                  <Image
                    src={largeOf[image] || image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03] [@media(hover:hover)_and_(pointer:fine)]:group-hover:duration-[600ms] group-focus-visible:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    quality={70}
                    placeholder="blur"
                    blurDataURL={BLUR}
                  />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* Controls: previous/next on the left; pause and the rolling step count on the right. */}
      {stepCount > 1 && (
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => goStep(deckStep + d, d)}
                aria-label={d < 0 ? 'Previous photos' : 'Next photos'}
                className={`${DECK_BUTTON} ${FOCUS_RING}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={d < 0 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                </svg>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setDeckPaused((p) => !p)}
                aria-pressed={deckPaused}
                aria-label={deckPaused ? 'Play the photos' : 'Pause the photos'}
                className={`${DECK_BUTTON} ${FOCUS_RING}`}
              >
                {deckPaused ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M4 2l8 5-8 5z" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2h3v10H3zM8 2h3v10H8z" /></svg>
                )}
              </button>
            )}
            {/* The count rolls like the showcase's "Step 3 of 4" pill. */}
            <span className="inline-flex h-9 items-center overflow-hidden rounded-full bg-[#0d1633] px-4 text-xs font-semibold tabular-nums text-white">
              <span className="sr-only">Photos {deckStep * perStep + 1} to {Math.min((deckStep + 1) * perStep, order.length)} of {order.length}</span>
              <span aria-hidden="true" className="relative inline-flex">
                Set&nbsp;
                <AnimatePresence mode="popLayout" initial={false} custom={deckDir}>
                  <motion.span
                    key={deckStep}
                    custom={deckDir}
                    initial={{ y: deckDir > 0 ? '100%' : '-100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: deckDir > 0 ? '-100%' : '100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: FLOW_EASE }}
                    className="inline-block"
                  >
                    {deckStep + 1}
                  </motion.span>
                </AnimatePresence>
                &nbsp;of {stepCount}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ============ SNAPS GALLERY ============ */}
      <section ref={snapsRef} id="snaps" aria-labelledby="snaps-title" className="relative py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
      
            title="Snaps from Our Events"
            intro="Capturing the energy, innovation, and connections that make our events truly special."
            align="center"
            titleId="snaps-title"
          />
        </div>

        {/* Loading skeleton: the deck's frame with three empty cards */}
        {imagesLoading && (
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
            <div className="grid grid-cols-1 gap-4 rounded-3xl bg-white/85 p-4 ring-1 ring-black/5 sm:grid-cols-3 sm:gap-5 sm:p-6 lg:gap-6 lg:p-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`aspect-[4/3] animate-pulse rounded-2xl bg-[#E5E7EB] sm:aspect-[4/5] ${i > 0 ? 'hidden sm:block' : ''}`} />
              ))}
            </div>
          </div>
        )}

        {/* Empty / error state (this is what was a blank void on deployed) */}
        {!imagesLoading && allImages.length === 0 && (
          <div className="mx-auto max-w-md px-4 text-center">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white/80 p-8 shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#22409A]/10 text-[#22409A]">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4z" />
                </svg>
              </div>
              <p className="font-semibold text-[#111827]">Event photos are on the way</p>
              <p className="mt-2 text-sm text-[#6B7280]">Check back soon — we&apos;re curating snapshots from our latest events.</p>
            </div>
          </div>
        )}

        {/* The deck */}
        {!imagesLoading && allImages.length > 0 && renderDeck()}
      </section>

      {/* ============ HIGHLIGHT VIDEOS ============ */}
      {(videosLoading || videoSources.length > 0) && (
        <section id="event-videos" aria-labelledby="videos-title" className="relative py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              
              title={`Event Highlight Video${videoSources.length === 1 ? '' : 's'}`}
              intro="Relive the best moments from our recent events."
              align="center"
              titleId="videos-title"
            />

            {videosLoading ? (
              <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" aria-hidden="true">
                {[0, 1].map((i) => (
                  <div key={i} className="aspect-video animate-pulse rounded-2xl bg-[#E5E7EB]" />
                ))}
              </div>
            ) : (
              <div className="relative mt-12">
                {totalPairs > 1 && !isTouch && (
                  <>
                    <button
                      type="button"
                      onClick={prevPair}
                      aria-label="Previous videos"
                      className={`absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-[#22409A] shadow-md ring-1 ring-black/5 transition hover:bg-blue-50 lg:-left-5 ${FOCUS_RING}`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={nextPair}
                      aria-label="Next videos"
                      className={`absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 text-[#22409A] shadow-md ring-1 ring-black/5 transition hover:bg-blue-50 lg:-right-5 ${FOCUS_RING}`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Clip the slide; the padding/negative margin keeps card shadows visible. */}
                <div className="relative -m-4 overflow-hidden p-4">
                <AnimatePresence mode="popLayout" initial={false} custom={pairDir}>
                <motion.div
                  key={videoPairIndex}
                  custom={pairDir}
                  variants={pairVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={PAIR_SLIDE}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                  style={isTouch ? { touchAction: 'pan-y' } : undefined}
                  // Touch: a mostly-horizontal swipe of 50px+ changes pair. Swipes
                  // that start on a playing video are ignored so scrubbing its
                  // timeline doesn't flip the page.
                  onTouchStart={(e) => {
                    const t = e.touches[0];
                    videoTouch.current =
                      isTouch && totalPairs > 1 && !(e.target as HTMLElement).closest('video') ? { x: t.clientX, y: t.clientY } : null;
                  }}
                  onTouchEnd={(e) => {
                    const start = videoTouch.current;
                    videoTouch.current = null;
                    if (!start) return;
                    const t = e.changedTouches[0];
                    const dx = t.clientX - start.x;
                    const dy = t.clientY - start.y;
                    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return; // a tap or a vertical scroll
                    if (dx < 0) nextPair();
                    else prevPair();
                  }}
                >
                  {[0, 1].map((offset) => {
                    const idx = videoPairIndex * 2 + offset;
                    if (idx >= videoSources.length) return null;
                    return (
                      <div
                        key={videoSources[idx] + idx}
                        className="group relative isolate aspect-video overflow-hidden rounded-2xl bg-[#0d1633] shadow-lg ring-1 ring-black/5"
                      >
                        <video
                          src={videoSources[idx]}
                          preload="none"
                          controls
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                          onClick={(e) => toggleVideo(e.currentTarget)}
                          onPlay={() => setStarted(videoSources[idx], true)}
                          onEnded={() => setStarted(videoSources[idx], false)}
                        />

                        {/* Branded cover — the Biosite bear poster until the visitor plays it */}
                        <AnimatePresence>
                          {!startedVideos[videoSources[idx]] && (
                            <motion.button
                              type="button"
                              onClick={(e) => playFromCover(e.currentTarget, videoSources[idx])}
                              aria-label="Play event highlight video"
                              className={`group/cover absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-[#0B5CE0] ${FOCUS_RING}`}
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35 }}
                            >
                              <Image
                                src="/asset/playbuttonbackground.webp"
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover object-center transition-transform duration-500 group-hover/cover:scale-105"
                              />
                              {/* Play icon appears on hover (and keyboard focus); the poster's
                                  own red button already invites a tap on touch screens. */}
                              <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/cover:bg-black/25 group-focus-visible/cover:bg-black/25" />
                              <span className="relative flex h-16 w-16 scale-75 items-center justify-center rounded-full bg-white/95 text-[#22409A] opacity-0 shadow-xl transition-all duration-300 group-hover/cover:scale-100 group-hover/cover:opacity-100 group-focus-visible/cover:scale-100 group-focus-visible/cover:opacity-100 lg:h-20 lg:w-20">
                                <svg className="ml-1 h-7 w-7 lg:h-9 lg:w-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
                                </svg>
                              </span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
                </AnimatePresence>
                </div>

                {/* Which pair is showing — every cover is the same poster, so this is
                    what tells the visitor they've moved to different videos. */}
                {totalPairs > 1 && isTouch && (
                  <p className="mt-5 text-center text-xs font-medium text-[#6B7280]">Swipe for more videos</p>
                )}
                {totalPairs > 1 && (
                  <div className={`${isTouch ? 'mt-3' : 'mt-6'} flex items-center justify-center gap-2`} role="group" aria-label="Video pages">
                    {Array.from({ length: totalPairs }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (i !== videoPairIndex) goToPair(i, i > videoPairIndex ? 1 : -1);
                        }}
                        aria-label={`Show videos ${i * 2 + 1}–${Math.min(i * 2 + 2, videoSources.length)}`}
                        aria-current={i === videoPairIndex}
                        className={`relative h-2.5 w-2.5 rounded-full bg-[#22409A]/25 transition-colors hover:bg-[#22409A]/50 ${FOCUS_RING}`}
                      >
                        {i === videoPairIndex && (
                          <motion.span
                            layoutId="video-pair-dot"
                            className="absolute inset-y-0 -left-1.5 -right-1.5 rounded-full bg-[#EE232E]"
                            transition={PAIR_SLIDE}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ IMAGE MODAL ============ */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className={`absolute right-4 top-4 rounded-full p-2 text-white/90 hover:text-white ${FOCUS_RING}`}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Previous image"
                  className={`absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/90 hover:text-white ${FOCUS_RING}`}
                >
                  <svg className="h-8 w-8 lg:h-12 lg:w-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Next image"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/90 hover:text-white ${FOCUS_RING}`}
                >
                  <svg className="h-8 w-8 lg:h-12 lg:w-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            {/* BMI burst loader while the full-size image decodes. */}
            {imgLoading && (
              <motion.div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <BmiLoader size="44px" label="Loading photo" />
              </motion.div>
            )}

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: imgLoading ? 0 : 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              // Touch: swipe left/right for the next/previous photo.
              drag={isTouch && allImages.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                const d = swipeDirection(info);
                if (d !== 0) step(d);
              }}
            >
              <Image
                src={largeOf[selectedImage] || selectedImage}
                alt="Event photo"
                width={dims?.width || 1200}
                height={dims?.height || 800}
                className="max-h-[calc(var(--vh,1vh)*88)] w-auto rounded-lg shadow-2xl"
                style={{ objectFit: 'contain' }}
                quality={95}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventGallery;
