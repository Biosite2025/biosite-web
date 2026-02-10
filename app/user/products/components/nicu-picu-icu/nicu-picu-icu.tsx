"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories for NICU PICU ICU Department
const categories = [
	{
		id: 'nicu-picu-icu',
		title: 'NICU, PICU & ICU Equipment',
		description: 'Comprehensive medical equipment solutions for Neonatal, Pediatric, and Intensive Care Units, ensuring optimal patient care and safety.',
		folder: 'nicu-picu-icu',
	}
];

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
			  {product.description || 'Advanced medical equipment designed for neonatal, pediatric, and intensive care, ensuring patient safety and optimal clinical outcomes.'}
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
		  {product.description || 'Advanced medical equipment designed for neonatal, pediatric, and intensive care, ensuring patient safety and optimal clinical outcomes.'}
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




export default function SterilizerAutoclave() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data for NICU PICU ICU Department
		const productData = [
			{
				category: 'nicu-picu-icu',
				products: [
					{
						id: 1,
						name: 'BN300 LED Phototherapy Unit',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/BN300%20%20LED%20%20Phototherapy%20%20Unit.png',
						description: 'The BN300 features 16 blue and 4 white super LEDs with a lamp lifetime of 50,000 hours, delivering adjustable irradiance (I, II, III) in the 400–550 nm range (peak 440–460 nm). It has a 3.5″ LCD touch screen with a 0–999 h treatment timer and 48 h down-counter, real-time clock, and date display. The fanless unit operates at <30 dB, emits no heat, UV, or IR, and is compatible with infant incubators, warmers, and cribs. The 360° rotatable head and height-adjustable trolley provide flexible positioning, while an ergonomic handle, storage basket, and power adapter holder enhance mobility and usability. Operating conditions: 15–30 °C, 5–99% RH; electrical: 220–240 V AC, 50/60 Hz.'
					},
					{
						id: 2,
						name: 'X01-5 Baby Crib',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/X01-5_Baby-Crib_SaikangMedical.png',
						description: 'The X01-5 infant bed features a sturdy epoxy powder-coated steel frame from Baosteel, with 11-step epoxy painting for durability and impact resistance. It includes a transparent, non-toxic acrylic baby basin that can be sterilized above 100 °C, a Trendelenburg pneumatic lift for safe backward tilting, and 3″ covered TPR casters designed for long-lasting, smooth movement. The bed also offers a utility basket for storage, a custom mattress for easy cleaning, and a full stainless steel IV pole capable of supporting 15 kg.'
					},
					{
						id: 3,
						name: 'V8v Electric ICU Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/V8v_Electric-ICU-Bed.png',
						description: 'The V8V electric ICU bed is designed to enhance patient comfort and prevent complications such as pressure ulcers. Its backrest can be adjusted to a 30-degree smart-stop position, clinically recommended to reduce the risk of respiratory infections. The bed features an innovative dual retraction system, with the backrest and thigh rest retracting 67 mm and 47 mm respectively. This patented design extends the pelvic area, distributes pressure evenly, and minimizes shear forces, proactively preventing bedsores while improving overall patient well-being.'
					},
					{
						id: 4,
						name: 'CR2q Hospital Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/CR2q.png',
						description: 'The CR2q hospital bed combines durability, safety, and customization for patient care. Its steel frame is made from Baosteel and finished with 11-step epoxy painting, providing antibacterial protection and impact resistance up to 50 kg. The bed features a suspended hand crank for manual adjustment, extreme protection sensors to prevent tipping, and customizable fire-proof MDF head and foot boards. Additional features include a full stainless steel IV pole with 15 kg capacity, optional lifting pole and adjustable oxygen cylinder rack, foldable guardrails with protection handles, mobile plastic drainage hooks, and a smooth punching platform supporting up to 250 kg. Optional resin X-ray translucent platforms and adjustable shoe holders enhance functionality, while Panasonic robotic welding ensures a seamless and durable construction.'
					},
					{
						id: 5,
						name: 'Ecosy930 Infant Warmer',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/Ecosy930%20%20Infant%20%20Warmer.png',
						description: 'The Ecosy 930 Infant Warmer provides precise and efficient newborn care with a far-infrared heating tube for high thermal efficiency and low energy use. Its ergonomically designed heating head adjusts horizontally and vertically for stable, uniform warming, while a 10.4-inch LCD touch screen ensures easy operation and clear visibility. The unit features an integrated observation lamp with adjustable brightness, hands-free alarm silence via a wave sensor, transparent guard doors for a quieter and safer rescue platform, a spacious storage drawer, and a two-position pull-out X-ray cassette to minimize newborn handling. Real-time monitoring of noise and light levels helps create a supportive environment for the infant.'
					},
					{
						id: 6,
						name: 'EcoLa3000 Infant Incubator',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/EcoLa3000%20Infant%20%20Incubator.png',
						description: 'The EcoLa 3000 provides precise temperature control using a PID fuzzy algorithm, continuously adjusting based on the difference between set and real-time temperature. Its dual heating protection combines a thermocouple and mechanical switch for safety. The incubator features reliable sensor modules that monitor hood temperature and two-channel probes for newborn core and peripheral temperatures. Additional safety comes from over 30 alarm types, an advanced air circuit ensuring temperature uniformity within 0.5 °C, and a double-wall design with air curtain to reduce heat loss when accessing the incubator.'
					},
					{
						id: 7,
						name: 'ENP-1 Enteral Nutrition Pump',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/ENP-1.png',
						description: 'The ENP-1 is a smart, portable enteral nutrition pump that offers micro, constant, and time/volume-controlled feeding. It displays real-time cumulative feeding, automatically recognizes multiple feeding sets, and supports Wi-Fi for improved medical supervision. Safety features include a rechargeable battery for backup, intelligent alarms with animation guidance, adjustable pressure levels, dynamic pressure display, history records, and IP34 dust/water protection. User-friendly design highlights include a transparent pump door, multiple feeding modes (continuous, intermittent, reverse), 3.5″ TFT screen, touchscreen/keyboard input with shuttle key, and a removable battery compartment for easy replacement.'
					},
					{
						id: 8,
						name: 'Pedia Manual 2 Cranks Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/PEDIA%20MANUAL%202%20CRANKS%20BED.png',
						description: 'The CX2x pediatric manual 2-crank bed is a 2-section pediatric bed designed for children in hospital or home care settings, featuring a 250kg weight capacity, 2 manual cranks for back/knee-rest adjustment, and 4 locking castors. It includes, 3-gear adjustable full-length side rails and cartoon-themed ABS plastic head/foot boards for safety and comfort. '
					},
					{
						id: 9,
						name: 'Pedia Manual 3 Cranks Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/PEDIA%20MANUAL%203%20CRANKS%20BED.png',
						description: 'The CD3q children’s bed is designed for ward use, featuring curved head and foot boards that provide comfort for patients. Made from sterilizable virgin ABS plastic with a tensile strength of up to 30 MPa, it is built on a solid chassis with 5 mm stamped rotating steel plates. The bed frame undergoes epoxy painting for durability, with a 0.12 mm thick, 60° brightness coating that resists impacts up to 50 kg. Panasonic robotic welding ensures a smooth, 360° finish, while a retractable hand crank and extreme protection device provide safe and reliable operation. The stamping-formed platform has a smooth surface capable of bearing 250 kg, with an optional resin X-ray translucent platform available.'
					},
					{
						id: 10,
						name: 'Pedia Electric 5 Function Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nicu-picu-icu/PEDIA%20ELECTRIC%205%20FUNCTION%20BED.png',
						description: 'The Saikang CQ8k Electric Children Bed is a 5-function, motorized pediatric bed (1975x880mm) designed for safe, hygienic, and comfortable pediatric care with a 200kg safe working load. Key features include 0-75° back-rest, 0-35° knee-rest, 12° Trendelenburg/reverse Trendelenburg, and 465-760mm height adjustment, controlled via a handheld controller. '
					}
				]
			}
		];

		// Flatten products for state management
		const allProducts = productData.flatMap((cat: any) => 
			cat.products.map((p: any) => ({ ...p, categoryId: cat.category }))
		);
		setProducts(allProducts);
		setLoading(false);

		// Preload all images
		const allImages = [
			'https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530316/biosite-assets/motic/bg-motic.jpg',
			...allProducts.map((p: any) => p.image)
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
					<ParticlesBackground containerId="nicu-picu-icu-particles" />
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
					NICU PICU AND ICU DEPARTMENT
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
						Comprehensive medical equipment solutions for Neonatal, Pediatric, and Intensive Care Units. Advanced technology ensuring optimal patient care, safety, and clinical outcomes.
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
			{categories.map((category: any, index: number) => (
			  <CategorySection
				key={category.id}
				category={category}
				products={products.filter((p: any) => p.categoryId === category.id)}
				onViewDetails={handleViewDetails}
			  />
			))}
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
			Ready to Enhance Your NICU, PICU, or ICU?
		  </h2>
		  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
			Our team of specialists is ready to help you find the perfect equipment solution for your intensive care unit.
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
