"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "laboratory-disposables",
	"title": "Laboratory Disposables",
	"description": "Tubes, tips, slides, containers, and other laboratory disposables"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "bruner", name: "Bruner", logo: "/asset/logo/BRUNER.png" },
	{ id: "asep", name: "Asep", logo: "/asset/logo/ASEP.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Vacuum Blood Tubes","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Vacuum-Blood-Tubes.png","description":"Vacuum Blood Tubes are sterile glass or plastic test tubes with a colored rubber stopper creating a vacuum seal inside of the tube, facilitating the drawing of a predetermined volume of liquid. Contains additives designed to stabilize and preserve the specimen prior to analytical testing.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":2,"name":"Microscope Slides & Coverslip","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Microscope-Slides-&-Coverslip.png","description":"Bruner Microscope Slides and Coverslips are available in plain and frosted glass that are made of high-quality optical glass for clear sample identification. The glass slides are light and thin with good light transmission, enables clear sample identification.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":3,"name":"URS-4SG & URS-10A","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/URS-4SG-&-URS-10A.png","description":"Bruner URS contains 100 pieces reagent strips for urinalysis. Individual results for each parameter to international increments. Professional quality accuracy suitable for doctors, surgeries, A&E and healthcare clinics.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":4,"name":"Filtered Tips","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Filtered-Tips.png","description":"Bruner filtered tip guarantees the increased accuracy of pipetting and to prevent aerosol bypass during delivery of the samples. It is ideal for applications that are sensitive to trace and it helps to protect the danger of cross-contamination. Universal fit and compatible with most brand.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":5,"name":"Specimen Containers","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Specimen-Containers.png","description":"Bruner Specimen Container are made of medical plastic which forms a closed collection and transportation of specimens providing clean and convenient testing. Available for stool, urine and sputum specimen containers.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":6,"name":"Pipette Tips","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Pipette-Tips.png","description":"Pipette Tips are disposable, autoclavable attachments for the uptake and dispensing of liquids using a pipette. Micropipettes are used in a number of laboratories. A research/ diagnostic lab can use pipette tips to dispense liquids into a well plate for PCR assays.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":7,"name":"Sharps Container","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Sharps-Container.png","description":"Disposable Sharps Container help reduce the risk of infections from used needles and other sharps. It is made from rigid plastic and clearly labeled to warn for the hazardous waste inside the container. It comes with a variety of sizes and closure types.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":8,"name":"ABG Syringe","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/ABG-Syringe.png","description":"ABG Syringe is a sterile, single-use syringe designed for arterial blood gas sampling.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":9,"name":"Capillary ABG Sampler","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Capillary-ABG-Sampler.png","description":"Capillary ABG Sampler is a sterile device for capillary blood gas collection.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":10,"name":"PCR 8 Strips & Film","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/PCR-8-Strips-&-Film.png","description":"PCR 8 Strips & Film are disposable consumables for PCR sample preparation.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":11,"name":"PCR Plates","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/PCR-Plates.png","description":"PCR Plates are disposable plates for PCR sample processing.","brand":"bruner","brandName":"Bruner","brandLogo":"/asset/logo/BRUNER.png"},
	{"id":12,"name":"Tournistrip","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/laboratory-disposables/Tournistrip.png","description":"Asep Tournistrip looks and operates like a conventional tourniquet. Its unique design and construction means the tourniquet is truly single-use and it cannot be re-used.","brand":"asep","brandName":"Asep","brandLogo":"/asset/logo/ASEP.png"},
];

export default function LaboratoryDisposables() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="laboratory disposables" />;
}
