"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import Preloader from '@/src/components/layout/Preloader';
import ProductCard from '../shared/ProductCard';

// This page keeps its original FUNCTION tabs; inside each tab the products are
// grouped into brand rows (each row headed by the brand logo).

interface Brand { name: string; logo: string; cls: string; }
const BRANDS: Record<string, Brand> = {
	"autobio": {
		"name": "Autobio",
		"logo": "/asset/logo/AUTOBIO.png",
		"cls": "h-[26px] sm:h-[30px] max-w-[100px]"
	}
};

interface Product { id: number; name: string; image: string; description?: string; }
interface Group { brand: string; products: Product[]; }
interface Tab { id: string; title: string; groups: Group[]; }

const tabs: Tab[] = [
	{
		"id": "blood-culture",
		"title": "Blood Culture",
		"groups": [
			{
				"brand": "autobio",
				"products": [
					{
						"id": 1,
						"name": "Autobio BC60",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/autobio-bc601.png",
						"description": "The Automated BC60 Blood Culture system adopts automatic advanced non-invasive and visualization technology with a unique optical detection system which realizes full automation of blood culture testing for up to 60 samples per pod. Its stable temperature control system and reliable vibrating model greatly shortens the detection time of positive results and reduces the false positive rate."
					},
					{
						"id": 2,
						"name": "Autobio BC120",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/autobio-bc120.png",
						"description": "An automated blood culture instrument with high-precision temperature control and a non-invasive optical detection system. It continuously monitors growth, supports up to 120 bottles per cycle, and delivers positive result detection in as little as 3 hours. Built for lab efficiency and accuracy, it features barcode traceability, vibration-based agitation, and safety-focused bottle design."
					},
					{
						"id": 3,
						"name": "BC120 Plus",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/BC120 Plus.jpg",
						"description": "An automated blood culture instrument with high-precision temperature control and a non-invasive optical detection system. It continuously monitors growth, supports up to 120 bottles per cycle, and delivers positive result detection in as little as 3 hours. Built for lab efficiency and accuracy, it features barcode traceability, vibration-based agitation, and safety-focused bottle design."
					},
					{
						"id": 4,
						"name": "Autobes BCX",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/autobes bcx.png",
						"description": "An automated blood culture system designed for continuous incubation and rapid detection of microbial growth in blood samples, supporting faster diagnosis of bloodstream infections."
					}
				]
			}
		]
	},
	{
		"id": "id-ast",
		"title": "ID/AST",
		"groups": [
			{
				"brand": "autobio",
				"products": [
					{
						"id": 5,
						"name": "Autobio AutoMic i600",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/autobio-automic-i600.png",
						"description": "Automated microorganism identification and antimicrobial susceptibility testing analyzer AutoMic-i600 can quickly and accurately identify microorganisms by biochemical and detect antibiotic sensitivity in vitro. The identification results of the bacteria were determined by comparing with the database about biochemical reaction, such as the carbon source utilization, enzyme activity and antibiotic resistance of the bacteria."
					}
				]
			}
		]
	},
	{
		"id": "pretreatment-streaking",
		"title": "Pretreatment & Streaking",
		"groups": [
			{
				"brand": "autobio",
				"products": [
					{
						"id": 6,
						"name": "AutoStreak S1800",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/AutoStreak%20S1800.png",
						"description": "An automated microbial sample pretreatment and streaking system that standardizes inoculation, improves bacterial isolation, and increases laboratory efficiency while enhancing biosafety."
					}
				]
			}
		]
	},
	{
		"id": "malditof",
		"title": "MALDI-TOF",
		"groups": [
			{
				"brand": "autobio",
				"products": [
					{
						"id": 7,
						"name": "Autof MS1000",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/Autof-ms1000.jpg",
						"description": "The Autobio Autof MS1000 is an automated MALDI-TOF mass spectrometry system designed for rapid, accurate microbial identification (bacteria, fungi, mycobacteria) in clinical and industrial labs. It offers a high-capacity 96-sample target plate, identifying organisms in minutes with a, extensive, updateable database of over 16,000 strains and 5,000 species. "
					},
					{
						"id": 8,
						"name": "MS1600",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/MS1600.jpg",
						"description": "The Autof ms1600 is a MALDI-TOF (Matrix-Assisted Laser Desorption/Ionization-Time of Flight) mass spectrometry system for rapid, accurate microbial identification, capable of switching between positive and negative ion modes. It features a large database (>999 genera, >4943 species), 96-sample capacity, and a 1200 x 705 x 450 mm footprint. "
					},
					{
						"id": 9,
						"name": "MS2600",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/ms2600.jpg",
						"description": "The Autof MS2600 is a MALDI-TOF mass spectrometry system by Autobio Diagnostics designed for rapid, high-throughput microbial identification. It utilizes a 355 nm solid-state laser at 100 Hz to identify bacteria and yeasts within minutes, featuring a library of over 5,000 species. The system includes a 96-well sample target plate, intelligent vacuum system, and cloud-based database. "
					},
					{
						"id": 10,
						"name": "TX8 MALDI-TOF MS",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/microbiology/TX8.png",
						"description": "MALDI-TOF MS (Matrix Assisted Laser Desorption/Ionization Time-of-Flight Mass Spectrometry) has been used more and more widely in microbiological clinical laboratory for the identiﬁcation of pathogenic bacteria, especially microaerobes, anaerobes, mycobacteria and fungi with its powerful database and excellent performance."
					}
				]
			}
		]
	}
];

