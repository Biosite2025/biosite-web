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

  // Close products dropdown when navigating to a different page
  React.useEffect(() => {
    setProductsOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{`
        @media (min-width: 1024px) and (max-width: 1700px) {
          nav[data-topnav="true"] {
            height: 80px !important;
          }
          nav[data-topnav="true"] .flex.h-24 {
            height: 80px !important;
          }
          nav[data-topnav="true"] img {
            width: 180px !important;
            height: 55px !important;
          }
          nav[data-topnav="true"] a,
          nav[data-topnav="true"] button {
            font-size: 0.875rem !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          nav[data-topnav="true"] .italic {
            font-size: 0.95rem !important;
          }
          nav[data-topnav="true"] .scale-90 {
            transform: scale(0.85) !important;
          }
          nav[data-topnav="true"] .-ml-\\[50px\\] {
            margin-left: -20px !important;
          }
          nav[data-topnav="true"] .space-x-6 {
            gap: 0.75rem !important;
          }
          nav[data-topnav="true"] .space-x-4 {
            gap: 0.5rem !important;
          }
          nav[data-topnav="true"] .ml-4 {
            margin-left: 0.75rem !important;
          }
          nav[data-topnav="true"] .h-16 {
            height: 3rem !important;
          }
        }
        @media (min-width: 1900px) and (max-width: 1940px) and (min-height: 1180px) and (max-height: 1220px) {
          nav[data-topnav="true"] {
            height: 120px !important;
          }
          nav[data-topnav="true"] .flex.h-24 {
            height: 120px !important;
          }
          nav[data-topnav="true"] img {
            width: 300px !important;
            height: 90px !important;
          }
          nav[data-topnav="true"] a,
          nav[data-topnav="true"] button {
            font-size: 1.3rem !important;
          }
          nav[data-topnav="true"] .italic {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
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
        onMouseLeave={() => setProductsOpen(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50/30 to-white opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center flex-shrink-0 h-full -ml-[50px] group">
              <Link href="/user/about" className="flex items-center h-full transform hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                <Image
                  src="/asset/BMI_logo4.png"
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
                  onMouseEnter={() => setProductsOpen(true)}
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
                    className="absolute left-1/2 -translate-x-1/2 top-full -ml-50 mt-0 w-[95vw] max-w-[1400px]  bg-white z-50 rounded-lg shadow-2xl border-t-4 border-[#2B3990]"
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
                            <Link href="/user/products/components/clinical-chemistry" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Clinical Chemistry
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/hba1c-hplc" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              HBA1C - HPLC
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/immunology" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Immunology
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/coagulation" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Coagulation & Hemostasis
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/blood-bank" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Blood Bank
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/arterial-blood-gas-electrolytes-co-oximetry" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Arterial Blood Gas, Electrolytes & Co-Oximetry
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/poct" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              POCT (Point of Care Testing)
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/microbiology" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Microbiology
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/clinical-microscopy" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Clinical Microscopy
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/hematology" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hematology
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/molecular-diagnostics" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Molecular Diagnostics
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/rapid-testkit" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
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
                            <Link href="/user/products/components/hiplaas" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hiplaas
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/vitro" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Vitro
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/biogenex" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
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
                          
                        </ul>
                      </div>

                      {/* Column 3: GENERAL LABORATORY EQUIPMENTS */}
                      <div className="p-6 border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          III. General Lab Equipments
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="/user/products/components/microscopes" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Microscopes
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/centrifuges" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Centrifuges
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/pipettors" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Pipettors
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/biorefrigerators" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biorefrigerators
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/biomedical-freezers" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biomedical Freezers, Ultra Low Freezers, Cryo Freezers, Liquid Nitrogen Storage
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/biosafety-cabinets" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Biosafety Cabinets & Laminar Flow Cabinets
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/lab-oven-incubator" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Lab Oven, Lab Incubator, CO₂ Incubator
                            </Link>
                          </li>
                          <li>
                            
                            <Link href="/user/products/components/sterilizer-autoclave" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Sterilizer & Autoclave
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/dry-bath" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
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
                            {/* <Link href="/user/products/components/medical-diagnostic-imaging" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Medical Diagnostic Imaging
                            </Link> */}
                            <Link href="/user/products/components/RADIOLOGY-DEPARTMENT" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Radiology 
                            </Link> 
                          </li>
                          <li>
                            {/* <Link href="/user/products/components/icu-er-equipments" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              ICU / ER Equipments
                            </Link> */}
                            <Link href="/user/products/components/pulmonary-department" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Pulmonary 
                            </Link>
                          </li>
                          <li>
                            {/* <Link href="/user/products/components/or-equipment" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              OR Equipments
                            </Link> */}
                            <Link href="/user/products/components/emergency-outpatient" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Emergency and Out Patient 
                            </Link>
                          </li>
                          
                           <li>
                            <Link href="/user/products/components/surgical-rehabilation" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Medical Surgical and Rehabilatation Ward 
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/operating-delivery" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Operating  and Delivery Room 
                            </Link>
                          </li>
                          <li>
                            {/* <span className="text-sm text-gray-400 cursor-not-allowed block select-none opacity-60">
                              OB Gyn Equipments
                            </span> */}
                            <Link href="/user/products/components/nicu-picu-icu" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              NICU PICU AND ICU 
                            </Link>
                          </li>
                          {/*<li>
                            <span className="text-sm text-gray-400 cursor-not-allowed block select-none opacity-60">
                              Autoclave, Plasma Sterilizers, Washers
                            </span>
                          </li>
                          <li>
                            <span className="text-sm text-gray-400 cursor-not-allowed block select-none opacity-60">
                              Neonatal Intensive Care Products (NICU)
                            </span>
                          </li>
                          <li>
                            <span className="text-sm text-gray-400 cursor-not-allowed block select-none opacity-60">
                              Hospital Medical Furnitures
                            </span>
                          </li>
                          <li>
                            <Link href="/user/products/components/dialysis-renal-equipments" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Dialysis / Renal Care Equipments
                            </Link>
                          </li> */}
                        </ul>
                      </div>

                      {/* Column 5: DISPOSABLES / CONSUMABLES */}
                      <div className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                        <h3 className="text-[#2B3990] font-bold text-base uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#2B3990]/20">
                          V. Disposables / Consumables
                        </h3>
                        <ul className="space-y-2.5">
                          <li>
                            <Link href="/user/products/components/laboratory-equipements" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Laboratory Equipments
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/laboratory-disposables" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Laboratory Disposables
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/hospital-disposables" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Hospital Disposables
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/chemicals-consumables" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
                              Histopathology Chemicals & Consumables
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/products/components/surgical-disposable" className="text-sm text-gray-700 hover:text-[#2B3990] hover:translate-x-1 transition-all duration-200 block">
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
  