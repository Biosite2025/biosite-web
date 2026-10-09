"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HoverZoom from '../shared/HoverZoom';
import { motion, AnimatePresence, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';

// Product category
const category = {
	id: 'immunology',
	title: 'Immunology',
	description: 'Advanced immunology systems and equipment for comprehensive laboratory diagnostics',
	folder: 'immunology',
};

// Brand sub-tabs — logo tabs above the grid (same pattern as Rapid Test Kits).
// logoClass compensates for artwork whitespace so all logos read the same size:
// liason.png has heavy internal padding, so it gets a taller box + scale boost.
const brands = [
	{ id: 'tosoh', name: 'Tosoh', logo: '/asset/logo/TOSOH.png', logoClass: 'max-h-12 sm:max-h-14' },
	{ id: 'liaison', name: 'DiaSorin', logo: '/asset/logo/DIASORIN.png' },
	{ id: 'werfen', name: 'Werfen', logo: '/asset/logo/WERFEN.png', logoClass: 'max-h-12 sm:max-h-14' },
	// madx-logo.webp is a light-background version of MADx's artwork (their
	// supplied logo has white "MAD" lettering, invisible on these light tabs).
	{ id: 'madx', name: 'MADx', logo: '/asset/madx/madx-logo.webp', logoClass: 'max-h-10 sm:max-h-12 max-w-full' },
];

// Modal component
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	if (!isOpen || !product) return null;

	const handleModalContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const isLiaisonXL = product.name === 'LIAISON® XL';
	const isTosoh = product.name?.includes('Tosoh AIA');
	const isBioFlash = product.name === 'Werfen BIO-FLASH';

	const liaisonTestMenu = (
		<div className="divide-y divide-gray-100 [&>div]:py-1.5 md:[&>div]:py-2.5 [&>div:first-child]:pt-0 text-[9px] md:text-xs max-h-[222px] md:max-h-[500px] overflow-y-auto pr-1 md:pr-2">
			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🦴</span>Bone and Mineral
				</h4>
				<p className="text-gray-700 ml-3 md:ml-5">25 OH Vitamin D TOTAL assay</p>
			</div>
			
			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🔴</span>Epstein-Barr Virus
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>EBV IgM</p>
					<p>VCA IgG</p>
					<p>EBNA IgG</p>
					<p>KAPI IgG</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🔵</span>ToRCH
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Rubella IgG</p>
					<p>Rubella IgM</p>
					<p>Cytomegalovirus IgM</p>
					<p>Cytomegalovirus IgG</p>
					<p>HSV-1 Type Specific IgG</p>
					<p>HSV-2 Type Specific IgG</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🌍</span>Infectious Disease
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Treponema Assay</p>
					<p>VZV IgG†</p>
					<p>Borrelia burgdorferi†</p>
					<p>Measles IgG†</p>
					<p>Mumps IgG†</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🟡</span>Hepatitis
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Hepatitis A Total Antibodies</p>
					<p>Hepatitis A IgM*</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🟠</span>Diabetes
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Insulin</p>
					<p>C-Peptid</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🔴</span>MMRV
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Measles IgG†</p>
					<p>Mumps IgG†</p>
					<p>Rubella IgM</p>
					<p>Rubella IgG</p>
					<p>VZV IgG†</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🟤</span>Growth
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Human Growth Hormone</p>
					<p>IGF-1*</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🟡</span>Hypertension
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Direct Renin†</p>
					<p>Aldosterone</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🟢</span>Fertility
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>FSH</p>
					<p>LH</p>
					<p>Prolactin xt</p>
					<p>Testosterone</p>
					<p>Estradiol II Gen</p>
					<p>Progesterone II Gen**</p>
					<p>hCG</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🟢</span>Thyroids
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>TSH</p>
					<p>FT3</p>
					<p>FT4</p>
					<p>Anti-TPO*</p>
				</div>
			</div>
		</div>
	);

	const tosohTestMenu = (
		<div className="divide-y divide-gray-100 [&>div]:py-1.5 md:[&>div]:py-2.5 [&>div:first-child]:pt-0 text-[9px] md:text-xs max-h-[222px] md:max-h-[500px] overflow-y-auto pr-1 md:pr-2">
			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Tumor Markers</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>AFP</p>
					<p>CEA</p>
					<p>PA</p>
					<p>27.29</p>
					<p>CA125</p>
					<p>CA19-9</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Thyroid</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>TSH</p>
					<p>fT3</p>
					<p>T4</p>
					<p>FT3</p>
					<p>FT4</p>
					<p>T-U</p>
					<p>TSH 3rd-Gen *</p>
					<p>TgAb *</p>
					<p>TgAb *</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Cardiac Markers</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>CK-MB</p>
					<p>c Tni 2nd-Gen</p>
					<p>Myoglobin</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Anemia</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>FER</p>
					<p>B12 *</p>
					<p>FOLATE *</p>
					<p>RBC FOLATE *</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Reproductive</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>βHCG</p>
					<p>HCG</p>
					<p>DHEA-S</p>
					<p>E2</p>
					<p>FSH</p>
					<p>LH II</p>
					<p>PRL</p>
					<p>PROG II</p>
					<p>PROG III</p>
					<p>SHBG</p>
					<p>Testosterone</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Kidney Markers</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>BMG</p>
					<p>Cystatin C</p>
					<p>intact PTH</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Metabolic</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>CORT</p>
					<p>hGH</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Additional</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>ACTH</p>
					<p>Homocysteine</p>
					<p>IgE II</p>
					<p>PAP</p>
					<p>25-OH Vitamin D *</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1">Diabetes</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>C-Peptide II</p>
					<p>IRI</p>
				</div>
			</div>
		</div>
	);

	const bioflashTestMenu = (
		<div className="divide-y divide-gray-100 [&>div]:py-1.5 md:[&>div]:py-2.5 [&>div:first-child]:pt-0 text-[9px] md:text-xs max-h-[222px] md:max-h-[300px] overflow-y-auto pr-1 md:pr-2">
			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🔬</span>ToRCH
					<span className="text-[8px] md:text-xs font-normal text-gray-500 ml-1">(9)</span>
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>Toxo IgG</p>
					<p>Toxo IgM</p>
					<p>Rubella IgG</p>
					<p>Rubella IgM</p>
					<p>CMV IgG</p>
					<p>CMV IgM</p>
					<p>HSV-1 IgG</p>
					<p>HSV-2 IgG</p>
					<p>HSV IgM*</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-0.5 md:mb-1 flex items-center gap-1">
					<span className="text-sm md:text-lg">🏥</span>Pre-surgery
					<span className="text-[8px] md:text-xs font-normal text-gray-500 ml-1">(8)</span>
				</h4>
				<div className="ml-3 md:ml-5 text-gray-700">
					<p>HBsAg</p>
					<p>anti-HBs</p>
					<p>HBeAg*</p>
					<p>anti-HBe*</p>
					<p>anti-HBc</p>
					<p>anti-HCV</p>
					<p>anti-HIV（1+2）</p>
					<p>anti-TP</p>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<div
				className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md"
				onClick={product.onClose}
				style={{ cursor: 'pointer' }}
			></div>
			<div className="fixed inset-x-0 bottom-0 top-16 lg:top-24 z-50 flex items-center justify-center px-2 sm:px-4 py-3 sm:py-4 pointer-events-none max-[912px]:px-2">
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ duration: 0.3 }}
					className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 ${isLiaisonXL || isTosoh || isBioFlash ? 'max-w-4xl' : 'max-w-sm sm:max-w-md md:max-w-2xl'} w-full border-2 border-gray-200 mx-auto relative pointer-events-auto max-[912px]:max-w-[95vw] max-[912px]:p-3 max-[912px]:max-h-[60vh] max-[912px]:overflow-hidden lg:max-h-full lg:overflow-y-auto lg:overscroll-contain`}
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

					<div className={isLiaisonXL || isTosoh || isBioFlash ? 'grid grid-cols-2 gap-2 md:gap-6' : ''}>
						{isLiaisonXL && (
							<div className="border-r border-gray-200 pr-2 md:pr-6">
								<h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1 md:mb-3 border-b border-gray-200 pb-1 md:pb-2">Test Menu</h3>
								{liaisonTestMenu}
							</div>
						)}

						{isTosoh && (
							<div className="border-r border-gray-200 pr-2 md:pr-6">
								<h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1 md:mb-3 border-b border-gray-200 pb-1 md:pb-2">Tosoh AIA® Test Menu</h3>
								<p className="text-[9px] md:text-xs italic text-gray-500 mb-1 md:mb-3">(10 minute incubation unless otherwise noted.)</p>
								{tosohTestMenu}
							</div>
						)}

						{isBioFlash && (
							<div className="border-r border-gray-200 pr-2 md:pr-6">
								<h3 className="text-xs md:text-lg font-bold text-gray-900 mb-1 md:mb-3 border-b border-gray-200 pb-1 md:pb-2">BIO-FLASH Test Menu</h3>
								{bioflashTestMenu}
							</div>
						)}

						<div>
							<div className="relative h-20 md:h-64 lg:h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl mb-2 md:mb-6 overflow-hidden">
								<HoverZoom>
<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-contain p-1 md:p-6"
									sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 30vw"
								/>
</HoverZoom>

								{/* Brand logo badge (same treatment as the product cards) */}
								{product.brandLogo && (
									<div className="absolute top-2 right-2 md:top-3 md:right-3 pointer-events-none">
										<Image
											src={product.brandLogo}
											alt={`${product.brandName ?? 'Brand'} logo`}
											aria-hidden="true"
											width={460}
											height={48}
											className="h-[20px] md:h-[40px] lg:h-[48px] w-auto object-contain drop-shadow-md"
										/>
									</div>
								)}
							</div>

							<div className="space-y-1 md:space-y-4">
								<h3 className="text-xs md:text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h3>
								<p className="text-[10px] md:text-base text-gray-600 leading-snug md:leading-relaxed">
									{product.description ? product.description : 'Professional-grade laboratory equipment designed for precision, reliability, and superior performance in immunology applications.'}
								</p>
								<div className="pt-1 md:pt-4 border-t border-gray-200">
									<p className="text-[9px] md:text-sm text-gray-500 leading-tight">
										For detailed specifications and pricing information, please contact our sales team.
									</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
}

// Brand logo tabs — same tab pattern/styling as Rapid Test Kits, with logos
// in a consistent fixed bounding box so wide and square logos don't jump.
function BrandTabs({ activeBrand, onBrandChange }: { activeBrand: string; onBrandChange: (id: string) => void }) {
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
									isActive
										? 'border-[#2B3990]'
										: 'border-transparent hover:border-gray-300'
								}`}
							>
								{/* Rounded chip anchors logos that are on white */}
								<span
									className={`flex items-center justify-center h-16 w-36 sm:h-20 sm:w-48 px-2 rounded-lg bg-gray-50 border border-gray-200/80 transition-all duration-300 ${
										isActive ? 'opacity-100 shadow-sm' : 'opacity-50 group-hover:opacity-80'
									}`}
								>
									<Image
										src={brand.logo}
										alt={`${brand.name} logo`}
										width={160}
										height={56}
										className={`${brand.logoClass} w-auto object-contain`}
									/>
								</span>
							</button>
						);
					})}
				</nav>
			</div>
		</div>
	);
}

