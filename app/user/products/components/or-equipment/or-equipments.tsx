"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "or-equipment",
	"title": "OR Equipment",
	"description": "Operating room equipment including electrocardiographs, endoscopy systems, and laparoscopy solutions"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "fujifilm", name: "FUJIFILM", logo: "/asset/logo/FUJIFILM.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"iSE Series – Electrocardiograph (ECG)","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/medical-equipments/iSE Series.png","description":"iSE supports both 18-lead and 12-lead applications. Looking and functioning like a tablet, it intends to bring exceptional mobile experience and to build a seamless connection to the IT systems. It is competent to fit into mobile applications such as ambulance or first-aid, as well as modern paperless informationized hospitals."},
	{"id":2,"name":"ELUXEO 700 System","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/medical-equipments/ELUXEO%20700%20System.png","description":"The Fujifilm ELUXEO 7000 System is an advanced endoscopic video processor & light source platform featuring 4-LED Multi-Light™ technology for improved visualization modes like BLI (Blue Light Imaging) and LCI (Linked Color Imaging). It delivers ultra-definition imaging, compatibility with 500-, 600-, and 700-series scopes, efficient LED illumination, and integrated data backup with DICOM compatibility.","brand":"fujifilm","brandName":"FUJIFILM","brandLogo":"/asset/logo/FUJIFILM.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px] sm:max-w-[105px]"},
	{"id":3,"name":"4K Laparoscopy System","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/medical-equipments/4K%20Laparoscopy%20System.png","description":"The 4K Laparoscopy System delivers ultra-high definition imaging with its 3840×2160 native resolution camera and LED light source, offering superior clarity for minimally invasive procedures. Features include multi-output connectivity, enhanced color fidelity, and integrated surgical recording for optimized workflow and precision."},
];

export default function OrEquipments() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="operating room" />;
}
