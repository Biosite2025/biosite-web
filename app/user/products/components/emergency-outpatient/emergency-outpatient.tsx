"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories for Emergency and Out Patient Department
const categories = [
	{
		id: 'emergency-outpatient',
		title: 'Emergency and Out Patient Department',
		description: 'Essential medical equipment for emergency care and outpatient services including patient monitors, defibrillators, examination tables, infusion pumps, and diagnostic devices.',
		folder: 'emergency-outpatient',
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
			  {product.description || 'Professional medical equipment designed for emergency care and outpatient services with advanced features for optimal patient safety and treatment outcomes.'}
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
		  {product.description || 'Professional emergency and outpatient equipment engineered for reliable patient care and clinical excellence.'}
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




export default function EmergencyOutpatient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data for Emergency and Out Patient Department
		const productData = [
			{
				category: 'emergency-outpatient',
				products: [
					{
						id: 1,
						name: 'CX15 Patient Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/CX15%20Patient%20Monitor.png',
						description: 'The CX15 patient monitor is designed for easy, reliable, and affordable patient monitoring, combining Edan’s 20 years of expertise with accurate performance and user-friendly operation. Featuring a 15.6” full HD display, portable design, long battery life, wide viewing angle, and 5G Wi-Fi connectivity, it supports gesture operation and HDMI output. Advanced algorithms ensure precise ECG, SpO₂, NIBP, and CO₂ monitoring with fast measurement, low false alarms, and strong motion resistance—making CX15 a practical and dependable solution for everyday clinical needs.'
					},
					{
						id: 2,
						name: 'H10 Finger Oximeter',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/H10%20Finger%20Oximeter.png',
						description: 'The H10 finger oximeter features EDAN’s iMAT™ algorithm to deliver accurate SpO₂, pulse rate, and perfusion index readings for spot checks, triage, and homecare use. With a color OLED display, multiple viewing modes, adjustable brightness, long battery life, and IP22 protection, it is portable, reliable, and easy to operate.'
					},
					{
						id: 3,
						name: 'H100B Pulse Oximeter',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/H100B%20Pulse%20Oximeter.png',
						description: 'The H100B handheld pulse oximeter provides reliable and accurate SpO₂ and pulse rate measurements for spot checks, even in challenging conditions. It features a backlit LCD with plethysmogram display, trend review, large data storage up to 300 hours, and PC data management for efficient patient monitoring'
					},
					{
						id: 4,
						name: 'iM3 Vital Signs Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/iM3%20Vital%20Signs%20Monitor.png',
						description: 'The iM3 combines a sleek, ultra-slim design with an 8” capacitive touch screen to provide comprehensive vital signs monitoring, including SpO₂, NIBP, and Quick/Infrared Ear or Forehead Temperature. Lightweight (<2.5 kg) and equipped with barcode scanning, built-in memory, thermal printer, and adaptive work modes (Spot, Round, Monitoring), it supports both long-term patient monitoring and spot-check applications with real-time data, alarms, and trend analysis.'
					},
					{
						id: 5,
						name: 'X12 Patient Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/X12%20Patient%20Monitor.png',
						description: 'The X12 patient monitor features a 12.1” ultra-slim display and supports monitoring for all patient types, from neonates to adults, in settings such as emergency rooms, general wards, cardiac units, and during in-hospital transfers. It provides standard parameters including 3/5-lead ECG, RESP, SpO₂, NIBP, and 2-channel TEMP, with optional 12-lead ECG, IBP, C.O., and EDAN G2 CO₂, all enhanced by proprietary algorithms for accurate arrhythmia detection, motion-resistant SpO₂ readings, precise NIBP, and intelligent CO₂ monitoring.'
					},
					{
						id: 6,
						name: 'A048 Gynecological Examination Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/A048%20GynecoloGical%20examination%20table.png',
						description: 'The A048 examination table features a mechanically adjustable back plate (0–75° ±10°) and a retractable foot board for patient comfort and space efficiency. It includes an integrated pillow, hidden basin, lithotomy rod (adjustable in height and angle), paper roll holder, and large drawers for tool storage. Built with a 0.8 mm thick base cabinet, the table supports up to 250 kg, and also offers a retractable auxiliary leg section and step stool. Additional features include a stainless steel basin and a power outlet for convenient clinical use.'
					},
					{
						id: 7,
						name: 'SKB041-10 Patient Transportation Trolley',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/SKB041-10.png',
						description: 'The SKB041-10 features fixable side-rails that can be positioned horizontally to support IV administration or other treatments, with an innovative design allowing zero-gap patient transfer from stretcher to bed. It includes a degree indicator on the guardrail, a T-shaped gap for tubing, a full stainless-steel IV pole (15 kg capacity), waterproof mattress, foldable handle, bumpers at all four corners, 8″ central castors, and a center wheel for easy directional control. Height adjustment and Trendelenburg/reverse Trendelenburg functions are supported by a high-quality American hydraulic pump.'
					},
					{
						id: 8,
						name: 'PA-2S Portable Aspirator',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/PA-2S.png',
						description: 'The UZUMCU portable aspirator is a battery-powered, lightweight device for minor surgical and bedside fluid removal. It delivers up to 620 mm Hg vacuum with 30 L/min flow, operates quietly (45 dBA), and features a 2 L transparent jar, hydrophobic filters, and an oil-free pump for easy cleaning and maintenance. CE-certified and suitable for OR, ICU, emergency, and dental use, it runs up to 30 minutes per charge. Made of durable ABS plastic, it includes all standard hoses and accessories. Dimensions: 230×420×360 mm; Weight: 4.132 kg (with battery).'
					},
					{
						id: 9,
						name: 'X09 Examination Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/X09%20Examination%20table.png',
						description: 'The X09 features a backrest adjustable from 0–65° (±10°) and supports up to 175 kg. It has a durable 1.2–1.5 mm powder-coated steel frame, 4 anti-slip feet, and high-density 6 cm flame-retardant foam with 30 kg/m³ density. Upholstery is flame retardant, mildew-resistant, and wear-resistant (100,000 cycles). Constructed with Baosteel and precision robotic welding, it includes 11-layer epoxy painting (0.12 mm, 60° brightness) resistant to 50 kg impacts. External dimensions: 1900×600×680 mm.'
					},
					{
						id: 10,
						name: 'Hopefusion Series Infusion Pump',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/Hopefusion%20Series%20Infusion%20Pump.png',
						description: 'This infusion pump delivers high-precision, long-duration infusion with dual bubble detection, dynamic pressure monitoring, IP44 protection, and integrated power management for safe and reliable operation. It supports intelligent networking with Wi-Fi/wired connectivity, centralized monitoring, multi-channel configurations, multiple infusion modes (including TIVA), and a user-friendly touchscreen interface to streamline clinical workflows and enhance patient safety.'
					},
					{
						id: 11,
						name: 'Hopefusion Series Syringe Pump',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/Hopefusion%20series%20Syringe%20Pump.png',
						description: 'The Hopefusion Syringe Pump delivers high infusion accuracy (≤ ±1.8% after calibration) with dynamic pressure monitoring, dual control via a 3.5″ color touchscreen and keypad, and IP44 dust- and waterproof protection for safe clinical use. It supports intelligent networking with centralized monitoring, multi-channel power integration, multiple injection modes (including TIVA), and flexible syringe compatibility, helping simplify workflows while ensuring precise and reliable patient care.'
					},
					{
						id: 12,
						name: 'F2F2A Automated External Defibrillator (AED)',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/Automated%20External%20Defibrillator%20F2F2A.png',
						description: 'The F2/F2A AED is designed to improve survival in sudden cardiac arrest by providing fast, guided defibrillation and CPR assistance through clear voice prompts, animations, and pre-connected electrodes for adults and children. With automatic power-on when the lid is opened, one-button patient and language switching, and real-time CPR guidance, it delivers comprehensive, time-saving rescue support for both trained and untrained responders.'
					},
					{
						id: 13,
						name: 'S8 Defibrillator Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/S8%20Defibrillator%20Monitor.png',
						description: 'This defibrillator monitor supports manual defibrillation with synchronous cardioversion and asynchronous defibrillation, along with non-invasive pacing modes for effective management of cardiac arrest and severe bradyarrhythmias. It also provides comprehensive patient monitoring with standard 5-lead ECG, optional vital sign modules, and AED functionality with patented analysis algorithms to guide emergency responders during resuscitation.'
					},
					{
						id: 14,
						name: 'S5 Defibrillator Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/S5%20Defibrillator%20Monitor.png',
						description: 'This device supports manual defibrillation with synchronous cardioversion and asynchronous defibrillation, as well as on-demand and fixed non-invasive pacing for effective treatment of cardiac arrest and severe bradyarrhythmias. It features standard 5-lead ECG monitoring, optional vital sign modules including SpO₂, NIBP, PR, and EtCO₂, and an AED mode with patented automated analysis to guide emergency personnel in defibrillation and basic life support.'
					},
					{
						id: 15,
						name: 'C6 HDC6A HD Video Colposcope',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/C6%20HDC6A%20HD%20Video%20Colposcope.png',
						description: 'The C6 HD/C6A HD Video Colposcope combines a high-definition camera, advanced software, and a convenient workstation to meet the demanding needs of gynecological screening. It delivers superior image quality with over 900 TVL resolution, HD illumination, and adjustable LED lighting to clearly visualize examination areas. The green light mode enhances tissue contrast and highlights abnormal blood vessels for more accurate diagnosis. With flexible magnification, wide viewing angles, patient management software, and support for USB, SD, HDMI, and printing, this system enables easy, standardized, and efficient clinical use as well as teaching and case discussions.'
					},
					{
						id: 16,
						name: 'SD3 Ultrasonic Pocket Doppler',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/SD3%20Ultrasonic%20Pocket%20Doppler.png',
						description: 'With excellent sensitivity, complete interchangeability and high durability, SD3 series Ultrasonic Pocket Dopplers are ideal for routine fetal heart rate detection by clinicians.'
					},
					{
						id: 17,
						name: 'UHD Series Video Colposcope',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/UHD%20Series%20Video%20Colposcope.png',
						description: 'UHD Series Video Colposcope has 8-megapixel resolution (3840×2160), delivering ultra-high-definition imaging that clearly reveals tiny lesions, vascular morphology, and subtle changes during acetic acid testing. Combined with BT.2020 wide color gamut, medical-grade 4K display, and multispectral light source imaging using white and narrow-band blue/green light, it provides true-to-life color reproduction, enhanced vessel contrast, and precise lesion boundary identification for more accurate clinical assessment.'
					},
					{
						id: 18,
						name: 'Spine Board',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/SPINE%20BOARD.png',
						description: 'This product is blow molded by high density plastic polyethylene, strong and durable, not easy to aging'
					},
					{
						id: 19,
						name: 'Ambulance Stretcher',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/AMBULANCE%20STRETCHER.png',
						description: 'The Saikang SKB039(D) Ambulance Stretcher Trolley is a 2-section, foldable, and height-adjustable patient transport device designed for ambulances, hospitals, and emergency rescue situations. It features a lightweight, high-strength aluminum alloy structure. '
					},
					{
						id: 20,
						name: 'Ambulance Chair Stretcher',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/emergency-outpatient/AMBULANCE%20CHAIR%20STRETCHER.png',
						description: 'The Saikang SKB039(F) Aluminum Ambulance Chair Stretcher is a versatile, foldable patient transport trolley designed for ambulances and emergency,, frequently used in hospitals and for rescue operations. It is engineered to quickly convert from a horizontal stretcher into a seated chair, with features designed for ease of use in narrow spaces. '
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
					<ParticlesBackground containerId="emergency-outpatient-particles" />
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
						Emergency and Out Patient Department
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
						Comprehensive medical equipment for emergency departments and outpatient clinics including patient monitors, defibrillators, examination tables, infusion systems, and diagnostic devices for quality patient care.
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
			Ready to Upgrade Your Emergency and Outpatient Equipment?
		  </h2>
		  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
			Our team of specialists is ready to help you find the perfect emergency and outpatient solutions for your healthcare facility.
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
