"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';

// Product category
const category = {
	id: 'blood-bank',
	title: 'Blood Bank',
	description: 'Advanced blood bank systems and equipment for comprehensive laboratory diagnostics',
	folder: 'blood-bank',
};

// Modal component
function Modal({ product, isOpen }: { product: any; isOpen: boolean }) {
	if (!isOpen || !product) return null;

	const handleModalContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const isLiaisonXL = product.name === 'LIAISON® XL';

	const liaisonTestMenu = (
		<div className="space-y-3 text-xs max-h-[500px] overflow-y-auto pr-2">
			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🦴</span>Bone and Mineral
				</h4>
				<p className="text-gray-700 ml-5">25 OH Vitamin D TOTAL assay</p>
			</div>
			
			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🔴</span>Epstein-Barr Virus
				</h4>
				<div className="ml-5 text-gray-700">
					<p>EBV IgM</p>
					<p>VCA IgG</p>
					<p>EBNA IgG</p>
					<p>KAPI IgG</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🔵</span>ToRCH
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Rubella IgG</p>
					<p>Rubella IgM</p>
					<p>Cytomegalovirus IgM</p>
					<p>Cytomegalovirus IgG</p>
					<p>HSV-1 Type Specific IgG</p>
					<p>HSV-2 Type Specific IgG</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🌍</span>Infectious Disease
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Treponema Assay</p>
					<p>VZV IgG†</p>
					<p>Borrelia burgdorferi†</p>
					<p>Measles IgG†</p>
					<p>Mumps IgG†</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🟡</span>Hepatitis
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Hepatitis A Total Antibodies</p>
					<p>Hepatitis A IgM*</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🟠</span>Diabetes
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Insulin</p>
					<p>C-Peptid</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🔴</span>MMRV
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Measles IgG†</p>
					<p>Mumps IgG†</p>
					<p>Rubella IgM</p>
					<p>Rubella IgG</p>
					<p>VZV IgG†</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🟤</span>Growth
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Human Growth Hormone</p>
					<p>IGF-1*</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🟡</span>Hypertension
				</h4>
				<div className="ml-5 text-gray-700">
					<p>Direct Renin†</p>
					<p>Aldosterone</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🟢</span>Fertility
				</h4>
				<div className="ml-5 text-gray-700">
					<p>FSH</p>
					<p>LH</p>
					<p>Prolactin xt</p>
					<p>Testosterone</p>
					<p>Estradiol II Gen</p>
					<p>Progesterone II Gen**</p>
					<p>hCG</p>
				</div>
			</div>

			<div>
				<h4 className="font-bold text-[#2B3990] mb-1 flex items-center gap-1">
					<span className="text-lg">🟢</span>Thyroids
				</h4>
				<div className="ml-5 text-gray-700">
					<p>TSH</p>
					<p>FT3</p>
					<p>FT4</p>
					<p>Anti-TPO*</p>
				</div>
			</div>
		</div>
	);

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
					className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 ${isLiaisonXL ? 'max-w-4xl' : 'max-w-sm sm:max-w-md md:max-w-2xl'} w-full border-2 border-gray-200 mx-auto relative pointer-events-auto max-[912px]:max-w-[90vw] max-[912px]:p-4`}
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

					<div className={isLiaisonXL ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6' : ''}>
						{isLiaisonXL && (
							<div className="border-r border-gray-200 pr-4 md:pr-6">
								<h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">Test Menu</h3>
								{liaisonTestMenu}
							</div>
						)}

						<div>
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
								{product.description || 'Professional-grade laboratory equipment designed for precision, reliability, and superior performance in blood bank applications.'}
								</p>
								<div className="pt-3 sm:pt-4 border-t border-gray-200 max-[912px]:pt-2">
									<p className="text-xs sm:text-sm text-gray-500 max-[912px]:text-xs">
										For detailed specifications and pricing information, please contact our sales team.
									</p>
								</div>
							</div>
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
				<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#2B3990] transition-colors duration-300 max-[912px]:text-base">
					{product.name}
				</h3>
				<p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 max-[912px]:text-xs max-[912px]:mb-2">
					{product.description || 'Professional blood bank equipment engineered for precision and reliability.'}
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

export default function BloodBank() {
	const [products, setProducts] = useState<any[]>([]);
	const [tubeSealer, setTubeSealer] = useState<any[]>([]);
	const [bloodCollectionMixer, setBloodCollectionMixer] = useState<any[]>([]);
	const [plasmaSeparator, setPlasmaSeparator] = useState<any[]>([]);
	const [centrifugeBalance, setCentrifugeBalance] = useState<any[]>([]);
	const [tulipEryclone, setTulipEryclone] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		// Blood Bank Product data
		const productData = [
			{
				id: 2,
				name: 'Matrix Automax 80',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/matrix-automax-80.png',
				description: 'Matrix AutoMax-80 is a fully automated modular analyzer for Matrix gel cards, featuring robotic sample handling, barcode scanning, and efficient gel card processing for blood banking.'
			},
			{
				id: 5,
				name: 'AutoMini 40',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/AutoMini-40.png',
				description: 'Matrix AutoMini is a fully automated blood grouping analyzer based on column agglutination system that can process 40 tests per hour throughput. It is designed with a single robotic arm for transportation of gel cards and comes with a random access system which is modular in nature and has a STAT function. This system also features integrated barcodes and onboard inventory management.'
			},
			{
				id: 6,
				name: 'CC 2400',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/CC-2400.png',
				description: 'Microprocessor controlled gel card centrifuge for controlled centrifugation of Matrix gel cards having 24 cards capacity.'
			},
			{
				id: 7,
				name: 'Plasma Apheresis System',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Plasma%20Apheresis%20System.png',
				description: 'The system offers full process traceability through intelligent interconnection, improving safety and security for donors. It features smart identification with effective error prevention, automatic monitoring and management throughout the workflow, and a large color touch screen for easy operation. The compact, movable design makes it convenient to use, while optimized structure and noise-reduction technology ensure quiet operation.'
			},
            {
                id: 8,
                name: 'Plasma Thawing',
                image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Plasma%20Thawing.png',
                description: 'Suitable for use in blood centres and supply institutions, as well as hospital transfusion departments, for thawing and rewarming frozen plasma and cryoprecipitated coagulation factors. It improves operational efficiency, shortens thawing times, and helps ensure blood quality and safety.'
            },
            {
                id: 9,
                name: 'Sterile Tube Welder',
                image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Sterile%20Tube%20Welder.png',
                description: 'The STW6810-RFID Sterile Tube Welder is a fully automated device used to safely connect blood tubing while maintaining sterility during blood collection, processing, and storage. It uses an innovative heated wire and non-contact radiant heating system to create clean, reliable welds with minimal stress and contamination risk, features a 10-inch touchscreen for easy operation, supports multiple tubing materials, meets international certifications (CE, FDA, China), and has been widely adopted globally since its launch in 2019.'
            },
            {
                id: 10,
                name: 'LIAISON® XL',
                image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/immunology/LIAISON%C2%AE%20XL.png',
                description: 'Designed for large laboratories. Combine the benefits of high throughput and high sensitivity within a powerful and fully automated system that can seamlessly connect to facilitate Total Laboratory Automation.'
            },
			{
				id: 11,
				name: 'HemoPro',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/HemoPro.png',
				description: 'Hemoglobin testing with microcuvettes certainly has its advantages, such as direct sampling, results in a few seconds and room-temperature storage of consumables. The Mission® HemoPro Hemoglobin Testing System is a cost-effective, optical hemoglobin analyzer that uses microcuvettes instead of traditional test strips or test cartridges. It provides highly accurate results with excellent precision, along with the many convenient features microcuvettes have to offer. The Mission® HemoPro Hemoglobin Testing System can be used to screen for anemia and related conditions, as well as for therapeutic monitoring.'
			},
		];

		// Tube Sealer Product data
		const tubeSealerData = [
			{
				id: 1,
				name: 'Multi-Head (Segment) SE170',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Multi-Head(Segment)%20SE170.png',
				description: 'SureSeal™ SE170 is designed for both single and multi-segment operation. Adjustable sealing power modes and compact design guarantee optimal sealing outputs under any condition.'
			},
			{
				id: 2,
				name: 'Multi-Head (Segment) SE160',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Multi-Head(Segment)%20SE160.png',
				description: 'SureSeal™ SE160 is designed in consideration of multi tube sealing environment. It provides an ideal space-efficient solution. '
			},
			{
				id: 3,
				name: 'Portable SE730',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Portable%20SE730.png',
				description: 'SureSeal™ SE730 is a compact portable sealer'
			},
			{
				id: 4,
				name: 'Portable SE700',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Portable%20SE700.png',
				description: 'SureSeal™ SE700 is a lightweight portable machine with a hand unit.'
			},
			{
				id: 5,
				name: 'Benchtop (Heavyduty) SE260',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE260.png',
				description: 'SureSeal™ SE260 is AC powered benchtop tube sealer with integrated sealing head and optional sealing hand unit. New sealing technology and enforced reliability make SE260 ideal for most demanding environments.'
			},
			{
				id: 6,
				name: 'Benchtop (Heavyduty) SE175',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE175.png',
				description: 'SureSeal™ SE175 is a space conscious sealer with a hand unit. Compact and lightweight design is suitable for where work space  is limited or one tube sealer is shared by multiple users.'
			},
			{
				id: 7,
				name: 'Benchtop (Heavyduty) SE470',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE470.png',
				description: 'SureSeal™ SE470 is a compact and lightweight tube sealer with a hand unit. The device is specially designed to seal the cord blood freezing bags and tubing. '
			},
			{
				id: 8,
				name: 'Benchtop (Heavyduty) SE450',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE450.png',
				description: 'SureSeal™ SE450 is a compact and lightweight tube sealer with a hand unit. The machine is suitable for use where work space is limited or where one tube sealer machine will be shared by multiple users.'
			}
		];

		// Blood Collection Mixer Product data
		const bloodCollectionMixerData = [
			{
				id: 1,
				name: 'CM735A',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Blood%20Collection%20Mixer/CM735A.png',
				description: 'This device automatically clamps the blood bag when the preset volume is reached, gently rocks the bag to mix blood with anticoagulant, and shows all key details on an LCD screen, with visual and audible alarms for safety. It is lightweight, fully portable, supports multiple blood bags, runs on a rechargeable battery with built-in and separate chargers, and comes with a canvas carrying bag, making it ideal for mobile blood collection units.'
			},
			{
				id: 2,
				name: 'CM760',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Blood%20Collection%20Mixer/CM760.png',
				description: 'This device provides accurate weighing and mixing of blood with a simple 5-inch LCD interface, alarms with voice guidance, and barcode scanning for easy operation. It also supports wireless data transfer, has a reliable battery for portable and emergency use, and is compatible with accessories like the SureSeal™ tube sealer.'
			},
			{
				id: 3,
				name: 'CM745',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/Blood%20Collection%20Mixer/CM745.png',
				description: 'This is a cost-efficient solution with proven accurate weighing and mixing technology and easy digital weight calibration. It features visual and audible alarms, a barcode scanner for label checking, large Li-ion and emergency backup batteries for portable use, and comes with a durable canvas carrying bag.'
			}
		];

		// Plasma Separator Product data
		const plasmaSeparatorData = [
			{
				id: 1,
				name: 'ES315',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/ES315.png',
				description: 'ES315 is an electromechanical device that easy separation of blood components. It is semiautomatic equipment to separate blood into red cells and plasma.'
			}
		];

		// Centrifuge Balance Product data
		const centrifugeBalanceData = [
			{
				id: 1,
				name: 'CB220',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/CB220.png',
				description: 'ES315 is an electromechanical device that easy separation of blood components. It is semiautomatic equipment to separate blood into red cells and plasma.'
			}
		];

		// Tulip Eryclone Typing Sera's Product data
		const tulipErycloneData = [
			{
				id: 1,
				name: 'Eryclone Anti-D (Rho) (IgG)',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Ereclone-Anti-D-(Rho)-(IgG).jpg',
				description: 'ANTI-D is a Rho(D) typing reagent used for slide and modified tube tests, formulated as a monoclonal IgG antibody derived from an EBV-transformed human B cell line with a titre of ≥1:32 and 100% specificity to the Rho(D) antigen. It complies with AABB and FDA standards and is available in multiple pack sizes, with a shelf life of 24 months when stored at 2–8 °C. '
			},
			{
				id: 2,
				name: 'Eryclone Anti-B',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti-B.jpg',
				description: 'ANTI-B is an ABO blood grouping reagent used for slide and tube tests, formulated as a murine monoclonal IgM antibody with a high titre of ≥1:256 and 100% specificity to B antigens, without reacting to acquired B characteristics. It complies with AABB and FDA standards and is available in multiple pack sizes, with a shelf life of 24 months when stored at 2–8 °C.'
			},
			{
				id: 3,
				name: 'Eryclone Anti-AB',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone-Anti-AB.jpg',
				description: 'ANTI-A,B is an ABO blood grouping reagent used for slide and tube testing, formulated as a murine monoclonal IgM antibody with a high titre of ≥1:256. It provides 100% specificity to A and B antigens, complies with AABB and FDA guidelines, and is supplied in various pack sizes with a shelf life of 24 months when stored at 2–8 °C.'
			},
			{
				id: 4,
				name: 'Eryclone Anti-A',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone-Anti-A.jpg',
				description: 'ANTI-A is an ABO blood grouping reagent for slide and tube testing, formulated as a murine monoclonal IgM antibody with a high titre of ≥1:256 and 100% specificity to A1, A2, and Ax antigens. It complies with AABB and FDA guidelines and is supplied in multiple pack sizes with a 24-month shelf life when stored at 2–8 °C.'
			},
			{
				id: 5,
				name: 'Eryclone Anti-C+D+E',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti-C+D+E.jpg',
				description: 'ANTI-C+D+E is a Rh genotyping reagent for slide and tube testing, detecting C, D, and E antigens with a titre of ~1:32 across common Rh phenotypes. It contains IgM for C and E antigens and IgM + IgG for D antigen, is produced from a human cell line, follows AABB and FDA standards, and is stable for 24 months at 2–8 °C. It is available in a 5 ml pack.'
			},
			{
				id: 6,
				name: 'Eryclone Anti-e (hr)',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti-e_hr.jpg',
				description: 'ANTI-e is an IgM monoclonal Rh genotyping reagent for slide and tube testing, specifically detecting the e antigen across common Rh phenotypes with a titre of approximately 1:32. It is produced from a human cell line, complies with AABB and FDA standards, stable for 24 months at 2–8 °C, and is available in 2 ml and 5 ml pack sizes.'
			},
			{
				id: 7,
				name: 'Eryclone Anti-E (rh)',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti-E_rh.jpg',
				description: 'ANTI-E is an IgM monoclonal Rh genotyping reagent intended for slide and tube testing, providing reliable detection of the E antigen across common Rh phenotypes with an approximate titre of 1:32. Produced from a human cell line, it meets AABB and FDA standards, offers 24-month stability at 2–8 °C, and is available in 2 ml and 5 ml pack sizes.'
			},
			{
				id: 8,
				name: 'Eryclone Anti-c (hr)',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti-c_hr.jpg',
				description: 'ANTI-c is an IgM monoclonal Rh genotyping reagent designed for slide and tube testing, ensuring accurate identification of the c antigen across common Rh phenotypes. Derived from a human cell line, it offers high specificity with an approximate titre of 1:32, complies with AABB and FDA standards, and remains stable for 24 months when stored at 2–8 °C, with availability in 2 ml and 5 ml pack sizes.'
			},
			{
				id: 9,
				name: 'Eryclone Anti-C (rh)',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti-C_rh.jpg',
				description: 'ANTI-C is an IgM monoclonal Rh genotyping reagent intended for slide and tube testing, providing reliable detection of the C antigen across common Rh phenotypes. Produced from a human cell line, it offers high specificity with a titre of approximately 1:32, complies with AABB and FDA guidelines, and maintains stability for 24 months when stored at 2–8 °C. The reagent is available in 2 ml and 5 ml pack sizes for routine laboratory use.'
			},
			{
				id: 10,
				name: 'Eryclone MONOSPECIFIC COOMBS SERA (Anti-C3d) ',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone-Anti-Human-C3d.jpg',
				description: 'MONOSPECIFIC COOMBS SERA (Anti-C3d) is a monoclonal IgM reagent specifically designed for Direct and Indirect Antiglobulin Tests (DAT and IAT), enabling accurate detection of the complement component C3d. It complies with AABB and FDA guidelines, offers stable performance with a 24-month shelf life when stored at 2–8 °C, and is available in multiple pack sizes to suit laboratory needs.'
			},
			{
				id: 11,
				name: 'Eryclone Anti-Human Globulin',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone_Anti_Human_Globulin.jpg',
				description: 'ANTI HUMAN GLOBULIN is a polyspecific AHG reagent used for Direct and Indirect Coombs’ tests, providing reliable detection of human IgG and complement components C3b and C3d. It combines purified goat anti-IgG antibodies with murine monoclonal anti-C3d, complies with AABB and FDA standards, and offers a 24-month shelf life when stored at 2–8 °C, with multiple pack size options available.'
			},
			{
				id: 12,
				name: 'Eryclone Anti-D IgM',
				image: 'https://biositeassets.sgp1.cdn.digitaloceanspaces.com/products/blood-bank/eryclone%20item/Eryclone-Anti-D-IgM.jpg',
				description: 'ANTI-D is a saline-reacting Rho(D) typing reagent for slide and tube tests, formulated as a monoclonal IgM antibody derived from an EBV-transformed human B cell line with a high titre of ≥1:256 and 100% specificity to the Rho(D) antigen. It meets AABB and FDA standardization requirements and offers a 24-month shelf life when stored at 2–8 °C, with availability in multiple pack sizes.'
			}
		];

		setProducts(productData);
		setTubeSealer(tubeSealerData);
		setBloodCollectionMixer(bloodCollectionMixerData);
		setPlasmaSeparator(plasmaSeparatorData);
		setCentrifugeBalance(centrifugeBalanceData);
		setTulipEryclone(tulipErycloneData);
		setLoading(false);

		// Preload all images
		const allImages = [
			'https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530316/biosite-assets/dakewe/bg-dakewe.jpg',
			...productData.map((p: any) => p.image),
			...tubeSealerData.map((p: any) => p.image),
			...bloodCollectionMixerData.map((p: any) => p.image),
			...plasmaSeparatorData.map((p: any) => p.image),
			...centrifugeBalanceData.map((p: any) => p.image),
			...tulipErycloneData.map((p: any) => p.image)
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
					<ParticlesBackground containerId="blood-bank-particles" />
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
							Blood Bank
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
							Advanced blood bank systems and equipment for comprehensive laboratory diagnostics
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
						<CategorySection
							category={category}
							products={products}
							onViewDetails={handleViewDetails}
						/>
						<CategorySection
							category={{
								id: 'tube-sealer',
								title: 'Tube Sealer',
								description: 'Reliable tube sealers for blood collection, processing, and storage in blood bank operations.',
								folder: 'tube-sealer',
							}}
							products={tubeSealer}
							onViewDetails={handleViewDetails}
						/>
						<CategorySection
							category={{
								id: 'blood-collection-mixer',
								title: 'Blood Collection Mixer',
								description: 'Mixers for gentle, uniform, and efficient blood collection in blood bank procedures.',
								folder: 'blood-collection-mixer',
							}}
							products={bloodCollectionMixer}
							onViewDetails={handleViewDetails}
						/>
						<CategorySection
							category={{
								id: 'plasma-separator',
								title: 'Plasma Separator',
								description: 'Efficient plasma separators for laboratory and blood bank applications.',
								folder: 'plasma-separator',
							}}
							products={plasmaSeparator}
							onViewDetails={handleViewDetails}
						/>
						<CategorySection
							category={{
								id: 'centrifuge-balance',
								title: 'Centrifuge Balance',
								description: 'Precision centrifuge balances for safe and accurate centrifugation in blood banks.',
								folder: 'centrifuge-balance',
							}}
							products={centrifugeBalance}
							onViewDetails={handleViewDetails}
						/>
						<CategorySection
							category={{
								id: 'tulip-eryclone-typing-sera',
								title: "Tulip Eryclone Typing Sera's",
								description: 'High-quality typing sera for blood group determination and compatibility testing.',
								folder: 'tulip-eryclone-typing-sera',
							}}
							products={tulipEryclone}
							onViewDetails={handleViewDetails}
						/>
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
						Ready to Upgrade Your Laboratory?
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">
						Our team of specialists is ready to help you find the perfect blood bank solution for your laboratory needs.
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
