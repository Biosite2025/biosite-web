"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product categories
const categories = [
	{
		id: 'pipettors-products',
		title: 'Pipettors',
		description: 'Advanced pipettors for comprehensive laboratory diagnostics',
		products: [
			"Genrui PA-120",
			"MicroPette Plus"
		]
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
							{product.description}
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

// Product card component
function ProductCard({ product, onClick }: { product: any; onClick: () => void }) {
	const cardRef = useRef(null);
	const isInView = useInView(cardRef, { once: true, margin: '-50px' });
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start('visible');
		}
	}, [isInView, controls]);

	return (
		<motion.div
			ref={cardRef}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: { opacity: 0, y: 50 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.5, ease: 'easeOut' }
				}
			}}
			className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 max-[912px]:rounded-lg"
			onClick={onClick}
		>
			<div className="relative h-56 sm:h-64 md:h-72 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden max-[912px]:h-48">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-110 max-[912px]:p-3"
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
				/>
			</div>

			<div className="p-4 sm:p-6 max-[912px]:p-3">
				<h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors max-[912px]:text-sm max-[912px]:mb-1">
					{product.name}
				</h3>
				<p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 max-[912px]:text-xs max-[912px]:mb-2">
					{product.description}
				</p>
				<div className="flex items-center text-blue-600 text-xs sm:text-sm font-medium group-hover:text-blue-700 transition-colors max-[912px]:text-xs">
					<span>View Details</span>
					<svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				</div>
			</div>
		</motion.div>
	);
}

// Category section component
function CategorySection({ category, onProductClick }: { category: any; onProductClick: (product: any) => void }) {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

	return (
		<motion.section
			ref={sectionRef}
			initial={{ opacity: 0 }}
			animate={isInView ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.6 }}
			className="mb-12 sm:mb-16 md:mb-20 max-[912px]:mb-8"
		>
			<div className="text-center mb-8 sm:mb-12 max-[912px]:mb-6">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 max-[912px]:text-xl max-[912px]:mb-2"
				>
					{category.title}
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto max-[912px]:text-xs"
				>
					{category.description}
				</motion.p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-[912px]:gap-3">
				{category.products.map((productName: string, index: number) => {
					const productData = [
						{
							"category": "General Lab",
							"subcategory": "Pipettors",
							"productName": "Genrui PA-120",
							"imageFilename": "genrui-pa-120.png",
							"description": "Variable volume micropipette"
						},
						{
							"category": "General Lab",
							"subcategory": "Pipettors",
							"productName": "MicroPette Plus",
							"imageFilename": "micropette-plus.png",
							"description": "Precision pipetting system"
						}
					].find(p => p.productName === productName);
					if (!productData) return null;
					
					const product = {
						name: productData.productName,
						image: `/asset/products/pipettors/${productData.imageFilename}`,
						description: productData.description
					};

					return (
						<ProductCard
							key={index}
							product={product}
							onClick={() => onProductClick(product)}
						/>
					);
				})}
			</div>
		</motion.section>
	);
}

// Main component
export default function Pipettors() {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	const handleProductClick = (product: any) => {
		setSelectedProduct({ ...product, onClose: () => setIsModalOpen(false) });
		setIsModalOpen(true);
	};

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<div className="relative min-h-screen bg-gray-50">
			<ParticlesBackground />

			<div className="relative z-10 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-[912px]:pt-20 max-[912px]:pb-8">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12 sm:mb-16 md:mb-20 max-[912px]:mb-8"
					>
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight max-[912px]:text-2xl max-[912px]:mb-3">
							Pipettors
						</h1>
						<p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed max-[912px]:text-sm">
							Discover our comprehensive range of pipettors solutions
						</p>
					</motion.div>

					{categories.map((category, index) => (
						<CategorySection
							key={index}
							category={category}
							onProductClick={handleProductClick}
						/>
					))}
				</div>
			</div>

			{isModalOpen && <Modal product={selectedProduct} isOpen={isModalOpen} />}
		</div>
	);
}