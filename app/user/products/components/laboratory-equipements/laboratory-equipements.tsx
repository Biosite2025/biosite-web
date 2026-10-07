"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "laboratory-equipements",
	"title": "Laboratory Equipments",
	"description": "Laboratory equipment consumables and supporting instrumentation"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "haier", name: "Haier", logo: "/asset/logo/HAIER.png" },
	{ id: "hermle", name: "Hermle", logo: "/asset/logo/HERMLE.png" },
	{ id: "dlab", name: "DLAB", logo: "/asset/logo/DLAB.png" },
	{ id: "tuttnauer", name: "Tuttnauer", logo: "/asset/logo/TUTTNAUER.png" },
	{ id: "nikon", name: "Nikon", logo: "/asset/logo/nikon.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Biosafety Cabinets, Laminar Flow and Clean Benches","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/Biosafety-Cabinets-Laminar-Flow-and-Clean-Benches.png","description":"Biosafety cabinets, laminar flow hoods, and clean benches provide safe, sterile environments for laboratory work, protecting samples and users from contamination and ensuring reliable results in research and clinical applications.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"Blood Banking Centrifuge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/Blood-Banking-Centrifuge.png","description":"Blood banking centrifuges are designed for the safe and efficient separation of blood components, supporting critical processes in blood banks and clinical laboratories.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"Cold Chain Storage, Biomedical Refrigerators, Freezers & Blood Bank Refrigerators","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/Cold-Chain-Storage-Biomedical-Refrigerators-Freezers.png","description":"Cold chain storage solutions, including biomedical refrigerators, freezers, and blood bank refrigerators, ensure the safe preservation of sensitive samples, reagents, and blood products at controlled temperatures for laboratory and clinical use.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":4,"name":"Compact Universal Micro High Speed Filtration & Large Volume Centrifuge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/Compact-Universal-Micro-High-Speed-Filtration&Large-Volume-Centrifuge.png","description":"Hermle centrifuges offer versatility in biological, chemical or medical laboratory and is the variable in the research area. It is also the ideal solution for clinics or medical practices. More than ten different rotors can be used and thus the most common applications are perfectly covered.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":5,"name":"Laboratory Microscopes","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/Laboratory-Microscopes.png","description":"Nikon laboratory microscopes offer precision optics and durable engineering, delivering high-resolution images for applications such as clinical diagnostics, research, and education. Including models with brightfield, phase contrast, darkfield, fluorescence, and LED illumination, they are built for ease-of-use, reliability, and consistent performance in demanding lab environments.","brand":"nikon","brandName":"Nikon","brandLogo":"/asset/logo/nikon.png"},
	{"id":6,"name":"MicroPette","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/MicroPette.png","description":"MicroPette single and multi-channel pipettors cover a volume range from 0.1μL to 10mL. 8 and 12 channel pipettes are appropriate for 96 well plates. Ergonomic design provides excellent operating experience. Large display window allows for easy volume identification. Easy calibration and maintenance.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":7,"name":"T-LAB Eco V85","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/T-LAB-Eco-V85.png","description":"This vertical floor-standing autoclave covers the fundamental needs for general lab sterilization with the aim of increasing the productivity of your laboratory. Offering the best universal capacity, together with the optimization of resources such as water, power and operating time results.","brand":"tuttnauer","brandName":"Tuttnauer","brandLogo":"/asset/logo/TUTTNAUER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":8,"name":"Vertical Automatic High-pressure Steam Sterilizer","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-equipements/Vertical-Automatic-High-pressure-Steam-Sterilizer.png","description":"Vertical automatic high-pressure steam sterilizers provide reliable and efficient sterilization for laboratory instruments and materials, ensuring safety and compliance in laboratory operations.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function LaboratoryEquipements() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="laboratory equipment" />;
}
