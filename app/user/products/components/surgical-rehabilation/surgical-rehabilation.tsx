"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories for Medical Surgical and Rehabilatation Ward Department
const categories = [
	{
		id: 'surgical-rehabilitation',
		title: 'Medical Surgical and Rehabilatation Ward Department',
		description: 'Comprehensive medical equipment and furniture solutions for surgical wards, patient care, and rehabilitation facilities including hospital beds, operating tables, and specialized medical furniture.',
		folder: 'surgical-rehabilation',
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
			  {product.description || 'Professional medical equipment and furniture designed for patient care, surgical procedures, and healthcare facility operations with focus on safety and functionality.'}
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
		  {product.description || 'Professional medical equipment engineered for patient care, safety, and optimal healthcare facility operations.'}
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




export default function SurgicalRehabilatation() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Product data for Medical Surgical and Rehabilatation Ward Department
		const productData = [
			{
				category: 'surgical-rehabilitation',
				products: [
					{
						id: 1,
						name: 'SKR-MT625 Medical Trolley',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKR-MT625.png',
						description: 'This medical trolley features a heavy-duty, powder-coated frame with stable construction and four 100 mm nylon castors (two with brakes) for smooth, secure mobility. It includes multiple drawers with ABS dividers and a central lock, stainless steel side rails on the tabletop, dual color-coded ABS trash bins, and a side-attached file box, providing organized and safe storage for medicines, medical materials, and paperwork.'
					},
					{
						id: 2,
						name: 'K3K Hospital Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/K3k.png',
						description: 'SAIKANG ensures high-quality medical furniture through strict selection of branded materials, robotic welding, automated epoxy coating, and rigorous quality control. Its modern, practical design features elegant head and footboards, durable sterilizable plastics, and robust epoxy-painted steel capable of withstanding impacts up to 50 kg.'
					},
					{
						id: 3,
						name: 'SKS02-W Examination Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKS02-W.png',
						description: 'This medical trolley is made from 100% pure ABS plastic, ensuring a non-toxic, durable, rust- and corrosion-resistant design that is easy to clean and long-lasting. It features a sunken ABS top to prevent items from falling, a hidden towel hook, stable casters (two with brakes), and a spacious cabinet with a shelf and drawer, available in customizable colors.'
					},
					{
						id: 4,
						name: 'SKE031 Medical Equipment Cart',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKE031.png',
						description: 'This medical chair features a high-quality aluminum frame with a foldable footrest and adjustable height for patient comfort. It includes 3″ silent castors with dual brakes and a seat upholstered in PVC leather with high-density foam and wood for durability and support.'
					},
					{
						id: 5,
						name: 'SKR054-ET Emergency Trolley',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKR054-ET.png',
						description: 'This medical trolley features a one-piece countertop with fully guarded and raised handles for safe and comfortable operation, along with a beveled decorative grip for better ergonomics. It offers deep, spacious drawers, a movable power socket above the CPR board, retractable oxygen bottle holder, IV pole, defibrillator placement, and color-coded trash bins, all built on a heavy-duty, stable frame with aligned wheels for secure mobility.'
					},
					{
						id: 6,
						name: 'SKE020-1D Medical Cabinet',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKE020-1D.png',
						description: 'The SKE020-1D is a hospital bed foot step with a stainless steel frame and rubber anti-slip surface for safety. It features a single-step design and measures 410 × 230 × 220 mm, providing stable and convenient access for patients.'
					},
					{
						id: 7,
						name: 'SKB041-3 Patient Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKB041-3.png',
						description: 'This hospital stretcher features a durable Baosteel frame with robotic 360° welding, 11-step epoxy painting, and antibacterial testing, ensuring strength and impact resistance. It includes dual US hydraulic pumps for height and Trendelenburg adjustments, foldable aluminum side rails, waterproof PU mattress, 8″ double casters with brakes and center wheel for easy maneuvering, detachable bumper wheels, IV pole, and mobile drainage hooks, all designed for safe, efficient patient transport and care.'
					},
					{
						id: 8,
						name: 'SKH041 IV Pole',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKH041(1).png',
						description: 'This stainless steel IV pole features a height-adjustable range of 1350–2250 mm and is constructed with durable inner (Φ16 mm) and outer (Φ25 mm) stainless steel tubes. It includes two stainless steel hooks, five five-pointed star plastic casters (2-inch double-sided, without brakes), and a stable base with a diameter of 520 mm.'
					},
					{
						id: 9,
						name: 'SKH042 Overbed Table',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKH042.png',
						description: 'This movable hospital table features a multi-layer solid wood tabletop with PVC edge banding (800 × 400 mm) and a height-adjustable gas spring system for easy operation. Its metal base with spray-coated stainless steel columns, four durable 2-inch rubber castors (two with brakes), and stable center of gravity make it suitable as a bedside or dining table for hospital use.'
					},
					{
						id: 10,
						name: 'SKB041-1 Patient Stretcher',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKB041-1.png',
						description: 'This hospital stretcher features a robust Baosteel frame with robotic 360° welding, epoxy-painted bed frame and chassis, and high-quality PP bed platform and guardrails for durability and hygiene. It includes a backrest lift up to 70°, four 6-inch double-sided castors with locks, a directional center wheel, telescopic IV poles, oxygen bottle holders, stainless steel handles, safety straps, and a 2 cm thick standard mattress for safe and comfortable patient transport.'
					},
					{
						id: 11,
						name: 'SKE087 Reclining Chair',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/SKE087.png',
						description: 'The SKE087 features a sectional backrest for strong spinal support, solid wood armrests, and a convenient cup holder, providing comfort and practicality for patients. It includes a one-touch reclining function, super-strong PU leather upholstery with flame-retardant high-density foam, a solid wood rotary table, and 3″ silent medical castors that are waterproof, anti-static, and antibacterial.'
					},
					{
						id: 12,
						name: 'Manual 2 Cranks Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/MANUAL%202%20CRANKS%20BED.png',
						description: 'The Saikang K2K is a durable, manual 2-crank hospital bed known for its basic functions: backrest and knee rest adjustments, controlled by two separate hand cranks, often with aluminum alloy side rails, steel frame, and options like IV poles, offering reliable patient positioning for hospitals and home care at an economical price point. Key features include robust construction with robot-welded surfaces, mattress retainers, and drainage hooks, with cranks designed for longevity. '
					},
					{
						id: 13,
						name: 'Electric 3 Function Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/ELECTRIC%203%20FUNCTION%20BED.png',
						description: 'The Saikang V6K is a budget-friendly, customizable electric 3-function hospital/homecare bed, allowing motorized adjustments for backrest, leg rest, and overall height/tilt, featuring durable ABS materials, aluminum alloy guardrails, and robust motors for patient comfort and nurse assistance in positioning and transfers. Key features include optional dining tables, drainage hooks, a one-button reset, and strong build quality from materials like Baosteel, making it suitable for home or clinical settings. '
					},
					{
						id: 14,
						name: 'Electric 5 Function Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/ELECTRIC%205%20FUNCTION%20BED.png',
						description: 'The Saikang V6v is a versatile, electric 5-function hospital bed designed for patient comfort and care, offering adjustments for backrest, leg rest, height, and Trendelenburg/reverse Trendelenburg, controlled by a user-friendly backlit handset, featuring durable materials, integrated side rails, and bumpers for safety in clinical settings. '
					},
					{
						id: 15,
						name: 'Electric 5 Function Orthopedic Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/ELECTRIC%205%20FUNCTION%20ORTHOPEDIC%20BED.png',
						description: 'The Saikang GB8e is a 5-function electric orthopedic bed with height adjustment, backrest (0-75°), knee rest (0-35°), Trendelenburg (0-12°), and Reverse Trendelenburg (0-12°) functions, featuring a 250kg capacity, CPR function, durable steel/ABS build, central locking, and an aluminum traction frame for patient positioning. '
					},
					{
						id: 16,
						name: 'Manual Orthopedic Bed',
						image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/surgical-rehabilatation/MANUAL%20ORTHOPEDIC%20BED.png',
						description: 'The Saikang B4w (or B4W) is a 4-crank, 5-function manual medical bed designed for ICU and general ward use, featuring a sturdy metal construction with a high weight capacity. It is designed for durability and patient comfort, with adjustable positions for backrest, legrest, height, Trendelenburg, and reverse Trendelenburg. '
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
					<ParticlesBackground containerId="surgical-rehabilitation-particles" />
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
						Medical Surgical and Rehabilatation Ward Department
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
						Comprehensive medical equipment and furniture for surgical wards, patient care, and rehabilitation including hospital beds, operating tables, medical carts, and specialized healthcare furniture.
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
			Ready to Upgrade Your Medical Facility?
		  </h2>
		  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
			Our team of specialists is ready to help you find the perfect medical equipment and furniture for your healthcare facility.
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
