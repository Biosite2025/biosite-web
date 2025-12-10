'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Core Values Data - BIOSITE
const coreValues = [
  { letter: 'B', title: 'BELIEF', description: 'We believe in the power of healthcare to transform lives', letterIndex: 0 },
  { letter: 'I', title: 'INTEGRITY', description: 'We uphold the highest standards of honesty and ethics', letterIndex: 1 },
  { letter: 'O', title: 'OUTSTANDING SERVICE', description: 'We deliver exceptional care and service excellence', letterIndex: 2 },
  { letter: 'S', title: 'STEWARDSHIP (MALASAKIT)', description: 'We care deeply for our communities and environment', letterIndex: 3 },
  { letter: 'I', title: 'INNOVATION', description: 'We embrace creativity and continuous improvement', letterIndex: 4 },
  { letter: 'T', title: 'TEAMWORK', description: 'We collaborate to achieve shared goals', letterIndex: 5 },
  { letter: 'E', title: 'EXCELLENCE', description: 'We strive for the highest quality in everything we do', letterIndex: 6 }
];

// Core Values Slideshow Component
const CoreValuesSlideshow = ({ currentLetter, startSlideshow }: { currentLetter: string, startSlideshow: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(coreValues.length); // Start at "CORE VALUES"
  const [showCoreValuesText, setShowCoreValuesText] = useState(true); // Start with "CORE VALUES" visible

  // Slides include all core values + final "CORE VALUES" text
  const totalSlides = coreValues.length + 1;

  useEffect(() => {
    if (!startSlideshow) return; // Don't start until cards finish animating

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= totalSlides) {
          return 0; // Loop back to start
        }
        return next;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [totalSlides, startSlideshow]);

  useEffect(() => {
    // Show "CORE VALUES" text when we reach the last slide
    setShowCoreValuesText(currentIndex === coreValues.length);
  }, [currentIndex]);

  return (
    <div className="relative h-48 md:h-56 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!showCoreValuesText ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute text-center"
          >
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              {coreValues[currentIndex]?.title}
            </h3>
          </motion.div>
        ) : (
          <motion.div
            key="core-values-finale"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              scale: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }}
            className="absolute text-center"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white">
              CORE VALUES
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MissionVision = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(coreValues.length); // Start at "CORE VALUES"
  const [showCoreValuesText, setShowCoreValuesText] = useState(true); // Start with "CORE VALUES" visible
  const [startSlideshow, setStartSlideshow] = useState(false); // Control when slideshow starts

  // Sync with slideshow timing
  useEffect(() => {
    if (!startSlideshow) return;

    const totalSlides = coreValues.length + 1;
    
    const timer = setInterval(() => {
      setCurrentLetterIndex((prev) => {
        const next = prev + 1;
        if (next >= totalSlides) {
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [startSlideshow]);

  useEffect(() => {
    setShowCoreValuesText(currentLetterIndex === coreValues.length);
  }, [currentLetterIndex]);

  const currentLetterData = showCoreValuesText ? null : coreValues[currentLetterIndex];
  const currentLetter = currentLetterData?.letter || '';
  const currentLetterPosition = currentLetterData?.letterIndex ?? -1;

  return (
    <motion.section
      id="mission-vision"
      className="relative py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 min-h-screen flex items-center justify-center bg-blue-500/90"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dmvyhrewy/image/upload/w_1200,q_auto:low,f_auto/v1763530578/biosite-assets/slide_3.png"
          alt="Background"
          fill
          loading="lazy"
          quality={60}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />  
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-500/80 z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="space-y-12 md:space-y-16">
          
          {/* Mission and Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Mission Card */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 group hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 border border-white/30 relative overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              onAnimationComplete={() => {
                // Check if this is the last card to animate (Vision card has delay of 0.2)
                setTimeout(() => setStartSlideshow(true), 700); // Wait for Vision card animation (0.2 delay + 0.7 duration = 0.9s, rounded to 700ms after Mission completes)
              }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-3 mr-4 shadow-lg group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2356a8]">
                  MISSION
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                To deliver innovative Medical Solutions and exceptional customer service that empower professionals, institutions, and partners.
              </p>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl" />
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 group hover:shadow-3xl hover:-translate-y-1 transition-all duration-500 border border-white/30 relative overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-3 mr-4 shadow-lg group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2356a8]">
                  VISION
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                To be the most trusted partner in advancing healthcare by providing innovative Medical Solutions that ensure every life receives the best care.
              </p>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl" />
            </motion.div>
          </div>

          {/* Core Values Section - BIOSITE */}
          <div className="mt-16">
            {/* BIOSITE Letters */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                {['B', 'I', 'O', 'S', 'I', 'T', 'E'].map((letter, index) => {
                  const isActive = index === currentLetterPosition && !showCoreValuesText;
                  return (
                    <motion.span
                      key={index}
                      className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold ${
                        isActive ? 'text-[#2356a8]' : 'text-white/90'
                      }`}
                      initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.5 + (index * 0.1),
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.15,
                        transition: { duration: 0.2 }
                      }}
                      animate={{
                        color: isActive ? '#2356a8' : 'rgba(255, 255, 255, 0.9)',
                        scale: isActive ? 1.1 : 1,
                        transition: {
                          color: { duration: 0.1 },
                          scale: { duration: 0.2 }
                        }
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>

            {/* Core Values Slideshow */}
            <CoreValuesSlideshow currentLetter={currentLetter} startSlideshow={startSlideshow} />
          </div>

        </div>
      </div>
    </motion.section>
  );
}

export default MissionVision;
