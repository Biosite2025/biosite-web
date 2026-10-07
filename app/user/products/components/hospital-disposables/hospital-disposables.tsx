"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "hospital-disposables",
	"title": "Hospital Disposables",
	"description": "Personal protective equipment and patient-care disposables"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "dunhame", name: "Dunhame", logo: "/asset/logo/DUNHAME.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Disposable Gloves","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/Disposable%20Gloves.png","description":"• Latex Examination Gloves (Powder Free): Made from natural latex compound and powder free.\n• Vinyl Examination Gloves (Powder Free): Economical solution for individuals allergic to natural rubber latex.\n• Nitrile Examination Gloves (Powder Free): Intended for medical purposes to prevent contamination.\n• Surgical Examination Gloves (Powder Free): Help prevent contamination between caregivers and patients.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":2,"name":"PPE Coverall","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/PPE%20Coverall.png","description":"Dunhame PPE intended to be worn to protect against light spray, liquid aerosol or low pressure, low volume splashes and airborne solid particulates, infective agents, radioactive particulates, clothing with dissipative properties.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":3,"name":"Clip Cap","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/Clip%20Cap.png","description":"Dunhame disposable clip cap provide protection from foreign bodies and some fluid protection to maintain a cleanroom or sterile environments.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":4,"name":"Shoe Cover","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/Shoe%20Cover.png","description":"Dunhame shoe covers are disposable slip-on garments that fit snugly over a variety of shoe style and sizes. They prevent potentially hazardous material (including organic and chemical particles) from coming in contact with the bottom of a person’s shoes.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":5,"name":"FFP2 NR Particulate Respirator","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/FFP2%20NR%20Particulate%20Respirator.png","description":"Intended for medical work environment, filtering particulates in the air, blocking droplets, blood, body fluids, secretions, etc. Low breathing resistance and no peculiar smell.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":6,"name":"N95 Particulate Respirator","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/N95%20Particulate%20Respirator.png","description":"Intended to be used in preventing the spread of infectious materials to protect individuals and healthcare personnel in a medical setting. Uses ultrasonic welding technology for more durability and with soft nose foam for comfortable wear.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":7,"name":"Medical Face Mask","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/Medical%20Face%20Mask.png","description":"Dunhame medical-grade disposable mask for maximum comfort and breathability. It is helpful in preventing the spread of infectious materials to protect individuals and healthcare personnel. Low breathing resistance and high filtration efficiency.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":8,"name":"Disposable Syringe","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/Disposable%20Syringe.png","description":"Disposable syringes have a body made of plastic and are of various sizes. In some cases, they come with attached needles. A cover stays attached to the needle so that there are no chances of injury and it stays sterilized at the same time.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
	{"id":9,"name":"Disposable Surgical Gown","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/hospital-disposables/Disposable%20Surgical%20Gown.png","description":"Dunhame Disposable Surgical Gown is intended to be worn by health care personnel during surgical operations for protection to prevent transfer of microorganisms, body fluids, and particulate matter.","brand":"dunhame","brandName":"Dunhame","brandLogo":"/asset/logo/DUNHAME.png"},
];

export default function HospitalDisposables() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="hospital disposables" />;
}
