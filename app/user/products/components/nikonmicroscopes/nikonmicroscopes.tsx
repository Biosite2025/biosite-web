"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HoverZoom from '../shared/HoverZoom';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';

// Product categories based on folder structure
const categories = [
  {
    id: 'upright',
    title: 'Upright Microscopes',
    description: 'Precision optical systems for research, clinical, and industrial applications',
    folder: 'upright microscopes',
  },
];

// Every product on this page is Nikon, so the brand logo is applied at render
// time rather than being duplicated onto each product record.
const NIKON_BRAND = {
  name: 'Nikon',
  logo: '/asset/logo/nikon.png',
  cardLogoClass: 'h-[44px] sm:h-[52px] max-w-[80px]',
};

// Modal component — "pop-out" design (trial on Nikon before rolling out):
// the brand logo floats large above the card and the product photo breaks out
// of the card's top-right corner, larger than the card itself. Effects: 3D
// spring entrance, gentle float, hover tilt, brand glow, light sweep, and a
// staggered reveal of the copy. Product photos are transparent PNGs, so the
// photo can overflow the card with no box behind it.
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	const reducedMotion = useReducedMotion();
	if (!isOpen || !product) return null;

	const stop = (e: React.MouseEvent) => e.stopPropagation();
	const rise = (delay: number) =>
		reducedMotion
			? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
			: { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const } };

	return (
		<>
			{/* Overlay — light frosted glass with a soft vignette */}
			<motion.div
				className="fixed inset-0 z-40 bg-slate-200/70 backdrop-blur-lg [background-image:radial-gradient(80%_70%_at_50%_45%,rgba(255,255,255,0.55),rgba(148,163,184,0.25))]"
				onClick={product.onClose}
				style={{ cursor: 'pointer' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.25 }}
			/>

			<div className="fixed inset-x-0 bottom-0 top-16 lg:top-24 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 pointer-events-none [perspective:1600px]">
				<div className="relative w-full max-w-[22rem] pt-36 sm:max-w-xl sm:pt-40 lg:max-w-3xl lg:pt-[min(11rem,24vh)]">
					{/* Brand logo — floats above the card */}
					<motion.div
						className="pointer-events-none absolute left-1 top-0 z-10 sm:left-2 lg:top-2"
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24, scale: 0.92 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.05 }}
					>
						<Image
							src={NIKON_BRAND.logo}
							alt={`${NIKON_BRAND.name} logo`}
							width={240}
							height={240}
							className="h-16 w-auto object-contain drop-shadow-[0_10px_24px_rgba(255,214,0,0.45)] sm:h-20 lg:h-24"
						/>
					</motion.div>

					{/* Card */}
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="nikon-modal-title"
						onClick={stop}
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 36, rotateX: 10, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
						transition={{ type: 'spring', stiffness: 220, damping: 24 }}
						className="relative pointer-events-auto rounded-3xl bg-white/95 shadow-[0_40px_90px_-30px_rgba(15,23,42,0.45)] ring-1 ring-white"
					>
						{/* top edge highlight + one-off light sweep across the card */}
						<span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#FFE100] to-transparent opacity-80" />
						<span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
							{!reducedMotion && (
								<motion.span
									className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
									initial={{ x: '0%' }}
									animate={{ x: '420%' }}
									transition={{ duration: 1.3, delay: 0.55, ease: 'easeInOut' }}
								/>
							)}
						</span>

						{/* Close */}
						<button
							onClick={product.onClose}
							className="absolute -right-3 -top-3 z-30 rounded-full bg-white p-2.5 text-gray-600 shadow-lg ring-1 ring-black/5 transition hover:rotate-90 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] lg:-right-4 lg:-top-4"
							aria-label="Close modal"
							type="button"
						>
							<svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						{/* Product — breaks out of the card's top-right corner */}
						<div className="absolute -top-32 right-2 z-20 h-52 w-44 sm:-top-36 sm:right-4 sm:h-60 sm:w-52 lg:-top-[min(11rem,24vh)] lg:-right-10 lg:h-[min(22rem,48vh)] lg:w-[min(20rem,44vh)]">
							{/* brand glow + contact shadow on the card */}
							<div aria-hidden="true" className="absolute -inset-[10%] bg-[radial-gradient(closest-side,rgba(255,225,0,0.30),rgba(255,225,0,0.10)_55%,transparent)]" />
							<div aria-hidden="true" className="absolute -bottom-2 left-1/2 h-6 w-3/4 -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(15,23,42,0.28),transparent)]" />
							<motion.div
								className="absolute inset-0"
								initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotateY: -22, scale: 0.85 }}
								animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
								transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.15 }}
							>
								<div className="nikon-stage-float absolute inset-0">
									<HoverZoom stage>
										<Image
											src={product.image}
											alt={product.name}
											fill
											priority
											sizes="(max-width: 1024px) 220px, 320px"
											className="object-contain drop-shadow-[0_28px_30px_rgba(15,23,42,0.35)]"
										/>
									</HoverZoom>
								</div>
							</motion.div>
						</div>

						{/* Copy — kept clear of the product on desktop */}
						<div className="relative px-6 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:pr-80 lg:pt-10">
							<motion.p {...rise(0.25)} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2B3990]/80">
								Nikon · {categories[0].title.replace(/s$/, '')}
							</motion.p>
							<motion.h3 {...rise(0.32)} id="nikon-modal-title" className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl">
								{product.name}
							</motion.h3>
							<motion.span
								aria-hidden="true"
								className="mt-3 block h-1 rounded-full bg-[#FFE100]"
								initial={{ width: 0 }}
								animate={{ width: 56 }}
								transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
							/>
							<motion.p {...rise(0.4)} className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
								{product.description || 'High-performance imaging solution engineered for precision and advanced laboratory research applications.'}
							</motion.p>
							<motion.div {...rise(0.5)} className="mt-6 flex flex-wrap items-center gap-3">
								<Link
									href="/user/contact"
									className="group inline-flex items-center gap-2 rounded-full bg-[#2B3990] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2B3990]/25 transition hover:-translate-y-0.5 hover:bg-[#1f2a6b] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
								>
									Request a Quote
									<svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
									</svg>
								</Link>
								<button
									type="button"
									onClick={product.onClose}
									className="rounded-full px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
								>
									Back to products
								</button>
							</motion.div>
							<motion.p {...rise(0.58)} className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-400">
								For detailed specifications and pricing, our sales team will get back to you.
							</motion.p>
						</div>
					</motion.div>
				</div>
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

			{/* Products Grid over one large faint Nikon watermark behind every card */}
			<div className="relative">
				<div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
					<motion.div
						className="absolute inset-0"
						style={{
							backgroundImage: `url("${NIKON_BRAND.logo}")`,
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
					{products.map((product: any, index: number) => (
						<div
							key={product.id}
							className="w-[calc(50%-0.375rem)] min-[913px]:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
						>
							<ProductCard
								index={index}
								image={product.image}
								name={product.name}
								description={product.description}
								brandName={NIKON_BRAND.name}
								brandLogo={NIKON_BRAND.logo}
								brandLogoClass={NIKON_BRAND.cardLogoClass}
								onViewDetails={() => onViewDetails(product)}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function NikonMicroscopes() {

	const [products, setProducts] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Simulated product data - in production, this would fetch from your asset folder
		const productData: any = {
			'upright microscopes': [
				{
					id: 1,
					name: 'ECLIPSE Ci',
					image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Ci.png',
					description: 'Ergonomic upright microscope with eco-illumination for clinical and laboratory applications.'
				},
				{
					id: 2,
					name: 'ECLIPSE E100',
					image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20E100.png',
					description: 'Educational microscope offering outstanding optical performance and ergonomic features for easy, stress-free operation.'
				},
				{
					id: 3,
					name: 'ECLIPSE Ei',
					image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Ei.png',
					description: 'Educational microscope with unique digital and design solutions to ensure smooth progress of science and technology.'
				},
				{
					id: 4,
					name: 'ECLIPSE Ni',
					image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Ni.png',
					description: 'Research and clinical upright microscope supporting biological science and medical research, with excellent optical performance and high system expandability.'
				},
				{
					id: 5,
					name: 'ECLIPSE Si',
					image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Si.png',
					description: 'Ergonomically designed upright microscope bringing comfort and precision to your operation with advanced hardware and software solutions.'
				},
			],
		};

		setProducts(productData);
		setLoading(false);

		// Preload only the hero background + logos; product images load progressively
		const heroImages = [
			'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/nikon%20microscopes/nikonbackground.webp', // Background
			'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/nikon%20microscopes/Nikon-Logo.webp' // Logo
		];
		const fallback = setTimeout(() => setImagesLoaded(true), 2500);
		const allImages = [...heroImages, NIKON_BRAND.logo];
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
							src="/asset/nikon microscopes/nikonbackground.jpg"
							alt="Nikon Background"
							fill
							className="object-cover w-full h-full"
							priority={true}
						/>
						{/* Yellow overlay with low opacity */}
						<div className="absolute inset-0 w-full h-full bg-yellow-300" style={{ opacity: 0.4, zIndex: 1 }} />
					</div>
					{/* Particles Background Animation */}
					<div className="absolute inset-0 w-full h-full z-10">
						<ParticlesBackground containerId="particles-js" />
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
						animate={{ scale: 1.15, opacity: 1, y: 0 }}
						transition={{ duration: 1, type: 'spring', stiffness: 80 }}
						className="mb-4 sm:mb-6 md:mb-8 flex justify-center max-[912px]:mb-3"
						>
						<Image
							src="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/assets/nikon%20microscopes/Nikon-Logo.webp"
							alt="Nikon Logo"
							width={500}
							height={320}
							className="object-contain drop-shadow-xl max-[912px]:w-64 max-[912px]:h-auto"
							priority
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
						Explore Nikon&apos;s cutting-edge microscopy solutions engineered for precision and performance
					</motion.p>
					</motion.div>

					{/* Scroll Indicator - moved below paragraph */}
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
					categories.map((category) => (
						<CategorySection
							key={category.id}
							category={category}
							products={products[category.folder] || []}
							onViewDetails={handleViewDetails}
                            
						/>
					))
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
						Need Expert Consultation?
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
						Our team of specialists is ready to help you find the perfect microscopy solution for your research needs.
					</p>
					<Link href="/user/contact">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-white text-[#2B3990] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg 
										hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block max-[912px]:px-6 max-[912px]:py-3 max-[912px]:text-sm"
							type="button"
						>
							Contact Our Experts
						</motion.button>
					</Link>
				</div>
			</motion.section>

					{/* Modal */}
					{isModalOpen && selectedProduct && (
						<Modal product={{ ...selectedProduct, onClose: handleCloseModal }} isOpen={isModalOpen} />
					)}
		</div>
	);
}
