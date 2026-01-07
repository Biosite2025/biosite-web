"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product category
const category = {
	id: 'molecular-diagnostics',
	title: 'Molecular Diagnostics',
	description: 'Advanced molecular diagnostics systems and equipment for comprehensive laboratory diagnostics',
	folder: 'molecular-diagnostics',
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
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data with image-based descriptions
		const productData = [
			{
				id: 1,
				name: 'Genolution Nextractor NX-48s',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/genolution-nx48s.png',
				description: 'Genolution Nextractor® NX-48S is automated system for rapid isolation of DNA and RNA from a variety of samples. Genolution Nextractor® NX-48S can extract nucleic acid from up to 48 samples at once, saving your valuable time and labor.'
			},
			{
				id: 2,
				name: 'Sansure Natch CS',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/sansure-natch-cs.png',
				description: 'A fully automated nucleic acid extraction system designed for clinical molecular laboratories. It provides stable, high-purity DNA/RNA extraction with minimal manual intervention, improving consistency, biosafety, and workflow efficiency for PCR-based diagnostics.'
			},
			{
				id: 3,
				name: 'Zybio EXM 3000',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/zybio-exm-3000.png',
				description: 'A compact automated nucleic acid extractor suitable for small to medium laboratories. It supports multiple sample types and standardized extraction protocols, delivering reliable nucleic acid purity for downstream molecular testing.'
			},
			{
				id: 4,
				name: 'Zybio EXM 6000',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/zybio-exm-6000.png',
				description: 'A high-throughput automated nucleic acid extraction system for medium to large laboratories. It enables simultaneous processing of multiple samples with high efficiency, reducing turnaround time while maintaining excellent extraction performance and reproducibility.'
			},
			{
				id: 5,
				name: 'Sansure Slan 96P',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/sansure-slan-96p.png',
				description: 'A real-time PCR (qPCR) system designed for accurate and sensitive molecular diagnostics. It supports 96-well testing, offers precise temperature control, and is optimized for clinical applications such as infectious disease detection and genetic analysis.'
			},
			{
				id: 6,
				name: 'Sansure MA-6000',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/sansure-ma-6000.png',
				description: 'A fully automated molecular analysis platform integrating nucleic acid extraction, amplification, and detection. It minimizes hands-on time, reduces contamination risk, and is ideal for high-volume molecular testing environments.'
			},
			{
				id: 7,
				name: 'Sansure MA-1630Q',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/sansure-ma-1630q.png',
				description: 'A compact automated molecular testing system tailored for laboratories requiring efficient, space-saving solutions. It combines extraction and qPCR analysis with high sensitivity, making it suitable for routine molecular diagnostics.'
			},
			{
				id: 8,
				name: 'Zybio ZIP-96V',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/zybio-zip-96v.png',
				description: 'A 96-well automated nucleic acid extraction system designed for high-throughput laboratories. It supports batch processing, improves workflow efficiency, and delivers consistent DNA/RNA quality for PCR and sequencing applications.'
			},
			{
				id: 9,
				name: 'Sansure iPonatic SQ31B',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/sansure-iponatic-sq31b.png',
				description: 'A portable molecular diagnostic system (4-module configuration) that integrates extraction, amplification, and detection. Designed for rapid, on-site testing, it is suitable for emergency use, mobile labs, and decentralized molecular diagnostics.'
			},
			{
				id: 10,
				name: 'Sansure iPonatic SQ36A',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/sansure-iponatic-sq36a.png',
				description: 'A portable integrated molecular testing platform offering expanded throughput compared to SQ31B. It delivers fast, accurate molecular results in a compact format, ideal for field testing, public health screening, and rapid response scenarios.'
			},
			{
				id: 11,
				name: 'Human Papillomavirus (HPV) Diagnostic Kit',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/Human-Papillomavirus-(HPV)-Diagnostic-Kit.png',
				description: 'A comprehensive diagnostic kit for the detection and genotyping of human papillomavirus (HPV), including high-risk and low-risk types. Supports multiple genotypes and fluorescence-based DNA analysis for accurate screening and clinical diagnostics.'
			},
			{
				id: 12,
				name: 'Mycobacterium Tuberculosis Nucleic Acid and Rifampicin Resistance Fluorescence Diagnostic Kit',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/Mycobacterium-Tuberculosis-Nucleic-Acid-and-Rifampicin-Resistance-Fluorescence-Diagnostic-Kit.png',
				description: 'Sansure Mycobacterium Tuberculosis and Rifampicin Resistance Nucleic Acid Diagnostic Kit (PCR-Fluorescence Probing) is a real-time polymerase chain reaction test kit intended for the qualitative detection of the nucleic acid of mycobacterium tuberculosis and rifampicin resistance mutations in human sputum samples. The test results can be used as an aid in the diagnosis of TB patients and patients with an increased risk of RFP drug-resistant TB, providing an accurate diagnosis basis for infected patients.'
			},
			{
				id: 13,
				name: 'Natch CS3 Plus',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/Natch CS3 Plus.png',
				description: 'Natch CS3 Plus is a fully automated nucleic acid extraction and amplification system developed by Sansure Biotech, featuring high-throughput, high-precision, high-efficiency and anti-contamination. The system can directly use normal sampling tubes and complete uncapping and recapping, liquid transfer, nucleic acid extraction and PCR set-up with one click. Its advantages of convenient operation and standardized workflow greatly reduce manual errors and improve the accuracy of test results. It is a ideal solution for creating a simplified, high-precision, automated and systematic laboratory.'
			},
			{
				id: 14,
				name: 'Novel Coronavirus (2019-nCoV) Nucleic Acid Diagnostic Kit',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/Novel-Coronavirus-(2019-nCoV)-Nucleic-Acid-Diagnostic-Kit (2).png',
				description: 'Sansure COVID-19 diagnostic solutions are used to directly detect the presence of viral RNA, which will be detectable in patients before antibodies form or symptoms of the disease are present, which means the test results can tell whether or not that someone gets virus very early on in their illness.'
			},
			{
				id: 15,
				name: 'Nucleic Acid Test Kit for HBV HCV & HIV',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/Nucleic-Acid-Test-Kit-for-HBV-HCV&HIV.png',
				description: 'This kit is intended for use as a blood donor screening test to detect HBV DNA, HCV RNA, HIV-1 RNA and HIV-2 RNA in pooled or individual sample from healthy blood donors, blood donors of various components (red blood cells, platelets and plasma) and other types of blood donors. *Available soon. Inquire availability.'
			},
			{
				id: 16,
				name: 'Oncoscreen Screening Diagnostic Kits and Detection Kit',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/molecular-diagnostics/Oncoscreen-Screening-Diagnostic-Kits-and-Detection%20Kit.png',
				description: 'The OncoScreen Screening and Detection Kit by Mylab Discovery Solutions is a diagnostic tool designed for the early identification and screening of cancer.'
			},
			
		];

		setProducts(productData);
		setLoading(false);

		// Preload all images
		const allImages = [
			'https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530316/biosite-assets/dakewe/bg-dakewe.jpg',
			...productData.map((p: any) => p.image).filter(Boolean)
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
				<div className="absolute inset-0 w-full h-full z-10">
					<ParticlesBackground containerId="molecular-diagnostics-particles" />
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
							Molecular Diagnostics
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
							Advanced molecular diagnostics systems and equipment for comprehensive laboratory diagnostics
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
