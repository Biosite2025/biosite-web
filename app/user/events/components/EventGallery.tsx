
'use client';





import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';

const EventGallery: React.FC = () => {
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
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-20 min-h-[">
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

      
    </div>
  );
};

export default EventGallery;