"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "icu-er-equipments",
	"title": "ICU / ER Equipments",
	"description": "Advanced ICU and emergency room equipment for critical care monitoring"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "edan", name: "EDAN", logo: "/asset/logo/EDAN.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"X12 Patient Monitor","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/medical-equipments/X12.png","description":"With its expandability of monitoring parameters the X12 series fulfills primary clinical requirements in various scenarios, including emergency rooms, general wards, rehabilitation departments, and cardiac units.","brand":"edan","brandName":"EDAN","brandLogo":"/asset/logo/EDAN.png"},
];

export default function IcuErEquipments() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="ICU and ER" />;
}
