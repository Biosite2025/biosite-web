"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';

// Product categories based on folder structure
const categories = [
	{
		id: 'confocal',
		title: 'Confocal and Multiphoton Microscopes',
		description: 'Advanced imaging solutions for detailed 3D visualization and live-cell imaging',
		folder: 'Confocal and Multiphoton Microscopes',
	},
	{
		id: 'inverted',
		title: 'Inverted Microscopes',
		description: 'Versatile systems designed for cell culture and live-cell imaging applications',
		folder: 'Inverted Microscopes',
	},
	{
		id: 'super-resolution',
		title: 'Super-Resolution Microscopes',
		description: 'Breaking the diffraction barrier for unprecedented resolution and clarity',
		folder: 'Super-Resolution Microscopes',
	},
	{
		id: 'upright',
		title: 'Upright Microscopes',
		description: 'Precision optical systems for research, clinical, and industrial applications',
		folder: 'upright microscopes',
	},
];

// Modal component
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	if (!isOpen || !product) return null;

		// Prevent modal close when clicking inside modal content
		const handleModalContentClick = (e: React.MouseEvent) => {
			e.stopPropagation();
		};

		return (
			<>
				{/* Blurry overlay to prevent background clicks, frosted glass effect */}
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
						{/* X Button */}
						<button
							onClick={product.onClose}
							className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-700 text-xl sm:text-2xl font-bold focus:outline-none transition-colors duration-200 max-[912px]:top-3 max-[912px]:right-3 max-[912px]:text-lg"
							aria-label="Close modal"
							type="button"
						>
							&times;
						</button>
						<div className="relative w-full h-48 sm:h-60 md:h-80 mb-3 sm:mb-4 md:mb-6 flex items-center justify-center max-[912px]:h-40">
							<Tilt
								glareEnable={true}
								glareMaxOpacity={0.35}
								glareColor="#ffffff"
								glarePosition="all"
								scale={1.08}
								tiltMaxAngleX={20}
								tiltMaxAngleY={20}
								style={{ width: '100%', height: '100%', background: 'none', perspective: 1200 }}
								className="flex items-center justify-center"
							>
								<div className="relative w-full h-full">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-contain drop-shadow-2xl"
										style={{ background: 'none' }}
									/>
								</div>
							</Tilt>
						</div>
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 max-[912px]:text-lg">{product.name}</h3>
						<p className="text-gray-700 text-sm sm:text-base max-[912px]:text-sm">
							High-performance imaging solution engineered for precision and advanced laboratory research applications.
						</p>
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
				
				{/* Gradient Overlay on Hover */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#2B3990]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>

			{/* Content */}
			<div className="p-4 sm:p-5 md:p-6 max-[912px]:p-3">
				<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#2B3990] transition-colors duration-300 max-[912px]:text-base">
					{product.name}
				</h3>
				<p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 max-[912px]:text-xs max-[912px]:mb-2">
					High-performance imaging solution engineered for precision and advanced laboratory research applications.
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
				{products.map((product, index) => (
					<ProductCard key={product.id} product={product} index={index} onViewDetails={onViewDetails} />
				))}
			</div>
		</section>
	);
}

