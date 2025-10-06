"use client";

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { SideNav } from './SideNav';

export function TopNav() {

  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
     
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        whileHover={{ scale: 1.01, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.08)' }}
        className="hidden md:block bg-white/95 backdrop-blur-md w-full top-0 z-50 border-b border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 relative"
      >
        
        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50/30 to-white opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-16 items-center justify-between">
           
            <div className="flex items-center flex-shrink-0 h-full ml-4 group">
              <Link href="/user/about" className="flex items-center h-full transform hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-[#2B3990]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2" />
                <Image
                  src="/asset/BMI logo.png"
                  alt="Biosite Medical Instruments Logo"
                  width={180}
                  height={48}
                  className="object-contain h-12 w-auto relative z-10 group-hover:brightness-110 transition-all duration-300"
                  priority
                />
              </Link>
            </div>
           
            <div className="flex items-center space-x-4 h-full mr-8 relative overflow-visible z-50">
              <Link
                href="/user/about"
                className={`uppercase font-semibold tracking-wide px-3 py-2 text-base border-b-2 transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/user/about' 
                    ? 'border-[#2B3990] text-[#2B3990] bg-[#2B3990]/5 rounded-t-lg' 
                    : 'border-transparent text-gray-700 hover:border-[#2B3990] hover:text-[#2B3990] hover:bg-[#2B3990]/5 hover:rounded-t-lg'
                }`}
              >
                <span className="relative z-10">About Biosite</span>
                {pathname !== '/user/about' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
              
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  className={`uppercase font-semibold tracking-wide px-3 py-2 text-base border-b-2 transition-all duration-300 flex items-center gap-1 focus:outline-none relative group transform hover:-translate-y-0.5 ${
                    productsOpen 
                      ? 'border-[#2B3990] text-[#2B3990] bg-[#2B3990]/5 rounded-t-lg' 
                      : 'border-transparent text-gray-700 hover:border-[#2B3990] hover:text-[#2B3990] hover:bg-[#2B3990]/5 hover:rounded-t-lg'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={productsOpen}
                  type="button"
                  onClick={() => setProductsOpen((v) => !v)}
                >
                  <span className="flex items-center relative z-10">
                    Products
                    <svg className={`ml-2 w-4 h-4 transition-all duration-300 ${productsOpen ? 'rotate-180 text-[#2B3990]' : 'group-hover:text-[#2B3990]'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  {!productsOpen && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
                {productsOpen && (
                  <div className="absolute left-0 top-full mt-0 w-[250px] bg-white z-50 rounded-none shadow-none border-l-4 border-[#2B3990] transition-all duration-200 origin-top scale-100">
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
                  </div>
                )}
              </div>
              <Link
                href="/events"
                className={`uppercase font-semibold tracking-wide px-3 py-2 text-base border-b-2 transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/events' 
                    ? 'border-[#2B3990] text-[#2B3990] bg-[#2B3990]/5 rounded-t-lg' 
                    : 'border-transparent text-gray-700 hover:border-[#2B3990] hover:text-[#2B3990] hover:bg-[#2B3990]/5 hover:rounded-t-lg'
                }`}
              >
                <span className="relative z-10">Events</span>
                {pathname !== '/events' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
              <Link
                href="/careers"
                className={`uppercase font-semibold tracking-wide px-3 py-2 text-base border-b-2 transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/careers' 
                    ? 'border-[#2B3990] text-[#2B3990] bg-[#2B3990]/5 rounded-t-lg' 
                    : 'border-transparent text-gray-700 hover:border-[#2B3990] hover:text-[#2B3990] hover:bg-[#2B3990]/5 hover:rounded-t-lg'
                }`}
              >
                <span className="relative z-10">Careers</span>
                {pathname !== '/careers' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
              <Link
                href="/contact"
                className={`uppercase font-semibold tracking-wide px-3 py-2 text-base border-b-2 transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/contact' 
                    ? 'border-[#2B3990] text-[#2B3990] bg-[#2B3990]/5 rounded-t-lg' 
                    : 'border-transparent text-gray-700 hover:border-[#2B3990] hover:text-[#2B3990] hover:bg-[#2B3990]/5 hover:rounded-t-lg'
                }`}
              >
                <span className="relative z-10">Contact</span>
                {pathname !== '/contact' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
              <Link
                href="/faq"
                className={`uppercase font-semibold tracking-wide px-3 py-2 text-base border-b-2 transition-all duration-300 relative group transform hover:-translate-y-0.5 ${
                  pathname === '/faq' 
                    ? 'border-[#2B3990] text-[#2B3990] bg-[#2B3990]/5 rounded-t-lg' 
                    : 'border-transparent text-gray-700 hover:border-[#2B3990] hover:text-[#2B3990] hover:bg-[#2B3990]/5 hover:rounded-t-lg'
                }`}
              >
                <span className="relative z-10">FAQ</span>
                {pathname !== '/faq' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2B3990]/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
     
      <SideNav />
    </>
  );
}
