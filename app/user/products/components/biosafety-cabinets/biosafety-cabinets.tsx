"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "biosafety-cabinets",
	"title": "Biosafety Cabinets",
	"description": "Advanced biosafety cabinets systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "haier", name: "Haier", logo: "/asset/logo/HAIER.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Class Series","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biosafety-cabinets/class-series.png","description":"A professional localized air purification equipment suitable for pharmaceuticals, medical and health, scientific research laboratories of universities and colleges, photoelectric / microelectronics manufacturing and other fields","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"HR1200-IIA2-D","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biosafety-cabinets/HR1200-IIA2-D.png","description":"Energy efficient Class I microbiological safety cabinet with two DC fans, dual exhaust HEPAs and long lasting LED lights. Suitable for microbiology, biomedicine, biosafety laboratories and other laboratories. It offers three levels of protection - operator, product and environment.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"HR1200-IIA2-S","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biosafety-cabinets/HR1200-IIA2-S.png","description":"These are standard Class II microbiological safety cabinets suitable for basic cell biology, microbiology, biomedicine, biosafety laboratories and other laboratories. It is the most basic protection and isolation equipment for biosafety.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":4,"name":"HR1200-IIA2-X","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/biosafety-cabinets/HR1200-IIA2-X.png","description":"The X series of standard Class II microbiological safety cabinets are suitable for basic cell biology, microbiology, biomedicine, biosafety laboratories and other laboratories. It is the most basic protection and isolation equipment for biosafety.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function BiosafetyCabinets() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="biosafety cabinet" />;
}
