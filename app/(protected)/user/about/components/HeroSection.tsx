
"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    src: "/asset/istockphoto-1183500324-612x612.jpg",
    headline: "Innovating Diagnostics, Elevating Care",
    subheadline:
      "Empowering healthcare professionals with advanced solutions for a healthier tomorrow.",
    buttons: [
      { label: "Get Quote", href: "/contact" },
      { label: "About Us", href: "/user/about" },
    ],
  },
  {
    src: "/asset/istockphoto-511061090-612x612.jpg",
    headline: "Precision. Quality. Reliability.",
    subheadline:
      "Delivering trusted laboratory and medical products to support your success.",
    buttons: [
      { label: "Our Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    src: "/asset/istockphoto-511061090-612x612 (1).jpg",
    headline: "Innovation in Every Step",
    subheadline:
      "Discover the future of biotechnology and diagnostics with our innovative solutions.",
    buttons: [
      { label: "Learn More", href: "/user/about" },
      { label: "Join Us", href: "/careers" },
    ],
  },
];

// Placeholder translation function (replace with real translation logic or i18n integration)
function translate(text: string) {
  // In a real app, use a translation library or API here
  return text;
}


const TRANSITION_DURATION = 900; // ms
const SLIDE_DURATION = 3000; // ms
const TEXT_ANIMATION_DELAY = 250; // ms delay after image transition


const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [showText, setShowText] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  // Helper to go to a specific slide
  const goToSlide = (idx: number) => {
    setFade(false);
    setShowText(false);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrent(idx);
      setFade(true);
      setTimeout(() => setShowText(true), TEXT_ANIMATION_DELAY);
    }, TRANSITION_DURATION);
  };

  // Manual navigation
  const prevSlide = () => {
    goToSlide(current === 0 ? slides.length - 1 : current - 1);
    pauseAutoAdvance();
  };
  const nextSlide = () => {
    goToSlide(current === slides.length - 1 ? 0 : current + 1);
    pauseAutoAdvance();
  };

  // Pause auto-advance on user interaction
  const pauseAutoAdvance = () => {
    isPaused.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => {
      isPaused.current = false;
      startAutoAdvance();
    }, SLIDE_DURATION * 2);
  };

  // Auto-advance logic
  const startAutoAdvance = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        goToSlide((current + 1) % slides.length);
      }
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    setFade(true);
    setTimeout(() => setShowText(true), TEXT_ANIMATION_DELAY);
    startAutoAdvance();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <>
      <motion.section
        id="hero"
        className="relative w-full h-[480px] md:h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white group"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Enhanced Background Image with parallax and modern effects */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, idx) => (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={false}
              animate={idx === current && fade ? { opacity: 1, scale: 1.1, zIndex: 10 } : { opacity: 0, scale: 1.05, zIndex: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <Image
                src={slide.src}
                alt="Biosite Building"
                fill
                className="object-cover object-center w-full h-full"
                priority={idx === current}
                style={{ transitionProperty: 'opacity, transform' }}
              />
              {/* Enhanced overlay with dynamic gradient */}
              <motion.div
                className={`absolute inset-0 transition-all duration-[1400ms] ease-out
                  ${idx === current ? 
                    'bg-gradient-to-br from-white/85 via-white/50 to-[#2B3990]/15 backdrop-blur-[10px]' : 
                    'bg-gradient-to-br from-white/70 via-white/30 to-[#2B3990]/5 backdrop-blur-[6px]'
                  }`}
                initial={false}
                animate={idx === current ? { opacity: 1 } : { opacity: 0.7 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-[#2B3990] via-transparent to-[#2B3990]" />
            </motion.div>
          ))}
        </div>

        {/* Animated navigation arrows only visible on group hover with fade-in */}
        {/* Left hover area */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={prevSlide}
            onMouseEnter={pauseAutoAdvance}
            onFocus={pauseAutoAdvance}
            aria-label="Previous slide"
            tabIndex={0}
            initial={false}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            whileFocus={{ opacity: 1 }}
            className="w-full h-full flex items-center justify-start bg-transparent border-none outline-none p-0 m-0 cursor-pointer group pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ pointerEvents: 'auto' }}
          >
            <span className="sr-only">Previous</span>
            <span className="ml-10 flex items-center justify-center rounded-full bg-white/95 border-2 border-[#2B3990]/30 text-[#2B3990] w-12 h-12 shadow-xl hover:shadow-2xl hover:bg-[#2B3990] hover:text-white hover:border-[#2B3990] transition-all duration-200 backdrop-blur-md">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="transition-transform duration-300">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
        {/* Right hover area */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={nextSlide}
            onMouseEnter={pauseAutoAdvance}
            onFocus={pauseAutoAdvance}
            aria-label="Next slide"
            tabIndex={0}
            initial={false}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            whileFocus={{ opacity: 1 }}
            className="w-full h-full flex items-center justify-end bg-transparent border-none outline-none p-0 m-0 cursor-pointer group pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ pointerEvents: 'auto' }}
          >
            <span className="sr-only">Next</span>
            <span className="mr-10 flex items-center justify-center rounded-full bg-white/95 border-2 border-[#2B3990]/30 text-[#2B3990] w-12 h-12 shadow-xl hover:shadow-2xl hover:bg-[#2B3990] hover:text-white hover:border-[#2B3990] transition-all duration-200 backdrop-blur-md">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="transition-transform duration-300">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced content section with modern styling */}
        <div className="absolute left-[150px] top-0 h-full flex flex-col justify-center z-20 px-10 md:px-20" style={{pointerEvents: 'none', width: '60%', maxWidth: '800px'}}>
          <motion.div
            className={`flex flex-col items-start transition-all duration-800 will-change-transform relative
              ${showText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
            initial={false}
            animate={showText ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.97 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Subtle background accent */}
            <motion.div
              className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-[#2B3990] to-transparent origin-top"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={showText ? { opacity: 0.6, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ pointerEvents: 'none' }}
            />
            <motion.h1
              className="text-2xl md:text-5xl font-bold text-[#2B3990] text-left leading-tight mb-6 drop-shadow-lg transition-all duration-800 will-change-transform relative group"
              initial={false}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              {translate(slides[current].headline)}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#2B3990] to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={showText ? { width: 250 } : { width: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-[#333] text-left mb-8 max-w-2xl leading-relaxed drop-shadow-sm transition-all duration-800 will-change-transform relative"
              initial={false}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              {translate(slides[current].subheadline)}
            </motion.p>
            <div className="flex flex-row gap-6 mt-2">
              {slides[current].buttons.map((btn, idx) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  className={
                    idx === 0
                      ? `bg-gradient-to-r from-[#2B3990] to-blue-700 hover:from-blue-700 hover:to-[#2B3990] text-white font-semibold rounded-xl px-8 py-4 text-base shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-[#2B3990]/50 focus:outline-none transition-all duration-400 will-change-transform transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                      : `bg-gradient-to-r from-[#333] to-[#222] hover:from-[#222] hover:to-[#111] text-white font-semibold rounded-xl px-8 py-4 text-base shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-[#333]/50 focus:outline-none transition-all duration-400 will-change-transform transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
                  }
                  tabIndex={0}
                  initial={false}
                  animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease: 'easeOut' }}
                  style={{ pointerEvents: 'auto' }}
                  whileHover={{ scale: 1.07, y: -4 }}
                >
                  <span className="relative z-10">{translate(btn.label)}</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
  </motion.section>


      {/* Enhanced Location Boxes Section - Overlapping both sections */}
      <div className="w-full flex justify-center items-center pointer-events-none" style={{ position: 'relative', zIndex: 30, marginTop: '-90px', marginBottom: '-90px' }}>
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-8 px-4 md:px-0 pointer-events-auto">
          {/* Enhanced Manila Box */}
          <div className="flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-2xl shadow-2xl p-8 flex flex-col min-w-[260px] max-w-[370px] mx-auto group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-white text-xl font-bold mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">MANILA</div>
            <div className="text-white/90 text-sm mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">305 Col. Bonny Serrano Ave, San Juan City, 1500 Metro Manila, Philippines</div>
            <div className="flex items-center gap-3 text-white text-base font-semibold mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 .84-1.63l8-5.6a2 2 0 0 1 2.32 0l8 5.6a2 2 0 0 1 .84 1.63z"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              +63 917 111 5008
            </div>
            <div className="flex items-center justify-between mt-auto relative z-10">
              <a href="#" className="text-white text-sm font-semibold flex items-center gap-2 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-1 group/link">
                LEARN MORE 
                <span aria-hidden className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <div className="w-8 h-5 rounded bg-[#1A3578] relative">
                  <div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Cebu Box */}
          <div className="flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-2xl shadow-2xl p-8 flex flex-col min-w-[260px] max-w-[370px] mx-auto group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-white text-xl font-bold mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">CEBU</div>
            <div className="text-white/90 text-sm mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">Block 2 Lot 2 Guadalupe Heights Village, Guadalupe, 6000 Cebu City, Philippines</div>
            <div className="flex items-center gap-3 text-white text-base font-semibold mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 .84-1.63l8-5.6a2 2 0 0 1 2.32 0l8 5.6a2 2 0 0 1 .84 1.63z"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              +63 917 111 5008
            </div>
            <div className="flex items-center justify-between mt-auto relative z-10">
              <a href="#" className="text-white text-sm font-semibold flex items-center gap-2 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-1 group/link">
                LEARN MORE 
                <span aria-hidden className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <div className="w-8 h-5 rounded bg-[#1A3578] relative">
                  <div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Davao Box */}
          <div className="flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-2xl shadow-2xl p-8 flex flex-col min-w-[260px] max-w-[370px] mx-auto group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-white text-xl font-bold mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">DAVAO</div>
            <div className="text-white/90 text-sm mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">555 Manga St., Juna Subd, Matina, 8000 Davao City, Philippines</div>
            <div className="flex items-center gap-3 text-white text-base font-semibold mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 .84-1.63l8-5.6a2 2 0 0 1 2.32 0l8 5.6a2 2 0 0 1 .84 1.63z"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              +63 917 111 5008
            </div>
            <div className="flex items-center justify-between mt-auto relative z-10">
              <a href="#" className="text-white text-sm font-semibold flex items-center gap-2 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-1 group/link">
                LEARN MORE 
                <span aria-hidden className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                <div className="w-8 h-5 rounded bg-[#1A3578] relative">
                  <div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Counter Section with modern design and medical instruments background inside the blue bar only */}
      <motion.section
        className="w-full bg-gradient-to-b from-white via-gray-50/30 to-white py-16 md:py-24 flex justify-center items-center mt-[100px] relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5 z-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#2B7CD3] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#2B7CD3] rounded-full blur-3xl" />
        </div>
        <div className="relative w-full flex justify-center z-20">
          <div className="w-full px-0">
            <div className="w-full bg-gradient-to-r from-[#2B7CD3] via-[#2356a8] to-[#2B7CD3] shadow-2xl flex flex-col md:flex-row justify-center items-center gap-16 md:gap-0 py-16 md:py-20 px-8 md:px-12 relative overflow-hidden">
              {/* Medical instruments background image inside the blue bar only */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image
                  src="/asset/istockphoto-498908634-612x612.jpg" // Place a suitable image in public/asset/
                  alt="Medical Instruments Background"
                  fill
                  className="object-cover object-center opacity-30 grayscale contrast-125"
                  style={{ zIndex: 0 }}
                  priority={false}
                />
                {/* Decorative overlays for extra professionalism */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2B7CD3]/80 via-[#2356a8]/60 to-[#2B7CD3]/10" />
              </div>
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-60 z-10" />
              {/* ...existing code for counter items... */}
              <motion.div
                className="flex flex-col items-center flex-1 group relative z-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.04 }}
              >
                <motion.div
                  className="w-24 h-24 flex items-center justify-center rounded-full border-3 border-white/80 mb-4 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white group-hover:scale-110 transition-all duration-500 shadow-lg"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                    <rect x="5" y="7" width="14" height="10" rx="2"/>
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </motion.div>
                <motion.div className="text-white text-4xl md:text-5xl font-bold mb-2 group-hover:text-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >3468</motion.div>
                <div className="text-white/90 text-lg font-medium group-hover:text-white transition-colors duration-300">Products</div>
                {/* Subtle glow effect */}
                <motion.div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </motion.div>
              {/* ...existing code for other counter items... */}
              <motion.div
                className="flex flex-col items-center flex-1 group relative z-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                whileHover={{ scale: 1.04 }}
              >
                <motion.div
                  className="w-24 h-24 flex items-center justify-center rounded-full border-3 border-white/80 mb-4 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white group-hover:scale-110 transition-all duration-500 shadow-lg"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M5.5 21a7.5 7.5 0 0 1 13 0"/>
                  </svg>
                </motion.div>
                <motion.div className="text-white text-4xl md:text-5xl font-bold mb-2 group-hover:text-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >210</motion.div>
                <div className="text-white/90 text-lg font-medium group-hover:text-white transition-colors duration-300">Employees</div>
                {/* Subtle glow effect */}
                <motion.div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </motion.div>
              <motion.div
                className="flex flex-col items-center flex-1 group relative z-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                whileHover={{ scale: 1.04 }}
              >
                <motion.div
                  className="w-24 h-24 flex items-center justify-center rounded-full border-3 border-white/80 mb-4 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white group-hover:scale-110 transition-all duration-500 shadow-lg"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                    <rect x="3" y="7" width="18" height="13" rx="2"/>
                    <path d="M16 3v4M8 3v4"/>
                  </svg>
                </motion.div>
                <motion.div className="text-white text-4xl md:text-5xl font-bold mb-2 group-hover:text-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >4379</motion.div>
                <div className="text-white/90 text-lg font-medium group-hover:text-white transition-colors duration-300">Accounts</div>
                {/* Subtle glow effect */}
                <motion.div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </motion.div>
              <motion.div
                className="flex flex-col items-center flex-1 group relative z-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                whileHover={{ scale: 1.04 }}
              >
                <motion.div
                  className="w-24 h-24 flex items-center justify-center rounded-full border-3 border-white/80 mb-4 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white group-hover:scale-110 transition-all duration-500 shadow-lg"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <svg width="44" height="44" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <path d="M8 2v4M16 2v4M4 10h16"/>
                  </svg>
                </motion.div>
                <motion.div className="text-white text-4xl md:text-5xl font-bold mb-2 group-hover:text-blue-100 transition-colors duration-300"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >19</motion.div>
                <div className="text-white/90 text-lg font-medium group-hover:text-white transition-colors duration-300">Years of Experience</div>
                {/* Subtle glow effect */}
                <motion.div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </motion.div>
            </div>
          </div>
        </div>
  </motion.section>
    </>
  );
};

export default HeroSection;