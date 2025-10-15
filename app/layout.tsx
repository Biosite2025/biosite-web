"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Preloader from "../src/components/layout/Preloader";
import { TopNav } from "../src/components/layout/TopNav";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoadingProvider } from "./LoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Prevent scrolling when loading - comprehensive approach with event blocking
  useEffect(() => {
    if (!mounted) return; // Prevent running on server
    
    const isCurrentlyLoading = mounted ? loading : false;
    if (isCurrentlyLoading) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Apply comprehensive scroll lock with CSS
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Add CSS classes for additional control
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('no-scroll');
      
      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      
      // Block all scroll-related events
      const blockScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      const blockKeyScroll = (e: KeyboardEvent) => {
        // Block arrow keys, page up/down, space, home, end
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        if (scrollKeys.includes(e.keyCode)) {
          e.preventDefault();
          return false;
        }
      };
      
      // Add comprehensive event listeners
      document.addEventListener('wheel', blockScroll, { passive: false });
      document.addEventListener('touchmove', blockScroll, { passive: false });
      document.addEventListener('scroll', blockScroll, { passive: false });
      window.addEventListener('scroll', blockScroll, { passive: false });
      document.addEventListener('keydown', blockKeyScroll);
      
      return () => {
        // Remove event listeners first
        document.removeEventListener('wheel', blockScroll);
        document.removeEventListener('touchmove', blockScroll);
        document.removeEventListener('scroll', blockScroll);
        window.removeEventListener('scroll', blockScroll);
        document.removeEventListener('keydown', blockKeyScroll);
        
        // Remove CSS classes
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('no-scroll');
        
        // Restore scroll position and remove locks
        const savedScrollY = document.body.getAttribute('data-scroll-y');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.removeAttribute('data-scroll-y');
        
        // Restore scroll position
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY));
        }
      };
    }
  }, [loading, mounted]);

  // Prevent hydration mismatch by using consistent initial state
  const isLoading = mounted ? loading : false;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <LoadingProvider value={loading}>
          {/* TopNav - Always visible, never affected by loading */}
          <TopNav />
          
          {/* Main content area */}
          <div className="relative min-h-screen">
            {/* Page content */}
            <main className={`relative min-h-screen bg-white transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {children}
            </main>
            
            {/* Full screen preloader overlay - completely blocks interaction */}
            {isLoading && (
              <div 
                className="fixed inset-0 top-24 z-[99999] bg-white" 
                style={{ 
                  position: 'fixed',
                  top: '96px', // Below TopNav (24 * 4 = 96px)
                  left: '0',
                  right: '0',
                  bottom: '0',
                  overflow: 'hidden',
                  touchAction: 'none',
                  userSelect: 'none',
                  pointerEvents: 'all'
                }}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
                onScroll={(e) => e.preventDefault()}
              >
                <Preloader />
              </div>
            )}
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
