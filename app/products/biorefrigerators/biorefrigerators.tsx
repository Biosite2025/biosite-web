"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "biorefrigerators",
	"title": "Biorefrigerators",
	"description": "Advanced biorefrigerators systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "haier", name: "Haier", logo: "/asset/logo/HAIER.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"HYC-68&68A","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-68&68A.png","description":"Compact 2–8 °C medical refrigerator for vaccines, reagents, and pharmaceuticals. Ideal for clinics and small labs.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"HYC-118&118A","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-118&118A.png","description":"Small-capacity 2–8 °C biomedical refrigerator with precise temperature control for routine medical storage.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"HYC-290","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-290.png","description":"Medium-capacity pharmacy refrigerator designed for stable storage of medicines, vaccines, and laboratory reagents.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":4,"name":"HYC-390&390F","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-390&390F.png","description":"Large 2–8 °C medical refrigerator suitable for hospitals and laboratories; \"F\" version includes advanced airflow or frost-free features.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":5,"name":"HYC-610","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-610.png","description":"High-capacity biomedical refrigerator for centralized medical storage with uniform cooling and safety alarms.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":6,"name":"HYC-940&940F","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-940&940F.png","description":"Extra-large medical refrigerator for hospitals and blood banks; \"F\" model offers enhanced cooling performance.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":7,"name":"HYC-1378","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HYC-1378.png","description":"Ultra-large pharmacy / biomedical refrigerator designed for bulk storage in major hospitals and research facilities.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":8,"name":"HXC-149","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-149.png","description":"Compact blood bank refrigerator for safe storage of whole blood and blood components at controlled temperatures.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":9,"name":"HXC-429","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-429.png","description":"Medium-capacity blood bank refrigerator with precise temperature stability and monitoring.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":10,"name":"HXC-429T","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-429T.png","description":"Blood bank refrigerator with dual temperature display/recording for enhanced traceability and compliance.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":11,"name":"HXC-629","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-629.png","description":"Large-capacity blood bank refrigerator suitable for hospitals and transfusion centers.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":12,"name":"HXC-629T","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-629T.png","description":"Advanced blood bank refrigerator with temperature recording and alarm systems for regulatory compliance.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":13,"name":"HXC-1369","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-1369.png","description":"Extra-large blood bank refrigerator for high-volume blood storage in central blood banks.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":14,"name":"HXC-1369T","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biorefrigerators/HXC-1369T.png","description":"High-capacity blood bank refrigerator with temperature recording, designed for critical blood storage and audit-ready environments.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function Biorefrigerators() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="cold storage" />;
}
