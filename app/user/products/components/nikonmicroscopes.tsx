"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';

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
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-4 pointer-events-none">
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						transition={{ duration: 0.3 }}
						className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full border-2 border-gray-200 mx-auto relative pointer-events-auto"
						onClick={handleModalContentClick}
					>
						{/* X Button */}
						<button
							onClick={product.onClose}
							className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none transition-colors duration-200"
							aria-label="Close modal"
							type="button"
						>
							&times;
						</button>
						<div className="relative w-full h-80 mb-6">
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-contain"
							/>
						</div>
						<h3 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h3>
						<p className="text-gray-700 text-base">
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
			className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
			whileHover={{ y: -8, scale: 1.02 }}
		>
			{/* Image Container */}
			<div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
				<motion.div
					whileHover={{ scale: 1.1 }}
					transition={{ duration: 0.6 }}
					className="w-full h-full relative"
				>
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-contain p-4"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</motion.div>
				
				{/* Gradient Overlay on Hover */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#2B3990]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>

			{/* Content */}
			<div className="p-6">
				<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2B3990] transition-colors duration-300">
					{product.name}
				</h3>
				<p className="text-gray-600 text-sm mb-4 line-clamp-2">
					High-performance imaging solution engineered for precision and advanced laboratory research applications.
				</p>
				
				{/* View Details Button */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => onViewDetails(product)}
					className="w-full bg-[#2B3990] text-white py-3 rounded-lg font-semibold 
							 hover:bg-[#1e2865] transition-all duration-300 
							 shadow-md hover:shadow-xl relative overflow-hidden group/btn"
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
			<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#2B3990]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
		<section ref={ref} className="mb-20">
			{/* Section Header */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
				transition={{ duration: 0.6 }}
				className="mb-10"
			>
				<div className="relative inline-block">
					<h2 className="text-4xl font-bold text-gray-900 mb-3">
						{category.title}
					</h2>
					<motion.div
						initial={{ width: 0 }}
						animate={isInView ? { width: '100%' } : { width: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="h-1 bg-gradient-to-r from-[#2B3990] to-[#4a5ab8] rounded-full"
					/>
				</div>
				<p className="text-gray-600 mt-4 text-lg max-w-3xl">
					{category.description}
				</p>
			</motion.div>

			{/* Products Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
				className="relative h-[500px] bg-gradient-to-br from-[#2B3990] via-[#1e2865] to-[#0f1435] overflow-hidden"
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

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
					<motion.div
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
							Nikon Microscopes
						</h1>
						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="h-1.5 w-48 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-8"
						/>
						<p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
							Explore Nikon's cutting-edge microscopy solutions engineered for precision and performance
						</p>
					</motion.div>

					{/* Scroll Indicator */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 1 }}
						className="absolute bottom-10"
					>
						<motion.div
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="text-white"
						>
							<svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Main Content */}
			<div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
				{loading ? (
					<div className="flex justify-center items-center h-64 ">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
							className="w-16 h-16 border-4 border-[#2B3990] border-t-transparent rounded-full "
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
				className="bg-gradient-to-r from-[#2B3990] to-[#1e2865] py-20 "
			>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold text-white mb-6">
						Need Expert Consultation?
					</h2>
					<p className="text-xl text-gray-200 mb-8">
						Our team of specialists is ready to help you find the perfect microscopy solution for your research needs.
					</p>
					<Link href="/user/contact">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-white text-[#2B3990] px-10 py-4 rounded-lg font-bold text-lg 
										hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block"
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
