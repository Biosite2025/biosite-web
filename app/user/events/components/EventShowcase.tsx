

  'use client';


  const devicestyles = `
   

    /* Device-specific overrides */
    @media (min-width: 852px) and (max-width: 854px) and (min-height: 1279px) and (max-height: 1281px){
    .eventshowcase-asuszenbook-parent h1 {
        font-size: 4.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-asuszenbook-parent {
        max-width: 92vw !important;
      }
    }

    @media (min-width: 539px) and (max-width: 541px) and (min-height: 719px) and (max-height: 721px){
    .eventshowcase-surfaceDuo-parent h1 {
        font-size: 2.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-surfaceDuo-parent {
        max-width: 92vw !important;
      }
    }

    @media (min-width: 411px) and (max-width: 413px) and (min-height: 914px) and (max-height: 916px){
      .eventshowcase-pixel7-parent h1 {
        font-size: 2.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-pixel7-parent {
        max-width: 92vw !important;
      }
    }
    @media (min-width: 429px) and (max-width: 431px) and (min-height: 931px) and (max-height: 933px){
      .eventshowcase-14pro-parent h1 {
        font-size: 2.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-14pro-parent {
        max-width: 92vw !important;
      }
    }
    @media (min-width: 389px) and (max-width: 391px) and (min-height: 843px) and (max-height: 845px) {
      .eventshowcase-12pro-parent h1 {
        font-size: 2.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-12pro-parent {
        max-width: 92vw !important;
      }
    }
    @media (min-width: 413px) and (max-width: 415px) and (min-height: 895px) and (max-height: 897px){
      .eventshowcase-xr-parent h1 {
        font-size: 2.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-xr-parent {
        max-width: 92vw !important;
      }
    }
    @media (min-width: 911px) and (max-width: 913px) and (min-height: 1367px) and (max-height: 1369px){
      .eventshowcase-surfacepro-parent h1 {
        font-size: 4.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-surfacepro-parent {
        max-width: 92vw !important;
      }
    }
    @media (min-width: 767px) and (max-width: 769px) and (min-height: 1023px) and (max-height: 1025px) {
      .eventshowcase-ipadmini-parent h1 {
        font-size: 4.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-ipadmini-parent {
        max-width: 92vw !important;
      }
    }
    @media (min-width: 810px) and (max-width: 830px) and (min-height: 1170px) and (max-height: 1190px) {
      .eventshowcase-ipadair-parent h1 {
        font-size: 4.1rem !important;
        line-height: 1.1 !important;
        letter-spacing: -1px !important;
      }
      
      .eventshowcase-ipadair-parent {
        max-width: 92vw !important;
      }
    }
  `;
  


