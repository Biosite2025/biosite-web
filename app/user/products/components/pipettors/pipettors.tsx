"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "pipettors",
	"title": "Pipettors",
	"description": "Accurate and ergonomic pipettors for precise liquid handling in laboratories."
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "dlab", name: "DLAB", logo: "/asset/logo/DLAB.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Micropette Plus","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pipettors/micropette-plus.png","description":"Micropette Plus: Fixed volume pipettor for routine and repetitive pipetting tasks.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"Micropette Plus 2","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pipettors/micropette-plus2.png","description":"Micropette Plus 2: Enhanced ergonomic pipettor for comfortable and precise pipetting.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"Micropette Plus 3","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pipettors/micropette-plus3.png","description":"Micropette Plus 3: Advanced pipettor for demanding laboratory applications.","brand":"dlab","brandName":"DLAB","brandLogo":"/asset/logo/DLAB.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function Pipettors() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="pipetting" />;
}
