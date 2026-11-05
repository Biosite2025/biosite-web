"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "biomedical-freezers",
	"title": "Biomedical Freezers",
	"description": "Advanced biomedical freezers systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "haier", name: "Haier", logo: "/asset/logo/HAIER.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"DW-25L92","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-25L92.png","description":"Compact −25 °C medical freezer for safe storage of reagents, vaccines, plasma, and biological samples. Suitable for laboratories and small healthcare facilities.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"DW-40L262","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40L262.png","description":"Medium-capacity −40 °C biomedical freezer designed for long-term preservation of plasma, biological materials, and laboratory samples with stable temperature control.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"DW-40L278","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40L278.png","description":"Upright −40 °C medical freezer offering slightly higher storage capacity, ideal for hospitals, blood banks, and research laboratories requiring reliable low-temperature storage.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":4,"name":"DW-40L348","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40L348.png","description":"High-capacity −40 °C biomedical freezer for large-volume storage of biological samples, reagents, and plasma in clinical and research environments.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":5,"name":"DW-40L508","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40L508.png","description":"Extra-large −40 °C medical freezer designed for centralized laboratories and blood centers needing high-volume, stable ultra-low temperature storage.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":6,"name":"DW-40W100","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40W100.png","description":"Compact −40 °C chest freezer optimized for energy efficiency and uniform cooling, suitable for laboratories with limited space.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":7,"name":"DW-40W255","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40W255.png","description":"Mid-size −40 °C chest-type biomedical freezer providing reliable low-temperature storage with easy access and consistent cooling performance.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":8,"name":"DW-40W380","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-40W380.png","description":"Large-capacity −40 °C chest freezer designed for bulk storage of biological materials in hospitals, research institutes, and blood banks.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":9,"name":"DW-25L262","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-25L262.png","description":"Upright −25 °C medical freezer for routine cold storage of pharmaceuticals, reagents, vaccines, and laboratory samples.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":10,"name":"DW-SERIES","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biomedical-freezers/DW-SERIES.png","description":"A full range of biomedical freezers (−25 °C to −40 °C) engineered for hospitals, laboratories, blood banks, and research facilities, offering precise temperature control, safety alarms, and reliable long-term storage.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function BiomedicalFreezers() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="freezer storage" />;
}
