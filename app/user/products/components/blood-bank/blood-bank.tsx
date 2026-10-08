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
	"matrix": {
		"name": "Matrix",
		"logo": "/asset/logo/MATRIX.png",
		"cls": "h-[26px] sm:h-[30px] max-w-[130px]"
	},
	"diasorin": {
		"name": "DiaSorin",
		"logo": "/asset/logo/DIASORIN.png",
		"cls": "h-[26px] sm:h-[30px] max-w-[140px]"
	},
	"acon": {
		"name": "ACON",
		"logo": "/asset/logo/ACON.png",
		"cls": "h-[24px] sm:h-[28px] max-w-[150px]"
	},
	"tulip": {
		"name": "Tulip Diagnostic",
		"logo": "/asset/logo/TULIP DIAGNOSTIC.png",
		"cls": "h-[26px] sm:h-[30px] max-w-[150px]"
	},
	"haier": {
		"name": "Haier",
		"logo": "/asset/logo/HAIER.png",
		"cls": "h-[28px] sm:h-[34px] max-w-[100px]"
	},
	"centron": {
		"name": "Centron",
		"logo": "/asset/logo/CENTRON.png",
		"cls": "h-[26px] sm:h-[30px] max-w-[130px]"
	},
	"bms": {
		"name": "BMS",
		"logo": "/asset/logo/BMS.png",
		"cls": "h-[26px] sm:h-[30px] max-w-[110px]"
	}
};

interface Product { id: number; name: string; image: string; description?: string; }
interface Group { brand: string; products: Product[]; }
interface Tab { id: string; title: string; groups: Group[]; }

