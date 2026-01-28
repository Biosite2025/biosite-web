'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const EventShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    console.log('[EventShowcase] Component mounted at:', new Date().toISOString());
    
    // Initialize video only on client side
    if (typeof window === 'undefined') return;
    
    const video1 = videoRef.current;
    
    // Wait for next tick to ensure DOM is ready
    const initVideo = () => {
      console.log('[EventShowcase] Initializing video...');
      const startTime = performance.now();
      
      if (video1) {
        video1.play().then(() => {
          const loadTime = (performance.now() - startTime).toFixed(2);
          console.log(`[EventShowcase] Video started playing in ${loadTime}ms`);
          setIsVideoPlaying(true);
        }).catch((err) => {
          console.error('[EventShowcase] Video play error:', err);
          setIsVideoPlaying(false);
        });
      }
    };
    
    // Small delay to prevent glitches on page load/refresh
    const timer = setTimeout(initVideo, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-900 h-screen">
      {/* Video Section - Simple fullscreen display without scroll effects */}
      <div className="h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {/* Video Container */}
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="https://res.cloudinary.com/dmvyhrewy/image/upload/w_600,q_auto:low,f_auto/v1763530500/biosite-assets/image.png"
              onLoadedData={() => {
                console.log('[EventShowcase] Video loaded and ready');
                setIsVideoPlaying(true);
                setIsVideoLoaded(true);
              }}
              onError={(e) => {
                console.error('[EventShowcase] Video error:', e);
                setIsVideoPlaying(false);
                setIsVideoLoaded(false);
              }}
              onCanPlay={() => {
                console.log('[EventShowcase] Video can play');
                setIsVideoLoaded(true);
              }}
              onLoadStart={() => console.log('[EventShowcase] Video loading started')}
            >
              <source src="https://res.cloudinary.com/dmvyhrewy/video/upload/v1763530530/biosite-assets/My_Video10.mp4" type="video/mp4" />
            </video>
          </div>
            
          {/* Loading/Fallback Background */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-[#2B3990] via-[#2B7CD3] to-[#1e2a68] flex items-center justify-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <Image 
              src="https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530500/biosite-assets/image.png" 
              alt="Event Showcase" 
              fill
              className="object-cover opacity-60"
              priority
              onLoadingComplete={() => console.log('[EventShowcase] Fallback image loaded')}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2B3990]/80 to-[#2B7CD3]/60" />
            
            {/* Loading indicator */}
            {!isVideoPlaying && !isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventShowcase;
