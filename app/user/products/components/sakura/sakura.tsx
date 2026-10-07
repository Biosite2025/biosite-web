"use client";

import React, { useEffect, useState } from 'react';
import ParticlesBackground from '../ParticlesBackground';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';

// Every product on this page is Sakura, so the brand logo is applied at render
// time rather than being duplicated onto each product record.
const SAKURA_BRAND = { name: 'Sakura', logo: '/asset/logo/SAKURA.png' };

// Product categories based on folder structure
const categories = [
	{
		id: 'coverslipping',
		title: 'Coverslipping',
		description: 'Automated and manual coverslipping solutions for histology and cytology labs.',
		folder: 'Coverslipping',
	},
	{
		id: 'cryotomy',
		title: 'Cryotomy',
		description: 'Precision cryostats and accessories for frozen sectioning and sample preparation.',
		folder: 'Cryotomy',
	},
	{
		id: 'cytology',
		title: 'Cytology',
		description: 'Advanced cytology preparation systems for accurate diagnostic results.',
		folder: 'Cytology',
	},
	{
		id: 'embedding',
		title: 'Embedding',
		description: 'Embedding centers and consumables for efficient tissue processing workflows.',
		folder: 'Embedding',
	},
	{
		id: 'microtomy',
		title: 'Microtomy',
		description: 'Microtomes and blades for high-quality sectioning of paraffin-embedded tissues.',
		folder: 'Microtomy',
	},
	{
		id: 'tissue-processing',
		title: 'Tissue Processing',
		description: 'Tissue processors for rapid and gentle specimen preparation.',
		folder: 'Tissue Processing',
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
						{/* X Button — enlarged hit target with a clear hover state */}
						<button
							onClick={product.onClose}
							className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-800 transition-colors p-2.5 sm:p-3 rounded-full hover:bg-gray-100
									 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
							aria-label="Close modal"
							type="button"
							style={{ zIndex: 100 }}
						>
							<svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						<div className="relative w-full h-48 sm:h-60 md:h-80 mb-3 sm:mb-4 md:mb-6 flex items-center justify-center max-[912px]:h-40">
							<div className="relative w-full h-full">
								<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-contain drop-shadow-2xl"
									style={{ background: 'none' }}
								/>
							</div>

							{/* Brand logo watermark, same treatment as the cards */}
							<div className="absolute top-0 left-0 pointer-events-none">
								<Image
									src={SAKURA_BRAND.logo}
									alt={`${SAKURA_BRAND.name} logo`}
									aria-hidden="true"
									width={160}
									height={48}
									className="h-[44px] md:h-[60px] w-auto object-contain drop-shadow-md"
								/>
							</div>
						</div>
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 max-[912px]:text-lg">{product.name}</h3>
						<p className="text-gray-700 text-sm sm:text-base max-[912px]:text-sm">
							{product.description || 'High-performance histopathology equipment engineered for precision and advanced laboratory applications.'}
						</p>
					</motion.div>
				</div>
			</>
		);
}


