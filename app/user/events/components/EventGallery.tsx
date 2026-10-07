'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../../about/components/SectionHeading';
import { FOCUS_RING } from '../../about/components/motionShared';
import BmiLoader from '@/src/components/ui/BmiLoader';

const BLUR =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

const CARD_W_MOBILE = 208; // 192 card + 16 gap
const CARD_W_DESKTOP = 344; // 320 card + 24 gap

const EventGallery: React.FC = () => {
  const [topRowImages, setTopRowImages] = useState<string[]>([]);
  const [bottomRowImages, setBottomRowImages] = useState<string[]>([]);
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
        if (data.folders?.[0]?.length) setTopRowImages(data.folders[0].map((i: { url: string }) => i.url));
        if (data.folders?.[1]?.length) setBottomRowImages(data.folders[1].map((i: { url: string }) => i.url));
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
    img.src = src;
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
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const prevPair = () => setVideoPairIndex((p) => (p === 0 ? totalPairs - 1 : p - 1));
  const nextPair = () => setVideoPairIndex((p) => (p === totalPairs - 1 ? 0 : p + 1));
  const toggleVideo = (i: number) => {
    const v = videoRefs[i].current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
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

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {[0, 1].map((offset) => {
                    const idx = videoPairIndex * 2 + offset;
                    if (idx >= videoSources.length) return null;
                    return (
                      <div
                        key={videoSources[idx] + idx}
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-[#0d1633] shadow-lg ring-1 ring-black/5"
                      >
                        <video
                          ref={videoRefs[offset]}
                          src={videoSources[idx]}
                          controls
                          muted
                          playsInline
                          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                          onClick={() => toggleVideo(offset)}
                        />
                      </div>
                    );
                  })}
                </div>
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
                src={selectedImage}
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
