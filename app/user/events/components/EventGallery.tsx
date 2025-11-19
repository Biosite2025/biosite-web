
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const EventGallery: React.FC = () => {
  // Video sources (use encoded URLs for safety)
  const videoSources = [
    '/asset/My%20Video11.mp4',
    '/asset/My%20Video10.mp4',
    '/asset/My%20Video10.mp4',
    '/asset/My%20Video11.mp4',
    
  ];

  // Video navigation state (show 2 at a time)
  const [videoPairIndex, setVideoPairIndex] = useState(0);
  
  // Modal state for image viewing
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

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
  // Sample event images - you can replace these with your actual event photos
  const eventImages = [
    'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530499/biosite-assets/istockphoto-1183500324-612x612.jpg',
    'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530499/biosite-assets/istockphoto-498908634-612x612.jpg',
    'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530502/biosite-assets/istockphoto-511061090-612x612.jpg',
    'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530481/biosite-assets/4c3c5489-639f-4cff-9eed-2e1e2d2172fe.jpg',
    'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530500/biosite-assets/image.png',
    'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530499/biosite-assets/image1.png',
  ];

  // Duplicate for seamless loop in carousel
  const loopedImages = [...eventImages, ...eventImages];


  // Motion values for both rows
  const topRowX = useMotionValue(0);
  const bottomRowX = useMotionValue(-1000);
  const [paused, setPaused] = useState(false);

  // Animation frame for top row
  useAnimationFrame((t, delta) => {
    if (!paused) {
      // Move left
      let next = topRowX.get() - (1000 / 20) * (delta / 1000); // 1000px in 20s
      if (next <= -1000) next += 1000;
      topRowX.set(next);
    }
  });
  // Animation frame for bottom row
  useAnimationFrame((t, delta) => {
    if (!paused) {
      // Move right
      let next = bottomRowX.get() + (1000 / 25) * (delta / 1000); // 1000px in 25s
      if (next >= 0) next -= 1000;
      bottomRowX.set(next);
    }
  });

  // Pause/resume handlers
  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  // Modal handlers
  const openModal = (image: string) => {
    // Load image to get its natural dimensions
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = image;
    
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
    setPaused(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Navigate to previous image in modal
  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = eventImages.indexOf(selectedImage);
    const prevIndex = currentIndex === 0 ? eventImages.length - 1 : currentIndex - 1;
    const prevImage = eventImages[prevIndex];
    
    // Load new image dimensions
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = prevImage;
    
    setSelectedImage(prevImage);
  };

  // Navigate to next image in modal
  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = eventImages.indexOf(selectedImage);
    const nextIndex = currentIndex === eventImages.length - 1 ? 0 : currentIndex + 1;
    const nextImage = eventImages[nextIndex];
    
    // Load new image dimensions
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
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
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-12 lg:py-20 min-h-[400px] lg:min-h-[600px]">
      {/* Image Modal - Sakura Style */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedImage && (
          <>
            {/* Blurry overlay to prevent background clicks, frosted glass effect */}
            <motion.div
              className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md"
              onClick={closeModal}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-2 sm:px-4 pointer-events-none max-[912px]:px-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full border-2 border-gray-200 mx-auto relative pointer-events-auto overflow-hidden"
                style={{
                  maxWidth: imageDimensions ? `min(${imageDimensions.width}px, 90vw)` : '90vw',
                  maxHeight: '90vh',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* X Button - Overlapping on image */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-white hover:text-gray-200 text-2xl sm:text-3xl md:text-4xl font-bold focus:outline-none transition-colors duration-200 max-[912px]:top-2 max-[912px]:right-2 max-[912px]:text-2xl z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center border-none outline-none shadow-none bg-transparent hover:bg-transparent backdrop-blur-0"
                  aria-label="Close modal"
                  type="button"
                  style={{ zIndex: 100 }}
                >
                  &times;
                </button>
                {/* Previous Arrow Button - Overlapping on image, no white border */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-50 text-white p-2 sm:p-3 transition-all duration-300 group border-none outline-none shadow-none bg-transparent hover:bg-transparent backdrop-blur-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                {/* Next Arrow Button - Overlapping on image, no white border */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-50 text-white p-2 sm:p-3 transition-all duration-300 group border-none outline-none shadow-none bg-transparent hover:bg-transparent backdrop-blur-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
                {/* Image - Fully occupying modal space, no padding, with smooth fade/slide transition */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedImage}
                    className="relative w-full"
                    style={{
                      aspectRatio: imageDimensions ? `${imageDimensions.width} / ${imageDimensions.height}` : 'auto',
                    }}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Image
                      src={selectedImage}
                      alt="Event photo fullscreen"
                      fill
                      className="object-contain rounded-xl sm:rounded-2xl"
                      quality={100}
                      priority
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
      <div className="relative overflow-hidden">
        {/* Top Row - Right to Left */}
        <div className="flex mb-4 lg:mb-8">
          <motion.div
            className="flex gap-3 lg:gap-6 min-w-max"
            style={{ x: topRowX }}
          >
            {loopedImages.map((image, index) => (
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Left to Right */}
        <div className="flex">
          <motion.div
            className="flex gap-3 lg:gap-6 min-w-max"
            style={{ x: bottomRowX }}
          >
            {loopedImages.map((image, index) => (
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            ))}
          </motion.div>
        </div>
      </div>
      

      {/* Video Section - moved below gallery and made larger */}
      <div className="container max-w-full px-4 lg:px-6 mt-12 lg:mt-20 mb-16 lg:mb-[150px]">
        {/* Video Title Section - outside video, same layout as heading */}
        <motion.div 
          className="text-center text-white mb-6 lg:mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 mt-16 lg:mt-[200px]">
            Event Highlight Video
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl mx-auto px-4 lg:px-0">
            Relive the best moments from our recent event
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
          className={`flex justify-center gap-4 lg:gap-10`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
                    poster="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530500/biosite-assets/image.png"
                    style={{ background: 'rgba(43,57,144,0.2)', aspectRatio: '16/9' }}
                    onClick={() => handleVideoClick(offset)}
                    onDoubleClick={() => handleVideoDoubleClick(offset)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
};

export default EventGallery;