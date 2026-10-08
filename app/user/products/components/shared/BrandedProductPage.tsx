"use client";

/**
 * BrandedProductPage — the "Immunology page pattern" as one reusable component.
 *
 * Renders: hero (background.webp + gradient overlay + title/subtitle/chevron),
 * brand logo sub-tabs that filter the grid, a section-level brand watermark
 * that cross-fades on tab change, the polished ProductCard grid (corner brand
 * badge + subtle 3D image tilt), a generic detail modal, and the footer CTA.
 *
 * Pages using it only supply data:
 *   <BrandedProductPage category={...} brands={[...]} products={[...]} />
 *
 * - `brands` empty/omitted → no tabs and no watermark (plain grid); use for
 *   pages whose products have no resolvable brands.
 * - Products without a `brand` id are grouped under an automatic "Others" tab
 *   when brand tabs exist.
 * - Pages that need a custom modal (test menus etc.) keep their own file —
 *   this component is for the standard listing pages.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from './ProductCard';

export interface BrandDef {
	id: string;
	name: string;
	logo: string;
	/** Size classes for the tab logo — override for artwork with heavy padding */
	logoClass?: string;
}

export interface ProductDef {
	id: number | string;
	name: string;
	image: string;
	description?: string;
	/** BrandDef.id this product belongs to; omit if brand unresolved */
	brand?: string;
	brandName?: string;
	brandLogo?: string;
	/** Height class override for the card corner badge */
	brandLogoClass?: string;
}

export interface CategoryDef {
	id: string;
	title: string;
	description: string;
}

const OTHERS_TAB: BrandDef = { id: '__others', name: 'Others', logo: '' };

// ---------- Generic product detail modal ----------
function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
	if (!product) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md"
				onClick={onClose}
				style={{ cursor: 'pointer' }}
			></div>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-2 sm:px-4 pointer-events-none max-[912px]:px-3">
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ duration: 0.3 }}
					className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 max-w-sm sm:max-w-md md:max-w-2xl w-full border-2 border-gray-200 mx-auto relative pointer-events-auto max-[912px]:max-w-[90vw] max-[912px]:p-4"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={onClose}
						className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-gray-500 hover:text-gray-800 transition-colors p-2.5 sm:p-3 rounded-full hover:bg-gray-100 z-10
								 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] max-[912px]:top-1.5 max-[912px]:right-1.5"
						aria-label="Close modal"
					>
						<svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden max-[912px]:h-40">
						<Image
							src={product.image}
							alt={product.name}
							fill
							className="object-contain p-2 sm:p-4 md:p-6 max-[912px]:p-2"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
						/>

						{/* Brand logo badge. The default caps width as well as height so
						    wide wordmarks (e.g. Bruner, 3.7:1) can't cover the product
						    photo on phones. Pages that pass brandLogoClass size it themselves.
						    Top-left, because the modal's close button owns the top-right corner. */}
						{product.brandLogo && (
							<div className="absolute top-2 left-2 md:top-3 md:left-3 pointer-events-none">
								<Image
									src={product.brandLogo}
									alt={`${product.brandName ?? 'Brand'} logo`}
									aria-hidden="true"
									width={460}
									height={48}
									className={`${product.brandLogoClass ?? 'h-[28px] max-w-[95px] sm:h-[40px] sm:max-w-[130px] md:h-[56px] md:max-w-[190px] lg:h-[64px] lg:max-w-[220px]'} w-auto object-contain drop-shadow-md`}
								/>
							</div>
						)}
					</div>

					<div className="space-y-3 sm:space-y-4 max-[912px]:space-y-2">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 max-[912px]:text-lg">{product.name}</h3>
						<div className="max-h-48 overflow-y-auto pr-2 max-[912px]:max-h-32">
							<p className="text-sm sm:text-base text-gray-700 leading-relaxed max-[912px]:text-xs">
								{product.description || 'Professional-grade equipment designed for precision, reliability, and superior performance.'}
							</p>
						</div>
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

// ---------- Brand logo tabs (same pattern as Rapid Test Kits / Immunology) ----------
function BrandTabs({ brands, activeBrand, onBrandChange }: { brands: BrandDef[]; activeBrand: string; onBrandChange: (id: string) => void }) {
	return (
		<div className="mb-8 sm:mb-12 max-[912px]:mb-6">
			<div className="border-b border-gray-200">
				<nav className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 -mb-px" aria-label="Brand tabs">
					{brands.map((brand) => {
						const isActive = activeBrand === brand.id;
						return (
							<button
								key={brand.id}
								type="button"
								onClick={() => onBrandChange(brand.id)}
								aria-pressed={isActive}
								aria-label={`Show ${brand.name} products`}
								className={`group whitespace-nowrap pt-2 pb-3 px-2 sm:px-4 border-b-2 transition-all duration-300 touch-manipulation
										 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] ${
									isActive ? 'border-[#2B3990]' : 'border-transparent hover:border-gray-300'
								}`}
							>
								{/* Fixed-size rounded chip anchors logos of any aspect ratio */}
								<span
									className={`flex items-center justify-center h-16 w-36 sm:h-20 sm:w-48 px-2 rounded-lg bg-gray-50 border border-gray-200/80 transition-all duration-300 ${
										isActive ? 'opacity-100 shadow-sm' : 'opacity-50 group-hover:opacity-80'
									}`}
								>
									{brand.logo ? (
										<Image
											src={brand.logo}
											alt={`${brand.name} logo`}
											width={160}
											height={56}
											className={`${brand.logoClass ?? 'max-h-12 sm:max-h-14'} w-auto object-contain`}
										/>
									) : (
										<span className={`text-sm sm:text-base font-semibold ${isActive ? 'text-[#2B3990]' : 'text-gray-600'}`}>
											{brand.name}
										</span>
									)}
								</span>
							</button>
						);
					})}
				</nav>
			</div>
		</div>
	);
}

