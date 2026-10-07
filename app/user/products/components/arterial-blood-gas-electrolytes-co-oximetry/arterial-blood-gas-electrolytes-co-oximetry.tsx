"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "arterial-blood-gas-electrolytes-co-oximetry",
	"title": "Arterial Blood Gas, Electrolytes & Co-Oximetry",
	"description": "Advanced arterial blood gas, electrolytes and co-oximetry systems for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "werfen", name: "Werfen", logo: "/asset/logo/WERFEN.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"GEM Premier 3500 with iQM","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/arterial-blood-gas-electrolytes-co-oximetry/gem-3500.png","description":"The GEM Premier 3500 with Intelligent Quality Management (iQM) delivers simple, reliable, and flexible point-of-care testing. Its disposable GEM PAK and touchscreen ensure zero maintenance, while the large sampling area, barcode scanner, and versatile test menu enable fast, efficient Acute Care diagnostics.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":2,"name":"GEM Premier 5000 with iQM2","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/arterial-blood-gas-electrolytes-co-oximetry/gem-5000.png","description":"GEM Premier 5000 blood gas testing system provides automated quality assurance with every whole blood sample. With next-generation Intelligent Quality Management (iQM2), featuring IntraSpect technology, potential errors are detected not only before and after, but also during sample analysis, along with real-time correction and documentation.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":3,"name":"GEM Premier ChemSTAT","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/arterial-blood-gas-electrolytes-co-oximetry/gem-chemstat.png","description":"The GEM Premier ChemSTAT is a point-of-care whole blood analyzer designed for acute care settings. It measures electrolytes, metabolites (like glucose and creatinine), hematocrit, pH, partial pressure of CO₂, lactate, among others—all from a single cartridge and specimen. It uses intelligent quality management (iQM) for continuous monitoring, automatic error detection, and correction, enabling fast and reliable results for clinical decision making.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":4,"name":"GEM Premier 7000 with iQM3","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/arterial-blood-gas-electrolytes-co-oximetry/GEM-Premier-7000-with-iQM3.png","description":"The GEM Premier 7000 with iQM3 is a cutting-edge point-of-care blood gas testing system that integrates hemolysis detection in ~45 seconds. It measures key parameters like pH, electrolytes, lactate, CO-oximetry, and more, while continuously monitoring sample quality to reduce pre-analytical errors and improve diagnostic accuracy.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
];

export default function ArterialBloodGas() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="blood gas testing" />;
}
