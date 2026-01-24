"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #2B3990;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #1e2865;
  }
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #2B3990 #f1f1f1;
  }
`;

// Product category
const category = {
	id: 'clinical-chemistry',
	title: 'Clinical Chemistry',
	description: 'Comprehensive automated analyzers and electrolyte systems for accurate routine chemistry, specialized assays, and rapid diagnostic testing in clinical laboratories',
	folder: 'clinical-chemistry',
};

// Modal component
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	if (!isOpen || !product) return null;

	const handleModalContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const isILabProduct = product.name?.includes('ILab');

	const ilabAriesTestMenu = (
		<div className="space-y-1.5 sm:space-y-2 text-[9px] sm:text-sm pr-1 sm:pr-2 max-[912px]:space-y-1">
			<div className="mb-2 sm:mb-3 max-[912px]:mb-1">
				<h4 className="font-bold text-[#2B3990] text-sm sm:text-base mb-1 sm:mb-2 max-[912px]:text-[10px] max-[912px]:mb-0.5">Test menu</h4>
			</div>

			<div className="grid grid-cols-3 gap-2 sm:gap-4 max-[912px]:gap-1">
				{/* Column 1 - Clinical Chemistry */}
				<div className="space-y-0.5 max-[912px]:space-y-0">
					<h5 className="font-bold text-[#2B3990] text-xs sm:text-sm mb-1 sm:mb-1.5 max-[912px]:text-[9px] max-[912px]:mb-0.5">Clinical Chemistry</h5>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Uric Acid</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Albumin</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">ALT/GPT</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Amylase</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">AST/GOT</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Direct Bilirubin</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Total Bilirubin</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Calcium</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">CK</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">CK-MB</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Chloride</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">HDL Cholesterol</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">LDL Cholesterol</p>
				</div>

				{/* Column 2 - Continued Clinical Chemistry */}
				<div className="space-y-0.5 max-[912px]:space-y-0">
					<h5 className="font-bold text-transparent text-xs sm:text-sm mb-1 sm:mb-1.5 max-[912px]:text-[9px] max-[912px]:mb-0.5">.</h5>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Total Cholesterol</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Cholinesterase</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Creatinine</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Iron</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">ALP</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">GGT</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Glucose</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Glycated Albumin</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">LDH-P</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Lipase</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Magnesium</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Potassium</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Total Protein Serum</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Total Protein Urine</p>
				</div>

				{/* Column 3 - Final Tests */}
				<div className="space-y-0.5 max-[912px]:space-y-0">
					<h5 className="font-bold text-transparent text-xs sm:text-sm mb-1 sm:mb-1.5 max-[912px]:text-[9px] max-[912px]:mb-0.5">.</h5>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Sodium</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Triglycerides</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Total CO<sub>2</sub></p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Urea</p>
					
					<h5 className="font-bold text-[#2B3990] text-xs sm:text-sm mt-2 sm:mt-3 mb-1 sm:mb-1.5 max-[912px]:text-[9px] max-[912px]:mt-1 max-[912px]:mb-0.5">Immunodiagnostics</h5>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">HbA1c</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Rheumatoid Factor</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">ASO</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">CRP</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">C3, C4</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Microalbumin</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">IgA, IgG, IgM</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Transferrin</p>
				</div>
			</div>

			{/* Drugs of Abuse Section */}
			<div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200 max-[912px]:mt-1 max-[912px]:pt-1">
				<h5 className="font-bold text-[#2B3990] text-xs sm:text-sm mb-1 sm:mb-1.5 max-[912px]:text-[9px] max-[912px]:mb-0.5">Drugs of Abuse*</h5>
				<div className="grid grid-cols-3 gap-1 sm:gap-1.5 max-[912px]:gap-0.5">
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Amphetamines</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Benzodiazepine</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Cannabinoid</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Cocaine Metabolite</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Ecstasy</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Ethyl Alcohol</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Methadone</p>
					<p className="text-gray-700 text-[8px] sm:text-xs max-[912px]:text-[7px]">Opiate</p>
				</div>
				<p className="text-gray-500 text-[8px] sm:text-xs italic mt-1 sm:mt-2 max-[912px]:text-[7px] max-[912px]:mt-0.5">
					* Products may not be available in all countries. Please enquire with your local IL representative.
				</p>
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
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-2 sm:px-4 pointer-events-none max-[912px]:px-3">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
		className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 ${isILabProduct ? 'max-w-6xl max-h-[80vh]' : 'max-w-sm sm:max-w-md md:max-w-2xl'} w-full border-2 border-gray-200 mx-auto relative pointer-events-auto max-[912px]:max-w-[95vw] max-[912px]:p-3 max-[912px]:max-h-[85vh] max-[912px]:overflow-hidden`}
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