const category = {
	title: "Microbiology",
	description: "Blood culture, ID/AST, pretreatment & streaking, and MALDI-TOF systems for clinical microbiology",
};

// ---------- Modal ----------
function Modal({ product, brand, onClose }: { product: Product; brand: Brand | null; onClose: () => void }) {
	return (
		<>
			<div className="fixed inset-0 z-40 bg-white/40 backdrop-blur-md" onClick={onClose} style={{ cursor: 'pointer' }} />
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-2 sm:px-4 pointer-events-none max-[912px]:px-3">
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ duration: 0.3 }}
					className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 max-w-sm sm:max-w-md md:max-w-2xl w-full border-2 border-gray-200 mx-auto relative pointer-events-auto max-[912px]:max-w-[90vw] max-[912px]:p-4"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						onClick={onClose}
						className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 text-gray-500 hover:text-gray-800 transition-colors p-2.5 sm:p-3 rounded-full hover:bg-gray-100 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
						aria-label="Close modal"
					>
						<svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>

					<div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 overflow-hidden max-[912px]:h-40">
						<Image src={product.image} alt={product.name} fill className="object-contain p-2 sm:p-4 md:p-6 max-[912px]:p-2" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" />
						{brand && (
							<div className="absolute top-2 right-2 md:top-3 md:right-3 pointer-events-none">
								<Image src={brand.logo} alt={`${brand.name} logo`} aria-hidden="true" width={200} height={64} className={`${brand.cls} w-auto object-contain drop-shadow-md`} />
							</div>
						)}
					</div>

					<div className="space-y-3 sm:space-y-4 max-[912px]:space-y-2">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 max-[912px]:text-lg">{product.name}</h3>
						<div className="max-h-48 overflow-y-auto pr-2 max-[912px]:max-h-32">
							<p className="text-sm sm:text-base text-gray-700 leading-relaxed max-[912px]:text-xs">
								{product.description || 'Professional-grade laboratory equipment designed for precision, reliability, and superior performance.'}
							</p>
						</div>
						<div className="pt-3 sm:pt-4 border-t border-gray-200 max-[912px]:pt-2">
							<p className="text-xs sm:text-sm text-gray-500 max-[912px]:text-xs">For detailed specifications and pricing information, please contact our sales team.</p>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
}

