
'use client';





import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';

const EventGallery: React.FC = () => {
  // Video sources
  const videoSources = [
    '/asset/My Video11.mp4',
    '/asset/My Video10.mp4',
  ];

  // Video navigation state
  const [videoIndex, setVideoIndex] = useState(0);

  // Navigation handlers (for more than 2 videos)
  const handlePrevVideo = () => {
    setVideoIndex((prev) => (prev === 0 ? videoSources.length - 1 : prev - 1));
  };
  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev === videoSources.length - 1 ? 0 : prev + 1));
  };
  // Ref for video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause on single click
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // Fullscreen on double click
  const handleVideoDoubleClick = () => {
    const video = videoRef.current;
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
      <div className="container mx-auto px-6 mt-20 mb-16">
        {/* Video Title Section - outside video, same layout as heading */}
        <motion.div 
          className="text-center text-white mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
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
          {/* If two videos, show side by side. If more, show one with navigation. */}
          {videoSources.length === 2 ? (
            videoSources.map((src, idx) => (
              <motion.div
                key={src}
                className="relative w-[800px] h-[500px] rounded-2xl overflow-hidden shadow-2xl group bg-gradient-to-br from-[#2B3990] via-[#2B7CD3] to-[#1e2a68] border-4 border-[#2B3990]/40"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  ref={idx === 0 ? videoRef : undefined}
                  src={src}
                  controls
                  autoPlay
                  muted
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl cursor-pointer"
                  poster="/asset/image.png"
                  style={{ background: 'rgba(43,57,144,0.2)', aspectRatio: '16/9' }}
                  onClick={handleVideoClick}
                  onDoubleClick={handleVideoDoubleClick}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))
          ) : (
            <div className="relative w-[900px] h-[500px]">
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group bg-gradient-to-br from-[#2B3990] via-[#2B7CD3] to-[#1e2a68] border-4 border-[#2B3990]/40"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <video
                  ref={videoRef}
                  src={videoSources[videoIndex]}
                  controls
                  autoPlay
                  muted
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl cursor-pointer"
                  poster="/asset/image.png"
                  style={{ background: 'rgba(43,57,144,0.2)', aspectRatio: '16/9' }}
                  onClick={handleVideoClick}
                  onDoubleClick={handleVideoDoubleClick}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
              {/* Navigation buttons for more than 2 videos */}
              <button
                onClick={handlePrevVideo}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-4 transition-all duration-300 z-30 group"
                aria-label="Previous video"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextVideo}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-4 transition-all duration-300 z-30 group"
                aria-label="Next video"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default EventGallery;