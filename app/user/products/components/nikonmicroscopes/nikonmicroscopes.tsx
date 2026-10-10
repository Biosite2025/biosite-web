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

// Modal component — "product stage" design (trial on Nikon before rolling out):
// tinted blurred overlay, a spotlit 3D stage for the photo (entrance swing,
// idle float, floor shadow, hover tilt), and a content column with a CTA.
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	const reducedMotion = useReducedMotion();
	if (!isOpen || !product) return null;

	// Prevent modal close when clicking inside modal content
	const handleModalContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<>
			{/* Overlay — deep brand-navy tint over a blur, so the panel reads as a lit object */}
			<motion.div
				className="fixed inset-0 z-40 bg-[#0b1430]/55 backdrop-blur-md"
				onClick={product.onClose}
				style={{ cursor: 'pointer' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.25 }}
			/>
			<div className="fixed inset-x-0 bottom-0 top-16 lg:top-24 z-50 flex items-center justify-center px-3 sm:px-4 py-3 sm:py-4 pointer-events-none [perspective:1600px]">
				<motion.div
					role="dialog"
					aria-modal="true"
					aria-labelledby="nikon-modal-title"
					initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, rotateX: 8, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.97 }}
					transition={{ type: 'spring', stiffness: 260, damping: 26 }}
					className="relative grid w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(11,20,48,0.55)] ring-1 ring-white/60 pointer-events-auto sm:max-w-xl lg:max-w-5xl lg:grid-cols-[1.1fr_1fr] max-h-full overflow-y-auto overscroll-contain"
					onClick={handleModalContentClick}
				>
					{/* Close */}
					<button
						onClick={product.onClose}
						className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2.5 text-gray-600 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:bg-white hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
						aria-label="Close modal"
						type="button"
					>
						<svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					{/* ===== Stage ===== */}
					<div className="relative h-64 overflow-hidden bg-[radial-gradient(120%_90%_at_50%_35%,#ffffff_0%,#eef1f8_45%,#d9dfee_100%)] sm:h-80 lg:h-auto lg:min-h-[min(30rem,62vh)]">
						{/* faint dot grid for depth */}
						<div
							aria-hidden="true"
							className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#2B3990_0.8px,transparent_0.8px)] [background-size:18px_18px] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
						/>
						{/* brand glow behind the product */}
						<div aria-hidden="true" className="absolute left-1/2 top-[42%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2B3990]/10 blur-3xl" />
						{/* floor shadow */}
						<div aria-hidden="true" className="absolute bottom-[9%] left-1/2 h-6 w-[58%] -translate-x-1/2 rounded-[50%] bg-[#0b1430]/25 blur-xl" />

						{/* product — swings in, then floats; HoverZoom adds the card-style tilt on hover.
						    multiply blends the photo's own pale backdrop into the stage so no box edge shows. */}
						<motion.div
							className="absolute inset-[8%_10%_12%] mix-blend-multiply"
							initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: -18, x: -30 }}
							animate={{ opacity: 1, rotateY: 0, x: 0 }}
							transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.08 }}
						>
							<div className="nikon-stage-float absolute inset-0">
								<HoverZoom stage>
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-contain drop-shadow-[0_24px_28px_rgba(11,20,48,0.28)]"
										sizes="(max-width: 1024px) 90vw, 520px"
										priority
									/>
								</HoverZoom>
							</div>
						</motion.div>

						{/* brand chip — frosted glass */}
						<div className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl bg-white/70 p-1.5 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
							<Image
								src={NIKON_BRAND.logo}
								alt={`${NIKON_BRAND.name} logo`}
								aria-hidden="true"
								width={160}
								height={48}
								className="h-9 w-auto object-contain sm:h-11"
							/>
						</div>
					</div>

					{/* ===== Content ===== */}
					<motion.div
						className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10"
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.4, delay: 0.15 }}
					>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B3990]/80">
							Nikon · {categories[0].title.replace(/s$/, '')}
						</p>
						<div>
							<h3 id="nikon-modal-title" className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
								{product.name}
							</h3>
							<span aria-hidden="true" className="mt-3 block h-1 w-14 rounded-full bg-[#FFE100] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]" />
						</div>
						<p className="text-sm leading-relaxed text-gray-600 sm:text-base">
							{product.description || 'High-performance imaging solution engineered for precision and advanced laboratory research applications.'}
						</p>
						<div className="mt-2 flex flex-wrap items-center gap-3">
							<Link
								href="/user/contact"
								className="inline-flex items-center gap-2 rounded-full bg-[#2B3990] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2B3990]/25 transition hover:-translate-y-0.5 hover:bg-[#1f2a6b] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
							>
								Request a Quote
								<svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
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
						</div>
						<p className="border-t border-gray-100 pt-4 text-xs text-gray-400">
							For detailed specifications and pricing, our sales team will get back to you.
						</p>
					</motion.div>
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