// ---------- Brand row (logo header + grid of cards) ----------
function BrandRow({ group, onViewDetails }: { group: Group; onViewDetails: (p: Product) => void }) {
	const brand = BRANDS[group.brand];
	return (
		<div className="mb-8 sm:mb-10">
			{/* Row header: brand logo (or a neutral label for unbranded) + divider */}
			<div className="flex items-center gap-3 mb-4">
				{brand ? (
					<Image src={brand.logo} alt={`${brand.name} logo`} width={200} height={64} className={`${brand.cls} w-auto object-contain`} />
				) : (
					<span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Other</span>
				)}
				<div className="flex-1 h-px bg-gray-200" />
			</div>

			<div className="flex flex-wrap gap-6">
				{group.products.map((product, idx) => (
					<div key={product.id} className="w-full min-[913px]:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]">
						<ProductCard
							index={idx}
							image={product.image}
							name={product.name}
							description={product.description}
							brandName={brand?.name}
							brandLogo={brand?.logo}
							brandLogoClass={brand?.cls}
							onViewDetails={() => onViewDetails(product)}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default function Microbiology() {
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [activeTab, setActiveTab] = useState(tabs[0].id);
	const [selected, setSelected] = useState<Product | null>(null);

	useEffect(() => {
		const fallback = setTimeout(() => setImagesLoaded(true), 2500);
		const imgs = ['/asset/logo/background.webp', ...Object.values(BRANDS).map((b) => b.logo)];
		let n = 0;
		imgs.forEach((src) => {
			const im = new window.Image();
			im.src = src;
			const done = () => { n++; if (n === imgs.length) setImagesLoaded(true); };
			im.onload = done; im.onerror = done;
		});
		return () => clearTimeout(fallback);
	}, []);

	if (!imagesLoaded) return <Preloader />;

	const tab = tabs.find((t) => t.id === activeTab)!;
	const brandFor = (p: Product) => {
		for (const g of tab.groups) if (g.products.some((x) => x.id === p.id)) return BRANDS[g.brand] || null;
		return null;
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero */}
			<motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative min-h-screen flex items-center justify-center overflow-hidden max-[912px]:min-h-[70vh] max-[912px]:py-4">
				<div className="absolute inset-0 w-full h-full z-0">
					<Image src="/asset/logo/background.webp" alt="Microbiology background" fill className="object-cover w-full h-full" priority />
					<div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0b1338]/30 via-[#0b1338]/55 to-[#0b1338]/85" style={{ zIndex: 1 }} />
				</div>
				<div className="absolute inset-0 w-full h-full z-10">
					<ParticlesBackground containerId="microbiology-particles" />
					<div className="absolute inset-0 w-full h-full bg-[#2B3990] opacity-40 mix-blend-multiply pointer-events-none" style={{ zIndex: 2 }} />
				</div>
				<div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center max-[912px]:px-3">
					<motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
						<motion.h1 initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 1, type: 'spring', stiffness: 80 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl max-[912px]:text-4xl max-[912px]:mb-3">
							{category.title}
						</motion.h1>
						<motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1, type: 'spring', stiffness: 60 }} className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-8 sm:mb-12 md:mb-16 drop-shadow-lg max-[912px]:text-lg max-[912px]:mb-6 max-[912px]:px-2">
							{category.description}
						</motion.p>
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }} className="mt-2 max-[912px]:mt-1">
						<motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-white">
							<svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto max-[912px]:w-5 max-[912px]:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Main content — modest top padding; the hero already shows the title */}
			<div className="max-w-[1500px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-16 lg:pb-20 max-[912px]:px-3 max-[912px]:pt-4 max-[912px]:pb-6">
				{/* Function tabs */}
				<div className="mb-8 sm:mb-10 border-b border-gray-200">
					<nav className="flex flex-wrap gap-1 sm:gap-2 -mb-px" aria-label="Product categories">
						{tabs.map((t) => {
							const active = t.id === activeTab;
							return (
								<button
									key={t.id}
									type="button"
									onClick={() => setActiveTab(t.id)}
									aria-pressed={active}
									className={`whitespace-nowrap py-3 px-3 sm:px-5 border-b-2 font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990] ${active ? 'border-[#2B3990] text-[#2B3990]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
								>
									{t.title}
								</button>
							);
						})}
					</nav>
				</div>

				{/* Active tab: brand-grouped rows */}
				<motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
					<div className="mb-6 sm:mb-8">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{tab.title}</h3>
					</div>
					{tab.groups.map((g) => (
						<BrandRow key={g.brand} group={g} onViewDetails={setSelected} />
					))}
				</motion.div>
			</div>

			{/* Footer CTA */}
			<motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="bg-gradient-to-r from-[#2B3990] to-[#1e2865] py-8 sm:py-12 md:py-16 lg:py-20 max-[912px]:py-6">
				<div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center max-[912px]:px-3">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 max-[912px]:text-xl">Ready to Upgrade Your Laboratory?</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">Our team of specialists is ready to help you find the perfect microbiology solution for your laboratory needs.</p>
					<motion.a href="/user/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-[#2B3990] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block max-[912px]:px-6 max-[912px]:py-3 max-[912px]:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contact Our Experts</motion.a>
				</div>
			</motion.section>

			{selected && <Modal product={selected} brand={brandFor(selected)} onClose={() => setSelected(null)} />}
		</div>
	);
}
