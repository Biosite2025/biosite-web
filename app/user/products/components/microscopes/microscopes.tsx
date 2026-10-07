"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "microscopes",
	"title": "Microscopes",
	"description": "Upright microscopes for clinical, educational, and research applications"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "nikon", name: "Nikon", logo: "/asset/logo/nikon.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"ECLIPSE Ci","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Ci.png","description":"Ergonomic upright microscope with eco-illumination for clinical and laboratory applications.","brand":"nikon","brandName":"Nikon","brandLogo":"/asset/logo/nikon.png"},
	{"id":2,"name":"ECLIPSE E100","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20E100.png","description":"Educational microscope offering outstanding optical performance and ergonomic features for easy, stress-free operation.","brand":"nikon","brandName":"Nikon","brandLogo":"/asset/logo/nikon.png"},
	{"id":3,"name":"ECLIPSE Ei","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Ei.png","description":"Educational microscope with unique digital and design solutions to ensure smooth progress of science and technology.","brand":"nikon","brandName":"Nikon","brandLogo":"/asset/logo/nikon.png"},
	{"id":4,"name":"ECLIPSE Ni","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Ni.png","description":"Research and clinical upright microscope supporting biological science and medical research, with excellent optical performance and high system expandability.","brand":"nikon","brandName":"Nikon","brandLogo":"/asset/logo/nikon.png"},
	{"id":5,"name":"ECLIPSE Si","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/nikon/ECLIPSE%20Si.png","description":"Ergonomically designed upright microscope bringing comfort and precision to your operation with advanced hardware and software solutions.","brand":"nikon","brandName":"Nikon","brandLogo":"/asset/logo/nikon.png"},
];

export default function Microscopes() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="microscopy" />;
}
