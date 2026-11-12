'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import Image from 'next/image';
import { FOCUS_RING } from '../../about/components/motionShared';
import BmiLoader from '@/src/components/ui/BmiLoader';
import { BUTTON_BASE, EventsHeading, SECTION, WRAP } from './EventsHeading';

const BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

/** Photos on the wall: one large and eight small on desktop, the first seven on a phone. */
const WALL_SIZE = 9;
const WALL_SIZE_PHONE = 7;

/** Swipe threshold: a short flick or a deliberate drag both count. 1 = next, -1 = prev, 0 = neither. */
const swipeDirection = (info: PanInfo): 1 | -1 | 0 => {
  if (info.offset.x < -50 || info.velocity.x < -400) return 1;
  if (info.offset.x > 50 || info.velocity.x > 400) return -1;
  return 0;
};

/** Takes photos from each folder in turn, so the wall mixes events. */
const interleave = (rows: string[][]) => {
  const out: string[] = [];
  for (let i = 0; out.length < rows.flat().length; i++) {
    for (const row of rows) if (i < row.length) out.push(row[i]);
  }
  return out;
};

type Video = { url: string; title: string };

/** A readable title from an uploaded file name ("1Compress_Luzon Kick Off 2026.mp4"). */
const videoTitle = (name: string, n: number) => {
  const clean = name
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\d+\s*/, '')
    .replace(/^compress(ed)?[_\s-]*/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return !clean || /^(my\s*)?video\s*\d*$/i.test(clean) ? `Event highlight ${n}` : clean;
};

// Taste-skill's photo hover: the picture scales 1.03 inside its frame,
// 600ms in and 400ms out. No overlay, no dimming, the frame never grows.
const PHOTO_ZOOM =
  'transition-transform duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] ' +
  '[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03] [@media(hover:hover)_and_(pointer:fine)]:group-hover:duration-[600ms] group-focus-visible:scale-[1.03]';