// Category section component
function CategorySection({ category, products, activeBrand, onBrandChange, onViewDetails }: { category: any; products: any[]; activeBrand: string; onBrandChange: (id: string) => void; onViewDetails: (product: any) => void }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const controls = useAnimation();
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [isInView, controls]);

	const filteredProducts = products.filter((p: any) => p.brand === activeBrand);
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
				{/* Section background logo: cross-fades (with a gentle settle from
				    scale 1.02) when the tab changes; instant swap for reduced motion */}
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
								animate={{ opacity: 0.50, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
							/>
						)}
					</AnimatePresence>
				</div>

				{/* Brand Sub-Tabs */}
				<div className="relative z-10">
					<BrandTabs activeBrand={activeBrand} onBrandChange={onBrandChange} />
				</div>

				{/* Products Grid — flex-wrap + justify-center so trailing/orphaned
				    cards on partial rows sit centered instead of hugging the left */}
				<motion.div
					key={activeBrand}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="relative z-10 flex flex-wrap justify-center gap-3 min-[913px]:gap-6"
				>
					{filteredProducts.map((product: any, idx: number) => (
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

export default function Immunology() {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeBrand, setActiveBrand] = useState('tosoh'); // default tab: Tosoh

	useEffect(() => {
		// Product data based on CSV
		const productData = [
			{
				id: 4,
				name: 'Tosoh AIA-360',
				brand: 'tosoh',
				brandName: 'Tosoh',
				brandLogo: '/asset/logo/TOSOH.png',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/tosoh-aia-360.png',
				description: "The Tosoh AIA-360's size and affordability make it an excellent fit for POLs and small hospitals, as well as for specialty testing or for use as a back-up analyzer."
			},
			{
				id: 5,
				name: 'Tosoh AIA-900',
				brand: 'tosoh',
				brandName: 'Tosoh',
				brandLogo: '/asset/logo/TOSOH.png',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/tosoh-aia-900.png',
				description: "Tosoh Bioscience's AIA-900 is the new generation stand alone, flexible and fully scalable high throughput immunoassay analyzer."
			},
			{
				id: 6,
				name: 'Tosoh AIA-2000',
				brand: 'tosoh',
				brandName: 'Tosoh',
				brandLogo: '/asset/logo/TOSOH.png',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/AIA-2000.png',
				description: "AIA-2000 is a fully automated immunoassay analyzer has become the new global standard for speed and reliability amongst fully featured immunoassay analyzers. Equipped with a complete line of test menu, the user can load up to 960 tests (48 trays x 20 tests) in a new, easy-to-load hybrid sort; increasing walkaway time to approximately 4 hours."
			},
			{
				id: 7,
				name: 'Tosoh AIA-CL300',
				brand: 'tosoh',
				brandName: 'Tosoh',
				brandLogo: '/asset/logo/TOSOH.png',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/AIA-CL300.png',
				description: "AIA-CL300 utilises the unique CL-AIA Pack twin cup format. With a throughput of up to 30 results per hour, first result within 15 minutes for most assays, this innovative desktop automated analyzer meets the needs from small to large laboratories, to perform routine analysis, esoteric assays, and up to 30 results per hour. Users who experience the unique technology of the AIA-CL series which have already made their proof in terms of ease of use, reliability, and analytical performance."
			},
			{
				id: 8,
				name: 'LIAISON® XS',
				brand: 'liaison',
				brandName: 'DiaSorin',
				brandLogo: '/asset/logo/DIASORIN.png',
				brandLogoClass: 'h-[22px] sm:h-[26px] max-w-[110px]',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/LIAISON%C2%AE%20XS.png',
				description: "A fully automated, easy-to-use benchtop analyzer. Maximize productivity with optimal cost management, no daily maintenance, straightforward integration, and the same capabilities as Diasorin’s high-throughput analyzers."
			},
			{
				id: 9,
				name: 'LIAISON® XL',
				brand: 'liaison',
				brandName: 'DiaSorin',
				brandLogo: '/asset/logo/DIASORIN.png',
				brandLogoClass: 'h-[22px] sm:h-[26px] max-w-[110px]',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/LIAISON%C2%AE%20XL.png',
				description: "Designed for large laboratories. Combine the benefits of high throughput and high sensitivity within a powerful and fully automated system that can seamlessly connect to facilitate Total Laboratory Automation."
			},
			{
				id: 10,
				name: 'Werfen BIO-FLASH',
				brand: 'werfen',
				brandName: 'Werfen',
				brandLogo: '/asset/logo/WERFEN.png',
				brandLogoClass: 'h-[24px] sm:h-[28px] max-w-[90px]',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/werfen%20bioflash.png',
				description: "BIO-FLASH is a fully automated, random access chemiluminescent analyzer for any autoimmune laboratory. It delivers enhanced workflow efficiencies, market leading ease-of-use and improved assay performance compared with existing enzyme-based systems. With on-board reagents and stored calibration curves, BIO-FLASH makes even the most specialized autoimmune tests efficient to perform."
			},
			{
				id: 11,
				name: "MAX 9k",
				brand: 'madx',
				brandName: 'MADx',
				brandLogo: '/asset/madx/madx-logo.webp',
				brandLogoClass: 'h-[22px] sm:h-[26px] max-w-[110px]',
				image: '/asset/madx/max-9k.webp',
				description: "The MADx MAX 9k is a fully automated benchtop analyzer that streamlines small to medium throughput allergy and food intolerance testing by requiring minimal user intervention for consistent, precise results."
			},
			{
				id: 12,
				name: "MAX 45k",
				brand: 'madx',
				brandName: 'MADx',
				brandLogo: '/asset/madx/madx-logo.webp',
				brandLogoClass: 'h-[22px] sm:h-[26px] max-w-[110px]',
				image: '/asset/madx/max-45k.webp',
				description: "The MADx MAX 45k high capacity benchtop analyzer that optimizes laboratory productivity by processing up to 50 samples every 4 hours for rapid, high-throughput allergy and food intolerance testing."
			},
			{
				id: 13,
				name: "ImageXplorer",
				brand: 'madx',
				brandName: 'MADx',
				brandLogo: '/asset/madx/madx-logo.webp',
				brandLogoClass: 'h-[22px] sm:h-[26px] max-w-[110px]',
				image: '/asset/madx/imagexplorer.webp',
				description: "With ImageXplorer, you gain true independence from external labs. Designed for small spaces and easy handling, it lets you process samples directly on site – reliably and on your own schedule."
			},
			{
				id: 14,
				name: "ALEX³",
				brand: 'madx',
				brandName: 'MADx',
				brandLogo: '/asset/madx/madx-logo.webp',
				brandLogoClass: 'h-[22px] sm:h-[26px] max-w-[110px]',
				image: '/asset/madx/alex3.webp',
				description: "ALEX (Allergy Xplorer) was the first ELISA based in-vitro multiplex allergy test allowing simultaneous measurements of quantitative total IgE (tIgE) and specific IgE (sIgE) against a large number of allergen extracts and molecular allergens. ALEX³ is the third iteration of the test and comes with a panel of 300 allergens, including high-relevance allergen sources and 85 allergen families. It contains 218 molecular allergens, 107 of which are unique to the test - it is the widest range of molecular allergens on the market. ALEX³ improves the quality of diagnosis and makes individualised and evidence-based therapy possible for every patient."
			},

		];


		setProducts(productData);
		setLoading(false);

		// Preload only the hero background + logos; product images load progressively
		const fallback = setTimeout(() => setImagesLoaded(true), 2500);
		const allImages = [
			'/asset/logo/background.webp',
			...brands.map((b) => b.logo)
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
				{/* Background Image (matches Clinical Chemistry hero) */}
				<div className="absolute inset-0 w-full h-full z-0">
					<Image
						src="/asset/logo/background.webp"
						alt="Immunology Background"
						fill
						className="object-cover w-full h-full"
						priority
					/>
					{/* Gradient overlay: lighter at the top so the lab photo shows
					    through, darker toward the bottom where the text sits */}
					<div
						className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0b1338]/30 via-[#0b1338]/55 to-[#0b1338]/85"
						style={{ zIndex: 1 }}
					/>
				</div>

				{/* Particles Background Animation */}
				<div className="absolute inset-0 w-full h-full z-10">
					<ParticlesBackground containerId="immunology-particles" />
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
							Immunology
						</motion.h1>
						{/* Horizontal band removed — subtitle sits directly on the gradient */}
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1, type: 'spring', stiffness: 60 }}
							className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-8 sm:mb-12 md:mb-16 drop-shadow-lg max-[912px]:text-lg max-[912px]:mb-6 max-[912px]:px-2"
						>
							Advanced immunology systems and equipment for comprehensive laboratory diagnostics
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
						activeBrand={activeBrand}
						onBrandChange={setActiveBrand}
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
						Our team of specialists is ready to help you find the perfect immunology solution for your laboratory needs.
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
			{isModalOpen && selectedProduct && (
				<Modal product={{ ...selectedProduct, onClose: handleCloseModal }} isOpen={isModalOpen} />
			)}
		</div>
	);
}
