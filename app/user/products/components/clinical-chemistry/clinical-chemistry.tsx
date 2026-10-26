"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PopOutModal from '../shared/PopOutModal';
import { motion, AnimatePresence, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';
import AnalyzerModal from '../shared/AnalyzerModal';
import type { TestMenu } from '../shared/TestMenuTable';

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
// ILab test menu (all ILab analyzers).
const ILAB_MENU: TestMenu = [
	['Clinical Chemistry', ['Uric Acid', 'Albumin', 'ALT/GPT', 'Amylase', 'AST/GOT', 'Direct Bilirubin', 'Total Bilirubin', 'Calcium', 'CK', 'CK-MB', 'Chloride', 'HDL Cholesterol', 'LDL Cholesterol', 'Total Cholesterol', 'Cholinesterase', 'Creatinine', 'Iron', 'ALP', 'GGT', 'Glucose', 'Glycated Albumin', 'LDH-P', 'Lipase', 'Magnesium', 'Potassium', 'Total Protein Serum', 'Total Protein Urine', 'Sodium', 'Triglycerides', 'Total CO2', 'Urea']],
	['Immunodiagnostics', ['HbA1c', 'Rheumatoid Factor', 'ASO', 'CRP', 'C3, C4', 'Microalbumin', 'IgA, IgG, IgM', 'Transferrin']],
	['Drugs of Abuse*', ['Amphetamines', 'Benzodiazepine', 'Cannabinoid', 'Cocaine Metabolite', 'Ecstasy', 'Ethyl Alcohol', 'Methadone', 'Opiate']],
];

function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	if (!isOpen || !product) return null;
	// Products without a test menu use the shared pop-out modal.
	if (!product.name?.includes('ILab')) {
		return <PopOutModal name={product.name} description={product.description} image={product.image} logo={product.brandLogo} brandName={product.brandName} onClose={product.onClose} />;
	}
	return (
		<AnalyzerModal
			name={product.name}
			description={product.description}
			image={product.image}
			logo={product.brandLogo}
			brandName={product.brandName}
			menu={ILAB_MENU}
			menuTitle="ILab Test Menu"
			menuFooter="* May not be available in all countries — ask our team"
			onClose={product.onClose}
		/>
	);
}

