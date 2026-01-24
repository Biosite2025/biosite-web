"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories for Operating and Delivery Room Department
const categories = [
	{
		id: 'operating-delivery',
		title: 'Operating and Delivery Room Department',
		description: 'Advanced surgical lights, operating tables, delivery beds, and specialized equipment for operating rooms and delivery suites.',
		folder: 'operating-delivery',
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
			  {product.description || 'Professional operating room and delivery suite equipment designed for optimal surgical outcomes and patient safety.'}
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
		  {product.description || 'Professional operating room and delivery suite equipment engineered for surgical excellence and patient care.'}
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




export default function OperatingDeliveryRoom() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data for Operating and Delivery Room Department
		const productData = [
			{
				category: 'operating-delivery',
				products: [
					{
						id: 1,
						name: '700-700ELED Surgical Light',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/700-700ELED.png',
						description: 'The 700/700 LED shadowless operating lamp features adjustable color temperature from 3800K to 5000K with a high color rendering index of 93, allowing surgeons to optimize tissue contrast and resolution for different surgical sites. It also includes a one-key low-light mode for endoscopic procedures, enabling quick adjustments without obstructing the surgeon’s view.'
					},
					{
						id: 2,
						name: '700ELED Surgical Light',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/700ELED.png',
						description: 'The 700/500 LED shadowless operating lamp offers adjustable color temperature from 3800K to 5000K with a high color rendering index of 95, allowing surgeons to optimize tissue contrast and resolution for different surgical sites. It also features a one-key low-light mode for endoscopic procedures, enabling quick switching without obstructing the surgeon’s view.'
					},
					{
						id: 3,
						name: 'HF-FS LED Examination Lamp',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/HF-FS%20LED.png',
						description: 'The HF-FS LED examination lamp is a versatile lighting solution for medical, industrial, and scientific applications, designed for use during patient examinations or minor procedures. It features a spring-loaded, articulated 105 cm arm with an on/off switch and built-in electronic transformer, a soft gooseneck lamp head for easy positioning, and a stable base for mobility and convenience.'
					},
					{
						id: 4,
						name: 'HFEOT99 Electric Operating Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/HFEOT99.png',
						description: 'The HFEOT99 electric operating table features an extra-wide tabletop with long horizontal sliding, suitable for X-ray and C-arm procedures, and a built-in kidney bridge for surgical convenience. It offers smooth, flexible adjustments via a micro touch remote, high automation, low noise, and reliable performance with key imported components, making it an ideal choice for various surgical departments.'
					},
					{
						id: 5,
						name: 'HFMPB06C Hydraulic Operating Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/HFMPB06C.png',
						description: 'The HFMPB06C is a hydraulic operating table designed for gynecology and obstetrics, featuring a fully adjustable mattress available in various colors. It includes a German-made gas spring to control the back plate, providing smooth and precise positioning for patient comfort and surgical efficiency.'
					},
					{
						id: 6,
						name: 'EK-410 Electrosurgical Unit',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/EK-410.png',
						description: 'This electrosurgical unit delivers a maximum output power of 400 W in cut mode and supports monopolar, bipolar, and vessel-sealing functions, with multiple device modes and 50 data memory slots. It features voice alerts, adjustable volume, an LCD and seven-segment display with date and clock, multilingual support, electrical safety compliance (CE, EN 60601 series), foot switch alarm, high-temperature and internal parameter control, and weighs 18 kg (net) with packaging dimensions of 470 × 610 × 420 mm.'
					},
					{
						id: 7,
						name: 'Novela Surgical Suction Unit',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/NOVELA%20EXTRACTOR.png',
						description: 'Surgical suction units are designed to remove unwanted fluids, secretions, and particles from the body, aiding in treatment and disease prevention by collecting them in a jar. They feature fast aspiration, stable vacuum performance, adjustable and monitorable vacuum levels, oil-free pumps for easy maintenance, and simple cleaning, making them suitable for operating rooms, ICUs, emergency rooms, dental clinics, and other surgical settings, with CE certification and compliance with ISO 10079-1 and EN 60601 standards.'
					},
					{
						id: 8,
						name: 'Liquid Soap Dispenser Elbow Control',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/LQUID%20SOAP%20DISPENSER%20ELBOW%20CONTROL.png',
						description: 'You can adjust the amount of soap according to your needs in this product, which can be controlled with the elbow.'
					},
					{
						id: 9,
						name: 'OM-6N Operating Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/OPERATING%20TABLE.png',
						description: 'The OM-6N operating table is designed for surgical procedures, featuring a durable polyurethane pillow and a wireless controller for adjusting height, backrest, Trendelenburg/reverse Trendelenburg, side tilt, and horizontal slide. Its X-ray transparent top plate, T-shaped base with 300 cm sliding function, and integrated guides provide high-quality imaging, easy equipment access, and optimal visibility for a comfortable and efficient surgical workflow.'
					},
					{
						id: 10,
						name: 'JM-4F Delivery Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/DELIVERY%20TABLE.png',
						description: 'The roll cover dispenser positioned at the back is placed in order to meet patient comfort and hygiene requirements. The waste collection system integrated under the sitting area, support hygiene conditions. The knee support section is made of polyurethane material and can rotate 360 degrees around its own axis and is fixed at the desired angle.The lifting capacity of the table is 180kg and there are 4 different color options.'
					},
					{
						id: 11,
						name: 'DL-62CM Operating Light',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/OPERATING%20LIGHT.png',
						description: 'During the operation, the camera located in the center of the light transfers the image to the monitor and allows other people to watch the operation. The camera attached to the light head is commanded via the control panel. The monitor, which is mounted on the lamp arm, has the ability to move and make positioning. LED technology does not cause temperature increase in both the surgical area and the surgeon head. The life of the led bulbs used in these light heads, which can produce 160,000 lux and 120,000 lux power, is 60,000 hours. There are 68 LEDs in the main head part and 28 LEDs in the satellite head part.'
					},
					{
						id: 12,
						name: 'DL-2MB Mobile Operating Light',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/MOBILE%20OPERATING%20LIGHT.png',
						description: 'This model with 28 LED bulbs is 44 cm wide and has 120,000 lux power. All functions can be accessed thanks to the LCD touch screen placed on the edge of the hood. The panel on the base shows in which mode the device is operating and the power of the battery in 4 steps. The lamp has 4 wheels, 2 of which have brakes.'
					},
					{
						id: 13,
						name: 'Scrub Sink Double 80700',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/SCRUB%20SINK%20DOUBLE.png',
						description: 'It has a photocell display screen on which the temperature and duration of the water flowing from each battery are monitored alternately.  It has a rounded concave corner in accordance with international hygienic norms, taking to consideration the usage areas and user requests. It provides ease of use with the water flow controlled by the panel and the soap flow controlled by the knee panel.  It has an internal thermostatic valve that allows the water temperature to be adjusted according to the user request.'
					},
					{
						id: 14,
						name: 'Brush Holder 20 Capacity',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/BRUSH%20HOLDER%2020%20CAPACITY%20(2).png',
						description: 'This product, which has the capacity to take 20 brushes, is made of stainless steel and can be sterilized. Thanks to the glass cover, the amount of brush remaining inside can be seen.'
					},
					{
						id: 15,
						name: 'Liquid Soap Dispenser Foot Pump',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/operating-delivery/LQUID%20SOAP%20DISPENSER%20FOOT%20PUMP.png',
						description: 'It is designed to control the soap flow with a foot pump. The soap tank is 1 liter.'
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
					<ParticlesBackground containerId="operating-delivery-particles" />
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
						Operating and Delivery Room Department
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
						Comprehensive surgical equipment and delivery room solutions including LED surgical lights, operating tables, delivery beds, infant warmers, and smoke evacuation systems.
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
			Ready to Upgrade Your Operating and Delivery Room?
		  </h2>
		  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
			Our team of specialists is ready to help you find the perfect surgical and delivery room equipment for your facility.
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
