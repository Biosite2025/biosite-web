'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../../about/components/SectionHeading';
import { FOCUS_RING } from '../../about/components/motionShared';
import BmiLoader from '@/src/components/ui/BmiLoader';

const BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

const CARD_W_MOBILE = 208; // 192 card + 16 gap
const CARD_W_DESKTOP = 344; // 320 card + 24 gap

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

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

  // ---- infinite scroll ----
  const isMobile = isClient && window.innerWidth < 1024;
  const imageWidth = isMobile ? CARD_W_MOBILE : CARD_W_DESKTOP;
  const topLoopWidth = topRowImages.length * imageWidth;
  const bottomLoopWidth = bottomRowImages.length * imageWidth;
  const topRowX = useMotionValue(0);
  const bottomRowX = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState(0);

  useEffect(() => {
    if (bottomLoopWidth > 0) bottomRowX.set(-bottomLoopWidth);
  }, [bottomLoopWidth, bottomRowX]);

  useAnimationFrame((_, delta) => {
    if (paused || !isClient) return;
    const speed = 40;
    if (topLoopWidth > 0) {
      let next = topRowX.get() - speed * (delta / 1000);
      if (next <= -topLoopWidth) next += topLoopWidth;
      topRowX.set(next);
    }
    if (bottomLoopWidth > 0) {
      let next = bottomRowX.get() + speed * (delta / 1000);
      if (next >= 0) next -= bottomLoopWidth;
      bottomRowX.set(next);
    }
  });

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

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

  const renderRow = (images: string[], x: MotionValue<number>, loopWidth: number, keyPrefix: string) => (
    <div
      className="flex overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <motion.div
        className="flex gap-4 lg:gap-6"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -loopWidth + 1000, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => {
          pause();
          setIsDragging(true);
          setDragStartTime(Date.now());
        }}
        onDragEnd={() => {
          resume();
          setTimeout(() => setIsDragging(false), 100);
        }}
      >
        {Array.from({ length: images.length * 3 }).map((_, index) => {
          const image = images[index % images.length];
          return (
            <button
              key={`${keyPrefix}-${index}`}
              type="button"
              onClick={(e) => {
                if (isDragging || Date.now() - dragStartTime < 200) {
                  e.preventDefault();
                  return;
                }
                openModal(image);
              }}
              className={`group relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl bg-[#E5E7EB] shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.03] lg:h-56 lg:w-80 ${FOCUS_RING}`}
              aria-label="Open event photo"
            >
              <Image
                src={image}
                alt={`Event photo ${(index % images.length) + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 1024px) 192px, 320px"
                quality={60}
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[#22409A]/0 opacity-0 transition-all duration-300 group-hover:bg-[#22409A]/25 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 p-3 text-[#22409A]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </span>
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );

  return (
    <>
      {/* ============ SNAPS GALLERY ============ */}
      <section id="snaps" aria-labelledby="snaps-title" className="relative py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
      
            title="Snaps from Our Events"
            intro="Capturing the energy, innovation, and connections that make our events truly special."
            align="center"
            titleId="snaps-title"
          />
        </div>

        {/* Loading skeletons */}
        {imagesLoading && (
          <div className="space-y-4 lg:space-y-6" aria-hidden="true">
            {[0, 1].map((row) => (
              <div key={row} className="flex gap-4 overflow-hidden lg:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-32 w-48 flex-shrink-0 animate-pulse rounded-xl bg-[#E5E7EB] lg:h-56 lg:w-80" />
                ))}
              </div>
            ))}
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

        {/* Rows */}
        {!imagesLoading && allImages.length > 0 && (
          <div className="space-y-4 lg:space-y-6">
            {topRowImages.length > 0 && renderRow(topRowImages, topRowX, topLoopWidth, 'top')}
            {bottomRowImages.length > 0 && renderRow(bottomRowImages, bottomRowX, bottomLoopWidth, 'bottom')}
          </div>
        )}
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
                {totalPairs > 1 && (
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
                {totalPairs > 1 && (
                  <div className="mt-6 flex items-center justify-center gap-2" role="group" aria-label="Video pages">
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
            >
              <Image
                src={largeOf[selectedImage] || selectedImage}
                alt="Event photo"
                width={dims?.width || 1200}
                height={dims?.height || 800}
                className="max-h-[88vh] w-auto rounded-lg shadow-2xl"
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
