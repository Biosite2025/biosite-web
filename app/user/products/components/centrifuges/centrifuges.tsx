"use client";

import BrandedProductPage, { BrandDef, ProductDef } from '../shared/BrandedProductPage';

const category = {
	"id": "centrifuges",
	"title": "Centrifuges",
	"description": "Advanced centrifuges systems and equipment for comprehensive laboratory diagnostics"
};

// Brand sub-tabs — logo files live in /public/asset/logo
const brands: BrandDef[] = [
	{ id: "hermle", name: "Hermle", logo: "/asset/logo/HERMLE.png" },
	{ id: "haier", name: "Haier", logo: "/asset/logo/HAIER.png" },
];

const products: ProductDef[] = [
	{"id":1,"name":"Hermle LC-8","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/hermle-lc-8.png","description":"Compact low-speed laboratory centrifuge designed for routine clinical and laboratory applications with simple operation.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":2,"name":"Hermle Z206-A","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/transparent/hermle-z206-a.webp","description":"Small bench-top centrifuge suitable for clinical labs, offering reliable performance for daily sample separation.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":3,"name":"Hermle Z207-A","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/transparent/hermle-z207-a.webp","description":"Versatile bench centrifuge for routine laboratory use with flexible rotor options and stable operation.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":4,"name":"Hermle Z207-H","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/transparent/hermle-z207-h.webp","description":"High-speed version of the Z207 series, designed for more demanding laboratory applications requiring higher centrifugal force.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":5,"name":"Hermle Z216-M","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/hermle-z216-m.png","description":"Advanced microcentrifuge optimized for molecular biology and research applications with high-speed capability.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":6,"name":"Hermle Z306","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/hermle-z306.png","description":"Medium-capacity bench-top centrifuge for laboratories needing higher sample throughput and flexible configurations.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":7,"name":"Hermle Z446-K","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/hermle-z446-k.png","description":"High-performance refrigerated centrifuge suitable for clinical, research, and industrial laboratories requiring temperature control.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":8,"name":"Hermle Z496-K","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/hermle-z496-k.png","description":"Large-capacity refrigerated laboratory centrifuge designed for high-volume and high-speed applications in advanced labs.","brand":"hermle","brandName":"Hermle","brandLogo":"/asset/logo/HERMLE.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[90px]"},
	{"id":9,"name":"Floor Standing Low-Speed Refrigerated Centrifuge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/Floor%20Standing%20Low-Speed-Refrigerated-Centrifuge.png","description":"Specifically designed for use in blood banks and  transfusion facilities.Widely applied in biopharmaceuticals, cell therapy, biological culture, vaccine production, universities and other related fields.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":10,"name":"Floor-Standing Large-Capacity Refrigerated Centrifuge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/transparent/floor-standing-large-capacity-refrigerated-centrifuge.webp","description":"Haier Biomedical LX-100L1000R is a conventional centrifuge designed for biopharmaceuticals with large capacity 6L, which is widely used in fields such as biopharmaceuticals and academic research. It plays an important role in the processes of protein collection, separation, and purification for samples like macromolecular proteins and bacteria.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
	{"id":11,"name":"Floor-Standing High-Speed Refrigerated Centrifuge","image":"https://biositeassets.sgp1.cdn.digitaloceanspaces.com/biosite-web/products/centrifuges/transparent/floor-standing-high-speed-refrigerated-centrifuge.webp","description":"Haier Biomedical LX-210L750R is a floor-standing highspeed refrigerated centrifuge features with 3L capacity and performance up to 47,400 xg, which is ideal for all-purpose use in the industrial and research sectors.","brand":"haier","brandName":"Haier","brandLogo":"/asset/logo/HAIER.png","brandLogoClass":"h-[24px] sm:h-[28px] max-w-[80px]"},
];

export default function Centrifuges() {
	return <BrandedProductPage category={category} brands={brands} products={products} ctaNoun="centrifuge" />;
}