export default function NikonMicroscopes() {

	const [products, setProducts] = useState<any>({});
	const [loading, setLoading] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Simulated product data - in production, this would fetch from your asset folder
		const productData: any = {
			'Confocal and Multiphoton Microscopes': [
				{ id: 1, name: 'A1 HD25/A1R HD25', image: '/asset/nikon microscopes/Confocal and Multiphoton Microscopes/A1 HD25 A1R HD25.png' },
				{ id: 2, name: 'AX/AX R with NSPARC.png', image: '/asset/nikon microscopes/Confocal and Multiphoton Microscopes/AX AX R with NSPARC.png' },
				{ id: 3, name: 'AX/R MP with NSPARC', image: '/asset/nikon microscopes/Confocal and Multiphoton Microscopes/AX R MP with NSPARC.png' },
				{ id: 4, name: 'CSU series', image: '/asset/nikon microscopes/Confocal and Multiphoton Microscopes/CSU series.png' },
			],
			'Inverted Microscopes': [
				{ id: 5, name: 'ECLIPSE Ji', image: '/asset/nikon microscopes/Inverted Microscopes/ECLIPSE Ji.png' },
				{ id: 6, name: 'ECLIPSE Ti2-I', image: '/asset/nikon microscopes/Inverted Microscopes/ECLIPSE Ti2-I.png' },
				{ id: 7, name: 'Eclipse Ti2', image: '/asset/nikon microscopes/Inverted Microscopes/ECLIPSE Ti2.png' },
				{ id: 8, name: 'Eclipse Ts2', image: '/asset/nikon microscopes/Inverted Microscopes/Eclipse Ts2.png' },
				{ id: 9, name: 'Eclipse Ts2R', image: '/asset/nikon microscopes/Inverted Microscopes/Eclipse Ts2R.png' },
			],
			'Super-Resolution Microscopes': [
				{ id: 10, name: 'AX/AX R with NSPARC', image: '/asset/nikon microscopes/Super-Resolution Microscopes/AX  AX R with NSPARC.png' },
				{ id: 11, name: 'AX R MP with NSPARC', image: '/asset/nikon microscopes/Super-Resolution Microscopes/AX R MP with NSPARC.png' },
				{ id: 12, name: 'CSU-W1 SoRa', image: '/asset/nikon microscopes/Super-Resolution Microscopes/CSU-W1 SoRa.png' },
				{ id: 13, name: 'N-SIM E', image: '/asset/nikon microscopes/Super-Resolution Microscopes/N-SIM E.png' },
				{ id: 14, name: 'N-STORM', image: '/asset/nikon microscopes/Super-Resolution Microscopes/N-STORM.png' },
			],
			'upright microscopes': [
				{ id: 12, name: 'ECLIPSE Ci-L plus', image: '/asset/nikon microscopes/upright microscopes/Eclipse Ci-L plus.png' },
				{ id: 13, name: 'Eclipse Ci', image: '/asset/nikon microscopes/upright microscopes/Eclipse Ci.png' },
				{ id: 14, name: 'ECLIPSE E100', image: '/asset/nikon microscopes/upright microscopes/ECLIPSE E100.png' },
				{ id: 15, name: 'ECLIPSE Ei', image: '/asset/nikon microscopes/upright microscopes/ECLIPSE Ei.png' },
				{ id: 16, name: 'ECLIPSE FN1', image: '/asset/nikon microscopes/upright microscopes/ECLIPSE FN1.png' },
				{ id: 17, name: 'ECLIPSE Ni', image: '/asset/nikon microscopes/upright microscopes/ECLIPSE Ni.png' },
				{ id: 18, name: 'ECLIPSE Si', image: '/asset/nikon microscopes/upright microscopes/ECLIPSE Si.png' },
				{ id: 19, name: 'ECLIPSE Ui', image: '/asset/nikon microscopes/upright microscopes/ECLIPSE Ui.png' },
			],
		};

		setProducts(productData);
		setLoading(false);
	}, []);

	const handleViewDetails = (product: any) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2B3990] via-[#1e2865] to-[#0f1435] overflow-hidden max-[912px]:min-h-[70vh] max-[912px]:py-4"
			>
				{/* Animated Background Pattern */}
				<div className="absolute inset-0 w-full h-full">
					<div
						className="absolute inset-0 w-full h-full "
						style={{
							backgroundImage: "url('/asset/nikon microscopes/nikonbackground.jpg')",
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							filter: 'blur(1px)',
							opacity: 0.35,
							zIndex: 1,
                            
						}}
					/>
					<div className="absolute inset-0 w-full h-full bg-blue-900 opacity-40 mix-blend-multiply z-2" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center max-[912px]:px-3">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 40 }}
						animate={{ scale: 1.15, opacity: 1, y: 0 }}
						transition={{ duration: 1, type: 'spring', stiffness: 80 }}
						className="mb-4 sm:mb-6 md:mb-8 flex justify-center max-[912px]:mb-3"
						>
						<Image
							src="/asset/nikon microscopes/Nikon-Logo.png"
							alt="Nikon Logo"
							width={500}
							height={320}
							className="object-contain drop-shadow-xl max-[912px]:w-64 max-[912px]:h-auto"
							priority
							/>
						</motion.div>
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
							Explore Nikon's cutting-edge microscopy solutions engineered for precision and performance
						</motion.p>
					</motion.div>

					{/* Scroll Indicator - moved below paragraph */}
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
					categories.map((category) => (
						<CategorySection
							key={category.id}
							category={category}
							products={products[category.folder] || []}
							onViewDetails={handleViewDetails}
                            
						/>
					))
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
						Need Expert Consultation?
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
						Our team of specialists is ready to help you find the perfect microscopy solution for your research needs.
					</p>
					<Link href="/user/contact">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-white text-[#2B3990] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg 
										hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block max-[912px]:px-6 max-[912px]:py-3 max-[912px]:text-sm"
							type="button"
						>
							Contact Our Experts
						</motion.button>
					</Link>
				</div>
			</motion.section>

					{/* Modal */}
					{isModalOpen && selectedProduct && (
						<Modal product={{ ...selectedProduct, onClose: handleCloseModal }} isOpen={isModalOpen} />
					)}
		</div>
	);
}
