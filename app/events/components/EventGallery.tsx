'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence, type PanInfo, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FOCUS_RING } from '../../about/components/motionShared';
import BmiLoader from '@/src/components/ui/BmiLoader';
import EventVideoStack from './EventVideoStack';

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

  const renderDeck = () => (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* An invisible frame: cards fall out through its foot and rise in from below
          it. Its padding leaves room for the card shadows. */}
      <div
        className="relative overflow-hidden p-4 sm:p-6 lg:p-8"
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

      {/* No visible controls. One pause button stays for keyboard users (motion
          that runs longer than 5 s must be stoppable): hidden until it is
          tabbed to, and absent under reduced motion, when nothing advances. */}
      {stepCount > 1 && !reducedMotion && (
        <button
          type="button"
          onClick={() => setDeckPaused((p) => !p)}
          aria-pressed={deckPaused}
          className={`sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:bottom-2 focus-visible:right-4 focus-visible:z-10 focus-visible:rounded-full focus-visible:bg-[#0d1633] focus-visible:px-4 focus-visible:py-2 focus-visible:text-xs focus-visible:font-semibold focus-visible:text-white ${FOCUS_RING}`}
        >
          {deckPaused ? 'Play the photos' : 'Pause the photos'}
        </button>
      )}
      <p className="sr-only" aria-live="polite">
        Photos {deckStep * perStep + 1} to {Math.min((deckStep + 1) * perStep, order.length)} of {order.length}
      </p>
    </div>
  );

  return (
    <>
      {/* ============ SNAPS GALLERY ============ */}
      <section ref={snapsRef} id="snaps" aria-labelledby="snaps-title" className="relative py-16 md:py-24">
        {/* The heading, then the photos; same type as "Event Highlights". */}
        <h2
          id="snaps-title"
          className="mx-auto mb-6 max-w-6xl px-4 text-center font-extrabold leading-[1.1] tracking-tight text-[#0d1633] sm:px-6 lg:mb-8 lg:px-8"
          style={{ fontSize: 'clamp(2.1rem, calc(var(--vw,1vw)*3.8), 3.25rem)' }}
        >
          Snaps from Our Events
        </h2>

        {/* Loading skeleton: three empty cards */}
        {imagesLoading && (
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:gap-5 sm:p-6 lg:gap-6 lg:p-8">
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
      <EventVideoStack videos={videoSources} loading={videosLoading} />

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
