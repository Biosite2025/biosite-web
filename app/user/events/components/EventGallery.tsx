
'use client';





import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
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
    '/asset/istockphoto-1183500324-612x612.jpg',
    '/asset/istockphoto-498908634-612x612.jpg',
    '/asset/istockphoto-511061090-612x612.jpg',
    '/asset/4c3c5489-639f-4cff-9eed-2e1e2d2172fe.jpg',
    '/asset/image.png',
    '/asset/image1.png',
    // Duplicate for seamless loop
    '/asset/istockphoto-1183500324-612x612.jpg',
    '/asset/istockphoto-498908634-612x612.jpg',
    '/asset/istockphoto-511061090-612x612.jpg',
    '/asset/4c3c5489-639f-4cff-9eed-2e1e2d2172fe.jpg',
  ];


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

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-20 min-h-[600px]">
      <div className="container mx-auto px-6 mb-16 mt-14">
        <motion.div 
          className="text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Snaps from Our Events
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Capturing the energy, innovation, and connections that make our events truly special
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Image Gallery */}
      <div className="relative overflow-hidden">
        {/* Top Row - Right to Left */}
        <div className="flex mb-8">
          <motion.div
            className="flex gap-6 min-w-max"
            style={{ x: topRowX }}
          >
            {[...eventImages, ...eventImages].map((image, index) => (
              <motion.div
                key={`top-${index}`}
                className="relative flex-shrink-0 w-80 h-60 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
              >
                <Image
                  src={image}
                  alt={`Event photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Left to Right */}
        <div className="flex">
          <motion.div
            className="flex gap-6 min-w-max"
            style={{ x: bottomRowX }}
          >
            {[...eventImages, ...eventImages].map((image, index) => (
              <motion.div
                key={`bottom-${index}`}
                className="relative flex-shrink-0 w-80 h-60 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
              >
                <Image
                  src={image}
                  alt={`Event photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Section - moved below gallery and made larger */}
      <div className="container max-w-full px-6 mt-20 mb-[150px]">
        {/* Video Title Section - outside video, same layout as heading */}
        <motion.div 
          className="text-center text-white mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl mt-[200px] md:text-4xl lg:text-5xl font-bold mb-4">
            Event Highlight Video
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Relive the best moments from our recent event
          </p>
        </motion.div>
        <motion.div
          className={`flex justify-center gap-10`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Show two videos at a time, with navigation for pairs */}
          <div className="relative w-full flex justify-center items-center">
            {[0, 1].map((offset) => {
              const idx = videoPairIndex * 2 + offset;
              if (idx >= videoSources.length) return null;
              return (
                <motion.div
                  key={videoSources[idx] + idx}
                  className="relative w-[850px] h-[600px] rounded-2xl overflow-hidden shadow-2xl group bg-gradient-to-br from-[#2B3990] via-[#2B7CD3] to-[#1e2a68] border-4 border-[#2B3990]/40 mx-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <video
                    ref={videoRefs[offset]}
                    src={videoSources[idx]}
                    controls
                    autoPlay
                    muted
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl cursor-pointer"
                    poster="/asset/image.png"
                    style={{ background: 'rgba(43,57,144,0.2)', aspectRatio: '16/9' }}
                    onClick={() => handleVideoClick(offset)}
                    onDoubleClick={() => handleVideoDoubleClick(offset)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
            {/* Navigation buttons for video pairs */}
            <button
              onClick={handlePrevVideoPair}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-4 transition-all duration-300 z-30 group"
              aria-label="Previous video pair"
              style={{ left: 0 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextVideoPair}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-4 transition-all duration-300 z-30 group"
              aria-label="Next video pair"
              style={{ right: 0 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default EventGallery;