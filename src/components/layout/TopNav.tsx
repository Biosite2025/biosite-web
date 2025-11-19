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
          
          // On mobile screens, always show nav
          const isMobile = window.innerWidth < 1024;
          
          if (isMobile) {
            setShowNav(true);
          } else {
            // Improved desktop logic with better threshold
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);
            
            if (currentScrollY > lastScrollY && currentScrollY > 100 && scrollDifference > 5) {
              // Scrolling down - hide nav
              setScrollDirection('down');
              setShowNav(false);
            } else if (currentScrollY < lastScrollY && scrollDifference > 5) {
              // Scrolling up - show nav
              setScrollDirection('up');
              setShowNav(true);
            }
            
            // Always show nav when at top
            if (currentScrollY <= 50) {
              setShowNav(true);
            }
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        data-topnav="true"
        initial={false}
        animate={showNav ? { y: 0, opacity: 1, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.08)' } : { y: -100, opacity: 0, boxShadow: 'none' }}
        transition={{
          y: { type: 'spring', stiffness: 400, damping: 40, duration: 0.6 },
          opacity: { duration: 0.4, ease: 'easeInOut' },
          boxShadow: { duration: 0.4, ease: 'easeInOut' }
        }}
        whileHover={{ scale: 1.01, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.12)' }}
        className="hidden lg:block bg-white backdrop-blur-md w-full sticky top-0 z-50 border-b border-gray-200/50 shadow-sm hover:shadow-md transition-[transform,box-shadow,background-color] duration-300 will-change-transform h-24 group"
        style={{ background: '#ffffff', backgroundColor: '#ffffff' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50/30 to-white opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center flex-shrink-0 h-full -ml-[50px] group">
              <Link href="/user/about" className="flex items-center h-full transform hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                <Image
                  src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530483/biosite-assets/BMI_logo.png"
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
            <div className="flex -ml-[50px] items-center space-x-4 h-full relative overflow-visible z-50 flex-1 justify-center">
                <span className="text-gray-700 -ml-6 font-medium text-lg italic tracking-wide relative opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out whitespace-nowrap">
                  Because Every Life deserves the Best Care
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#2B3990] transition-all duration-500 group-hover:w-full"></span>
                </span>
            </div>
            <div className="flex scale-90 items-center space-x-6 h-full relative overflow-visible z-50 flex-1 justify-end">
              <Link
                href="/user/about"
                className={`uppercase font-semibold tracking-wide text-lg transition-all duration-300 relative group transform hover:-translate-y-0.5 flex items-center justify-center ${
                  pathname === '/user/about' 
                    ? 'text-[#2B3990]' 
                    : 'text-gray-700 hover:text-[#2B3990]'
                }`}
              >
                <span className="relative z-10 text-center">ABOUT</span>
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[95vw] max-w-[1400px] bg-white z-50 rounded-lg shadow-2xl border-t-4 border-[#2B3990]"
                  >
                    {/* Mega Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
                      
                      {/* Column 1: CLINICAL */}
                      <div className="p-6 border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          I. Clinical
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Clinical Chemistry
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              HBA1C - HPLC
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Immunology
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Coagulation
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Blood Bank
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Arterial Blood Gas, Electrolytes & Co-Oximetry
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              POCT (Point of Care)
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Microbiology
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Clinical Microscopy
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hematology
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Molecular Diagnostics
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Rapid Test Kits
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: HISTOPATHOLOGY */}
                      <div className="p-6 border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          II. Histopathology
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="/user/products/components/sakura" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Sakura
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/dakewe" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Dakewe
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hiplaas
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/vitro" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Vitro
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biogenex
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/nikonmicroscopes" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Nikon Microscopes
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/moticsliderscanner" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Motic Slide Scanners
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/hamamatsusliderscanner" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hamamatsu Slide Scanners
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Fuji Synapse PACS for Digital Pathology
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: GENERAL LABORATORY EQUIPMENTS */}
                      <div className="p-6 border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          III. General Lab Equipments
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Microscopes
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Centrifuges
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Pipettors
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biorefrigerators
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biomedical Freezers, Ultra Low Freezers, Cryo Freezers, Liquid Nitrogen Storage
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biosafety Cabinets & Laminar Flow Cabinets
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Lab Oven, Lab Incubator, CO₂ Incubator
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Sterilizer & Autoclave
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Dry Bath, Vortex Mixer, Rotator, Pipette Shaker, Passbox, Eye Wash Station
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 4: MEDICAL & HOSPITAL EQUIPMENTS */}
                      <div className="p-6 border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          IV. Medical & Hospital Equipments
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Medical Diagnostic Imaging
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              ICU Equipments
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              OR Equipments
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              ER Equipments
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              OB Gyn Equipments
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Gastro & Endo
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Anesthesia Equipments
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Autoclave, Plasma Sterilizers, Washers
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Neonatal Intensive Care Products (NICU)
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hospital Medical Furnitures
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 5: DISPOSABLES / CONSUMABLES */}
                      <div className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          V. Disposables / Consumables
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Laboratory Disposables
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hospital Disposables
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Histopathology Chemicals & Consumables
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Surgical Disposables
                            </Link>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </motion.div>
                )}
              </div>

              <Link
                href="/user/events"
                className={`uppercase font-semibold tracking-wide text-lg transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/user/events' 
                    ? 'text-[#2B3990]' 
                    : 'text-gray-700 hover:text-[#2B3990]'
                }`}
              >
                <span className="relative z-10">Events</span>
              </Link>
              
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
  