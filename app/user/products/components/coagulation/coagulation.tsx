"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "coagulation",
	"title": "Coagulation & Hemostasis",
	"description": "Advanced coagulation systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "werfen", name: "Werfen", logo: "/asset/logo/WERFEN.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"ACL Elite Pro","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/coagulation/acl-elite-pro.png","description":"Compact, easy-to-use haemostasis systems designed to help small to mid-volume haemostasis labs maximize productivity and improve patient care.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":2,"name":"ACL Top 350","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/coagulation/acl-top-350.png","description":"Offers operational efficiency and quality; continuous operation; simple maintenance; fast turnaround time for results (PT results in 3 minutes or less) for routine or special testing.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":3,"name":"ACL TOP 550","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/coagulation/ACL TOP 550.png","description":"Superior functionality at the right size. Highly automated testing in routine mid- to high-volume and specialty labs.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":4,"name":"ACL TOP 750","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/coagulation/ACL TOP 750.png","description":"Runs more tests in less time; user-friendly and high throughput for routine analysis in the labs with the heaviest work loads.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":5,"name":"Werfen AcuStar","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/coagulation/werfen%20acustar.png","description":"The first specialty testing analyzer to offer full automation of highly sensitive immunoassays, the ACL AcuStar delivers unprecedented accuracy and efficiency.  Advanced assay technology, complemented with end-to-end automation, enhances simplicity and throughput, with uncompromised results. Complete specialty testing in as little as 25 minutes, with no special training required.","brand":"werfen","brandName":"Werfen","brandLogo":"/asset/logo/WERFEN.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
];

export default function Coagulation() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="coagulation" />;
}
