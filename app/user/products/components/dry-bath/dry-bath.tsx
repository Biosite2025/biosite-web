"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "dry-bath",
	"title": "Dry Bath / Vortex Mixer",
	"description": "Advanced dry bath systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "dlab", name: "DLAB", logo: "/asset/logo/DLAB.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"HP-550 PRO","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-hp-550-pro.png","description":"High-performance laboratory hotplate with precise temperature control, designed for reliable heating applications in research and routine labs.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"HP-500 PRO","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-hp-500-pro.png","description":"Compact digital hotplate offering uniform heating and stable temperature control for daily laboratory use.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"DLAB MS7-H550-S","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-ms7-h550-s.png","description":"Magnetic stirrer with heating function, suitable for routine mixing and heating tasks with reliable speed and temperature stability.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":4,"name":"DLAB MS7-H550-PRO","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-ms7-h550-pro.png","description":"Advanced digital hotplate magnetic stirrer with precise control, designed for demanding laboratory mixing and heating applications.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":5,"name":"DLAB MS10-H500-PRO","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-ms10-h500-pro.png","description":"High-capacity hotplate magnetic stirrer engineered for larger volumes, providing strong stirring performance and accurate temperature control.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":6,"name":"DSC-300D","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-dsc-300d.png","description":"Digital blood shaker designed for gentle and uniform mixing of blood samples in laboratories and blood banks.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":7,"name":"PS-600T","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-ps-600t.png","description":"Multi-purpose laboratory shaker suitable for blood bags and sample containers, offering stable and adjustable shaking motion.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":8,"name":"SR-100","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/dry-bath/dlab-sr-100.png","description":"Compact rotator / shaker for continuous and gentle mixing of laboratory samples, ideal for routine workflows.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function DryBath() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="dry bath" />;
}
