"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ApplicationForm from "./ApplicationForm";

export default function JobListing() {
  // For underline alignment
  const titleRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  
  useLayoutEffect(() => {
    if (titleRef.current) {
      setUnderlineWidth(titleRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
      <motion.section
        className="w-full min-h-[calc(calc(var(--vh,1svh)*100)-4rem)] lg:min-h-[calc(calc(var(--vh,1svh)*100)-6rem)] flex items-center justify-center bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white py-6 md:py-8 px-3 md:px-4 lg:px-6 xl:px-12 2xl:px-16 relative overflow-hidden custom-1280x665-padding"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
          {/* Mascot: the Biosite bear waving with a résumé, bottom-left — same size
              and placement as the Contact page bear. It tucks behind the
              (opaque) building photo, sunk below the section edge so its cropped
              waist is always hidden at the footer line. Shown from 1440px up. */}
          <motion.div
            aria-hidden="true"
            // Careers content is wider than Contact's (80rem grid), so the bear is
            // sized from this page's own gutter: only ~5rem tucks behind the
            // photo and the face always sits in the open space. Hidden where
            // the gutter is too narrow for that (below 1800px).
            className="pointer-events-none absolute -bottom-16 left-0 z-0 hidden lg:block"
            style={{ width: 'clamp(220px, calc((calc(var(--vw,1vw)*100) - 80rem) / 2 + 8rem), 560px)' }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="bear-float">
              <Image
                src="/asset/careerbear.webp"
                alt=""
                width={900}
                height={906}
                className="h-auto w-full drop-shadow-[0_24px_40px_rgba(43,57,144,0.22)]"
              />
            </div>
          </motion.div>
          {/* Custom style for 1280x665 to reduce top/bottom margin */}
          <style jsx global>{`
            @media (width: 1280px) and (height: 665px) {
              .custom-1280x665-padding {
                padding-top: 0 !important;
                padding-bottom: 2rem !important;
                min-height: 640px !important;
                height: 640px !important;
              }
            }

            /* Custom style for 1536x742 viewport */
            @media (width: 1536px) and (height: 742px) {
              .custom-1280x665-padding {
                padding-top: 0.5rem !important;
                padding-bottom: 1.5rem !important;
                min-height: auto !important;
              }
              
              .w-full.max-w-7xl {
                transform: scale(0.85) !important;
                margin-top: -2rem !important;
                margin-bottom: -2rem !important;
              }
            }
          `}</style>
    
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 md:top-10 lg:top-12 left-8 md:left-10 lg:left-12 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-[#2B7CD3] rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 right-8 md:right-10 lg:right-12 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-[#2B3990] rounded-full blur-3xl opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem] bg-gradient-to-r from-[#2B3990]/5 to-[#2B7CD3]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-16 items-center z-10 relative [zoom:0.85] md:[zoom:0.9] lg:[zoom:0.78] xl:[zoom:0.82] 2xl:[zoom:1]">
        {/* Left Side - Headline and Image */}
        <motion.div
          className="flex flex-col items-center justify-center relative h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-4 md:mb-6 lg:mb-6 xl:mb-12 w-full">
            <motion.h1
              className="text-2xl md:text-3xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-bold text-[#6B7280] mb-2 md:mb-3 lg:mb-3 xl:mb-5 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="text-[#2B3990]">JOB LISTING </span> 
            </motion.h1>
            <motion.div
              className="underline-bar h-1 md:h-1.5 bg-gradient-to-r from-[#2B3990] to-[#2B7CD3] rounded-full mx-auto lg:mx-0 w-[120px] md:w-[150px] lg:w-[160px] xl:w-[220px] 2xl:w-[250px]"
              initial={{ width: 0 }}
              animate={{ width: "160px" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
          <div className="image-container relative w-full max-w-md md:max-w-lg lg:max-w-lg xl:max-w-2xl h-[280px] md:h-[320px] lg:h-[340px] xl:h-[500px] 2xl:h-[550px] flex items-center">
            {/* Job Listing PNG Container */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl p-0 shadow-xl md:shadow-2xl relative overflow-hidden w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/Screenshot_2025-10-03_102205.webp"
                  alt="Biosite Job Listing"
                  width={900}
                  height={520}
                  className="w-full h-full object-cover drop-shadow-xl rounded-2xl md:rounded-3xl"
                  priority
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-3 md:-top-4 -right-3 md:-right-4 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#2B3990] rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-2 md:-bottom-3 -left-2 md:-left-3 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-[#2B7CD3] rounded-full opacity-30" />
            </div>
            {/* Award/Certificate Mockup */}
            
          </div>
        </motion.div>

        {/* Right Side - Application Form */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ApplicationForm />
        </motion.div>
      </div>
      </motion.section>
    </>
  );
}
