"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "clinical-microscopy",
	"title": "Clinical Microscopy",
	"description": "Automated urinalysis and fecalysis systems for comprehensive clinical microscopy"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "acon", name: "ACON", logo: "/asset/logo/ACON.png" },
	{ id: "zybio", name: "Zybio", logo: "/asset/logo/ZYBIO.png" },
	{ id: "keyu", name: "Keyu", logo: "/asset/logo/KEYU.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Acon U500","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/acon-u500.png","description":"The analyzer features up to 500 tests/hour which is suitable for medium volume labs or small hospitals. It offers a large color touchscreen display for intuitive menu navigation. It has the ability to input urine color and clarity for better record keeping. Abnormal results are also automatically flagged by the analyzer.","brand":"acon","brandName":"ACON","brandLogo":"/asset/logo/ACON.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[130px]"},
	{"id":2,"name":"Zybio U1600","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/zybio-u1600.png","description":"The Zybio U1600 is a high-throughput urine chemistry analyzer that measures over 14 chemical parameters plus physical indicators like color, specific gravity, and turbidity. It features an 8-inch touchscreen, automated strip loading, and delivers up to 240 tests per hour, making it ideal for efficient lab workflows.","brand":"zybio","brandName":"Zybio","brandLogo":"/asset/logo/ZYBIO.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px]"},
	{"id":3,"name":"Zybio U2600","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/zybio-u2600.png","description":"The Zybio U2600 is a high-throughput urine sediment analyzer that uses laminar flow, high-speed imaging, and medical image recognition to deliver accurate classification of urine particles. It processes up to 120 tests per hour, supports 46 particle parameters, and offers 60 sample positions with STAT prioritization.","brand":"zybio","brandName":"Zybio","brandLogo":"/asset/logo/ZYBIO.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px]"},
	{"id":4,"name":"Zybio U3600","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/zybio-u3600.png","description":"ZYBIO U3600 is a fully automated biochemical analyzer used in clinical laboratories for the analysis of various biochemical parameters in blood and other body fluids. This instrument is designed to perform a wide range of tests, including those for liver function, kidney function, lipid profiles, and more.","brand":"zybio","brandName":"Zybio","brandLogo":"/asset/logo/ZYBIO.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px]"},
	{"id":5,"name":"KU-F40","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/KU-F40.png","description":"The sealing design prevents liquid waste and exhaust odor. Easy to operate with 50 samples available in the waiting tray and it is equipped with Iodine Staining. Fully automatic and avoids biological risks. Automatic input information with both-way LIS transmission. Perform test different elements simultaneously with Iodine Staining. Fully automatic and avoids biological risks. Perform test different elements simultaneously with multi-channel. Automatic input information with both-way LIS transmission.","brand":"keyu","brandName":"Keyu","brandLogo":"/asset/logo/KEYU.png","brandLogoClass":"h-[20px] sm:h-[24px] max-w-[125px]"},
	{"id":6,"name":"KU-F600","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/KU-F600.png","description":"Testing speed: 10-30 specimens per hour. Combination of high-powered and low-powered microscope examination. Globally innovative methods for detecting special worm eggs and parasites. Deep learning AI recognition function with recognition capability. Fully sealed sampling cup; Single sample loading method. High-precision reusable quartz counting plate. Tomographic scanning with high image clarity.","brand":"keyu","brandName":"Keyu","brandLogo":"/asset/logo/KEYU.png","brandLogoClass":"h-[20px] sm:h-[24px] max-w-[125px]"},
	{"id":7,"name":"KU-F20","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/clinical-microscopy/KU-F20.png","description":"Disposable dedicated sampling cup. Tube rack with track-style sample loading method. Deep learning function with initial AI recognition capability. High-precision reusable quartz counting plate. Combination of high-powered and low-powered microscope examination, with a high detection rate for worm eggs and protozoa.","brand":"keyu","brandName":"Keyu","brandLogo":"/asset/logo/KEYU.png","brandLogoClass":"h-[20px] sm:h-[24px] max-w-[125px]"},
];

export default function ClinicalMicroscopy() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="clinical microscopy" />;
}
