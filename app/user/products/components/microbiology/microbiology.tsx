"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories
const bloodCultureCategory = {
	id: 'blood-culture',
	title: 'Blood Culture',
	description: '',
	folder: 'blood-culture',
};

const idAstCategory = {
	id: 'id-ast',
	title: 'ID/AST',
	description: '',
	folder: 'id-ast',
};

const pretreatmentCategory = {
	id: 'pretreatment-streaking',
	title: 'Pretreatment & Streaking System',
	description: '',
	folder: 'pretreatment-streaking',
};

const malditofCategory = {
	id: 'malditof',
	title: 'MALDI-TOF',
	description: '',
	folder: 'malditof',
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
							{product.description || 'Professional-grade laboratory equipment designed for precision, reliability, and superior performance in microbiology applications.'}
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
				<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#2B3990] transition-colors duration-300 max-[912px]:text-base">
					{product.name}
				</h3>
				<p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 max-[912px]:text-xs max-[912px]:mb-2">
					{product.description || 'Professional microbiology equipment engineered for precision and reliability.'}
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

export default function Microbiology() {
	const [bloodCulture, setBloodCulture] = useState<any[]>([]);
	const [idAst, setIdAst] = useState<any[]>([]);
	const [pretreatment, setPretreatment] = useState<any[]>([]);
	const [malditof, setMalditof] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Blood Culture products
		const bloodCultureData = [
			{ id: 1, name: 'Autobio BC60', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/autobio-bc601.png', description: 'The Automated BC60 Blood Culture system adopts automatic advanced non-invasive and visualization technology with a unique optical detection system which realizes full automation of blood culture testing for up to 60 samples per pod. Its stable temperature control system and reliable vibrating model greatly shortens the detection time of positive results and reduces the false positive rate.' },
			{ id: 2, name: 'Autobio BC120', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/autobio-bc120.png', description: 'An automated blood culture instrument with high-precision temperature control and a non-invasive optical detection system. It continuously monitors growth, supports up to 120 bottles per cycle, and delivers positive result detection in as little as 3 hours. Built for lab efficiency and accuracy, it features barcode traceability, vibration-based agitation, and safety-focused bottle design.' },
			{ id: 3, name: 'BC120 Plus', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/BC120 Plus.jpg', description: 'An automated blood culture instrument with high-precision temperature control and a non-invasive optical detection system. It continuously monitors growth, supports up to 120 bottles per cycle, and delivers positive result detection in as little as 3 hours. Built for lab efficiency and accuracy, it features barcode traceability, vibration-based agitation, and safety-focused bottle design.' },
			{ id: 4, name: 'Autobes BCX', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/autobes bcx.png', description: 'An automated blood culture system designed for continuous incubation and rapid detection of microbial growth in blood samples, supporting faster diagnosis of bloodstream infections.' }
		];

		// ID/AST products
		const idAstData = [
			{ id: 1, name: 'Autobio AutoMic i600', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/autobio-automic-i600.png', description: 'Automated microorganism identification and antimicrobial susceptibility testing analyzer AutoMic-i600 can quickly and accurately identify microorganisms by biochemical and detect antibiotic sensitivity in vitro. The identification results of the bacteria were determined by comparing with the database about biochemical reaction, such as the carbon source utilization, enzyme activity and antibiotic resistance of the bacteria.' }
		];

		// Pretreatment & Breaking System products
		const pretreatmentData = [
			{ id: 1, name: 'AutoStreak S1800', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/AutoStreak%20S1800.png', description: 'An automated microbial sample pretreatment and streaking system that standardizes inoculation, improves bacterial isolation, and increases laboratory efficiency while enhancing biosafety.' }
		];

		// Malditof products
		const malditofData = [
			{ id: 1, name: 'Autof MS1000', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/Autof-ms1000.jpg', description: 'The Autobio Autof MS1000 is an automated MALDI-TOF mass spectrometry system designed for rapid, accurate microbial identification (bacteria, fungi, mycobacteria) in clinical and industrial labs. It offers a high-capacity 96-sample target plate, identifying organisms in minutes with a, extensive, updateable database of over 16,000 strains and 5,000 species. ' },
			{ id: 2, name: 'MS1600', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/MS1600.jpg', description: 'The Autof ms1600 is a MALDI-TOF (Matrix-Assisted Laser Desorption/Ionization-Time of Flight) mass spectrometry system for rapid, accurate microbial identification, capable of switching between positive and negative ion modes. It features a large database (>999 genera, >4943 species), 96-sample capacity, and a 1200 x 705 x 450 mm footprint. ' },
			{ id: 3, name: 'MS2600', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/ms2600.jpg', description: 'The Autof MS2600 is a MALDI-TOF mass spectrometry system by Autobio Diagnostics designed for rapid, high-throughput microbial identification. It utilizes a 355 nm solid-state laser at 100 Hz to identify bacteria and yeasts within minutes, featuring a library of over 5,000 species. The system includes a 96-well sample target plate, intelligent vacuum system, and cloud-based database. ' },
			{
				id: 4,
				name: 'TX8 MALDI-TOF MS',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/microbiology/TX8.png',
				description: 'MALDI-TOF MS (Matrix Assisted Laser Desorption/Ionization Time-of-Flight Mass Spectrometry) has been used more and more widely in microbiological clinical laboratory for the identiﬁcation of pathogenic bacteria, especially microaerobes, anaerobes, mycobacteria and fungi with its powerful database and excellent performance.'
			}
		];

		setBloodCulture(bloodCultureData);
		setIdAst(idAstData);
		setPretreatment(pretreatmentData);
		setMalditof(malditofData);
		setLoading(false);

		// Preload all images
		const allImages = [
			'https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530316/biosite-assets/dakewe/bg-dakewe.jpg',
			...bloodCultureData.map((p: any) => p.image),
			...idAstData.map((p: any) => p.image),
			...pretreatmentData.map((p: any) => p.image),
			...malditofData.map((p: any) => p.image)
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
						<ParticlesBackground containerId="microbiology-particles" />
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
					className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-4 md:mb-6 drop-shadow-2xl max-[912px]:text-4xl max-[912px]:mb-2"
				>
					Microbiology
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium mb-4 sm:mb-6 md:mb-8 drop-shadow-lg max-[912px]:text-base max-[912px]:mb-3"
				>
					Advanced solutions for blood culture, ID/AST, pretreatment, and MALDI-TOF systems for modern microbiology laboratories.
				</motion.p>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 1, delay: 0.7, type: 'spring', stiffness: 60 }}
								className="h-2 w-56 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-6 sm:mb-8 md:mb-10 max-[912px]:h-1 max-[912px]:w-32 max-[912px]:mb-4"
							/>
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
							<CategorySection
								category={bloodCultureCategory}
								products={bloodCulture}
								onViewDetails={handleViewDetails}
							/>
							<CategorySection
								category={idAstCategory}
								products={idAst}
								onViewDetails={handleViewDetails}
							/>
							<CategorySection
								category={pretreatmentCategory}
								products={pretreatment}
								onViewDetails={handleViewDetails}
							/>
							<CategorySection
								category={malditofCategory}
								products={malditof}
								onViewDetails={handleViewDetails}
							/>
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
						Our team of specialists is ready to help you find the perfect microbiology solution for your laboratory needs.
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