<div className={isILabProduct ? 'grid grid-cols-2 gap-6 md:gap-8 max-[912px]:grid-cols-2 max-[912px]:gap-2' : ''}>
				{isILabProduct && (
					<div className="border-r border-gray-200 pr-6 md:pr-8 overflow-y-auto max-h-[65vh] custom-scrollbar max-[912px]:pr-2 max-[912px]:max-h-[60vh]">
						{ilabAriesTestMenu}
					</div>
				)}

					<div className="overflow-y-auto max-h-[65vh] custom-scrollbar max-[912px]:max-h-[60vh]">
						<div className="relative h-56 sm:h-64 md:h-72 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden max-[912px]:h-40">
						<Image
							src={product.image}
							alt={product.name}
							fill
							className="object-contain p-4 sm:p-6 max-[912px]:p-2"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
						/>
					</div>

					<div className="space-y-3 sm:space-y-4 max-[912px]:space-y-2">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 max-[912px]:text-lg">{product.name}</h3>
						
						

						<div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar max-[912px]:max-h-24">
							<p className="text-sm sm:text-base text-gray-600 leading-relaxed max-[912px]:text-xs">
								{product.description || 'Professional-grade laboratory equipment designed for precision, reliability, and superior performance in clinical chemistry applications.'}
							</p>
						</div>
						<div className="pt-3 sm:pt-4 border-t border-gray-200 max-[912px]:pt-2">
							<p className="text-xs sm:text-sm text-gray-500 max-[912px]:text-xs">
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
					{product.description || 'Professional clinical chemistry equipment engineered for precision and reliability.'}
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