import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EventShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const arrowButtonRef = useRef<HTMLButtonElement>(null);
  const leftArrowButtonRef = useRef<HTMLButtonElement>(null);
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const handleVideoSwitch = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? (currentVideoIndex === 0 ? 1 : 0)
      : (currentVideoIndex === 0 ? 1 : 0); // For 2 videos, both directions toggle
    
    // Get video references
    const video1 = videoRef.current;
    const video2 = video2Ref.current;
    const videoContainer = videoWrapperRef.current;
    
    if (!videoContainer) return;
    
    // Disable buttons during transition
    if (arrowButtonRef.current) {
      arrowButtonRef.current.disabled = true;
    }
    if (leftArrowButtonRef.current) {
      leftArrowButtonRef.current.disabled = true;
    }
    
    // Start the new video before transition
    const newVideo = newIndex === 0 ? video1 : video2;
    const oldVideo = newIndex === 0 ? video2 : video1;
    
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(() => {
        setIsVideoPlaying(false);
      });
    }
    
    // Create 3D box rotation transition
    gsap.timeline()
      .set(videoContainer, {
        transformStyle: "preserve-3d",
        perspective: 1000
      })
      .to(videoContainer, {
        rotationY: direction === 'next' ? (newIndex === 0 ? -90 : 90) : (newIndex === 0 ? 90 : -90),
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Update state first
          setCurrentVideoIndex(newIndex);
          
          // Pause the old video
          if (oldVideo) {
            oldVideo.pause();
          }
          
          // Show the correct video by swapping their positions
          if (newIndex === 1) {
            // Moving to second video - make it visible on front face
            if (video2) {
              video2.style.display = 'block';
            }
            if (video1) {
              video1.style.display = 'none';
            }
          } else {
            // Moving back to first video - make it visible on front face
            if (video1) {
              video1.style.display = 'block';
            }
            if (video2) {
              video2.style.display = 'none';
            }
          }
          
          // Reset rotation and re-enable button
          gsap.set(videoContainer, {
            rotationY: 0,
            transformStyle: "flat"
          });
          
          if (arrowButtonRef.current) {
            arrowButtonRef.current.disabled = false;
          }
          if (leftArrowButtonRef.current) {
            leftArrowButtonRef.current.disabled = false;
          }
        }
      });
  };

  useEffect(() => {
    // Set mounted state to prevent hydration issues
    setIsMounted(true);
    
    // Initialize videos only on client side to prevent hydration issues
    if (typeof window === 'undefined') return;
    
    const video1 = videoRef.current;
    const video2 = video2Ref.current;
    
    // Wait for next tick to ensure DOM is ready
    const initVideos = () => {
      if (video1) {
        video1.style.display = 'block';
        video1.play().catch(() => {
          setIsVideoPlaying(false);
        });
        setIsVideoPlaying(true);
      }
      
      if (video2) {
        video2.style.display = 'none';
        video2.pause(); // Pause the second video initially
      }
    };
    
    // Small delay to prevent glitches on page load/refresh
    const timer = setTimeout(initVideos, 100);

    // GSAP ScrollTrigger animations - only run on client side
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        // Main timeline for the video section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%", // Creates 2 viewport heights of scroll distance
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            refreshPriority: 0,
            onUpdate: (self) => {
              const progress = self.progress;

              // Video scaling animation - start small and scale up with scroll
              if (videoWrapperRef.current) {
                const scale = gsap.utils.interpolate(0.8, 1.3,
                  progress < 0.3 ? progress / 0.3 :
                  progress < 0.7 ? 1 :
                  progress < 1 ? 1 + ((progress - 0.7) / 0.3) * 0.3 : 1.3
                );
                gsap.set(videoWrapperRef.current, { scale: scale });

                const opacity = gsap.utils.interpolate(0.9, 0.8,
                  progress < 0.9 ? 0 : (progress - 0.9) / 0.1
                );
                gsap.set(videoWrapperRef.current, { opacity: Math.max(0.8, 1 - opacity) });
              }

              // Title animations
              if (titleRef.current) {
                // Hide title until user scrolls significantly into the section (progress > 0.15)
                const titleOpacity = progress < 0.15 ? 0 :
                  progress < 0.35 ? (progress - 0.15) / 0.2 :
                  progress < 0.8 ? 1 :
                  progress < 0.95 ? 1 - ((progress - 0.8) / 0.15) : 0;

                const titleY = progress < 0.15 ? 50 :
                  progress < 0.35 ? 50 - ((progress - 0.15) / 0.2) * 50 :
                  progress < 0.8 ? 0 :
                  progress < 0.95 ? -((progress - 0.8) / 0.15) * 30 : -30;

                const titleScale = progress < 0.15 ? 0.9 :
                  progress < 0.35 ? 0.9 + ((progress - 0.15) / 0.2) * 0.1 :
                  progress < 0.8 ? 1 :
                  progress < 0.95 ? 1 + ((progress - 0.8) / 0.15) * 0.05 : 1.05;

                gsap.set(titleRef.current, {
                  opacity: titleOpacity,
                  y: titleY,
                  scale: titleScale
                });
              }

              // Overlay opacity for text readability - only show when text appears
              if (overlayRef.current) {
                const overlayOpacity = progress < 0.15 ? 0 :
                  progress < 0.35 ? (progress - 0.15) / 0.2 * 0.3 :
                  progress < 0.8 ? 0.3 :
                  progress < 0.95 ? 0.3 + ((progress - 0.8) / 0.15) * 0.2 : 0.5;

                gsap.set(overlayRef.current, { opacity: overlayOpacity });
              }

              // Scroll indicator
              if (scrollIndicatorRef.current) {
                const indicatorOpacity = progress < 0.6 ? 0 :
                  progress < 0.75 ? (progress - 0.6) / 0.15 :
                  progress < 0.85 ? 1 :
                  progress < 0.95 ? 1 - ((progress - 0.85) / 0.1) : 0;

                gsap.set(scrollIndicatorRef.current, { opacity: indicatorOpacity });
              }
            }
          }
        });

        // Scroll indicator animation loop
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });

        const scrollDot = scrollIndicatorRef.current?.querySelector('.scroll-dot');
        if (scrollDot) {
          gsap.to(scrollDot, {
            y: 16,
            opacity: 0.4,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }

        // Arrow buttons zoom animation
        if (arrowButtonRef.current) {
          gsap.to(arrowButtonRef.current, {
            scale: 1.1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
        if (leftArrowButtonRef.current) {
          gsap.to(leftArrowButtonRef.current, {
            scale: 1.1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      });

      return () => {
        clearTimeout(timer);
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <>
        <style>{devicestyles}</style>
        
      <div ref={containerRef} className="relative overflow-hidden bg-gray-900">
      {/* Video Section - Will be pinned by GSAP ScrollTrigger */}
      <div className="h-screen overflow-hidden">
        <div 
          ref={videoWrapperRef}
          className="relative w-full h-full"
          style={{ transform: 'scale(0.8)' }}
        >
          {/* Video Container with 3D Box Transition */}
          <div className="absolute inset-0 w-full h-full">
            {/* First Video */}
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
              poster="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530500/biosite-assets/image.png"
              onLoadedData={() => {
                setIsVideoPlaying(true);
                setIsVideoLoaded(true);
              }}
              onError={() => {
                setIsVideoPlaying(false);
                setIsVideoLoaded(false);
              }}
              onCanPlay={() => setIsVideoLoaded(true)}
            >
              <source src="https://res.cloudinary.com/dmvyhrewy/video/upload/v1763530530/biosite-assets/My_Video10.mp4" type="video/mp4" />
            </video>

            {/* Second Video */}
            <video
              ref={video2Ref}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://res.cloudinary.com/dmvyhrewy/video/upload/v1763530540/biosite-assets/My_Video11.mp4" type="video/mp4" />
            </video>
          </div>
            
          {/* Loading/Fallback Background */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-[#2B3990] via-[#2B7CD3] to-[#1e2a68] flex items-center justify-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}>
              <Image 
                src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530500/biosite-assets/image.png" 
                alt="Event Showcase" 
                fill
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2B3990]/80 to-[#2B7CD3]/60" />
              
              {/* Loading indicator */}
              {!isVideoPlaying && !isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
          </div>

          {/* Dynamic overlay for text readability */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-black z-10 opacity-0" 
          />

          {/* Title Overlay with GSAP-controlled animations */}
          <div 
            ref={titleRef}
            className="absolute inset-0 flex items-center justify-center text-center text-white z-20 opacity-0 px-4 lg:px-8"
            style={{ opacity: 0 }}
          >
            <div className="max-w-6xl eventshowcase-ipadair-parent eventshowcase-ipadmini-parent eventshowcase-xr-parent eventshowcase-asuszenbook-parent eventshowcase-12pro-parent eventshowcase-pixel7-parent eventshowcase-14pro-parent eventshowcase-surfacepro-parent">
              {/* Main Title */}
              <h1 
                className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black mb-4 lg:mb-8 leading-none"
              >
                <span className="block text-white mb-3 lg:mb-6 font-black">Experience Our</span>
                <span className="block text-[#2B3990] font-black tracking-tight">
                  Amazing Events
                </span>
              </h1>
              
              {/* Subtitle */}
              <p 
                className=" text-sm sm:text-base md:text-xl lg:text-3xl xl:text-4xl text-white max-w-5xl mx-auto leading-relaxed font-light px-4 lg:px-0"
                style={{
                  textShadow: '0 6px 30px rgba(0,0,0,0.9), 0 3px 15px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.7)',
                  filter: 'drop-shadow(0 3px 15px rgba(0,0,0,0.5))'
                }}
              >
                Discover moments that inspire, connect, and <br /> transform through our curated collection <br />of unforgettable experiences
              </p>
            </div>
          </div>


          {/* Scroll Indicator */}
          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-8 lg:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
          >
            <span className="text-white/90 text-xs lg:text-base font-medium mb-2 lg:mb-4 tracking-wide uppercase">
              Continue Scrolling
            </span>
            <div className="w-6 h-8 lg:w-8 lg:h-12 border-2 border-white/70 rounded-full flex justify-center">
              <div className="scroll-dot w-1 h-2 lg:w-1.5 lg:h-4 bg-white/90 rounded-full mt-2 lg:mt-3" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default EventShowcase;