// ---------- Section: header + tabs + watermark + grid ----------
function BrandedCategorySection({
	category,
	brands,
	products,
	onViewDetails,
}: {
	category: CategoryDef;
	brands: BrandDef[];
	products: ProductDef[];
	onViewDetails: (product: ProductDef) => void;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });
	const reducedMotion = useReducedMotion();

	const hasUnbranded = products.some((p) => !p.brand);
	const tabs = brands.length > 0 ? (hasUnbranded ? [...brands, OTHERS_TAB] : brands) : [];
	const [activeBrand, setActiveBrand] = useState(tabs[0]?.id ?? '');

	const filteredProducts =
		tabs.length === 0
			? products
			: activeBrand === OTHERS_TAB.id
				? products.filter((p) => !p.brand)
				: products.filter((p) => p.brand === activeBrand);

	const activeBrandLogo = brands.find((b) => b.id === activeBrand)?.logo;

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

			{/* Tabs + grid wrapper — carries ONE large brand logo as a section-wide
			    background sitting behind all the cards, synced to the active tab */}
			<div className="relative">
				<div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
					<AnimatePresence initial={false}>
						{activeBrandLogo && (
							<motion.div
								key={activeBrand}
								className="absolute inset-0"
								style={{
									backgroundImage: `url("${activeBrandLogo}")`,
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
									backgroundSize: 'contain',
								}}
								initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
								animate={{ opacity: 0.05, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
							/>
						)}
					</AnimatePresence>
				</div>

				{tabs.length > 0 && (
					<div className="relative z-10">
						<BrandTabs brands={tabs} activeBrand={activeBrand} onBrandChange={setActiveBrand} />
					</div>
				)}

				{/* Products Grid — flex-wrap + justify-center so trailing/orphaned
				    cards on partial rows sit centered instead of hugging the left */}
				<motion.div
					key={activeBrand || 'all'}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="relative z-10 flex flex-wrap justify-center gap-3 min-[913px]:gap-6"
				>
					{filteredProducts.map((product, idx) => (
						<div
							key={product.id}
							className="w-[calc(50%-0.375rem)] min-[913px]:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
						>
							<ProductCard
								index={idx}
								image={product.image}
								name={product.name}
								description={product.description}
								brandLogo={product.brandLogo}
								brandName={product.brandName}
								brandLogoClass={product.brandLogoClass}
								onViewDetails={() => onViewDetails(product)}
							/>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

// ---------- Full page ----------
export default function BrandedProductPage({
	category,
	brands = [],
	products,
	heroSubtitle,
	ctaNoun,
}: {
	category: CategoryDef;
	brands?: BrandDef[];
	products: ProductDef[];
	/** Hero subtitle; defaults to category.description */
	heroSubtitle?: string;
	/** Noun used in the CTA line, e.g. "POCT" → "...the perfect POCT solution..." */
	ctaNoun?: string;
}) {
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductDef | null>(null);

	useEffect(() => {
		const fallback = setTimeout(() => setImagesLoaded(true), 2500);
		const allImages = [
			'/asset/logo/background.webp',
			...brands.map((b) => b.logo).filter(Boolean),
		];

		let loadedCount = 0;
		allImages.forEach((src) => {
			const img = new window.Image();
			img.src = src;
			const done = () => {
				loadedCount++;
				if (loadedCount === allImages.length) setImagesLoaded(true);
			};
			img.onload = done;
			img.onerror = done;
		});
		return () => clearTimeout(fallback);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
						src="/asset/logo/background.webp"
						alt={`${category.title} background`}
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
					<ParticlesBackground containerId={`${category.id}-particles`} />
					<div className="absolute inset-0 w-full h-full bg-[#2B3990] opacity-40 mix-blend-multiply pointer-events-none" style={{ zIndex: 2 }} />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center max-[912px]:px-3">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<motion.h1
							initial={{ scale: 0.9, opacity: 0, y: 40 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							transition={{ duration: 1, type: 'spring', stiffness: 80 }}
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl max-[912px]:text-4xl max-[912px]:mb-3"
						>
							{category.title}
						</motion.h1>
						{/* No horizontal band — subtitle sits directly on the gradient */}
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1, type: 'spring', stiffness: 60 }}
							className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-8 sm:mb-12 md:mb-16 drop-shadow-lg max-[912px]:text-lg max-[912px]:mb-6 max-[912px]:px-2"
						>
							{heroSubtitle ?? category.description}
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
				<BrandedCategorySection
					category={category}
					brands={brands}
					products={products}
					onViewDetails={setSelectedProduct}
				/>
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
						Our team of specialists is ready to help you find the perfect {ctaNoun ?? category.title.toLowerCase()} solution for your laboratory needs.
					</p>
					<motion.a
						href="/user/contact"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-white text-[#2B3990] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg
									hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block max-[912px]:px-6 max-[912px]:py-3 max-[912px]:text-sm
									focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Contact Our Experts
					</motion.a>
				</div>
			</motion.section>

			{/* Modal */}
			{selectedProduct && (
				<ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
			)}
		</div>
	);
}
