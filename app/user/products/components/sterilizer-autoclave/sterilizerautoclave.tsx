"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories for Sterilizers & Autoclaves
const categories = [
	{
		id: 'haier',
		title: 'Haier',
		description: 'Reliable and efficient autoclaves for laboratory and medical sterilization applications.',
		folder: 'sterilizer-autoclave/Haier',
	},
	{
		id: 'tuttnauer',
		title: 'Tuttnauer',
		description: 'Industry-leading sterilization solutions for laboratories, hospitals, and research facilities.',
		folder: 'sterilizer-autoclave/Tuttnauer',
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
			  {product.description || 'Professional-grade sterilization equipment designed for reliability, safety, and optimal sterilization performance.'}
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
		  {product.description || 'Professional sterilization equipment engineered for reliability, safety, and optimal sterilization performance.'}
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
		// Product data for Sterilizers & Autoclaves
		const productData = [
			{
				category: 'haier',
				products: [
					{
						id: 1,
						name: 'Horizontal Bench-top Autoclaves',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Haier/Horizontal%20Bench-top%20Autoclaves.png',
						description: 'As a type of high pressure sterilizer, it takes steam as its sterilization medium which is fast, safe and economic .They are common used in scientific institutions or R&D institution to make the sterilization for wrapped or unwrapped instrument, fabric, utensils, culture medium, unsealed liquid, etc.'
					},
					{
						id: 2,
						name: 'Vertical Autoclave',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Haier/Vertical%20Autoclave.png',
						description: 'This upright automatic rapid sterilization unit uses high temperature saturated steam as the sterilization medium. Applicable to testing laboratories, laboratories, operating rooms, supply rooms, higher education, animal husbandry, disease control centers and other medical and biomedical research units, achieves rapid sterilization of instruments, dressings, rubber, liquids, glassware, bacteria and cell culture medium, wastes, etc.'
					}
				]
			},
			{
				category: 'tuttnauer',
				products: [
					{
						id: 1,
						name: '2540EKA',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/2540EKA.png',
						description: 'With extra fast and efficient drying cycles, the 2540EKA autoclave significantly increases your productivity. This model has the added benefit of a high efficiency air pump which allows closed door active drying. The 2540 EKA is built for perfect sterilization with improved drying of packs and pouches.'
					},
					{
						id: 2,
						name: '3870ELV-D',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/3870ELV-D.png',
						description: 'High-capacity vertical autoclave with advanced vacuum system for efficient air removal. Features dual temperature sensors and comprehensive data logging capabilities.'
					},
					{
						id: 3,
						name: '3870MLV Vertical Top-Loading Autoclave',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/3870MLV%20Vertical%20Top-Loading%20Autoclave.png',
						description: 'Versatile top-loading vertical autoclave with large chamber capacity for sterilizing liquids, glassware, and laboratory equipment. Includes multiple cycle options and safety features.'
					},
					{
						id: 4,
						name: '5075ELV-D',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/5075ELV-D.png',
						description: 'Large capacity vertical autoclave with enhanced vacuum system for superior sterilization performance. Ideal for high-volume laboratory and research applications.'
					},
					{
						id: 5,
						name: '5596 Laboratory Autoclave',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/5596%20Laboratory%20Autoclave.png',
						description: 'Advanced laboratory autoclave with large chamber volume and programmable cycles. Features automatic water filling, advanced diagnostics, and comprehensive safety systems.'
					},
					{
						id: 6,
						name: '66120 Laboratory Autoclave',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/66120%20Laboratory%20Autoclave.png',
						description: 'High-performance laboratory autoclave with extra-large chamber capacity for demanding sterilization requirements. Includes advanced cycle options and user-friendly touchscreen interface.'
					},
					{
						id: 7,
						name: '667/130 Laboratory Autoclave',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/6671130%20Laboratory%20Autoclave.png',
						description: 'Premium laboratory autoclave with maximum chamber capacity for large-scale sterilization operations. Features state-of-the-art control systems and comprehensive documentation.'
					},
					{
						id: 8,
						name: 'D-Line EA and EKA',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/D-Line%20EA%20and%20EKA.png',
						description: 'The D-Line EA and EKA Class S autoclaves feature chamber volumes from 28.5 to 85 liters and use dynamic pulsed air removal for uniform temperature distribution. They include an advanced multi-color display control system, allow cycle data download via USB, and have a user-friendly, self-locking door with a double safety locking mechanism for easy and secure one-hand operation.'
					},
					{
						id: 9,
						name: 'EA and EKA Series',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/EA%20and%20EKA.png',
						description: 'With extra fast and efficient drying cycles, the EA and EKA autoclaves significantly increase your productivity. These two models have the added benefit of a high efficiency air pump which allows closed door active drying. The EKA model has an additional quick cycle which significantly decreases sterilization cycle time, saving you time and optimizing results. The EA and EKA are built for improved sterilization with the ability to dry packs and pouches.'
					},
					{
						id: 10,
						name: 'ELV D-Line Series',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/ELV%20-%20D%20Line.png',
						description: 'Advanced ELV D-Line autoclaves with superior vacuum technology for optimal sterilization results. Includes automated features and comprehensive cycle monitoring.'
					},
					{
						id: 11,
						name: 'Low Temperature Sterilizers',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/Low%20Temperature%20Sterilizers.png',
						description: 'Innovative low-temperature sterilization systems for heat-sensitive instruments and equipment. Utilizes hydrogen peroxide vapor for effective sterilization without thermal damage.'
					}
,
					// Newly added Tuttnauer products
					{
						id: 12,
						name: 'T-Top Medical Autoclaves',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/T-Top%20Medical%20Autoclaves.png',
						description: 'T-Top is a family of tabletop autoclaves designed specifically for medical and dental clinics in small to medium-size practices. Developed with simplicity, efficiency, and cost-effectiveness in mind, T-Top devices address the core sterilization needs of everyday clinical workflows, helping increase productivity and streamline routine operations.'
					},
					{
						id: 13,
						name: 'T-Lab Eco',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/T-Lab%20Eco.png',
						description: 'Eco-friendly T-Lab Eco autoclave designed for energy efficiency and high performance in laboratory sterilization.'
					},
					{
						id: 14,
						name: 'T-Edge Autoclaves',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/T-Edge%20Autoclaves.png',
						description: 'Get peace of mind with T-Edge autoclaves. The T-Edge 10 and T-Edge 11 are space-saving tabletop autoclaves that give you high speed Class B performance saving you time so you can assist your patients, while meeting current international standards and regulatory requirements to protect your staff and patients.'
					},
                    {
                        id: 15,
                        name: 'M and MK Autoclaves',
                        image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/sterilizer-autoclave/Tuttnauer/M%20and%20MK%20Autoclaves.png',
                        description: 'The Semi-Automatic Autoclave is an affordable sterilizer for private clinics that do not want to compromise on quality, safety and reliability. Tuttnauer semi-automatic autoclaves are an effortless Plug andx Play solution. After installation, the sterilizer is virtually maintenance free with low running costs.'
                    },
					
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
					<ParticlesBackground containerId="sterilizer-autoclave-particles" />
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
						Sterilizers & Autoclaves
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
						Advanced sterilization solutions for laboratories, hospitals, and medical facilities. Reliable autoclaves ensuring complete sterilization and safety.
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
			Ready to Upgrade Your Sterilization Equipment?
		  </h2>
		  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
			Our team of specialists is ready to help you find the perfect sterilization solution for your facility.
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
