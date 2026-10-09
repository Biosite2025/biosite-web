"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HoverZoom from '../shared/HoverZoom';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';

// Product category
const category = {
  id: 'hiplaas',
  title: 'Hiplaas Grossing & Autopsy Solutions',
  description: 'Premium grossing stations, autopsy tables, and morgue refrigeration for pathology and mortuary applications.',
  folder: 'hiplaas',
};

// Every product on this page is Hiplaas, so the brand logo is applied at render
// time rather than being duplicated onto each product record.
const HIPLAAS_BRAND = { name: 'Hiplaas', logo: '/asset/logo/HIPLAS.png' };
const HIPLAAS_HERO_BG = '/asset/logo/Hiplaas Background.webp';

// Modal component
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
  if (!isOpen || !product) return null;

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md"
        onClick={product.onClose}
        style={{ cursor: 'pointer' }}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-2 sm:px-4 pointer-events-none max-[912px]:px-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 max-w-sm sm:max-w-md md:max-w-2xl w-full border-2 border-gray-200 mx-auto relative pointer-events-auto max-[912px]:max-w-[90vw] max-[912px]:p-4"
          onClick={handleModalContentClick}
        >
          <button
            onClick={product.onClose}
            className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-gray-500 hover:text-gray-800 transition-colors p-2.5 sm:p-3 rounded-full hover:bg-gray-100 z-10
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] max-[912px]:top-1.5 max-[912px]:right-1.5"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden max-[912px]:h-40">
            <HoverZoom>
<Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2 sm:p-4 md:p-6 max-[912px]:p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
</HoverZoom>

            {/* Brand logo watermark, same treatment as the cards */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 pointer-events-none">
              <Image
                src={HIPLAAS_BRAND.logo}
                alt={`${HIPLAAS_BRAND.name} logo`}
                aria-hidden="true"
                width={160}
                height={48}
                className="h-[22px] sm:h-[26px] max-w-[90px] w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 max-[912px]:space-y-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 max-[912px]:text-lg">{product.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-[912px]:text-xs">
              {product.description || 'Professional-grade medical diagnostic imaging equipment designed for precision, reliability, and superior performance.'}
            </p>
            <div className="pt-3 sm:pt-4 border-t border-gray-200 max-[912px]:pt-2">
              <p className="text-xs sm:text-sm text-gray-500 max-[912px]:text-xs">
                For detailed specifications and pricing information, please contact our sales team.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Category section component
function CategorySection({ category, products, onViewDetails }: { category: any; products: any[]; onViewDetails: (product: any) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} className="mb-12 sm:mb-16 md:mb-20 max-[912px]:mb-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 md:mb-10 max-[912px]:mb-4"
      >
        <div className="relative inline-block">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 max-[912px]:text-xl">
            {category.title}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 sm:h-1 bg-gradient-to-r from-[#2B3990] to-[#4a5ab8] rounded-full"
          />
        </div>
        <p className="text-gray-600 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-3xl max-[912px]:text-sm">
          {category.description}
        </p>
      </motion.div>

      {/* Products Grid over one large faint Hiplaas watermark behind every card */}
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${HIPLAAS_BRAND.logo}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* flex-wrap + justify-center so a partial final row stays centered */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 min-[913px]:gap-6">
          {products.map((product: any, idx: number) => (
            <div
              key={product.id}
              className="w-[calc(50%-0.375rem)] min-[913px]:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
            >
              <ProductCard
                index={idx}
                image={product.image}
                name={product.name}
                description={product.description}
                brandName={HIPLAAS_BRAND.name}
                brandLogo={HIPLAAS_BRAND.logo}
								brandLogoClass="h-[22px] sm:h-[26px] max-w-[90px]"
                onViewDetails={() => onViewDetails(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




export default function Hiplaas() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Product data for Hiplaas (from provided image)
    const productData = [
      {
        id: 1,
        name: 'EVO120 SFBT',
        image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hiplaas/EVO120 SFBT.png',
        description: 'The EVO120SFBT is an ideal Grossing Station Countertop with Sink for small laboratories. Its small size allows operators to save valuable space by resting on an existing worktop, but also useful in larger structures as an additional work surface.'
      },
      {
        id: 2,
        name: 'EVO150 FD',
        image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hiplaas/EVO150 FD.png',
        description: 'The EVO150FD is a Grossing Station Non Elevating 150cm Dualdraft provides ample work space and the standard convenience needed to perform the most demanding grossing procedures.'
      },
      {
        id: 3,
        name: 'EVO150 ED',
        image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hiplaas/EVO150 ED.png',
        description: 'The EVO150ED grossing stations elevating 150cm dual draft imaging system provides ample work space and the standard convenience needed to perform the most demanding grossing procedures.'
      },
      {
        id: 4,
        name: 'KC21',
        image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hiplaas/KC21.png',
        description: 'The KC21 (morgue refrigeration small door two-body), ideal for the storage of bodies in funeral homes and morgues, has panels, floor and ceiling of are 10 cm in thickness, and manufactured in fire-retardant high density. HCFC free, polyurethane foam (min content 40/45 kg/m2), sandwiched on both sides by corrosion resistant white coated steel or stainless steel. Heavy-duty strengthened floor with internal anti-slip surface. Pre-formed internal corners as an integral part of the panels to provide an interior finish that is the most hygienic available.'
      },
      {
        id: 5,
        name: 'ATPTABLE-E300',
        image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hiplaas/ATPTABLE-E300.png',
        description: 'The ATPTABLE-E300 is a ventilated and elevating autopsy table designed by Mopec Europe. It features an AISI 304 stainless steel top and a central pedestal that houses a ventilation system to extract toxic fumes using a DOWN-DRAFT system.'
      },
    ];

    setProducts(productData);
    setLoading(false);

    // Preload only the hero background + logos; product images load progressively
    const fallback = setTimeout(() => setImagesLoaded(true), 2500);
    const allImages = [
      HIPLAAS_HERO_BG,
      HIPLAAS_BRAND.logo
    ];

    let loadedCount = 0;
    const preloadImages = () => {
      allImages.forEach((src: string) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === allImages.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === allImages.length) {
            setImagesLoaded(true);
          }
        };
      });
    };

    preloadImages();
    return () => clearTimeout(fallback);
  }, []);

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Show loading screen until all images are preloaded
  if (!imagesLoaded) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden max-[912px]:min-h-[70vh] max-[912px]:py-4"
      >
        {/* Background image with depth gradient: lighter at the top so the
            photo shows through, darker toward the bottom where the text sits */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={HIPLAAS_HERO_BG}
            alt="Hiplaas Background"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0b1338]/30 via-[#0b1338]/55 to-[#0b1338]/85"
            style={{ zIndex: 1 }}
          />
        </div>

        {/* Particles Background Animation */}
        <div className="absolute inset-0 w-full h-full z-10">
          <ParticlesBackground containerId="hiplaas-particles" />
          <div className="absolute inset-0 w-full h-full bg-[#2B3990] opacity-40 mix-blend-multiply pointer-events-none" style={{ zIndex: 2 }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center max-[912px]:px-3">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', stiffness: 80 }}
              className="mb-4 sm:mb-6 md:mb-8 max-[912px]:mb-3 flex justify-center"
            >
              {/* Brand logo in place of the wordmark */}
              <Image
                src={HIPLAAS_BRAND.logo}
                alt="Hiplaas"
                width={640}
                height={200}
                priority
                className="w-auto h-24 sm:h-32 md:h-40 lg:h-48 max-[912px]:h-20 object-contain drop-shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7, type: 'spring', stiffness: 60 }}
              className="h-2 w-56 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-6 sm:mb-8 md:mb-10 max-[912px]:h-1 max-[912px]:w-32 max-[912px]:mb-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, type: 'spring', stiffness: 60 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-8 sm:mb-12 md:mb-16 drop-shadow-lg max-[912px]:text-lg max-[912px]:mb-6 max-[912px]:px-2"
            >
              Premium grossing stations, autopsy tables, and morgue refrigeration for pathology and mortuary applications.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-2 max-[912px]:mt-1"
          >
            <motion.div
              className="scroll-cue text-white"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto max-[912px]:w-5 max-[912px]:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 max-[912px]:px-3 max-[912px]:py-6">
        {loading ? (
          <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#2B3990] border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <CategorySection
            category={category}
            products={products}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      {/* Footer CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#2B3990] to-[#1e2865] py-8 sm:py-12 md:py-16 lg:py-20 max-[912px]:py-6"
      >
        <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center max-[912px]:px-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 max-[912px]:text-xl">
            Ready to Upgrade Your Pathology Lab or Mortuary?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
            Our team of specialists is ready to help you find the perfect Hiplaas grossing, autopsy, and refrigeration solutions for your facility.
          </p>
          <motion.a
            href="/user/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#2B3990] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg 
                      hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block max-[912px]:px-6 max-[912px]:py-3 max-[912px]:text-sm"
          >
            Contact Our Experts
          </motion.a>
        </div>
      </motion.section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <Modal product={{ ...selectedProduct, onClose: handleCloseModal }} isOpen={isModalOpen} />
      )}
    </div>
  );
}
