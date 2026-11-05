import { pageMetadata } from './site';

// One entry per folder in app/products; the key is the URL slug.
// Metadata is exported from server components, which cannot read the data in
// the 'use client' product files, so titles and descriptions live here.
export const PRODUCT_CATEGORIES: Record<string, { title: string; description: string }> = {
  "arterial-blood-gas-electrolytes-co-oximetry": { title: "Arterial Blood Gas, Electrolytes & Co-Oximetry", description: "Advanced arterial blood gas, electrolytes and co-oximetry systems for comprehensive laboratory diagnostics" },
  "biogenex": { title: "Biogenex", description: "Advanced biogenex systems and equipment for comprehensive laboratory diagnostics" },
  "biomedical-freezers": { title: "Biomedical Freezers", description: "Advanced biomedical freezers systems and equipment for comprehensive laboratory diagnostics" },
  "biorefrigerators": { title: "Biorefrigerators", description: "Advanced biorefrigerators systems and equipment for comprehensive laboratory diagnostics" },
  "biosafety-cabinets": { title: "Biosafety Cabinets", description: "Advanced biosafety cabinets systems and equipment for comprehensive laboratory diagnostics" },
  "blood-bank": { title: "Blood Bank", description: "Advanced blood bank systems and equipment for comprehensive laboratory diagnostics" },
  "centrifuges": { title: "Centrifuges", description: "Advanced centrifuges systems and equipment for comprehensive laboratory diagnostics" },
  "chemicals-consumables": { title: "Histopathology Chemicals & Consumables", description: "Reagents, stains, solvents, and histopathology consumables" },
  "clinical-chemistry": { title: "Clinical Chemistry", description: "Comprehensive automated analyzers and electrolyte systems for accurate routine chemistry, specialized assays, and rapid diagnostic testing in clinical laboratories" },
  "clinical-microscopy": { title: "Clinical Microscopy", description: "Automated urinalysis and fecalysis systems for comprehensive clinical microscopy" },
  "coagulation": { title: "Coagulation & Hemostasis", description: "Advanced coagulation systems and equipment for comprehensive laboratory diagnostics" },
  "dakewe": { title: "Dakewe", description: "Advanced histopathology systems and equipment for comprehensive laboratory diagnostics" },
  "dialysis-renal-equipments": { title: "Dialysis / Renal Equipments", description: "Dialysis and renal care equipment for patient treatment and monitoring" },
  "dry-bath": { title: "Dry Bath / Vortex Mixer", description: "Advanced dry bath systems and equipment for comprehensive laboratory diagnostics" },
  "emergency-outpatient": { title: "Emergency and Out Patient", description: "Comprehensive emergency and outpatient equipment including patient monitors, defibrillators, and examination tables" },
  "gastro-endo": { title: "Gastro / Endo Equipments", description: "Gastroenterology and endoscopy equipment for diagnostic and therapeutic procedures" },
  "hamamatsusliderscanner": { title: "Hamamatsu Digital Slide Scanners", description: "Industry-leading NanoZoomer digital slide scanners for precision imaging" },
  "hba1c-hplc": { title: "HBA1C - HPLC", description: "Advanced HBA1C - HPLC systems for accurate diabetes monitoring and management" },
  "hematology": { title: "Hematology", description: "Advanced hematology systems and equipment for comprehensive laboratory diagnostics" },
  "hiplaas": { title: "Hiplaas Grossing & Autopsy Solutions", description: "Premium grossing stations, autopsy tables, and morgue refrigeration for pathology and mortuary applications" },
  "hospital-disposables": { title: "Hospital Disposables", description: "Personal protective equipment and patient-care disposables" },
  "icu-er-equipments": { title: "ICU / ER Equipments", description: "Advanced ICU and emergency room equipment for critical care monitoring" },
  "immunology": { title: "Immunology", description: "Advanced immunology systems and equipment for comprehensive laboratory diagnostics" },
  "lab-oven-incubator": { title: "Lab Oven & Incubator", description: "Advanced lab oven incubator systems and equipment for comprehensive laboratory diagnostics" },
  "laboratory-disposables": { title: "Laboratory Disposables", description: "Tubes, tips, slides, containers, and other laboratory disposables" },
  "laboratory-equipements": { title: "Laboratory Equipments", description: "Laboratory equipment consumables and supporting instrumentation" },
  "medical-diagnostic-imaging": { title: "Medical / Diagnostic Imaging", description: "Advanced medical diagnostic imaging systems and equipment for comprehensive laboratory diagnostics" },
  "microbiology": { title: "Microbiology", description: "Blood culture, ID/AST, pretreatment & streaking, and MALDI-TOF systems for clinical microbiology" },
  "microscopes": { title: "Microscopes", description: "Upright microscopes for clinical, educational, and research applications" },
  "molecular-diagnostics": { title: "Molecular Diagnostics", description: "Advanced molecular diagnostics systems and equipment for comprehensive laboratory diagnostics" },
  "moticsliderscanner": { title: "Motic Slide Scanners", description: "High-performance digital slide scanners for pathology, research, and education. Experience precision imaging and efficient workflow with Motic’s advanced scanning solutions" },
  "nicu-picu-icu": { title: "NICU PICU AND ICU", description: "Neonatal, pediatric, and adult intensive care equipment including incubators, warmers, and ICU beds" },
  "nikonmicroscopes": { title: "Nikon Microscopes", description: "Precision optical systems for research, clinical, and industrial applications" },
  "operating-delivery": { title: "Operating and Delivery Room", description: "Surgical lights, operating tables, and delivery room equipment" },
  "or-equipment": { title: "OR Equipment", description: "Operating room equipment including electrocardiographs, endoscopy systems, and laparoscopy solutions" },
  "pipettors": { title: "Pipettors", description: "Accurate and ergonomic pipettors for precise liquid handling in laboratories" },
  "poct": { title: "POCT", description: "Advanced poct systems and equipment for comprehensive laboratory diagnostics" },
  "pulmonary-department": { title: "Pulmonary", description: "Advanced respiratory care solutions including ventilators and pulmonary function testing equipment for comprehensive respiratory diagnostics and treatment" },
  "RADIOLOGY-DEPARTMENT": { title: "Radiology", description: "Advanced radiology and imaging solutions including digital radiography systems, ultrasound machines, CT scanners, and mammography equipment for comprehensive diagnostic imaging" },
  "rapid-testkit": { title: "Rapid Test Kits", description: "Comprehensive range of rapid test kits for quick and reliable diagnostics in various settings" },
  "sakura": { title: "Sakura Histopathology Systems", description: "Sakura Tissue-Tek coverslipping, cryotomy, cytology, embedding, microtomy and tissue processing systems for histopathology laboratories" },
  "sterilizer-autoclave": { title: "Sterilizer & Autoclave", description: "Reliable and efficient autoclaves for laboratory and medical sterilization applications" },
  "surgical-disposable": { title: "Surgical Disposables", description: "Staplers, trocars, and single-use surgical devices" },
  "surgical-rehabilation": { title: "Medical Surgical and Rehab Ward", description: "Hospital beds, trolleys, and ward furniture for medical surgical and rehabilitation care" },
  "vitro": { title: "Vitro", description: "Advanced histopathology staining and ISH systems for molecular diagnostics" },
};

// Stay out of the sitemap: gastro-endo and or-equipment are not linked from the
// site navigation, and the Hamamatsu page is disabled (it returns a 404).
export const UNLISTED_CATEGORIES = new Set(['gastro-endo', 'or-equipment', 'hamamatsusliderscanner']);

export function productMetadata(slug: string) {
  const { title, description } = PRODUCT_CATEGORIES[slug];
  return pageMetadata(
    `/products/${slug}`,
    title,
    `${description}. Available in the Philippines from Biosite Medical Instruments, Inc.`,
  );
}