// Brand sub-tabs — logo tabs above the grid (same pattern as Immunology).
// This page keeps its own ILab test-menu modal, so it wires up the brand tabs
// and section watermark locally instead of using BrandedProductPage.
const brands = [
	{ id: 'ilab', name: 'ILab', logo: '/asset/clinical-chemistry/ilab-logo.png' },
	{ id: 'diamond', name: 'Diamond', logo: '/asset/clinical-chemistry/diamond-logo.png' },
	{ id: 'beckman', name: 'Beckman Coulter', logo: '/asset/logo/BECKMAN-COULTER.png', logoClass: 'max-h-10 sm:max-h-12 max-w-full' },
];

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
									isActive ? 'border-[#2B3990]' : 'border-transparent hover:border-gray-300'
								}`}
							>
								{/* Fixed-size rounded chip anchors logos of any aspect ratio */}
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
										className="max-h-12 sm:max-h-14 w-auto object-contain"
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
				{/* Section background logo: cross-fades when the tab changes */}
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
								onViewDetails={() => onViewDetails(product)}
							/>
						</div>
					))}
				</motion.div>
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
	const [activeBrand, setActiveBrand] = useState('ilab'); // default tab: ILab

	useEffect(() => {
		// Product data based on CSV
		const productData = [
			{
				id: 1,
				name: 'ILab Aries',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-chemistry/hd/ilab-aries.webp',
				brand: 'ilab',
				brandName: 'ILab',
				brandLogo: '/asset/clinical-chemistry/ilab-logo.png',
				description: 'The ILab Aries is a versatile clinical chemistry analyzer designed for small to medium-sized laboratories requiring reliable and accurate diagnostic testing. With its advanced optical system and comprehensive test menu, the Aries delivers precise results for routine chemistry parameters including glucose, lipid profiles, liver and kidney function tests, and electrolytes. The system features a compact footprint that maximizes bench space efficiency while maintaining high throughput capabilities. Its intuitive touchscreen interface simplifies operation and reduces training time, while the automated calibration and quality control functions ensure consistent performance. The ILab Aries supports both serum and plasma samples with minimal sample volumes, making it ideal for pediatric and geriatric testing. With its proven reliability, low maintenance requirements, and cost-effective operation, the ILab Aries provides laboratories with a dependable solution for daily clinical chemistry testing needs.'
			},
			{
				id: 2,
				name: 'ILab 650',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-chemistry/hd/ilab-650.webp',
				brand: 'ilab',
				brandName: 'ILab',
				brandLogo: '/asset/clinical-chemistry/ilab-logo.png',
				description: 'The ILab 650 is a high-performance clinical chemistry analyzer engineered for medium to large-scale laboratories demanding exceptional throughput and accuracy. Capable of processing up to 600 tests per hour with ISE, this advanced system features a comprehensive test menu covering routine and specialized chemistry assays including cardiac markers, therapeutic drug monitoring, and special proteins. The ILab 650 incorporates state-of-the-art photometric technology with multiple wavelengths for enhanced analytical precision and specificity. Its intelligent sample management system handles up to 180 samples with barcode reading capabilities, automatic rerun functions, and STAT priority processing for urgent specimens. The analyzer includes integrated quality control monitoring with automatic flagging of out-of-range results and comprehensive data management capabilities. With its robust design, minimal maintenance requirements, and proven reliability, the ILab 650 delivers consistent performance even in high-volume testing environments. The system supports bi-directional LIS connectivity for seamless laboratory workflow integration and features an intuitive user interface that streamlines operation and reduces training time.'
			},
			{
				id: 3,
				name: 'ILab Taurus',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-chemistry/hd/ilab-taurus.webp',
				brand: 'ilab',
				brandName: 'ILab',
				brandLogo: '/asset/clinical-chemistry/ilab-logo.png',
				description: 'The ILab Taurus represents the pinnacle of clinical chemistry automation, designed for high-volume reference laboratories and large hospital systems requiring maximum throughput and operational efficiency. This flagship analyzer delivers exceptional performance with processing speeds up to 800 tests per hour, supporting both routine and specialized chemistry assays with outstanding accuracy and precision. The Taurus features an advanced optical system with multiple wavelength capabilities, enabling comprehensive test menu coverage including general chemistry, lipid profiles, cardiac markers, therapeutic drugs, and specialized proteins. Its sophisticated sample handling system accommodates up to 300 samples with intelligent priority processing, automatic dilution and rerun capabilities, and integrated barcode reading for enhanced specimen tracking. The analyzer incorporates real-time quality control monitoring with automatic calibration verification and comprehensive data management tools. With its modular design, the ILab Taurus can be easily expanded to meet growing laboratory demands while maintaining consistent performance. The system features minimal maintenance requirements, reduced reagent consumption, and low cost per test, making it an ideal solution for laboratories seeking to optimize operational efficiency without compromising analytical quality.'
			},
			{
				id: 4,
				name: 'ILab Twin Taurus',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-chemistry/hd/ilab-taurus-twin.webp',
				brand: 'ilab',
				brandName: 'ILab',
				brandLogo: '/asset/clinical-chemistry/ilab-logo.png',
				description: 'The ILab Twin Taurus is an integrated dual-analyzer system that combines two Taurus platforms to deliver unprecedented throughput and operational flexibility for large-scale reference laboratories and healthcare networks. This advanced configuration provides processing capacity exceeding 1,600 tests per hour, making it ideal for high-volume testing environments requiring continuous operation and maximum productivity. The Twin Taurus features synchronized workflow management that intelligently distributes samples between analyzers for optimal efficiency while maintaining load balancing and minimizing turnaround times. Each analyzer operates independently with full redundancy, ensuring uninterrupted laboratory operations even during routine maintenance or unexpected technical issues. The system incorporates centralized data management with unified quality control monitoring, automatic calibration verification across both platforms, and comprehensive reporting capabilities. Its sophisticated sample handling system accommodates up to 600 samples with intelligent routing, STAT priority processing, and automatic rerun functions. The Twin Taurus supports extensive test menu coverage including routine chemistry, specialized assays, cardiac markers, and therapeutic drug monitoring, all with exceptional analytical precision. With its modular architecture, the system can be easily configured to meet specific laboratory requirements and scaled to accommodate future growth.'
			},
			{
				id: 5,
				name: 'SmartLyte Plus',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-chemistry/Smartlyte Plus.png',
				brand: 'diamond',
				brandName: 'Diamond',
				brandLogo: '/asset/clinical-chemistry/diamond-logo.png',
				description: 'The SmartLyte Plus is a dedicated electrolyte analyzer specifically designed for rapid and accurate measurement of sodium, potassium, chloride, ionized calcium, pH, and lithium in various sample types including serum, plasma, whole blood, and urine. Utilizing advanced ion-selective electrode (ISE) technology, this compact system delivers precise electrolyte results in approximately 60 seconds per sample, making it ideal for emergency departments, critical care units, and routine laboratory operations. The SmartLyte Plus features automatic calibration and quality control functions that ensure consistent analytical performance throughout extended operation periods. Its low sample volume requirements minimize waste and make it particularly suitable for pediatric and neonatal testing applications. The analyzer incorporates intelligent sample detection with automatic aspiration and comprehensive error detection systems that alert operators to potential sample or system issues. With its intuitive touchscreen interface, minimal training requirements, and straightforward maintenance procedures, the SmartLyte Plus offers laboratories a reliable and cost-effective solution for electrolyte testing. The system supports bi-directional LIS connectivity for seamless integration into existing laboratory information systems and includes comprehensive data management capabilities with full traceability of all test results.'
			},

			{"id":6,"name":"AU5812","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/au5812.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"AU5800 Series with 1 photometric unit: 3,800 tests/hr including ISE. Powerful and reliable clinical chemistry for high and ultra-high workload labs, scalable from 1 to 4 photometric units. Each unit runs 2,000 photometric tests per hour with a consistent ~8.5-minute assay time; dual sample and reagent probes, up to 400 samples loaded at once plus 20 STAT positions, permanent glass cuvettes, a dual ISE cell stable up to 6 months or 40,000 tests, and liquid ready-to-use reagents. Integrates with DxA 5000 automation, DxONE Command Central and Remisol Advance."},
			{"id":7,"name":"AU5822","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/au5822.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"AU5800 Series with 2 photometric units: 5,800 tests/hr including ISE. Powerful and reliable clinical chemistry for high and ultra-high workload labs, scalable from 1 to 4 photometric units. Each unit runs 2,000 photometric tests per hour with a consistent ~8.5-minute assay time; dual sample and reagent probes, up to 400 samples loaded at once plus 20 STAT positions, permanent glass cuvettes, a dual ISE cell stable up to 6 months or 40,000 tests, and liquid ready-to-use reagents. Integrates with DxA 5000 automation, DxONE Command Central and Remisol Advance."},
			{"id":8,"name":"AU5832","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/au5832.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"AU5800 Series with 3 photometric units: 7,800 tests/hr including ISE. Powerful and reliable clinical chemistry for high and ultra-high workload labs, scalable from 1 to 4 photometric units. Each unit runs 2,000 photometric tests per hour with a consistent ~8.5-minute assay time; dual sample and reagent probes, up to 400 samples loaded at once plus 20 STAT positions, permanent glass cuvettes, a dual ISE cell stable up to 6 months or 40,000 tests, and liquid ready-to-use reagents. Integrates with DxA 5000 automation, DxONE Command Central and Remisol Advance."},
			{"id":9,"name":"AU5842","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/au5842.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"AU5800 Series with 4 photometric units: 9,800 tests/hr including ISE. Powerful and reliable clinical chemistry for high and ultra-high workload labs, scalable from 1 to 4 photometric units. Each unit runs 2,000 photometric tests per hour with a consistent ~8.5-minute assay time; dual sample and reagent probes, up to 400 samples loaded at once plus 20 STAT positions, permanent glass cuvettes, a dual ISE cell stable up to 6 months or 40,000 tests, and liquid ready-to-use reagents. Integrates with DxA 5000 automation, DxONE Command Central and Remisol Advance."},
			{"id":10,"name":"DxC 500 AU","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/dxc-500-au.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"System simplicity for expedient and efficient performance in low-workload labs: 800 tests per hour in a compact 1.54 m footprint. Intuitive touchscreen with guided maintenance, on-the-fly reagent loading, two dedicated STAT lanes plus an extra STAT wheel, permanent glass cuvettes and long-life ISE electrodes. Six Sigma performance confirmed in a third-party Westgard QC evaluation, with DxS IntelliServe remote service."},
			{"id":11,"name":"DxC 500i","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/dxc-500i.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"Where flexibility drives productivity: clinical chemistry and immunoassay on a single platform with over 200 applications, for small to mid-size labs. An intelligent sample handler links both disciplines, and FlexMode keeps one testing while the other is under maintenance. On-the-fly reagent loading, two dedicated STAT lanes, permanent glass cuvettes and DxS IntelliServe remote service."},
			{"id":12,"name":"DxC 700 AU","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/beckman-coulter/dxc-700-au.webp","brand":"beckman","brandName":"Beckman Coulter","brandLogo":"/asset/logo/BECKMAN-COULTER.png","description":"Reliable and efficient clinical chemistry for moderate-workload labs: 1,200 tests per hour with an assay time of about 8.5 minutes. Load up to 150 routine samples, 22 STAT positions with a hot-swap STAT wheel, a temperature-cooled carousel for STAT, QC and calibrators, and random access with automatic reflex testing and dilutions. Integrates with DxA 5000 automation, DxONE Command Central and Remisol Advance."},
		];

		setProducts(productData);
		setLoading(false);

		// Preload only the hero background + logos; product images load progressively
		const heroImages = [
			'/asset/clinical-chemistry/clinical-chemistry-bg.webp',
			'/asset/clinical-chemistry/ilab-logo.png',
			'/asset/clinical-chemistry/diamond-logo.png',
		];
		const fallback = setTimeout(() => setImagesLoaded(true), 2500);
		const allImages = [...heroImages];

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
			<style>{scrollbarStyles}</style>
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
						src="/asset/clinical-chemistry/clinical-chemistry-bg.webp"
						alt="Clinical Chemistry Background"
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
					<ParticlesBackground containerId="clinical-chemistry-particles" />
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
							className="mb-6 sm:mb-8 flex flex-col items-center gap-2 sm:gap-3 max-[912px]:mb-4"
						>
							
						</motion.div>
						<motion.h1
							initial={{ scale: 0.9, opacity: 0, y: 40 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							transition={{ duration: 1, type: 'spring', stiffness: 80, delay: 0.1 }}
							className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl max-[912px]:text-4xl max-[912px]:mb-3"
						>
							Clinical Chemistry
						</motion.h1>
						{/* Horizontal band removed — subtitle sits directly on the gradient */}
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1, type: 'spring', stiffness: 60 }}
							className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-8 sm:mb-10 md:mb-12 drop-shadow-lg max-[912px]:text-lg max-[912px]:mb-6 max-[912px]:px-2"
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
						Our team of specialists is ready to help you find the perfect clinical chemistry solution for your laboratory needs.
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
