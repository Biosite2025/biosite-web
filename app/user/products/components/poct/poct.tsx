"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "poct",
	"title": "POCT",
	"description": "Advanced poct systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "acon", name: "ACON", logo: "/asset/logo/ACON.png" },
	{ id: "sansure", name: "Sansure", logo: "/asset/logo/SANSURE.png" },
	{ id: "pts", name: "PTS Diagnostics", logo: "/asset/logo/PTS_Logo.png" },
	{ id: "ozelle", name: "Ozelle", logo: "/asset/logo/ozelle (1).png" },
	{ id: "zybio", name: "Zybio", logo: "/asset/logo/ZYBIO.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"A1CNow Plus","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/a1cnow-plus.png","description":"The A1CNow+ system from PTS Diagnostics provides healthcare professionals with a fast and easy way of getting HbA1c results – allowing informed conversations about how patients are managing their diabetes in minutes, not days.","brand":"pts","brandName":"PTS Diagnostics","brandLogo":"/asset/logo/PTS_Logo.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[75px]"},
	{"id":2,"name":"CardioChek Plus","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/cardio-chek-plus.png","description":"CardioChek Plus is a point-of-care testing device designed for rapid and accurate measurement of cholesterol and glucose levels. It provides healthcare professionals with immediate results, enabling quick decision-making and patient management in clinical and laboratory settings.","brand":"pts","brandName":"PTS Diagnostics","brandLogo":"/asset/logo/PTS_Logo.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[75px]"},
	{"id":3,"name":"Ebmonitor Pro","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/Ebmonitor-Pro.png","description":"The Ebmonitor Pro by Visgeneer is a multi-parameter diagnostic meter designed for home care. It measures key biomarkers including glucose, ketone, uric acid, cholesterol, triglycerides, and hemoglobin. Trusted globally in over 80 countries, it features rapid test results, easy operation, and is supported by advanced technology.","brand":"pts","brandName":"PTS Diagnostics","brandLogo":"/asset/logo/PTS_Logo.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[75px]"},
	{"id":4,"name":"EHBT-50 Minilab","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/EHBT-50-Minilab.png","description":"EHBT-50 Minilab is a compact, all-in-one diagnostic analyzer that combines hematology, immunology, and biochemistry functionalities in a single device. It offers a 7-differential hematology profile, advanced cell morphology analysis, and is designed to provide fast, multi-parameter testing for human (and veterinary) applications.","brand":"ozelle","brandName":"Ozelle","brandLogo":"/asset/logo/ozelle (1).png","brandLogoClass":"h-[38px] sm:h-[44px] max-w-[72px]"},
	{"id":5,"name":"iPonatic S Q31B","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/iPonatic-S-Q31B.png","description":"Sansure iPonatic (SQ31B) is a portable molecular system featuring a 4-module design for rapid and accurate nucleic acid testing. It is ideal for point-of-care diagnostics, offering flexibility, high throughput, and reliable results in various clinical environments.","brand":"sansure","brandName":"Sansure","brandLogo":"/asset/logo/SANSURE.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[110px]"},
	{"id":6,"name":"Mission HemoPro Hemoglobin","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/Mission-HemoPro-Hemoglobin.png","description":"Large, Easy-to-read display. Fast, Reliable hemoglobin test result in <2 seconds. Powered by batteries or via USB cable. Enhance memory, stores up to 1000 results. High accuracy without calibration code chip.","brand":"acon","brandName":"ACON","brandLogo":"/asset/logo/ACON.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[130px]"},
	{"id":7,"name":"On Call Extra","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/On-Call-Extra.png","description":"The On Call Extra Blood Glucose Monitoring System offers user friendly features for easier diabetes management at competitive prices. The smart and powerful data management is compatible with the On Call Diabetes Management Software.","brand":"acon","brandName":"ACON","brandLogo":"/asset/logo/ACON.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[130px]"},
	{"id":8,"name":"Q8 Pro","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/Q8 Pro.png","description":"A quantitative POCT analyzer based on dry immuno fluorescence technology that integrates operation, analysis, and result display. It can automatically complete a series of operations including test card loading, item identification, incubation, detection, card discarding and results print within 10 minutes.","brand":"zybio","brandName":"Zybio","brandLogo":"/asset/logo/ZYBIO.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[95px]"},
	{"id":9,"name":"Smart Pro","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/poct/Smart-Pro.png","description":"The On Call Smart Pro Blood Glucose/Ketone/Uric Acid Analyzer is intended for quantitative measurement of glucose with On Call Sure Blood Glucose Test Strips in fresh capillary whole blood from the fingertip, forearm and palm, venous, arterial and neonatal blood samples to monitor blood glucose for individuals who have diabetes or are potentially at risk for diabetes.","brand":"acon","brandName":"ACON","brandLogo":"/asset/logo/ACON.png","brandLogoClass":"h-[22px] sm:h-[26px] max-w-[130px]"},
];

export default function Poct() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="POCT" />;
}
