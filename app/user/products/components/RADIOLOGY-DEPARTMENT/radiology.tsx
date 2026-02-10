"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories for Radiology Department
const categories = [
	{
		id: 'radiology',
		title: 'Radiology Department',
		description: 'Advanced radiology and imaging solutions including digital radiography systems, ultrasound machines, CT scanners, and mammography equipment for comprehensive diagnostic imaging.',
		folder: 'radiology',
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
			  {product.description || 'Advanced radiology and diagnostic imaging equipment designed for precision, reliability, and superior clinical performance.'}
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
		  {product.description || 'Professional radiology equipment engineered for precision diagnostics and superior imaging performance.'}
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




export default function RadiologyDepartment() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data for Radiology Department
		const productData = [
			{
				category: 'radiology',
				products: [
					{
						id: 1,
						name: 'Amulet Innovality',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/Amulet-Innovality.png',
						description: 'AMULET Innovality- the result of Fujifilm’s ongoing “innovation” and commitment to providing top “quality” mammography services. The Innovality utilises Fujifilm’s unique a-Se direct conversion flat panel detector (FPD)* to produce clear images with a low X-ray dose. This system makes use of intelligent AEC (i-AEC) combined with a new image analysis technology to automatically optimize the X-ray dosage for each breast type. AMULET Innovality is a highly advanced mammography system which offers an extremely fast image interval of just 15 seconds. With this new system, Fujifilm furthers the provision of high quality examinations with superior image quality.'
					},
					{
						id: 2,
						name: 'FDR Smart X',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/FDR%20Smart%20X%20(2).png',
						description: 'FDR Smart X is Fujifilm’s newly developed X-ray system, providing multi-function, high-quality, cost-effective X-ray solutions.The Smart X offers ceiling suspended X-ray tube configurations as well as a floor mounted X-ray tube option for use with the upright stand and table, providing flexible solutions for your imaging department'
					},
					{
						id: 3,
						name: 'Supria 128',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/supria128.png',
						description: 'Due to the advance of medical care, CT device needs to be optimizedfor patient care and accelerate clinical decision-making more than before. On the other hand, the economical benefit is also demandedon medical finances due to rapidly growing aging society. Supria128 has evolved in order to respond to the paradigm shiftin the medical field with employing latest technologies such as whole-body submillimeter high-speed imaging and dose reduction technologies, which have become the "Next Standard" for challenging various clinical demands.'
					},
					{
						id: 4,
						name: 'Acclarix AX8',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/Acclarix%20AX8.png',
						description: 'Powered by the latest SynSight zoon sonography platform, the AX8 offers extraordinary profitability in both imaging quality and automatic solutions, combined with its portable design and simplified workflow, make it ideal for critical care and emergency application. In particular, the smart cardiopulmonary assessment solution saves more time for critical scenarios.'
					},
					{
						id: 5,
						name: 'F9 Series Fetal & Maternal Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/F9%20Series%20Fetal%20&%20Maternal%20Monitor.png',
						description: 'he F9 Express Fetal and Maternal Monitor utilizes a 12-crystal, 1.0 MHz waterproof transducer to produce a wider ultrasound beam with a more homogenous signal for advanced performance in all phases of the birthing process.'
					},
					{
						id: 6,
						name: 'F6 Fetal & Maternal Monitor',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/F6%20Fetal%20&%20Maternal%20Monitor.png',
						description: 'The F6 Fetal Monitor features a foldable color TFT screen with four adjustable viewing angles, allowing better visibility and quick setup for efficient clinical use. It offers one-button operation, multiple thermal printing options, and built-in antepartum CTG analysis to support accurate fetal heart rate assessment and streamlined workflow for caregivers.'
					},
					{
						id: 7,
						name: 'EDAN Nano C5 EXP',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/EDAN%20Nano%20C5%20EXP.png',
						description: 'Experience the future of medical imaging with our handheld ultrasound solution. Its sleek and intuitive interface, coupled with state-of-the-art features, ensures efficient and accurate assessments across various clinical settings. From clinics to emergency response scenarios, our device revolutionizes point-of-care diagnostics, enabling informed decision-making and optimizing patient outcomes.'
					},
					{
						id: 8,
						name: 'SE-1200 Express',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/SE-1200%20Express.png',
						description: 'This ECG system features an intuitive 8” high-resolution touchscreen, streamlined one-touch workflow, and advanced signal processing for accurate clinical performance, including real-time waveform review and automatic interpretation validated against international databases. It offers flexible printing, robust data storage and management, and extensive connectivity options, enabling seamless reporting, data exchange, and efficient clinical diagnostics.'
					},
					{
						id: 9,
						name: 'M50-1A',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/M50-IA.png',
						description: 'The new generation M50-1A mobile DR is equipped with 100um large FPD and exposure visualization technology, which provides visualized patient positioning and remote exposure control in compartment. The M50-1A features an exquisite structural design that incorporates a narrow body and lightweight design, making it easy to manage different scenes in routine use, such as in general ward, ICU, or elevator.'
					},
					{
						id: 10,
						name: 'New Oriental 1000N1a Digital Radiography System',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/New%20Oriental%201000N1a%20Digital%20Radiography%20System.jpg',
						description: 'NEW ORIENTAL 1000N1a FPD-DR is a combination of digital flat panel imaging and classical radiographic mechanical structure. The system fits for most common clinical applications of Radiography in both vertical and horizontal projections, as well as chest examinations, greatly enhance patient throughput Absolutely, your filmless workflow will be more convenient and faster than conventional radiographic process. Patients also benefit from low radiation and smooth-running procedures. In addition, the administration of your medical facility will appreciate NEW ORIENTAL 1000N1a’s streamlines cost-effective processes and high quality results. NEW ORIENTAL 1000N1a is DICOM 3.0 compliance that means you can benefit from all relevant DICOM services, including DICOM worklist, image storage, printing and other functions will significantly improve your workflow. '
					},
					{
						id: 11,
						name: 'Acclarix LX9',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/Acclarix%20LX9%20(2).png',
						description: 'orn of a vision to deliver meaningful design innovations that benefit the user,  the Acclarix LX9 features a host of design breakthroughs that make day-to-day operation in general diagnostic environment easy, fast and intuitive.'
					},
					{
						id: 12,
						name: 'Acclarix AX3',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/Acclarix%20AX3.png',
						description: 'Alone with the unique dual – sockets inspiration in a 4.5kg lightweight magnesium alloy body, the remarkable  Acclarix AX3 Compact Ultrasound System delivers a surprising combination of features to meet the demands of point-of-care imaging. The Acclarix AX3 has been design from the relentless focus on delivering uncompromising performance at a cost-effect price to each sonographer. '
					},
					{
						id: 13,
						name: 'SE-301',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/SE-301.png',
						description: 'SE-301 is the new generation 3-channel ECG, which incorporates the benefits of the advanced technology and innovative design in an extremely compact and lightweight device. It is specifically developed for those who pursue superb portability without compromising on the quality for mobile environments. A variety of fantastic features are embodied in an amazing small body, making it more than just a 3-Channel ECG.'
					},
					{
						id: 14,
						name: 'TurboTom 3',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/TurboTom%203%20Datasheet.png',
						description: 'The TurboTom 3 CT scanner combines WDM’s patient-centered precision design with advanced IQI technology to deliver 32-row imaging that offers high-quality scans at lower radiation doses and reduced device consumption. Its intelligent workflow, versatile clinical functions, and responsive support enhance hospital efficiency and patient satisfaction, achieving both economic and clinical benefits.'
					},
					{
						id: 15,
						name: 'DM-2 Digital Mammary X-ray Machine',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/DM-2%20Digital%20Mammary%20X-ray%20Machine.png',
						description: 'The DM-2 Digital Mammary X-ray Machine features automatic positioning, intelligent AEC exposure control, and advanced image processing algorithms to deliver high-quality breast images with the lowest possible radiation dose. With a smart electric breast compressor, DICOM 3.0 compliance, and support for magnification imaging, it ensures comfortable, efficient, and accurate breast screening and diagnosis.'
					},
					{
						id: 16,
						name: 'Innovative Solution for Liver Diagnosis',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/Innovative%20Solution%20for%20Liver%20Diagnosis.png',
						description: 'This system combines Transient Elastography with 2D imaging and optimized algorithms to deliver accurate liver stiffness measurement, ultrasound attenuation analysis, and tissue morphology assessment with real-time deep scanning over 200 mm. It features a 19″ high-resolution monitor, large data storage, multiple connectivity options, and a compact, clinic-ready design for reliable and efficient operation.'
					},
					{
						id: 17,
						name: 'Echelon Smart',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/Echolon%20Smart.png',
						description: 'The ECHELON Smart features a small footprint and limited cost, without compromising diagnostic quality and speed. Based on our proprietary technology, this system has opened up the potential for 1.5T systems, providing superb image quality and superior install flexibility inherited from permanent-magnet MRI systems. ECHELON Smart offers new options for superconductive MRI.'
					},
					{
						id: 18,
						name: 'FDR GO PLUS',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/radiology/FDR%20GO%20PLUS%20(2).png',
						description: 'Fujifilm mobile imaging has been renewed for a more proficient mobile exam experience. Designed to provide sophisticated yet simple harmonized operation, the FDR Go® PLUS, together with Fujifilm trademark image quality and dose performance, offers exactly what you need everyday for your most challenging mobile exams.'
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
					<ParticlesBackground containerId="radiology-particles" />
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
					Radiology Department
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
					Comprehensive diagnostic imaging solutions including digital radiography, ultrasound, CT scanners, and mammography systems for accurate medical diagnosis.
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
			Ready to Upgrade Your Radiology Department?
		  </h2>
		  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
			Our team of specialists is ready to help you find the perfect imaging solution for your medical facility.
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
