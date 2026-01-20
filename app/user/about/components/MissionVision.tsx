'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Core Values Data - BIOSITE
const coreValues = [
  { letter: 'B', title: 'Belief', description: 'We believe in our mission to save and improve lives through reliable medical solutions.', letterIndex: 0 },
  { letter: 'I', title: 'Integrity', description: 'We conduct our business with integrity.', letterIndex: 1 },
  { letter: 'O', title: 'Outstanding Service', description: 'We are committed to provide service that exceeds expectations.', letterIndex: 2 },
  { letter: 'S', title: 'Stewardship', description: 'We take responsibility in managing our resources wisely.', letterIndex: 3 },
  { letter: 'I', title: 'Innovation', description: 'We continuously introduce innovative healthcare solutions.', letterIndex: 4 },
  { letter: 'T', title: 'Teamwork', description: 'We unite our strengths, support one another to succeed as ONE BIOSITE.', letterIndex: 5 },
  { letter: 'E', title: 'Excellence', description: 'We strive for excellence in everything we do.', letterIndex: 6 }
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
    }, 4500); // Change slide every 4.5 seconds for better readability

    return () => clearInterval(timer);
  }, [totalSlides, startSlideshow]);

  useEffect(() => {
    // Show "CORE VALUES" text when we reach the last slide
    setShowCoreValuesText(currentIndex === coreValues.length);
  }, [currentIndex]);

  return (
    <div className="relative h-72 md:h-80 lg:h-96 flex items-center justify-center overflow-hidden px-4">
      <AnimatePresence mode="wait">
        {!showCoreValuesText ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.43, 0.13, 0.23, 0.96],
              opacity: { duration: 0.6 },
              scale: { duration: 0.7, ease: "easeOut" }
            }}
            className="absolute text-center max-w-5xl"
          >
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8">
              {coreValues[currentIndex]?.title}
            </h3>
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-white/95 font-medium leading-relaxed px-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {coreValues[currentIndex]?.description}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="core-values-finale"
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            transition={{ 
              duration: 1.3, 
              ease: [0.34, 1.56, 0.64, 1],
              scale: {
                type: "spring",
                stiffness: 120,
                damping: 12
              }
            }}
            className="absolute text-center"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white drop-shadow-2xl">
              CORE VALUES
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Responsive styles for various screen sizes
const responsive1366Styles = `
  @media (min-width: 1279px) and (max-width: 1281px) and (min-height: 664px) and (max-height: 666px) {
    /* 1280x665 Display - Scale down significantly */
    #mission-vision {
      padding-top: 1rem !important;
      padding-bottom: 1rem !important;
      min-height: 665px !important;
      max-height: 665px !important;
      height: 665px !important;
      overflow: hidden !important;
    }
    
    #mission-vision .max-w-7xl {
      transform: scale(1) !important;
      margin-top: -3rem !important;
      margin-bottom: -3rem !important;
    }
    
    #mission-vision .space-y-12 {
      gap: 1.5rem !important;
    }
    
    #mission-vision .grid-cols-1 {
      gap: 1.25rem !important;
    }
    
    #mission-vision .rounded-2xl {
      padding: 1.25rem !important;
    }
    
    #mission-vision .text-2xl {
      font-size: 1.35rem !important;
    }
    
    #mission-vision .text-3xl {
      font-size: 1.5rem !important;
    }
    
    #mission-vision .text-base {
      font-size: 0.875rem !important;
      line-height: 1.4 !important;
    }
    
    #mission-vision .text-lg {
      font-size: 0.95rem !important;
      line-height: 1.5 !important;
    }
    
    #mission-vision .text-9xl {
      font-size: 5rem !important;
    }
    
    #mission-vision .text-8xl {
      font-size: 4.5rem !important;
    }
    
    #mission-vision .text-7xl {
      font-size: 3.5rem !important;
    }
    
    #mission-vision .text-6xl {
      font-size: 3rem !important;
    }
    
    #mission-vision .text-5xl {
      font-size: 2rem !important;
    }
    
    #mission-vision .text-xl {
      font-size: 1rem !important;
    }
    
    #mission-vision .h-72 {
      height: 13rem !important;
    }
    
    #mission-vision .mt-12 {
      margin-top: 1.5rem !important;
    }
    
    #mission-vision .mt-16 {
      margin-top: 1.75rem !important;
    }
    
    #mission-vision .mb-6 {
      margin-bottom: 1rem !important;
    }
    
    #mission-vision .mb-8 {
      margin-bottom: 1.25rem !important;
    }
    
    #mission-vision .mb-4 {
      margin-bottom: 0.75rem !important;
    }
    
    #mission-vision .p-3 {
      padding: 0.625rem !important;
    }
    
    #mission-vision .h-6 {
      height: 1.25rem !important;
      width: 1.25rem !important;
    }
  }
  
  @media (min-width: 1360px) and (max-width: 1370px) and (min-height: 760px) and (max-height: 775px) {
    #mission-vision {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
      min-height: 100vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    #mission-vision .max-w-7xl {
      transform: scale(1) !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    
    #mission-vision .space-y-12 {
      gap: 2rem !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
    }
    
    #mission-vision .grid-cols-1 {
      gap: 1.5rem !important;
    }
    
    #mission-vision .rounded-2xl {
      padding: 1.5rem !important;
    }
    
    #mission-vision .text-2xl {
      font-size: 1.5rem !important;
    }
    
    #mission-vision .text-base {
      font-size: 0.95rem !important;
      line-height: 1.5 !important;
    }
    
    #mission-vision .text-6xl {
      font-size: 3.5rem !important;
    }
    
    #mission-vision .text-5xl {
      font-size: 2.5rem !important;
    }
    
    #mission-vision .text-xl {
      font-size: 1.1rem !important;
    }
    
    #mission-vision .h-72 {
      height: 16rem !important;
    }
    
    #mission-vision .mt-12 {
      margin-top: 2rem !important;
    }
    
    #mission-vision .mb-6 {
      margin-bottom: 1.5rem !important;
    }
  }
`;

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
    }, 4500);

    return () => clearInterval(timer);
  }, [startSlideshow]);

  useEffect(() => {
    setShowCoreValuesText(currentLetterIndex === coreValues.length);
  }, [currentLetterIndex]);

  const currentLetterData = showCoreValuesText ? null : coreValues[currentLetterIndex];
  const currentLetter = currentLetterData?.letter || '';
  const currentLetterPosition = currentLetterData?.letterIndex ?? -1;

  return (
    <>
      <style>{responsive1366Styles}</style>
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
          src="/asset/slides/visminbuilding.png"
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
                setTimeout(() => setStartSlideshow(true), 700);
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
                  OUR MISION
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                To deliver innovative medical solutions and exceptional customer service that empower healthcare professionals, institutions and partners.
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
                  OUR VISION
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                To be the most trusted partner in advancing healthcare - providing innovative medical solutions that ensure every life receives the best care.
              </p>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl" />
            </motion.div>
          </div>

          {/* Core Values Section - BIOSITE */}
          <div className="mt-12 md:mt-16">
            {/* BIOSITE Letters */}
            <motion.div
              className="text-center mb-6 md:mb-8"
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
                        scale: isActive ? 1.15 : 1,
                        textShadow: isActive 
                          ? '0 0 20px rgba(35, 86, 168, 0.5), 0 0 40px rgba(35, 86, 168, 0.3)' 
                          : '0 0 0px rgba(255, 255, 255, 0)',
                        transition: {
                          color: { duration: 0.3, ease: "easeInOut" },
                          scale: { duration: 0.4, ease: "easeOut" },
                          textShadow: { duration: 0.3 }
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
    </>
  );
}

export default MissionVision;
