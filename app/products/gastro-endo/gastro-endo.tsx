"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "gastro-endo",
	"title": "Gastro / Endo Equipments",
	"description": "Gastroenterology and endoscopy equipment for diagnostic and therapeutic procedures"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "edan", name: "EDAN", logo: "/asset/logo/EDAN.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"C6 HD / C6A HD","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/medical-equipments/C6 HD&C6A HD.png","description":"The Edan C6A / C6AHD Video Colposcope provides high-definition cervical imaging with an LED cold light system, rapid auto-focusing, and magnification ranging from 1× to 36×. It features an electronic green filter for enhanced vascular visibility, built-in timers for acetic acid/iodine tests, and supports image capture, reporting, and DICOM compatibility.","brand":"edan","brandName":"EDAN","brandLogo":"/asset/logo/EDAN.png"},
];

export default function GastroEndo() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="gastro and endoscopy" />;
}
