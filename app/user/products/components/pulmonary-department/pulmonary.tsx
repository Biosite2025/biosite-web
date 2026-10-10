"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "pulmonary",
	"title": "Pulmonary",
	"description": "Advanced respiratory care solutions including ventilators and pulmonary function testing equipment for comprehensive respiratory diagnostics and treatment"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "northern", name: "Northern", logo: "/asset/logo/northern.png" },
	{ id: "hamilton", name: "Hamilton", logo: "/asset/logo/hamiltonlogo.png" },
	{ id: "nihon", name: "Nihon", logo: "/asset/logo/nihon.png" },
	{ id: "drager", name: "Dräger", logo: "/asset/logo/drager.png" },
	{ id: "penlon", name: "Penlon", logo: "/asset/logo/Penlon (1).png" },
	{ id: "ge", name: "GE Healthcare", logo: "/asset/logo/GE-Healthcare-Logo-2004–2023.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Crius V4","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/Crius%20V4.png","description":"This transport ventilator is approved for all types of patient transport—ground, sea, or air—ensuring reliable ventilation in any setting. It features an independent high-performance turbine, continuous O₂ support, auxiliary ventilation tools, and a battery life of up to 9 hours with hot-swappable capability for extended use.","brand":"northern","brandName":"Northern","brandLogo":"/asset/logo/northern.png"},
	{"id":2,"name":"Crius V8 Ventilator Turbine Based","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/Crius%20V8%20Ventilator%20Turbine%20Based.png","description":"The Crius V8 Ventilator is an advanced, adaptive system offering volume- and pressure-controlled ventilation for patients from neonates to adults, with both invasive and non-invasive modes. It features a 12″ adjustable touchscreen, automatic leak compensation, integrated self-checks, CO₂ monitoring, and dual batteries for up to 6 hours of operation, ensuring precise and reliable respiratory support.","brand":"northern","brandName":"Northern","brandLogo":"/asset/logo/northern.png"},
	{"id":3,"name":"Hamilton MR1","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/Hamilton%20MR1.png","description":"The HAMILTON-MR1 is an MRI-compatible ICU ventilator that combines compact design, high performance, and reliability. Its patient-adaptive modes support advanced lung-protective strategies, making it ideal for safely transporting ventilated patients to the MRI suite.","brand":"hamilton","brandName":"Hamilton","brandLogo":"/asset/logo/hamiltonlogo.png"},
	{"id":4,"name":"Hamilton T1","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/Hamilton%20T1.png","description":"The HAMILTON-T1 is a transport ventilator that merges the full functionality of an ICU ventilator with compact, rugged design. It allows optimal ventilation therapy for all patient groups during transport, ensuring safe and effective respiratory support.","brand":"hamilton","brandName":"Hamilton","brandLogo":"/asset/logo/hamiltonlogo.png"},
	{"id":5,"name":"Atlas N7","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/Atlas%20N7%20(2).png","description":"The Atlas N7 features a durable breathing system with metallic circuits, upward or downward bellows, and easy disassembly for cleaning, sterilization, and autoclaving, ensuring safe and hygienic operation. It provides accurate ventilation with multiple modes for neonates, pediatrics, and adults, integrated CO₂ absorption, fresh gas compensation, and alarms for system or canister misinstallation.","brand":"northern","brandName":"Northern","brandLogo":"/asset/logo/northern.png"},
	{"id":6,"name":"NKV-550","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/transparent/nkv-550.webp","description":"The NKV-550 provides versatile respiratory support for patients of all sizes, allowing seamless transitions between invasive and non-invasive ventilation as well as high-flow oxygen therapy without changing equipment or circuits. This reduces material costs, simplifies workflow, minimizes care discontinuity, and lowers training and storage demands for hospital staff.","brand":"nihon","brandName":"Nihon","brandLogo":"/asset/logo/nihon.png"},
	{"id":7,"name":"Babylog VN600","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/BABYLOG%20VN600.png","description":"The Dräger Babylog® VN600 provides advanced neonatal ventilation with lung- and brain-protective modes to support safe respiratory therapy. Its 15.6” touchscreen ensures easy, efficient operation while promoting a developmental care-friendly environment for neonates.","brand":"drager","brandName":"Dräger","brandLogo":"/asset/logo/drager.png"},
	{"id":8,"name":"Carestation 30","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/CARESTATION%2030.png","description":"Dependable, Intuitive, Affordable Anesthesia Delivery. Simply the best anesthesia ventilation you asked for, sophisticated ventilation capabilities that help you meets the needs of the full patient range: trauma, compromised and routine cases.","brand":"ge","brandName":"GE Healthcare","brandLogo":"/asset/logo/GE-Healthcare-Logo-2004–2023.png"},
	{"id":9,"name":"Prima 320","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/pulmonary/PRIMA%20320.png","description":"The Penlon Prima 320 is a versatile anaesthesia system providing the ideal solution for today’s operating room. Clinician-focused choices and benefits, including colour touchscreen display, up to six ventilation modes and optional CO₂ and SPO₂ monitoring.","brand":"penlon","brandName":"Penlon","brandLogo":"/asset/logo/Penlon (1).png"},
];

export default function Pulmonary() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="pulmonary" />;
}
