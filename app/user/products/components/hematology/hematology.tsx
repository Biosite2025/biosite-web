"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "hematology",
	"title": "Hematology",
	"description": "Advanced hematology systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "dymind", name: "Dymind", logo: "/asset/logo/DYMIND.png" },
	{ id: "genrui", name: "Genrui", logo: "/asset/logo/GENRU.png" },
	{ id: "zybio", name: "Zybio", logo: "/asset/logo/ZYBIO.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Dymind DF-55","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/dymind-df-55.png","description":"Fully automated hematology analyzer designed for routine blood testing, offering reliable CBC analysis with efficient throughput. BIOSITE PRODUCT CATALOG VERSION…","brand":"dymind","brandName":"Dymind","brandLogo":"/asset/logo/DYMIND.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[90px]"},
	{"id":2,"name":"Genrui KT-60","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/genrui-kt-60.png","description":"Compact semi-automatic biochemistry analyzer suitable for small to medium laboratories, providing accurate and cost-effective biochemical testing. BIOSITE PRODUCT CATALOG VERSION…","brand":"genrui","brandName":"Genrui","brandLogo":"/asset/logo/GENRU.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[106px]"},
	{"id":3,"name":"Z52","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/Z52.png","description":"Compact bench-top centrifuge designed for routine laboratory sample separation with stable performance and easy operation. BIOSITE PRODUCT CATALOG VERSION…","brand":"zybio","brandName":"Zybio","brandLogo":"/asset/logo/ZYBIO.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px]"},
	{"id":4,"name":"KT-8000","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/KT-8000.png","description":"Fully automated biochemistry analyzer built for high-efficiency clinical laboratories, offering high throughput and precise biochemical analysis. BIOSITE PRODUCT CATALOG VERSION…","brand":"genrui","brandName":"Genrui","brandLogo":"/asset/logo/GENRU.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[106px]"},
	{"id":5,"name":"EXC 8010","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/EXC%208010.png","description":"High-speed clinical centrifuge designed for blood banks and laboratories, suitable for continuous operation with reliable separation performance. BIOSITE PRODUCT CATALOG VERSION…","brand":"zybio","brandName":"Zybio","brandLogo":"/asset/logo/ZYBIO.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px]"},
	{"id":6,"name":"DH-800","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/DH%20800.png","description":"The DH-800 is a high-performance hematology analyzer that delivers fast and accurate blood cell analysis with advanced technology. It supports comprehensive differential parameters, high-throughput testing, and efficient workflow, making it suitable for busy clinical laboratories","brand":"dymind","brandName":"Dymind","brandLogo":"/asset/logo/DYMIND.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[90px]"},
	{"id":7,"name":"DH-615","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hematology/DH-615.png","description":"The DH-615 is an AI-powered hematology analyzer that provides accurate 6DIFF and RET results using advanced multi-system blood cell analysis and dual platelet methods. It supports automatic capillary sampling with barcode scanning for faster, more efficient testing and features a flexible design to meet various laboratory needs.","brand":"dymind","brandName":"Dymind","brandLogo":"/asset/logo/DYMIND.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[90px]"},
];

export default function Hematology() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="hematology" />;
}
