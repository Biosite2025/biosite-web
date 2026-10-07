"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "surgical-disposable",
	"title": "Surgical Disposables",
	"description": "Staplers, trocars, and single-use surgical devices"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "cak", name: "CAK", logo: "/asset/logo/cak.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Disposable Endo Cutter Stapler and Cartridge (KUN Type)","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Endo%20Cutter%20Stapler%20and%20Cartridge%20KUN%20Type.png","description":"Disposable endoscopic cutter stapler with reliable cartridge for minimally invasive surgical procedures.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":2,"name":"Disposable Endo Cutter Stapler and Cartridge (QIAN Type)","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Endo%20Cutter%20Stapler%20and%20Cartridge-QIAN%20type.png","description":"Advanced endoscopic cutter stapler designed for precision and consistent performance in laparoscopic surgery.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":3,"name":"Disposable Prolapse Hemorrhoids Stapler (PPH)","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Prolapse%20Hemorrhoids%20Stapler%20and%20Accessories%20(PPH).png","description":"PPH stapler for hemorrhoidectomy procedures with complete accessories for optimal results.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":4,"name":"Disposable Prolapse Hemorrhoids Stapler (TST)","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Prolapse%20Hemorrhoids%20Stapler%20and%20Accessories%20(TST).png","description":"TST stapler system for transanal stapling technique in hemorrhoid treatment.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":5,"name":"Disposable Circular Stapler","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Circular%20Stapler.png","description":"Circular stapler for end-to-end, end-to-side, and side-to-side anastomoses in gastrointestinal surgery.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":6,"name":"Disposable Linear Cutter Stapler and Cartridge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Linear%20Cutter%20Stapler%20and%20Cartridge.png","description":"Linear cutter stapler for transection and simultaneous stapling in thoracic and abdominal procedures.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":7,"name":"Disposable Linear Stapler and Cartridge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Linear%20Stapler%20and%20Cartridge.png","description":"Linear stapler for tissue approximation and hemostasis in various surgical applications.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":8,"name":"Disposable Curved Cutter Stapler and Cartridge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Curved%20Cutter%20Stapler%20and%20Cartridge.png","description":"Curved cutter stapler for enhanced access in confined surgical spaces and difficult-to-reach areas.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":9,"name":"Disposable Laparoscopic Trocar","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Laparoscopic%20Trocar.png","description":"Laparoscopic trocar system for safe and efficient access in minimally invasive procedures.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":10,"name":"Disposable Wound Protector","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Wound%20Protector.png","description":"Surgical wound protector to minimize contamination and protect incision sites during procedures.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":11,"name":"Disposable Endo Bag","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Endo%20Bag.png","description":"Endoscopic specimen retrieval bag for safe removal of tissue and organs during laparoscopic surgery.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":12,"name":"Disposable Skin Stapler","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Skin%20Stapler.png","description":"Skin stapler for fast and reliable wound closure with consistent staple formation.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":13,"name":"Disposable Purse String Stapler","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Purse%20String%20Stapler.png","description":"Purse string stapler for creating secure circular anastomoses in gastrointestinal procedures.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
	{"id":14,"name":"Disposable Circumcision Stapler","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/surgical/Disposable%20Circumcision%20Stapler.png","description":"Circumcision stapler for safe, efficient, and minimally invasive circumcision procedures.","brand":"cak","brandName":"CAK","brandLogo":"/asset/logo/cak.png"},
];

export default function SurgicalDisposable() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="surgical disposables" />;
}
