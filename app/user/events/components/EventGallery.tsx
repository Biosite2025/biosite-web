
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const EventGallery: React.FC = () => {
  // Video sources - dynamically loaded from Digital Ocean Spaces
  const [videoSources, setVideoSources] = useState<string[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Add custom styles for 1280x665 screen size
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Custom styles for 1280x665 screen */
      @media (min-width: 1024px) and (max-width: 1366px) and (min-height: 600px) and (max-height: 768px) {
        #snaps h2 {
          font-size: 2.5rem !important;
          line-height: 1.2 !important;
          margin-bottom: 0.75rem !important;
        }
        #snaps p {
          font-size: 1.125rem !important;
          line-height: 1.5 !important;
        }
        /* Make gallery/video box more landscape */
        #slide .flex-shrink-0 {
          width: 340px !important;
          height: 160px !important;
        }
        #event-gallery {
          padding-top: 2.5rem !important;
          padding-bottom: 2.5rem !important;
        }
        #eventsvideo h2 {
          font-size: 2.5rem !important;
          margin-top: 4rem !important;
          margin-bottom: 0.75rem !important;
        }
        #eventsvideo p {
          font-size: 1.125rem !important;
        }
        #eventsvideo .relative.w-full {
          max-width: 800px !important;
          height: 340px !important;
         
        }
        #eventsvideo video {
          object-fit: contain !important;
          aspect-ratio: 16/6 !important;
        }
      }
      /* Specific for exactly 1280x665 */
      @media (width: 1280px) and (height: 665px) {
        /* Remove/reduce gap between video boxes */
        #eventsvideo .flex.justify-center.gap-4, #eventsvideo .flex.justify-center.gap-4.lg\:gap-10, #eventsvideo .flex.justify-center.gap-4.lg\:gap-10.relative {
          gap: 2rem !important;
        }
        #snaps h2 {
          font-size: 2.25rem !important;
        }
        #slide .flex-shrink-0 {
          width: 360px !important;
          height: 220px !important;
        }
        #event-gallery {
          min-height: 320px !important;
        }
        #eventsvideo .relative.w-full {
          transform: scale(1) !important;
          max-width: 800px !important;
          height: 260px !important;
          display: flex !important;
          align-items: center !important;
          margin-top: 1.1rem !important;
        }
        #eventsvideo video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
          aspect-ratio: 16/9 !important;
          background: #222 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Gallery images - dynamically loaded from Digital Ocean Spaces
  const [topRowImages, setTopRowImages] = useState<string[]>([]);
  const [bottomRowImages, setBottomRowImages] = useState<string[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  // Video navigation state (show 2 at a time)
  const [videoPairIndex, setVideoPairIndex] = useState(0);
  
  // Ensure client-side only rendering for animations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  // Fetch gallery images from API on mount
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        console.log('[EventGallery] Fetching gallery images from API...');
        const response = await fetch('/api/event-gallery');
        const data = await response.json();
        
        if (data.folders && data.folders.length > 0) {
          // First folder for top row
          if (data.folders[0] && data.folders[0].length > 0) {
            const topImages = data.folders[0].map((img: any) => img.url);
            setTopRowImages(topImages);
            console.log(`[EventGallery] Loaded ${topImages.length} images for top row from ${data.folderNames?.[0] || 'folder 1'}`);
          }
          
          // Second folder for bottom row
          if (data.folders[1] && data.folders[1].length > 0) {
            const bottomImages = data.folders[1].map((img: any) => img.url);
            setBottomRowImages(bottomImages);
            console.log(`[EventGallery] Loaded ${bottomImages.length} images for bottom row from ${data.folderNames?.[1] || 'folder 2'}`);
          }
        } else {
          console.warn('[EventGallery] No folders or images found');
        }
      } catch (error) {
        console.error('[EventGallery] Error fetching gallery images:', error);
      } finally {
        setImagesLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Fetch videos from API on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('[EventGallery] Fetching videos from API...');
        const response = await fetch('/api/event-videos');
        const data = await response.json();
        
        if (data.videos && data.videos.length > 0) {
          const videoUrls = data.videos.map((v: any) => v.url);
          setVideoSources(videoUrls);
          console.log(`[EventGallery] Loaded ${videoUrls.length} videos`);
        } else {
          console.warn('[EventGallery] No videos found');
        }
      } catch (error) {
        console.error('[EventGallery] Error fetching videos:', error);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, []);
  
  // Modal state for image viewing
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageRendered, setImageRendered] = useState(false);

  // Navigation handlers for pairs
  const totalPairs = Math.ceil(videoSources.length / 2);
  const handlePrevVideoPair = () => {
    setVideoPairIndex((prev) => (prev === 0 ? totalPairs - 1 : prev - 1));
  };
  const handleNextVideoPair = () => {
    setVideoPairIndex((prev) => (prev === totalPairs - 1 ? 0 : prev + 1));
  };
  // Refs for video elements
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  // Play/pause on single click
  const handleVideoClick = (idx: number) => {
    const video = videoRefs[idx].current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // Fullscreen on double click
  const handleVideoDoubleClick = (idx: number) => {
    const video = videoRefs[idx].current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  };

  // Debug: Log image loading performance
  useEffect(() => {
    const allImages = [...topRowImages, ...bottomRowImages];
    if (allImages.length === 0) return;
    
    console.log('[EventGallery] Component mounted at:', new Date().toISOString());
    console.log('[EventGallery] Total images to load:', allImages.length);
    
    const startTime = performance.now();
    let loadedCount = 0;
    
    allImages.forEach((src, index) => {
      const img = new window.Image();
      const imgStartTime = performance.now();
      
      img.onload = () => {
        loadedCount++;
        const imgLoadTime = (performance.now() - imgStartTime).toFixed(2);
        console.log(`[EventGallery] Image ${index + 1}/${allImages.length} loaded in ${imgLoadTime}ms - Total: ${loadedCount}`);
        
        if (loadedCount === allImages.length) {
          const totalTime = (performance.now() - startTime).toFixed(2);
          console.log(`[EventGallery] ✅ All images loaded in ${totalTime}ms`);
        }
      };
      
      img.onerror = () => {
        console.error(`[EventGallery] ❌ Failed to load image ${index + 1}:`, src);
      };
      
      img.src = src;
    });
  }, [topRowImages, bottomRowImages]);

  // Total images to render for seamless loop (optimized - no array duplication)
  const totalTopLoopImages = topRowImages.length * 3;
  const totalBottomLoopImages = bottomRowImages.length * 3;

  // Calculate loop width based on image count
  // Each image: 320px (lg:w-80) + 24px gap (lg:gap-6) = 344px on desktop
  // Mobile: 192px (w-48) + 12px gap (gap-3) = 204px
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const imageWidth = isMobile ? 204 : 344;
  const topLoopWidth = topRowImages.length * imageWidth;
  const bottomLoopWidth = bottomRowImages.length * imageWidth;

  // Motion values for both rows
  const topRowX = useMotionValue(0);
  const bottomRowX = useMotionValue(-imageWidth * bottomRowImages.length); // Start off-screen for rightward scroll
  const [paused, setPaused] = useState(false);

  // Animation frame for top row
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Start animation only when client-side is ready
  useEffect(() => {
    if (isClient) {
      setIsAnimating(true);
    }
  }, [isClient]);
  
  useAnimationFrame((t, delta) => {
    if (!paused && isAnimating && isClient && topLoopWidth > 0) {
      // Move left - scroll through entire image set very smoothly
      const speed = topLoopWidth / 400; // Complete loop in 120 seconds for very smooth viewing
      let next = topRowX.get() - speed * (delta / 1000);
      // Reset when we've scrolled through one complete set
      if (next <= -topLoopWidth) next += topLoopWidth;
      topRowX.set(next);
    }
  });
  
  // Animation frame for bottom row
  useAnimationFrame((t, delta) => {
    if (!paused && isAnimating && isClient && bottomLoopWidth > 0) {
      // Move right - scroll through entire image set very smoothly
      const speed = bottomLoopWidth / 300; // Complete loop in 140 seconds for very smooth viewing
      let next = bottomRowX.get() + speed * (delta / 1000);
      // Reset when we've scrolled through one complete set
      if (next >= 0) next -= bottomLoopWidth;
      bottomRowX.set(next);
    }
  });
  
  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      setIsAnimating(false);
    };
  }, []);

  // Pause/resume handlers
  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  // Modal handlers
  const openModal = (image: string) => {
    console.log('[EventGallery] Opening modal for image:', image);
    const modalStartTime = performance.now();
    
    setImageLoading(true);
    setImageRendered(false);
    // Images are already high quality, no need to transform
    const modalImage = image;
    
    // Load image to get its natural dimensions
    const img = new window.Image();
    img.onload = () => {
      const loadTime = (performance.now() - modalStartTime).toFixed(2);
      console.log(`[EventGallery] Modal image loaded in ${loadTime}ms`);
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      // Don't set loading to false here - let onLoadingComplete handle it
    };
    img.src = modalImage;
    
    setSelectedImage(image);
    setIsModalOpen(true);
    setPaused(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setImageDimensions(null);
    setImageLoading(false);
    setImageRendered(false);
    setPaused(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Navigate to previous image in modal
  const handlePrevImage = () => {
    if (!selectedImage) return;
    const allImages = [...topRowImages, ...bottomRowImages];
    const currentIndex = allImages.indexOf(selectedImage);
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    const prevImage = allImages[prevIndex];
    
    setImageLoading(true);
    setImageRendered(false);
    // Load new image dimensions
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      // Don't set loading to false here - let onLoadingComplete handle it
    };
    img.src = prevImage;
    
    setSelectedImage(prevImage);
  };

  // Navigate to next image in modal
  const handleNextImage = () => {
    if (!selectedImage) return;
    const allImages = [...topRowImages, ...bottomRowImages];
    const currentIndex = allImages.indexOf(selectedImage);
    const nextIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    const nextImage = allImages[nextIndex];
    
    setImageLoading(true);
    setImageRendered(false);
    // Load new image dimensions
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      // Don't set loading to false here - let onLoadingComplete handle it
    };
    img.src = nextImage;
    
    setSelectedImage(nextImage);
  };

  // Close modal on scroll
  useEffect(() => {
    if (!isModalOpen) return;

    // Add a small delay before enabling scroll-to-close
    const timeoutId = setTimeout(() => {
      const handleScroll = () => {
        closeModal();
      };
      window.addEventListener('scroll', handleScroll, { once: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, 500); // 500ms delay to prevent immediate closing

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Handle keyboard navigation (arrow keys)
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [isModalOpen, selectedImage]);

  // Hide TopNav and SideNav when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('hide-navs');
    } else {
      document.body.classList.remove('hide-navs');
    }
    return () => {
      document.body.classList.remove('hide-navs');
    };
  }, [isModalOpen]);

  return (
    <>
      

    <div id="event-gallery" className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-12 lg:py-20 min-h-[400px] lg:min-h-[600px]">
      {/* Loading State */}
      {imagesLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-xl">Loading gallery images...</div>
        </div>
      )}

      {/* Image Modal - Sakura Style */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedImage && (
          <>
            {/* Dark overlay to prevent background clicks */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/80"
              onClick={closeModal}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                  {/* X Button - Inside image at top-right */}
                  {!imageLoading && imageRendered && (
                    <button
                      onClick={closeModal}
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 text-4xl sm:text-5xl font-bold focus:outline-none transition-all duration-200 z-[60] p-2"
                      aria-label="Close modal"
                      type="button"
                    >
                      &times;
                    </button>
                  )}

                  {/* Previous Arrow Button - Inside image, no circle */}
                  {!imageLoading && imageRendered && (
                    <motion.button
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white p-2 transition-all duration-300"
                      whileHover={{ scale: 1.2, x: -4 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Previous image"
                    >
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                  )}

                  {/* Next Arrow Button - Inside image, no circle */}
                  {!imageLoading && imageRendered && (
                    <motion.button
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white p-2 transition-all duration-300"
                      whileHover={{ scale: 1.2, x: 4 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Next image"
                    >
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  )}

                  {/* Loading Spinner */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-[55]">
                      <div className="bg-black/70 rounded-full p-6 backdrop-blur-sm">
                        <motion.div
                          className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: imageLoading ? 0 : 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ visibility: imageLoading ? 'hidden' : 'visible' }}
                    >
                      <Image
                        src={selectedImage || ''}
                        alt="Event photo fullscreen"
                        width={imageDimensions?.width || 1200}
                        height={imageDimensions?.height || 800}
                        className="rounded-lg shadow-2xl max-w-[92vw] max-h-[88vh] w-auto h-auto"
                        style={{ objectFit: 'contain' }}
                        quality={95}
                        priority
                        onLoadingComplete={() => {
                          console.log('[EventGallery] Image rendering complete');
                          // Small delay to ensure smooth transition
                          setTimeout(() => {
                            setImageLoading(false);
                            // Additional delay for buttons
                            setTimeout(() => {
                              setImageRendered(true);
                            }, 200);
                          }, 100);
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>


      <div className="container mx-auto px-4 lg:px-6 mb-10 lg:mb-16 mt-8 lg:mt-14">
        <motion.div 
          id='snaps'
          className="text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4">
            Snaps from Our Events
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto px-4 lg:px-0">
            Capturing the energy, innovation, and connections that make our events truly special
          </p>
        </motion.div>
      </div>


      {/* Infinite Scrolling Image Gallery */}
      {!imagesLoading && (topRowImages.length > 0 || bottomRowImages.length > 0) && (
      <div id="slide" className="relative overflow-hidden">
        {/* Top Row - Right to Left */}
        {topRowImages.length > 0 && (
        <div className="flex mb-4 lg:mb-8">
          <motion.div
            className="flex gap-3 lg:gap-6 min-w-max"
            style={{ x: topRowX }}
          >            {Array.from({ length: totalTopLoopImages }).map((_, index) => {
              const image = topRowImages[index % topRowImages.length];
              const isPriority = index < 4; // Priority load first 4 images
              return (
              <motion.div
                key={`top-${index}`}
                className="relative flex-shrink-0 w-48 h-32 lg:w-80 lg:h-60 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
                onClick={() => openModal(image)}
              >
                <Image
                  src={image}
                  alt={`Event photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 192px, 320px"
                  quality={60}
                  priority={isPriority}
                  loading={isPriority ? undefined : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onLoadingComplete={() => {
                    if (isPriority) {
                      console.log(`[EventGallery] Priority image ${index + 1} rendered`);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Click to view indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 lg:p-4">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
        )}

        {/* Bottom Row - Left to Right (Reversed Order) */}
        {bottomRowImages.length > 0 && (
        <div className="flex">
          <motion.div
            className="flex gap-3 lg:gap-6 min-w-max"
            style={{ x: bottomRowX }}
          >
            {Array.from({ length: totalBottomLoopImages }).map((_, index) => {
              const image = bottomRowImages[index % bottomRowImages.length];
              return (
              <motion.div
                key={`bottom-${index}`}
                className="relative flex-shrink-0 w-48 h-32 lg:w-80 lg:h-60 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
                onClick={() => openModal(image)}
              >
                <Image
                  src={image}
                  alt={`Event photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 192px, 320px"
                  quality={60}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Click to view indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 lg:p-4">
                    <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
        )}
      </div>
      )}

      {/* Video Section - moved below gallery and made larger */}
      {!videosLoading && videoSources.length > 0 && (
      <div id='eventsvideo' className="container max-w-full px-4 lg:px-6 mt-12 lg:mt-20 mb-16 lg:mb-[150px]">
        {/* Video Title Section - outside video, same layout as heading */}
        <motion.div 
          className="text-center text-white mb-6 lg:mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 mt-16 lg:mt-[200px]">
            Event Highlight Video{videoSources.length > 1 ? 's' : ''}
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto px-4 lg:px-0">
            Relive the best moments from our recent event{videoSources.length > 1 ? 's' : ''}
          </p>
        </motion.div>
        {/* Drag to swipe instruction (moved below video section) */}
      <div className="flex justify-center mt-2 mb-8">
        <span className="text-base lg:text-lg text-gray-300 bg-gray-900/70 px-4 py-2 rounded-full shadow-md border border-gray-700 flex items-center gap-2">
          <motion.svg
            className="w-5 h-5 text-[#2B3990]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M10 18l-6-6 6-6" />
          </motion.svg>
          Drag to swipe videos
        </span>
      </div>
        <motion.div
          className={`flex justify-center gap-4 lg:gap-10 relative`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Previous Arrow - Only show if more than 2 videos */}
          {totalPairs > 1 && (
            <motion.button
              onClick={handlePrevVideoPair}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 lg:p-4 text-white transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous videos"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {/* Next Arrow - Only show if more than 2 videos */}
          {totalPairs > 1 && (
            <motion.button
              onClick={handleNextVideoPair}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 lg:p-4 text-white transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next videos"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          {/* Show two videos at a time, with navigation for pairs */}
          <motion.div
            className="relative w-full flex justify-center items-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.x < -100) {
                handleNextVideoPair();
              } else if (info.offset.x > 100) {
                handlePrevVideoPair();
              }
            }}
            style={{ touchAction: 'pan-x' }}
          >
            {[0, 1].map((offset) => {
              const idx = videoPairIndex * 2 + offset;
              if (idx >= videoSources.length) return null;
              return (
                <motion.div
                  key={videoSources[idx] + idx}
                  className="relative w-full lg:w-[850px] h-[200px] lg:w-[850px] lg:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl group bg-gradient-to-br from-[#2B3990] via-[#2B7CD3] to-[#1e2a68] border-2 lg:border-4 border-[#2B3990]/40 mx-1 lg:mx-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <video
                    ref={videoRefs[offset]}
                    src={videoSources[idx]}
                    controls
                    autoPlay
                    muted
                    className="absolute inset-0 w-full h-full object-cover rounded-xl lg:rounded-2xl cursor-pointer"
                    poster="https://res.cloudinary.com/dmvyhrewy/image/upload/w_600,q_auto:low,f_auto/v1763530500/biosite-assets/image.png"
                    style={{ background: 'rgba(43,57,144,0.2)', aspectRatio: '16/9' }}
                    onClick={() => handleVideoClick(offset)}
                    onDoubleClick={() => handleVideoDoubleClick(offset)}
                    onLoadStart={() => console.log(`[EventGallery] Video ${idx + 1} loading started`)}
                    onLoadedData={() => console.log(`[EventGallery] Video ${idx + 1} loaded`)}
                    onError={(e) => console.error(`[EventGallery] Video ${idx + 1} error:`, e)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      )}

    </div>
    </>
  );
};

export default EventGallery;