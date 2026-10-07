"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "dialysis-renal-equipments",
	"title": "Dialysis / Renal Equipments",
	"description": "Dialysis and renal care equipment for patient treatment and monitoring"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "biolight", name: "Biolight", logo: "/asset/logo/BIOLIGHT.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Biolight D800","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/arterial-blood-gas-electrolytes-co-oximetry/biolight-d800.png","description":"The Biolight D800 Series is a hemodialysis system designed for HD, HF, and HDF treatments, featuring a modern multifunctional design with a 15-inch touchscreen and reliable extracorporeal circuit. It supports multiple therapy options, automatic heparin pump, high-capacity battery, and ultrapurified dialysis for enhanced patient safety. Its cost-efficient design helps reduce dialysate waste and ensures continuous operation during power outages.","brand":"biolight","brandName":"Biolight","brandLogo":"/asset/logo/BIOLIGHT.png"},
];

export default function DialysisRenalEquipments() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="dialysis and renal" />;
}
