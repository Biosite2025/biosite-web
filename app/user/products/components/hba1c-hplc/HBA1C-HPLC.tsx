"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "hba1c-hplc",
	"title": "HBA1C - HPLC",
	"description": "Advanced HBA1C - HPLC systems for accurate diabetes monitoring and management"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "tosoh", name: "Tosoh", logo: "/asset/logo/TOSOH.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"TOSOH HLC-723 G11","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/HBA1C%20-%20HPLC/TOSOH%20HLC-723%20G11.png","description":"The Tosoh HLC-723G11 features fast start-up and daily checks, with analyzing routines completed in seconds. It delivers high-resolution chromatograms and results in as little as 30 seconds in standard mode or 60 seconds in variant mode. Simple operation with one-button analysis makes it ideal for efficient HbA1c testing.","brand":"tosoh","brandName":"Tosoh","brandLogo":"/asset/logo/TOSOH.png"},
	{"id":2,"name":"TOSOH HLC-723 GX","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/HBA1C%20-%20HPLC/TOSOH%20HLC-723%20GX.png","description":"The Tosoh HLC-723GX offers stable HbA1c results with variant detection in just 2.2 minutes and first results in 6.6 minutes. It is designed for low-volume HbA1c testing and incorporates all the qualities of Tosoh’s best-in-class analyzers. Reliable and efficient, it is ideal for routine glycohemoglobin analysis.","brand":"tosoh","brandName":"Tosoh","brandLogo":"/asset/logo/TOSOH.png"},
];

export default function HBA1CHPLC() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="HbA1c testing" />;
}
