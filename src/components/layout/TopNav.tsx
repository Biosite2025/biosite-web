"use client";

import Link from 'next/link';
import Image from 'next/image';

import React, { useState, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { SideNav } from './index';

export function TopNav() {

  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setScrollDirection('down');
            setShowNav(false);
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection('up');
            setShowNav(true);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        data-topnav="true"
        initial={false}
        animate={showNav ? { y: 0, opacity: 1, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.08)' } : { y: -100, opacity: 0, boxShadow: 'none' }}
          transition={showNav ? 
            { y: { duration: 0 }, opacity: { duration: 0 }, boxShadow: { duration: 0 } } : 
            { y: { type: 'spring', stiffness: 180, damping: 22 }, opacity: { duration: 0.12 }, boxShadow: { duration: 0.18 } }
          }
        whileHover={{ scale: 1.01, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.12)' }}
        className="hidden md:block bg-white backdrop-blur-md w-full sticky top-0 z-50 border-b border-gray-200/50 shadow-sm hover:shadow-md transition-[transform,box-shadow,background-color] duration-300 will-change-transform h-24 group"
        style={{ background: '#ffffff', backgroundColor: '#ffffff' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50/30 to-white opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center flex-shrink-0 h-full -ml-[50px] group">
              <Link href="/user/about" className="flex items-center h-full transform hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                <Image
                  src="/asset/BMI logo.png"
                  alt="Biosite Medical Instruments Logo"
                  width={250}
                  height={70}
                  className="object-contain h-20 w-auto relative z-10 group-hover:brightness-110 transition-all duration-300"
                  priority
                />
                {/* Right vertical line for logo separation */}
                <span className="ml-4 h-16 w-[2px] bg-[#2B3990] block" />
              </Link>
            </div>
            <div className="flex -ml-2 items-center space-x-4 h-full relative overflow-visible z-50 flex-1 justify-center">
                <span className="text-gray-700 -ml-6 font-medium text-lg italic tracking-wide relative opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out whitespace-nowrap">
                  Empowering Healthcare, One Innovation at a Time
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#2B3990] transition-all duration-500 group-hover:w-full"></span>
                </span>
            </div>
            <div className="flex scale-110 items-center space-x-6 h-full relative overflow-visible z-50 flex-1 justify-end">
              <Link
                href="/user/about"
                className={`uppercase font-semibold tracking-wide text-lg transition-all duration-300 relative group transform hover:-translate-y-0.5 flex items-center justify-center ${
                  pathname === '/user/about' 
                    ? 'text-[#2B3990]' 
                    : 'text-gray-700 hover:text-[#2B3990]'
                }`}
              >
                <span className="relative z-10 text-center">ABUOT</span>
              </Link>
              
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  className={`uppercase font-semibold tracking-wide px-3 py-2 text-base transition-all duration-300 flex items-center gap-1 focus:outline-none relative group transform hover:-translate-y-0.5 ${
                    productsOpen 
                      ? 'text-[#2B3990]' 
                      : 'text-gray-700 hover:text-[#2B3990]'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={productsOpen}
                  type="button"
                  onClick={() => setProductsOpen((v) => !v)}
                >
                  <span className="flex items-center relative z-10">
                    PRODUCTS
                    <svg className={`ml-2 w-4 h-4 transition-all duration-300 ${productsOpen ? 'rotate-180 text-[#2B3990]' : 'group-hover:text-[#2B3990]'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-0 w-[250px] bg-white z-50 rounded-none shadow-none border-l-4 border-[#2B3990] origin-top scale-100"
                  >
                    <div className="relative z-10 py-0">
                      <Link href="#" className="block px-6 py-4 text-[#222B45] text-left text-base font-semibold tracking-wide uppercase hover:text-[#2B3990] focus:text-[#2B3990] border-b border-dotted border-gray-300 transition-all duration-150">
                        CLINICAL CHEMISTRY
                      </Link>
                      <Link href="#" className="block px-6 py-4 text-[#222B45] text-left text-base font-semibold tracking-wide uppercase hover:text-[#2B3990] focus:text-[#2B3990] border-b border-dotted border-gray-300 transition-all duration-150">
                        HBA1C–HPLC
                      </Link>
                      <Link href="#" className="block px-6 py-4 text-[#222B45] text-left text-base font-semibold tracking-wide uppercase hover:text-[#2B3990] focus:text-[#2B3990] border-b border-dotted border-gray-300 transition-all duration-150">
                        HISTOPATHOLOGY
                      </Link>
                      <Link href="#" className="block px-6 py-4 text-[#222B45] text-left text-base font-semibold tracking-wide uppercase hover:text-[#2B3990] focus:text-[#2B3990] border-b border-dotted border-gray-300 transition-all duration-150">
                        HEMATOLOGY
                      </Link>
                      <Link href="#" className="block px-6 py-4 text-[#222B45] text-left text-base font-semibold tracking-wide uppercase hover:text-[#2B3990] focus:text-[#2B3990] transition-all duration-150">
                        URINALYSIS
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <Link
                href="/user/career"
                className={`uppercase font-semibold tracking-wide text-lg transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/user/career' 
                    ? 'text-[#2B3990]' 
                    : 'text-gray-700 hover:text-[#2B3990]'
                }`}
              >
                <span className="relative z-10">Careers</span>
              </Link>
              <Link
                href="/user/contact"
                className={`uppercase font-semibold tracking-wide text-lg transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/user/contact' 
                    ? 'text-[#2B3990]' 
                    : 'text-gray-700 hover:text-[#2B3990]'
                }`}
              >
                <span className="relative z-10">CONTACT</span>
              </Link>
              <Link
                href="/user/chatbot"
                className={`uppercase font-semibold tracking-wide text-lg transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/user/chatbot' 
                    ? 'text-[#2B3990]' 
                    : 'text-gray-700 hover:text-[#2B3990]'
                }`}
              >
                <span className="relative z-10">FAQ</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
     
      <SideNav />
    </>
  );
}
  