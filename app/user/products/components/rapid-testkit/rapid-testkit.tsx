"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product category
const category = {
  id: 'rapid-test-kits',
  title: 'Rapid Test Kits',
  description: 'Comprehensive range of rapid test kits for quick and reliable diagnostics in various settings.',
  folder: 'rapid-test-kits',
};

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
						className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 text-gray-400 hover:text-gray-600 transition-colors p-1 sm:p-2 rounded-full hover:bg-gray-100 z-10 max-[912px]:top-2 max-[912px]:right-2"
						aria-label="Close modal"
					>
						<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
					</div>

					<div className="space-y-3 sm:space-y-4 max-[912px]:space-y-2">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 max-[912px]:text-lg">{product.name}</h3>
						<p className="text-sm sm:text-base text-gray-600 leading-relaxed max-[912px]:text-xs">
							{product.description}
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

// Product card component with animations
function ProductCard({ product, index, onViewDetails }: { product: any; index: number; onViewDetails: (product: any) => void }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="group relative bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden max-[912px]:rounded-lg"
			whileHover={{ y: -8, scale: 1.02 }}
		>
			{/* Image Container */}
			<div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden max-[912px]:h-40">
				<motion.div
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.6 }}
					className="w-full h-full relative"
				>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-contain p-2 sm:p-3 md:p-4 max-[912px]:p-2"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</motion.div>
				
				{/* Hover overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#2B3990]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>

			{/* Content */}
			<div className="p-4 sm:p-5 md:p-6 max-[912px]:p-3">
				<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#2B3990] transition-colors duration-300 max-[912px]:text-base truncate">
					{product.name}
				</h3>
				<p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 max-[912px]:text-xs max-[912px]:mb-2">
					{product.description}
				</p>
				
				{/* View Details Button */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => onViewDetails(product)}
					className="w-full bg-[#2B3990] text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base
							 hover:bg-[#1e2865] transition-all duration-300 
							 shadow-md hover:shadow-xl relative overflow-hidden group/btn max-[912px]:py-2 max-[912px]:text-sm"
				>
					<span className="relative z-10">View Details</span>
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-[#1e2865] to-[#2B3990]"
						initial={{ x: '-100%' }}
						whileHover={{ x: 0 }}
						transition={{ duration: 0.3 }}
					/>
				</motion.button>
			</div>

			{/* Decorative corner accent */}
			<div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-[#2B3990]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-[912px]:w-12 max-[912px]:h-12" />
		</motion.div>
	);
}

// Category section component
function CategorySection({ category, products, onViewDetails }: { category: any; products: any[]; onViewDetails: (product: any) => void }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const controls = useAnimation();

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

			{/* Products Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-[912px]:grid-cols-1 max-[912px]:gap-3">
				{products.map((product: any, idx: number) => (
					<ProductCard key={product.id} product={product} index={idx} onViewDetails={onViewDetails} />
				))}
			</div>
		</section>
	);
}

export default function MolecularDiagnostics() {
	const [products, setProducts] = useState<any[]>([]);
	const [tulipProducts, setTulipProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('rapid-test-kits');

	useEffect(() => {
		// Rapid Test Kits product data
		const productData = [
			{
				id: 1,
				name: 'Troponin I Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Troponin%20I%20Rapid%20Test.png',
				description: 'Cardiac Troponin I is a protein found in cardiac muscle. Troponin I is part of a three sub unit complex comprised of Troponin T and Troponin C. After cardiac injury, Troponin I is released into the blood 4-6 hrs after the onset of pain.'
			},
			{
				id: 2,
				name: 'HIV Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/HIV%20Rapid%20Test.png ',
				description: 'ACON HIV Rapid Test is a rapid test chromatographic immunoassay for the qualitative detection of antibodies to HIV-1, including subtype O and HIV-2 simultaneously in serum, plasma or whole blood.'
			},
			{
				id: 3,
				name: 'HCV Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/HCV%20Rapid%20Test.png',
				description: 'ACON HCV Rapid Test is a rapid test chromatographic immunoassay for the qualitative detection of antibodies to Hepatitis C Virus (HCV) in serum, plasma or whole blood.'
			},
			{
				id: 4,
				name: 'Malaria Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Malaria%20Rapid%20Test.png',
				description: 'ACON HCV Rapid Test is a rapid test chromatographic immunoassay for the qualitative and differential detection of Histidine-Rich Protein II (HRP-II) specific to (Pf) and (pLDH) specific (Pan) in whole blood.'
			},
			{
				id: 5,
				name: 'hCG Pregnancy',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/hCG%20Pregnancy.png',
				description: 'ACON hCG Pregnancy Rapid Test is a rapid test chromatographic immunoassay for the qualitative detection of human chorionic gonadotropin in urine or serum to aid in the early detection of pregnancy.'
			},
			{
				id: 6,
				name: 'HBsAg Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/HBsAg%20Rapid%20Test.png',
				description: 'ACON HBsAg Rapid Test is a rapid test chromatographic immunoassay for the qualitative detection of Hepatitis B Surface Antigen (HBsAg) in serum, plasma or whole blood.'
			},
			{
				id: 7,
				name: 'SARS CoV-2 Antigen Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/SARS-CoV-2-Antigen-Rapid-Test.png',
				description: 'Is a lateral flow chromatographic immunoassay for the qualitative detection the nucleocapsid protein antigen from SARS-CoV-2 in nasal swab specimens directly from individuals who are suspected with COVID-19. Can also test specimens from asymptomatic people.'
			},
			{
				id: 8,
				name: 'Syphilis Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Syphilis%20Rapid%20Test.png',
				description: 'ACON Syphilis Rapid Test is a rapid chromatographic immunoassay for the qualitative detection of antibodies (IgG and IgM) to Treponema Pallidum (TP) in serum, plasma or whole blood to aid in the diagnosis of Syphilis.'
			},
			{
				id: 9,
				name: 'FOB Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/FOB%20Rapid%20Test.png',
				description: 'ACON Fecal Occult Blood (FOB) Rapid Test is a rapid test chromatographic immunoassay for the qualitative detection of human fecal occult blood in feces.'
			},
			{
				id: 10,
				name: 'H. pylori Rapid Test',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/H.%20pylori%20Rapid%20Test.png',
				description: 'ACON H. pylori Rapid Test is a rapid test chromatographic immunoassay for the qualitative detection H. pylori antigens in human feces specimens.'
			},
		];

		// Tulip Diagnostic (P) LTD. products (unique ids)
		const tulipData = [
			
			{
				id: 2,
				name: 'SYPHICHECK',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/SYPHICHECK.png',
				description: 'Syphicheck WB is a rapid test for Syphilis (TPHA) in serum or plasma using a dipstick format.'
			},
			{
				id: 3,
				name: 'DENGUCHECK',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/DENGUCHECK.png',
				description: 'DENGUCHECK is a rapid diagnostic test for the detection of dengue virus antigens and antibodies.'
			},
			{
				id: 4,
				name: 'Rhelax-ASO',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Rhelax-ASO.png',
				description: 'Rhelax-ASO slide test for detection of antibodies to streptolysin O is based on the principle of agglutination.'
			},
			{
				id: 5,
				name: 'Rhelax-CRP',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Rhelax-CRP.png',
				description: 'Rhelax-CRP is a latex agglutination slide test for detection of C-Reactive Protein.'
			},
			{
				id: 6,
				name: 'Rhelax-RF',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Rhelax-RF.png',
				description: 'Rhelax-RF is a latex agglutination slide test for detection of rheumatoid factors of the IgM class.'
			},
			{
				id: 7,
				name: 'Virdict 4',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/rapid-test-kits/Virdict4-new.jpg',
				description: 'The Virdict 4 is a rapid immunochromatographic test kit for simultaneous detection of HIV 1/2 antibodies, HCV antibodies, Syphilis antibodies, and HBsAg in human serum or plasma. It delivers 100% sensitivity for HIV, HCV, HBsAg, and Syphilis (specificity >95% for Syphilis), with ready-to-use individually pouched test devices. Each device contains antigen-colloidal gold conjugates for the respective markers and control regions for validation. The test takes 30 minutes and is stable at 4–30°C for 24 months. The kit includes test devices, sample droppers, and diluent buffer, available in packs of 25 or 50 tests.'
			}
		];

		setProducts(productData);
		setTulipProducts(tulipData);
		setLoading(false);

		// Preload all images
		const allImages = [
			...productData.map((p: any) => p.image),
			...tulipData.map((p: any) => p.image)
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
				{/* Background Gradient */}
				<div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-[#1a2c65] via-[#2B3990] to-[#4a5ab8]" />

				{/* Particles Background Animation */}
				<div className="absolute inset-0 w-full h-full z-0">
					<ParticlesBackground containerId="rapid-testkits-particles" />
					<div className="absolute inset-0 w-full h-full bg-[#2B3990] opacity-40 mix-blend-multiply pointer-events-none" />
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
							Rapid Test Kits
						</motion.h1>
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
							Comprehensive range of rapid test kits for quick and reliable diagnostics in various settings.
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
							animate={{ y: [0, 18, 0] }}
							transition={{ duration: 1.8, repeat: Infinity }}
							className="text-white"
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
					<>
						{/* Tabs Navigation */}
						<div className="mb-8 sm:mb-12">
							<div className="border-b border-gray-200">
								{/* Desktop/Tablet: Horizontal Tabs */}
								<nav className="hidden sm:flex flex-wrap gap-2 sm:gap-4 -mb-px" aria-label="Tabs">
									<button
										onClick={() => setActiveTab('rapid-test-kits')}
										className={`whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-semibold text-sm sm:text-base transition-all duration-300 ${
											activeTab === 'rapid-test-kits'
												? 'border-[#2B3990] text-[#2B3990]'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
									>
										Rapid Test Kits
									</button>
									<button
										onClick={() => setActiveTab('tulip-diagnostic')}
										className={`whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-semibold text-sm sm:text-base transition-all duration-300 ${
											activeTab === 'tulip-diagnostic'
												? 'border-[#2B3990] text-[#2B3990]'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
									>
										Tulip Diagnostic
									</button>
								</nav>

								{/* Mobile: Grid Layout */}
								<nav className="grid grid-cols-2 gap-2 sm:hidden -mb-px pb-2" aria-label="Tabs">
									<button
										onClick={() => setActiveTab('rapid-test-kits')}
										className={`py-3 px-3 rounded-lg font-semibold text-xs transition-all duration-300 touch-manipulation ${
											activeTab === 'rapid-test-kits'
												? 'bg-[#2B3990] text-white shadow-md'
												: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
										}`}
									>
										Rapid Test Kits
									</button>
									<button
										onClick={() => setActiveTab('tulip-diagnostic')}
										className={`py-3 px-3 rounded-lg font-semibold text-xs transition-all duration-300 touch-manipulation ${
											activeTab === 'tulip-diagnostic'
												? 'bg-[#2B3990] text-white shadow-md'
												: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
										}`}
									>
										Tulip Diagnostic
									</button>
								</nav>
							</div>
						</div>

						{/* Tab Content with Fade Animation */}
						{activeTab === 'rapid-test-kits' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<CategorySection
									category={category}
									products={products}
									onViewDetails={handleViewDetails}
								/>
							</motion.div>
						)}

						{activeTab === 'tulip-diagnostic' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3 }}
							>
								<CategorySection
									category={{
										id: 'tulip-diagnostic',
										title: 'Tulip Diagnostic (P) LTD.',
										description: 'Rapid test kits from Tulip Diagnostic (P) LTD. for specialized diagnostics.'
									}}
									products={tulipProducts}
									onViewDetails={handleViewDetails}
								/>
							</motion.div>
						)}
					</>
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
						Our team of specialists is ready to help you find the perfect molecular diagnostics solution for your laboratory needs.
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