const tabs: Tab[] = [
	{
		"id": "analyzers-systems",
		"title": "Analyzers & Systems",
		"groups": [
			{
				"brand": "matrix",
				"products": [
					{
						"id": 1,
						"name": "Matrix Automax 80",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/matrix-automax-80.png",
						"description": "Matrix AutoMax-80 is a fully automated modular analyzer for Matrix gel cards, featuring robotic sample handling, barcode scanning, and efficient gel card processing for blood banking."
					},
					{
						"id": 2,
						"name": "AutoMini 40",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/AutoMini-40.png",
						"description": "Matrix AutoMini is a fully automated blood grouping analyzer based on column agglutination system that can process 40 tests per hour throughput. It is designed with a single robotic arm for transportation of gel cards and comes with a random access system which is modular in nature and has a STAT function. This system also features integrated barcodes and onboard inventory management."
					},
					{
						"id": 3,
						"name": "CC 2400",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/CC-2400.png",
						"description": "Microprocessor controlled gel card centrifuge for controlled centrifugation of Matrix gel cards having 24 cards capacity."
					}
				]
			},
			{
				"brand": "diasorin",
				"products": [
					{
						"id": 7,
						"name": "LIAISON® XL",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/immunology/LIAISON%C2%AE%20XL.png",
						"description": "Designed for large laboratories. Combine the benefits of high throughput and high sensitivity within a powerful and fully automated system that can seamlessly connect to facilitate Total Laboratory Automation."
					}
				]
			},
			{
				"brand": "acon",
				"products": [
					{
						"id": 8,
						"name": "HemoPro",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/HemoPro.png",
						"description": "Hemoglobin testing with microcuvettes certainly has its advantages, such as direct sampling, results in a few seconds and room-temperature storage of consumables. The Mission® HemoPro Hemoglobin Testing System is a cost-effective, optical hemoglobin analyzer that uses microcuvettes instead of traditional test strips or test cartridges. It provides highly accurate results with excellent precision, along with the many convenient features microcuvettes have to offer. The Mission® HemoPro Hemoglobin Testing System can be used to screen for anemia and related conditions, as well as for therapeutic monitoring."
					}
				]
			},
			{
				"brand": "haier",
				"products": [
					{
						"id": 4,
						"name": "Plasma Apheresis System",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Plasma%20Apheresis%20System.png",
						"description": "The system offers full process traceability through intelligent interconnection, improving safety and security for donors. It features smart identification with effective error prevention, automatic monitoring and management throughout the workflow, and a large color touch screen for easy operation. The compact, movable design makes it convenient to use, while optimized structure and noise-reduction technology ensure quiet operation."
					},
					{
						"id": 5,
						"name": "Plasma Thawing",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Plasma%20Thawing.png",
						"description": "Suitable for use in blood centres and supply institutions, as well as hospital transfusion departments, for thawing and rewarming frozen plasma and cryoprecipitated coagulation factors. It improves operational efficiency, shortens thawing times, and helps ensure blood quality and safety."
					}
				]
			},
			{
				"brand": "bms",
				"products": [
					{
						"id": 6,
						"name": "Sterile Tube Welder",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Sterile%20Tube%20Welder.png",
						"description": "The STW6810-RFID Sterile Tube Welder is a fully automated device used to safely connect blood tubing while maintaining sterility during blood collection, processing, and storage. It uses an innovative heated wire and non-contact radiant heating system to create clean, reliable welds with minimal stress and contamination risk, features a 10-inch touchscreen for easy operation, supports multiple tubing materials, meets international certifications (CE, FDA, China), and has been widely adopted globally since its launch in 2019."
					}
				]
			}
		]
	},
	{
		"id": "tube-sealer",
		"title": "Tube Sealer",
		"groups": [
			{
				"brand": "centron",
				"products": [
					{
						"id": 9,
						"name": "Multi-Head (Segment) SE170",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Multi-Head(Segment)%20SE170.png",
						"description": "SureSeal™ SE170 is designed for both single and multi-segment operation. Adjustable sealing power modes and compact design guarantee optimal sealing outputs under any condition."
					},
					{
						"id": 10,
						"name": "Multi-Head (Segment) SE160",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Multi-Head(Segment)%20SE160.png",
						"description": "SureSeal™ SE160 is designed in consideration of multi tube sealing environment. It provides an ideal space-efficient solution. "
					},
					{
						"id": 11,
						"name": "Portable SE730",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Portable%20SE730.png",
						"description": "SureSeal™ SE730 is a compact portable sealer"
					},
					{
						"id": 12,
						"name": "Portable SE700",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Portable%20SE700.png",
						"description": "SureSeal™ SE700 is a lightweight portable machine with a hand unit."
					},
					{
						"id": 13,
						"name": "Benchtop (Heavyduty) SE260",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE260.png",
						"description": "SureSeal™ SE260 is AC powered benchtop tube sealer with integrated sealing head and optional sealing hand unit. New sealing technology and enforced reliability make SE260 ideal for most demanding environments."
					},
					{
						"id": 14,
						"name": "Benchtop (Heavyduty) SE175",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE175.png",
						"description": "SureSeal™ SE175 is a space conscious sealer with a hand unit. Compact and lightweight design is suitable for where work space  is limited or one tube sealer is shared by multiple users."
					},
					{
						"id": 15,
						"name": "Benchtop (Heavyduty) SE470",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE470.png",
						"description": "SureSeal™ SE470 is a compact and lightweight tube sealer with a hand unit. The device is specially designed to seal the cord blood freezing bags and tubing. "
					},
					{
						"id": 16,
						"name": "Benchtop (Heavyduty) SE450",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Tube%20Sealer/Benchtop(Heavyduty)%20SE450.png",
						"description": "SureSeal™ SE450 is a compact and lightweight tube sealer with a hand unit. The machine is suitable for use where work space is limited or where one tube sealer machine will be shared by multiple users."
					}
				]
			}
		]
	},
	{
		"id": "blood-collection-mixer",
		"title": "Blood Collection Mixer",
		"groups": [
			{
				"brand": "centron",
				"products": [
					{
						"id": 17,
						"name": "CM735A",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Blood%20Collection%20Mixer/CM735A.png",
						"description": "This device automatically clamps the blood bag when the preset volume is reached, gently rocks the bag to mix blood with anticoagulant, and shows all key details on an LCD screen, with visual and audible alarms for safety. It is lightweight, fully portable, supports multiple blood bags, runs on a rechargeable battery with built-in and separate chargers, and comes with a canvas carrying bag, making it ideal for mobile blood collection units."
					},
					{
						"id": 18,
						"name": "CM760",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Blood%20Collection%20Mixer/CM760.png",
						"description": "This device provides accurate weighing and mixing of blood with a simple 5-inch LCD interface, alarms with voice guidance, and barcode scanning for easy operation. It also supports wireless data transfer, has a reliable battery for portable and emergency use, and is compatible with accessories like the SureSeal™ tube sealer."
					},
					{
						"id": 19,
						"name": "CM745",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/Blood%20Collection%20Mixer/CM745.png",
						"description": "This is a cost-efficient solution with proven accurate weighing and mixing technology and easy digital weight calibration. It features visual and audible alarms, a barcode scanner for label checking, large Li-ion and emergency backup batteries for portable use, and comes with a durable canvas carrying bag."
					}
				]
			}
		]
	},
	{
		"id": "plasma-separator",
		"title": "Plasma Separator",
		"groups": [
			{
				"brand": "centron",
				"products": [
					{
						"id": 20,
						"name": "ES315",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/ES315.png",
						"description": "ES315 is an electromechanical device that easy separation of blood components. It is semiautomatic equipment to separate blood into red cells and plasma."
					}
				]
			}
		]
	},
	{
		"id": "centrifuge-balance",
		"title": "Centrifuge Balance",
		"groups": [
			{
				"brand": "centron",
				"products": [
					{
						"id": 21,
						"name": "CB220",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/CB220.png",
						"description": "ES315 is an electromechanical device that easy separation of blood components. It is semiautomatic equipment to separate blood into red cells and plasma."
					}
				]
			}
		]
	},
	{
		"id": "tulip-eryclone",
		"title": "Typing Sera’s",
		"groups": [
			{
				"brand": "tulip",
				"products": [
					{
						"id": 22,
						"name": "Eryclone Anti-D (Rho) (IgG)",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Ereclone-Anti-D-(Rho)-(IgG).jpg",
						"description": "ANTI-D is a Rho(D) typing reagent used for slide and modified tube tests, formulated as a monoclonal IgG antibody derived from an EBV-transformed human B cell line with a titre of ≥1:32 and 100% specificity to the Rho(D) antigen. It complies with AABB and FDA standards and is available in multiple pack sizes, with a shelf life of 24 months when stored at 2–8 °C. "
					},
					{
						"id": 23,
						"name": "Eryclone Anti-B",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti-B.jpg",
						"description": "ANTI-B is an ABO blood grouping reagent used for slide and tube tests, formulated as a murine monoclonal IgM antibody with a high titre of ≥1:256 and 100% specificity to B antigens, without reacting to acquired B characteristics. It complies with AABB and FDA standards and is available in multiple pack sizes, with a shelf life of 24 months when stored at 2–8 °C."
					},
					{
						"id": 24,
						"name": "Eryclone Anti-AB",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone-Anti-AB.jpg",
						"description": "ANTI-A,B is an ABO blood grouping reagent used for slide and tube testing, formulated as a murine monoclonal IgM antibody with a high titre of ≥1:256. It provides 100% specificity to A and B antigens, complies with AABB and FDA guidelines, and is supplied in various pack sizes with a shelf life of 24 months when stored at 2–8 °C."
					},
					{
						"id": 25,
						"name": "Eryclone Anti-A",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone-Anti-A.jpg",
						"description": "ANTI-A is an ABO blood grouping reagent for slide and tube testing, formulated as a murine monoclonal IgM antibody with a high titre of ≥1:256 and 100% specificity to A1, A2, and Ax antigens. It complies with AABB and FDA guidelines and is supplied in multiple pack sizes with a 24-month shelf life when stored at 2–8 °C."
					},
					{
						"id": 26,
						"name": "Eryclone Anti-C+D+E",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti-C+D+E.jpg",
						"description": "ANTI-C+D+E is a Rh genotyping reagent for slide and tube testing, detecting C, D, and E antigens with a titre of ~1:32 across common Rh phenotypes. It contains IgM for C and E antigens and IgM + IgG for D antigen, is produced from a human cell line, follows AABB and FDA standards, and is stable for 24 months at 2–8 °C. It is available in a 5 ml pack."
					},
					{
						"id": 27,
						"name": "Eryclone Anti-e (hr)",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti-e_hr.jpg",
						"description": "ANTI-e is an IgM monoclonal Rh genotyping reagent for slide and tube testing, specifically detecting the e antigen across common Rh phenotypes with a titre of approximately 1:32. It is produced from a human cell line, complies with AABB and FDA standards, stable for 24 months at 2–8 °C, and is available in 2 ml and 5 ml pack sizes."
					},
					{
						"id": 28,
						"name": "Eryclone Anti-E (rh)",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti-E_rh.jpg",
						"description": "ANTI-E is an IgM monoclonal Rh genotyping reagent intended for slide and tube testing, providing reliable detection of the E antigen across common Rh phenotypes with an approximate titre of 1:32. Produced from a human cell line, it meets AABB and FDA standards, offers 24-month stability at 2–8 °C, and is available in 2 ml and 5 ml pack sizes."
					},
					{
						"id": 29,
						"name": "Eryclone Anti-c (hr)",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti-c_hr.jpg",
						"description": "ANTI-c is an IgM monoclonal Rh genotyping reagent designed for slide and tube testing, ensuring accurate identification of the c antigen across common Rh phenotypes. Derived from a human cell line, it offers high specificity with an approximate titre of 1:32, complies with AABB and FDA standards, and remains stable for 24 months when stored at 2–8 °C, with availability in 2 ml and 5 ml pack sizes."
					},
					{
						"id": 30,
						"name": "Eryclone Anti-C (rh)",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti-C_rh.jpg",
						"description": "ANTI-C is an IgM monoclonal Rh genotyping reagent intended for slide and tube testing, providing reliable detection of the C antigen across common Rh phenotypes. Produced from a human cell line, it offers high specificity with a titre of approximately 1:32, complies with AABB and FDA guidelines, and maintains stability for 24 months when stored at 2–8 °C. The reagent is available in 2 ml and 5 ml pack sizes for routine laboratory use."
					},
					{
						"id": 31,
						"name": "Eryclone MONOSPECIFIC COOMBS SERA (Anti-C3d) ",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone-Anti-Human-C3d.jpg",
						"description": "MONOSPECIFIC COOMBS SERA (Anti-C3d) is a monoclonal IgM reagent specifically designed for Direct and Indirect Antiglobulin Tests (DAT and IAT), enabling accurate detection of the complement component C3d. It complies with AABB and FDA guidelines, offers stable performance with a 24-month shelf life when stored at 2–8 °C, and is available in multiple pack sizes to suit laboratory needs."
					},
					{
						"id": 32,
						"name": "Eryclone Anti-Human Globulin",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone_Anti_Human_Globulin.jpg",
						"description": "ANTI HUMAN GLOBULIN is a polyspecific AHG reagent used for Direct and Indirect Coombs’ tests, providing reliable detection of human IgG and complement components C3b and C3d. It combines purified goat anti-IgG antibodies with murine monoclonal anti-C3d, complies with AABB and FDA standards, and offers a 24-month shelf life when stored at 2–8 °C, with multiple pack size options available."
					},
					{
						"id": 33,
						"name": "Eryclone Anti-D IgM",
						"image": "https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/blood-bank/eryclone%20item/Eryclone-Anti-D-IgM.jpg",
						"description": "ANTI-D is a saline-reacting Rho(D) typing reagent for slide and tube tests, formulated as a monoclonal IgM antibody derived from an EBV-transformed human B cell line with a high titre of ≥1:256 and 100% specificity to the Rho(D) antigen. It meets AABB and FDA standardization requirements and offers a 24-month shelf life when stored at 2–8 °C, with availability in multiple pack sizes."
					}
				]
			}
		]
	}
];

const category = {
	title: "Blood Bank",
	description: "Advanced blood bank systems and equipment for comprehensive laboratory diagnostics",
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

			<div className="flex flex-wrap gap-3 min-[913px]:gap-6">
				{group.products.map((product, idx) => (
					<div key={product.id} className="w-[calc(50%-0.375rem)] min-[913px]:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]">
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

export default function BloodBank() {
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
					<Image src="/asset/logo/background.webp" alt="Blood Bank background" fill className="object-cover w-full h-full" priority />
					<div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0b1338]/30 via-[#0b1338]/55 to-[#0b1338]/85" style={{ zIndex: 1 }} />
				</div>
				<div className="absolute inset-0 w-full h-full z-10">
					<ParticlesBackground containerId="blood-bank-particles" />
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
					<p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-[912px]:text-sm max-[912px]:mb-4">Our team of specialists is ready to help you find the perfect blood bank solution for your laboratory needs.</p>
					<motion.a href="/user/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-[#2B3990] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl inline-block max-[912px]:px-6 max-[912px]:py-3 max-[912px]:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contact Our Experts</motion.a>
				</div>
			</motion.section>

			{selected && <Modal product={selected} brand={brandFor(selected)} onClose={() => setSelected(null)} />}
		</div>
	);
}
