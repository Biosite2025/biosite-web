"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PopOutModal from '../shared/PopOutModal';
import HoverZoom from '../shared/HoverZoom';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';

// Product category
const category = {
	id: 'dakewe',
	title: 'Dakewe',
	description: 'Advanced histopathology systems and equipment for comprehensive laboratory diagnostics',
	folder: 'dakewe',
};

// Every product on this page is Dakewe, so the brand logo is applied at render
// time rather than being duplicated onto each product record.
const DAKEWE_BRAND = { name: 'Dakewe', logo: '/asset/logo/DAKEWE1.png' };

// Modal component
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	if (!isOpen || !product) return null;
	return <PopOutModal name={product.name} description={product.description} image={product.image} logo={product.brandLogo ?? DAKEWE_BRAND.logo} brandName={product.brandName ?? DAKEWE_BRAND.name} onClose={product.onClose} />;
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

			{/* Products Grid over one large faint Dakewe watermark behind every card */}
			<div className="relative">
				<div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
					<motion.div
						className="absolute inset-0"
						style={{
							backgroundImage: `url("${DAKEWE_BRAND.logo}")`,
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
								brandName={DAKEWE_BRAND.name}
								brandLogo={DAKEWE_BRAND.logo}
								brandLogoClass="h-[22px] sm:h-[26px] max-w-[100px]"
								onViewDetails={() => onViewDetails(product)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function Dakewe() {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Dakewe product data with accurate descriptions from official PDF catalog
		const productData = [
			{ id: 1, name: 'SurePrint C100', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dakewe-new/DAKEWE SurePrint C100.png', description: 'Using innovative non-contact laser marking technology, the SurePrint C100 has the characteristics of fast printing speed and cost saving solution. The operation is simple and easy to use with high reliability and stability. Using universal cassettes, the printed characters are clear and scratch-resistant, and there is no fading nor falling off after soaking in various solutions.' },
			{ id: 2, name: 'SurePrint S200', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dakewe-new/DAKEWE SurePrint S200.png', description: 'Featuring non-contact ultraviolet laser marking technology, Dakewe SurePrint S200 intelligent slide printer offers fast, rich-content and consumable-free printing. The innovative upward slide delivery system allows smooth and safe transport of slides and eliminates slide breakage due to slide stacking.' },
			{ id: 5, name: 'MT1 Microtome', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dakewe-new/DAKEWE MT1.png', description: 'Dakewe MT1 semi-automated rotary microtome offers quality sections and effortless experience with engineered mechanism and ergonomic design, adapting to the need of every microtomist in the laboratory.' },
			{ id: 7, name: 'SurePrint C7', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dakewe-new/SurePrint C7.webp', description: 'The Dakewe SurePrint C7 is a compact UV laser cassette printer that delivers fast, high-resolution, durable printing on all cassette types—without ink or ribbons—ideal for efficient histology workflows.' },
			{ id: 8, name: 'SurePrint S10 & S10 PRO', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dakewe-new/SurePrint S10&S10 PRO.png', description: 'A compact UV laser slide printer delivering permanent, high-resolution (2500 dpi) markings without consumables. Holds up to 150 slides in one hopper, supports rich content (alphanumeric, barcodes, graphics), offers both simple and advanced interface modes, and integrates with LIS systems. Minimal maintenance and durable prints resistant to processing solvents.' }
		];

		setProducts(productData);
		setLoading(false);

		// Preload only the hero background + logos; product images load progressively
		const fallback = setTimeout(() => setImagesLoaded(true), 2500);
		const allImages = [
			'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/dakewe/bg-dakewe.webp',
			DAKEWE_BRAND.logo
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
				{/* Background Image */}
				<div className="absolute inset-0 w-full h-full z-0">
					<Image
						src="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/dakewe/bg-dakewe.webp"
						alt="Dakewe Background"
						fill
						className="object-cover w-full h-full"
						priority={true}
					/>
					<div className="absolute inset-0 w-full h-full bg-black" style={{ opacity: 0.5, zIndex: 1 }} />
				</div>

				{/* Particles Background Animation */}
				<div className="absolute inset-0 w-full h-full z-10">
					<ParticlesBackground containerId="dakewe-particles" />
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
                src={DAKEWE_BRAND.logo}
                alt="Dakewe"
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
							Advanced histopathology systems and equipment for comprehensive laboratory diagnostics
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
						Ready to Upgrade Your Laboratory?
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
						Our team of specialists is ready to help you find the perfect Dakewe histopathology solution for your laboratory needs.
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
