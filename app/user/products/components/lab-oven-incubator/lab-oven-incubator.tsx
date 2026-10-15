"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "lab-oven-incubator",
	"title": "Lab Oven & Incubator",
	"description": "Advanced lab oven incubator systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "haier", name: "Haier", logo: "/asset/logo/HAIER.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"CO₂ Incubator","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/hcp-168-front-2.webp","description":"The CO2 incubator is the most important piece of equipment for biosafety laboratory R&D. The Haier Biomedical CO2 incubator uses professional and superior technology to provide reliable conditions for frontline medical staff to carry out epidemiological and translational research, and to create a stable cell and virus culture environment for researchers.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":2,"name":"Drying Oven","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/drying-oven.webp","description":"Typically used for drying and sterilization of laboratory consumables, instruments and samples; as well as heating and curing, drying and dehydration, heat removal, moisture content determination of materials and samples in the fields of medicine, chemical industry, agricultural products as key examples. Other uses include, high temperature heat resistance tests and thermal aging tests of rubber, plastic products and electrical insulation materials.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":3,"name":"Standard Incubator","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/standard-incubator.webp","description":"The solution is widely used in bacteria, fungi and other microorganisms culture; as well as enzyme digestion reaction, ligation reaction, embedded incubation and other related constant temperature experiments.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":4,"name":"Cooled Incubator","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/hsp-260-left.webp","description":"The equipment finds extensive use across variety of settings, including the scientific research institutions, university laboratories and production departments, in the realms of environmental conservation, public health and epidemic prevention, agriculture and animal husbandry, drug testing, and aquatic industries. It is highly specialized in cultivation, enabling it to meet the cultivation and preservation of most bacteria, molds, and microorganisms, as well as to serve purposes such as water analysis and biochemical oxygen demand (BOD) determination, and it can also conduct darkroom cultivation of plant tissues.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":5,"name":"Climate Chamber","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/hhs-256.webp","description":"Drug stability tests (made for stability studies according to ICH guidelines), cosmetic stability tests, food shelf life tests, electronic components aging tests, packaging material stability tests.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":6,"name":"Climate Chamber - Compressor Series","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/hhs-810.webp","description":"Used for drug stability testing, food shelf-life testing, electronic component aging testing, microbiological research, sample storage.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":7,"name":"CO₂ Incubator 168E front","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/lab-oven-incubator/web/co2-incubator-168e-front.webp","description":"Haier Biomedical CO2 incubator with 90°C moist heat sterilization provides a safe and secure reproducible growth environment for cell cultures.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function LabOvenIncubator() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="incubation" />;
}