export default function NikonMicroscopes() {


  const [products, setProducts] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Sakura product data with accurate descriptions from official PDF catalog
    const productData: any = {
			'Coverslipping': [
				{ id: 1, name: 'Tissue-Tek Film', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20Film.jpg', description: 'The Tissue-Tek Film® Automated Coverslipper is the fastest and only film coverslipper in the world capable of connecting to the Tissue-Tek Prisma® Plus Automated Slide Stainer to increase pathology laboratory productivity.' },
			],
			'Cryotomy': [
				{ id: 2, name: 'Tissue-Tek Polar', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20Polar.jpg', description: 'The Tissue-Tek® Polar® is an instrument to freeze and section tissues and prepare sections. The Polar provides a unique draft generator to minimize release of contaminated air to the outside of the chamber, in addition to the ozone disinfection cycle and vacuum debris removal system – Complete infection control features protect laboratory staff.' },
			],
			'Cytology': [
				{ id: 3, name: 'Cyto-Tek 2500', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/sakura-cyto-tek-2500.png', description: 'The Cyto-Tek® 2500 Cytocentrifuge provides optimal cell recovery and advanced preservation of cellular structure in non-gynecological monolayer slide preparations. This cytocentrifuge offers excellent preservation of cellular structure and consistently delivers a high rate of cellular recovery. With its patented pad acceleration feature, the cytocentrifuge automatically increases and decreases the rotational velocity based on the selected speed, which protects fragile cells and results in higher cellular yield.' },
			],
			'Embedding': [
				{ id: 4, name: 'Tissue-Tek AutoTEC a120', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20AutoTEC%20a120.jpg', description: 'The second-generation Tissue-Tek AutoTEC® a120 remains the industry’s first and only fully automatic tissue embedding system that eliminates the tedious and labor-intensive need to manually orient and embed tissue specimens. Utilizing the Tissue-Tek® Paraform® Sectionable Cassette System ensures that the orientation of specimens is locked from grossing to microtomy, thereby eliminating the risk of orientation mistakes and tissue loss for increased patient safety.' },
				{ id: 5, name: 'Tissue-Tek TEC 6', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20TEC6.jpg', description: 'The Tissue-Tek TEC™ Series has been the Histology laboratory’s preferred choice in embedding for decades. The Tissue-Tek TEC™ 6 Embedding Console System continues that tradition while further enhancing the reliability, comfort, and ease-of-use that users have come to know and expect for a tissue embedder. Designed to be the ideal tissue embedder for laboratories of any size, the robust and ergonomic modular system offers a streamlined, adjustable workflow that is both comfortable and simple-to-use for any user.' },
				{ id: 12, name: 'Floating Bath', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/floating-bath.png', description: 'Has variable temperature control up to 80°C. Inner surface and dry edges are aluminum lacquered matt black of the temperature with an overheat protection at 90°C. The temperature and settings are displayed on the LCD screen.' },
			],
			'Microtomy': [
				{ id: 7, name: 'Tissue-Tek Autosection', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20Autosection.jpg', description: 'Provides one-touch trimming and programmable sectioning with a host of built-in safety features. AutoSection automatically orients the block to the blade edge, using patented sensing and automated 3D specimen holder technology for precise XYZ orientation.' },
				{ id: 9, name: 'Tissue-Tek Slide Warmer', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek®%20Slide%20Warmer%20PS-53.jpg', description: 'Digital slide warming plate featuring precise temperature control from ambient to 80°C with digital display, uniform heat distribution across the warming surface, large capacity for multiple slides, adjustable temperature settings for optimal section adhesion, and safety features including overheat protection that ensures reliable slide drying and section adhesion for routine H&E staining and special staining procedures in histopathology laboratories with consistent results and energy efficiency.' },
			], 
			'Tissue Processing': [      
				{ id: 10, name: 'Tissue-Tek VIP 6 AI', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20VIP-6-AI.jpg', description: 'Tissue-Tek VIP® 6 AI Vacuum Infiltration Processor continues with Sakura Finetek reliability and innovation to provide the first and only tissue processor with automated onboard preparation of mixed solutions, automatic in-process reagent exchange, and Tissue-Tek® iSupport™ remote monitoring, which allows for safe, high-quality processing while saving time.' },
				{ id: 11, name: 'Tissue-Tek Xpress x120', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20Xpress%20x120.jpg', description: 'The Tissue-Tek Xpress® x120 is a standardized, turnkey solution combining hardware and processing reagents for true rapid, continuous tissue processing beyond the scope of just small biopsies. This innovative technology is the first to deliver rapid, standardized processing over a full range of tissue types, allowing slides to make their way to the pathologist faster than ever. The Standard Program provides high-quality tissue processing in approximately 1 hour for biopsies and tissues 2 mm or less in thickness. The Extended program rapidly processes thicker tissues of 3 mm or greater in an amazing 2 hours, saving up to 5.5 hours versus conventional processing.' },
				{ id: 13, name: 'Histo-Tek VP1', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/histo-tek-vp1.png', description: 'Histo-Tek® VPI is an instrument that performs automatic processing in an enclosed single processing chamber to run the cycle of fixation, dehydration, defatting and paraffin infiltration of tissue specimens. The Histo-Tek VPI makes use of Sakura’s know-how to give users high quality tissue processing simply and safely.' },
				{ id: 14, name: 'Tissue-Tek Prisma Plus', image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/sakura-product/Tissue-Tek%20Prisma%20Plus.png', description: 'The Tissue-Tek Prisma® Plus Automated Slide Stainer remains the highest throughput tissue stainer with up to 530 slides per hour while still producing consistent high quality slides, thanks to the new intelligent scheduler.' },
			],
    };

    setProducts(productData);
    setLoading(false);

    // Preload all images including hero background, logo, and product images
    const productImages = Object.values(productData).flat().map((product: any) => product.image);
    const heroImages = [
      'https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530388/biosite-assets/Sakura/backgroundforsakura.jpg', // Background (using Cloudinary for hero)
      'https://res.cloudinary.com/dmvyhrewy/image/upload/w_400,q_auto:low,f_auto/v1763530561/biosite-assets/Sakura/Asset_67_300x.png' // Logo (using Cloudinary for hero)
    ];
    const allImages = [...heroImages, SAKURA_BRAND.logo, ...productImages];
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
						className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2B3990] via-[#1e2865] to-[#0f1435] overflow-hidden max-[912px]:min-h-[70vh] max-[912px]:py-4"
					>
									{/* Animated Background Pattern + Particles + Red Overlay */}
									<div className="absolute inset-0 w-full h-full">
										{/* Background image with Next.js Image */}
										<div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
											<Image
												src="https://biositeassets.sgp1.cdn.digitaloceanspaces.com/backgroundforsakura.jpg"
												alt="Background"
												fill
												priority={false}
												quality={75}
												sizes="100vw"
												style={{ 
													objectFit: 'cover', 
													objectPosition: 'center',
													filter: 'blur(1px)',
													opacity: 0.35
												}}
											/>
										</div>
										{/* Red overlay with low opacity */}
										<div className="absolute inset-0 w-full h-full bg-red-600" style={{ opacity: 0.18, zIndex: 2 }} />
									</div>
									{/* Particle animation above overlays */}
									<div className="absolute inset-0 w-full h-full z-10">
										<ParticlesBackground containerId="particles-js-sakura" />
										<div className="absolute inset-0 w-full h-full bg-blue-900 opacity-40 mix-blend-multiply pointer-events-none" style={{ zIndex: 2 }} />
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
									  className="mb-4 sm:mb-6 md:mb-8 flex justify-center pb-4 max-[912px]:mb-3 max-[912px]:pb-2"
								>
									<Image
										src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530561/biosite-assets/Sakura/Asset_67_300x.png"
										alt="Sakura Logo"
										width={300}
										height={120}
										className="object-contain drop-shadow-xl max-[912px]:w-48 max-[912px]:h-auto"
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
								Explore Sakura&apos;s advanced laboratory solutions for histology, cytology, and tissue processing.
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
					<>
						{/* Page Title */}
						<motion.div
							initial={{ opacity: 0, y: -30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="mb-8 sm:mb-12 md:mb-16 text-left max-[912px]:mb-6"
						>
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
								Sakura
							</h2>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: '100px' }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="h-1 bg-gradient-to-r from-[#2B3990] to-[#4a5ab8] rounded-full"
							/>
							<p className="text-gray-600 mt-4 text-base sm:text-lg max-w-3xl">
							Advanced histopathology systems and equipment for comprehensive laboratory diagnostics
							</p>
						</motion.div>

						{/* All Products in Single Grid, over one large faint Sakura
						    watermark that sits behind every card */}
						<div className="relative">
							<div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
								<motion.div
									className="absolute inset-0"
									style={{
										backgroundImage: `url("${SAKURA_BRAND.logo}")`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										backgroundSize: 'contain',
									}}
									initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
									animate={{ opacity: 0.05, scale: 1 }}
									transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
								/>
							</div>

							{/* flex-wrap + justify-center so a partial final row stays centered */}
							<div className="relative z-10 flex flex-wrap justify-center gap-6">
								{Object.values(products).flat().map((product: any, index: number) => (
									<div
										key={product.id}
										className="w-full min-[913px]:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
									>
										<ProductCard
											index={index}
											image={product.image}
											name={product.name}
											description={product.description}
											brandName={SAKURA_BRAND.name}
											brandLogo={SAKURA_BRAND.logo}
											onViewDetails={() => handleViewDetails(product)}
										/>
									</div>
								))}
							</div>
						</div>
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
						Need Expert Consultation?
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
						Our team of specialists is ready to help you choose the ideal Sakura equipment and solutions for your laboratory and tissue processing needs.
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