export default function ClinicalChemistry() {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data based on CSV
		const productData = [
			{ 
				id: 1, 
				name: 'ILab Aries', 
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/clinical-chemistry/ILAB ARIES.png',
				description: 'The ILab Aries is a versatile clinical chemistry analyzer designed for small to medium-sized laboratories requiring reliable and accurate diagnostic testing. With its advanced optical system and comprehensive test menu, the Aries delivers precise results for routine chemistry parameters including glucose, lipid profiles, liver and kidney function tests, and electrolytes. The system features a compact footprint that maximizes bench space efficiency while maintaining high throughput capabilities. Its intuitive touchscreen interface simplifies operation and reduces training time, while the automated calibration and quality control functions ensure consistent performance. The ILab Aries supports both serum and plasma samples with minimal sample volumes, making it ideal for pediatric and geriatric testing. With its proven reliability, low maintenance requirements, and cost-effective operation, the ILab Aries provides laboratories with a dependable solution for daily clinical chemistry testing needs.'
			},
			{ 
				id: 2, 
				name: 'ILab 650', 
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/clinical-chemistry/ILAB 650.png',
				description: 'The ILab 650 is a high-performance clinical chemistry analyzer engineered for medium to large-scale laboratories demanding exceptional throughput and accuracy. Capable of processing up to 600 tests per hour with ISE, this advanced system features a comprehensive test menu covering routine and specialized chemistry assays including cardiac markers, therapeutic drug monitoring, and special proteins. The ILab 650 incorporates state-of-the-art photometric technology with multiple wavelengths for enhanced analytical precision and specificity. Its intelligent sample management system handles up to 180 samples with barcode reading capabilities, automatic rerun functions, and STAT priority processing for urgent specimens. The analyzer includes integrated quality control monitoring with automatic flagging of out-of-range results and comprehensive data management capabilities. With its robust design, minimal maintenance requirements, and proven reliability, the ILab 650 delivers consistent performance even in high-volume testing environments. The system supports bi-directional LIS connectivity for seamless laboratory workflow integration and features an intuitive user interface that streamlines operation and reduces training time.'
			},
			{ 
				id: 3, 
				name: 'ILab Taurus', 
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/clinical-chemistry/ILAB Taurus.png',
				description: 'The ILab Taurus represents the pinnacle of clinical chemistry automation, designed for high-volume reference laboratories and large hospital systems requiring maximum throughput and operational efficiency. This flagship analyzer delivers exceptional performance with processing speeds up to 800 tests per hour, supporting both routine and specialized chemistry assays with outstanding accuracy and precision. The Taurus features an advanced optical system with multiple wavelength capabilities, enabling comprehensive test menu coverage including general chemistry, lipid profiles, cardiac markers, therapeutic drugs, and specialized proteins. Its sophisticated sample handling system accommodates up to 300 samples with intelligent priority processing, automatic dilution and rerun capabilities, and integrated barcode reading for enhanced specimen tracking. The analyzer incorporates real-time quality control monitoring with automatic calibration verification and comprehensive data management tools. With its modular design, the ILab Taurus can be easily expanded to meet growing laboratory demands while maintaining consistent performance. The system features minimal maintenance requirements, reduced reagent consumption, and low cost per test, making it an ideal solution for laboratories seeking to optimize operational efficiency without compromising analytical quality.'
			},
			{ 
				id: 4, 
				name: 'ILab Twin Taurus', 
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/clinical-chemistry/Taurus Twin.png',
				description: 'The ILab Twin Taurus is an integrated dual-analyzer system that combines two Taurus platforms to deliver unprecedented throughput and operational flexibility for large-scale reference laboratories and healthcare networks. This advanced configuration provides processing capacity exceeding 1,600 tests per hour, making it ideal for high-volume testing environments requiring continuous operation and maximum productivity. The Twin Taurus features synchronized workflow management that intelligently distributes samples between analyzers for optimal efficiency while maintaining load balancing and minimizing turnaround times. Each analyzer operates independently with full redundancy, ensuring uninterrupted laboratory operations even during routine maintenance or unexpected technical issues. The system incorporates centralized data management with unified quality control monitoring, automatic calibration verification across both platforms, and comprehensive reporting capabilities. Its sophisticated sample handling system accommodates up to 600 samples with intelligent routing, STAT priority processing, and automatic rerun functions. The Twin Taurus supports extensive test menu coverage including routine chemistry, specialized assays, cardiac markers, and therapeutic drug monitoring, all with exceptional analytical precision. With its modular architecture, the system can be easily configured to meet specific laboratory requirements and scaled to accommodate future growth.'
			},
			{ 
				id: 5, 
				name: 'SmartLyte Plus', 
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/clinical-chemistry/Smartlyte Plus.png',
				description: 'The SmartLyte Plus is a dedicated electrolyte analyzer specifically designed for rapid and accurate measurement of sodium, potassium, chloride, ionized calcium, pH, and lithium in various sample types including serum, plasma, whole blood, and urine. Utilizing advanced ion-selective electrode (ISE) technology, this compact system delivers precise electrolyte results in approximately 60 seconds per sample, making it ideal for emergency departments, critical care units, and routine laboratory operations. The SmartLyte Plus features automatic calibration and quality control functions that ensure consistent analytical performance throughout extended operation periods. Its low sample volume requirements minimize waste and make it particularly suitable for pediatric and neonatal testing applications. The analyzer incorporates intelligent sample detection with automatic aspiration and comprehensive error detection systems that alert operators to potential sample or system issues. With its intuitive touchscreen interface, minimal training requirements, and straightforward maintenance procedures, the SmartLyte Plus offers laboratories a reliable and cost-effective solution for electrolyte testing. The system supports bi-directional LIS connectivity for seamless integration into existing laboratory information systems and includes comprehensive data management capabilities with full traceability of all test results.'
			},
			
		];

		setProducts(productData);
		setLoading(false);

		// Preload all images
		const allImages = [
			'https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530316/biosite-assets/dakewe/bg-dakewe.jpg',
			...productData.map((p: any) => p.image)
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
			<style>{scrollbarStyles}</style>
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
					<ParticlesBackground containerId="clinical-chemistry-particles" />
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
							Clinical Chemistry
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
							Comprehensive automated analyzers and electrolyte systems for accurate routine chemistry, specialized assays, and rapid diagnostic testing
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
						Our team of specialists is ready to help you find the perfect clinical chemistry solution for your laboratory needs.
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