const EventGallery: React.FC = () => {
  const [topRowImages, setTopRowImages] = useState<string[]>([]);
  const [bottomRowImages, setBottomRowImages] = useState<string[]>([]);
  const [largeOf, setLargeOf] = useState<Record<string, string>>({});
  const [imagesLoading, setImagesLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);

  // Swipe in the photo viewer is for touch devices only; mouse users keep the arrows.
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
        // Tiles show the small web copy; the viewer and the large tile use the
        // large one. Both fall back to the original if no web copy exists.
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
        if (data.videos?.length) {
          setVideos(
            data.videos.map((v: { url: string; name?: string }, i: number) => ({
              url: v.url,
              title: videoTitle(v.name || v.url.split('/').pop() || '', i + 1),
            })),
          );
        }
      } catch (err) {
        console.error('[EventGallery] videos fetch failed:', err);
      } finally {
        setVideosLoading(false);
      }
    })();
  }, []);

  // ---- photo viewer ----
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);
  const allImages = [...topRowImages, ...bottomRowImages];
  const wall = interleave([topRowImages, bottomRowImages]).slice(0, WALL_SIZE);

  // Full-size gallery images are large; show the BMI loader until one decodes
  // rather than leaving the viewer blank.
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
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setDims(null);
    setImgLoading(false);
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

  // ---- videos: one player, a playlist beside it ----
  const [current, setCurrent] = useState(0);
  // The branded cover shows until the visitor plays the video, and comes back
  // when another video is picked.
  const [started, setStarted] = useState(false);
  const pickVideo = (i: number) => {
    if (i === current) return;
    setCurrent(i);
    setStarted(false);
  };
  const playFromCover = (cover: HTMLElement) => {
    const v = cover.parentElement?.querySelector('video');
    if (!v) return;
    setStarted(true);
    v.muted = false; // the visitor chose to play it — let them hear it
    v.play().catch(() => {
      // Some browsers refuse unmuted playback; fall back to muted.
      v.muted = true;
      v.play().catch(() => {});
    });
  };
  const video = videos[current];

  return (
    <>
      {/* ============ PHOTO WALL ============ */}
      <section id="snaps" aria-labelledby="snaps-title" className={SECTION}>
        <div className={WRAP}>
          <EventsHeading
            id="snaps-title"
            title="Snaps from our events"
            intro="Pick a photo to see it full size, then use the arrows to look through the rest."
            aside={
              allImages.length > wall.length && (
                <button
                  type="button"
                  onClick={() => openModal(allImages[0])}
                  className={`${BUTTON_BASE} bg-[#22409A] text-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#1A3078]`}
                >
                  View all {allImages.length} photos
                </button>
              )
            }
          />

          {imagesLoading && (
            <div className="grid grid-cols-2 gap-3 lg:h-[calc(var(--vh,1vh)*60)] lg:grid-cols-4 lg:grid-rows-3 lg:gap-4" aria-hidden="true">
              {Array.from({ length: WALL_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-xl bg-[#E5E7EB] ${i === 0 ? 'col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto' : 'aspect-square lg:aspect-auto'} ${i >= WALL_SIZE_PHONE ? 'hidden lg:block' : ''}`}
                />
              ))}
            </div>
          )}

          {!imagesLoading && allImages.length === 0 && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white/90 p-10 text-center">
              <p className="font-semibold text-[#111827]">No event photos yet</p>
              <p className="mt-2 text-sm text-[#4B5563]">Photos from our next event will appear here.</p>
            </div>
          )}

          {!imagesLoading && wall.length > 0 && (
            <ul className="grid grid-cols-2 gap-3 lg:h-[calc(var(--vh,1vh)*60)] lg:grid-cols-4 lg:grid-rows-3 lg:gap-4">
              {wall.map((image, i) => {
                const big = i === 0;
                return (
                  <li
                    key={image}
                    className={`${big ? 'col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto' : 'aspect-square lg:aspect-auto'} ${i >= WALL_SIZE_PHONE ? 'hidden lg:block' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => openModal(image)}
                      aria-label={`Open photo ${allImages.indexOf(image) + 1} of ${allImages.length}`}
                      className={`group relative block h-full w-full overflow-hidden rounded-xl bg-[#E5E7EB] ${FOCUS_RING}`}
                    >
                      <Image
                        src={big ? largeOf[image] || image : image}
                        alt=""
                        fill
                        className={`object-cover ${PHOTO_ZOOM}`}
                        sizes={big ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                        quality={big ? 80 : 60}
                        priority={big}
                        loading={big ? undefined : 'lazy'}
                        placeholder="blur"
                        blurDataURL={BLUR}
                      />
                      {/* Inset hairline so light photos keep an edge on the white page. */}
                      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ============ HIGHLIGHT VIDEOS ============ */}
      {(videosLoading || videos.length > 0) && (
        <section id="event-videos" aria-labelledby="videos-title" className={SECTION}>
          <div className={WRAP}>
            <EventsHeading
              id="videos-title"
              title={videos.length === 1 ? 'Event highlight video' : 'Event highlight videos'}
              intro={videos.length > 1 ? 'Short recaps of our recent events. Pick one from the list to play it.' : 'A short recap of a recent event.'}
            />

            {videosLoading ? (
              <div className="aspect-video animate-pulse rounded-2xl bg-[#E5E7EB] lg:aspect-auto lg:h-[calc(var(--vh,1vh)*56)]" aria-hidden="true" />
            ) : (
              video && (
                <div>
                  {/* Player */}
                  <div className="relative isolate aspect-video overflow-hidden rounded-2xl bg-[#0d1633] shadow-[0_24px_48px_-24px_rgba(13,22,51,0.45)] ring-1 ring-black/5 lg:aspect-auto lg:h-[calc(var(--vh,1vh)*56)]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={video.url}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <video
                          src={video.url}
                          preload="none"
                          controls
                          playsInline
                          aria-label={video.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          onPlay={() => setStarted(true)}
                          onEnded={() => setStarted(false)}
                        />
                        {/* Branded cover: the Biosite bear poster until the visitor plays it */}
                        <AnimatePresence>
                          {!started && (
                            <motion.button
                              type="button"
                              onClick={(e) => playFromCover(e.currentTarget)}
                              aria-label={`Play ${video.title}`}
                              className={`group/cover absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-[#0B5CE0] ${FOCUS_RING}`}
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src="/asset/playbuttonbackground.webp"
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                className="object-cover object-center transition-transform duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/cover:scale-[1.03] [@media(hover:hover)_and_(pointer:fine)]:group-hover/cover:duration-[600ms]"
                              />
                              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-12 text-left text-sm font-semibold text-white sm:text-base">
                                {video.title}
                              </span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Playlist */}
                  {videos.length > 1 && (
                    <div className="mt-4">
                      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3" aria-label="Highlight videos">
                        {videos.map((v, i) => {
                          const on = i === current;
                          return (
                            <li key={v.url}>
                              <button
                                type="button"
                                onClick={() => pickVideo(i)}
                                aria-current={on ? 'true' : undefined}
                                className={`group flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] ${FOCUS_RING} ${
                                  on
                                    ? 'border-[#22409A] bg-white shadow-[0_8px_20px_-12px_rgba(34,64,154,0.45)]'
                                    : 'border-[#E5E7EB] bg-white/80 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-[#C7D0EC] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white'
                                }`}
                              >
                                <span className={`w-6 shrink-0 text-sm font-bold tabular-nums ${on ? 'text-[#EE232E]' : 'text-[#9CA3AF]'}`}>
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className={`min-w-0 flex-1 truncate text-sm font-semibold ${on ? 'text-[#0d1633]' : 'text-[#374151]'}`}>
                                  {v.title}
                                </span>
                                <span className={`shrink-0 text-xs font-medium ${on ? 'text-[#22409A]' : 'text-[#9CA3AF]'}`}>
                                  {on ? (started ? 'Playing' : 'Ready') : 'Play'}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </div>
              )
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
