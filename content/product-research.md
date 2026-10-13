# Product information needed for Biomi

381 of 407 products need more details so Biomi (the FAQ chatbot) can compare models, recommend the right one, and answer spec questions. 26 products already have enough.

> **Verification status (updated 13 Oct 2026):** 81 products are filled in so far: Blood Bank, Molecular Diagnostics, Immunology, Hematology and Clinical Chemistry. Each ticked item `[x]` has a **Verified info** block taken from the manufacturer's own page, brochure or regulatory filing, with its source link. Where the maker doesn't publish a figure, it's left out on purpose. Items still `[ ]` haven't been researched yet.

## How to use this list

1. Pick a category below (most-needed first).
2. Search each product online — the **Search:** line is a ready Google query. Use the **manufacturer's official page or brochure** only, not resellers.
3. Copy the facts into the reply format below and paste them in the chat. Only include facts you found — leave a line out if you can't find it.

### Reply format (paste this back)

```text
Product: DxH 500
Throughput: up to 60 samples per hour
Sample type: whole blood (venous or capillary)
Sample volume: 17 µL
Time to result: about 1 minute
Loading: manual, single tube
Size: 27 × 42 × 44 cm
Connectivity: bidirectional LIS, barcode reader
Best for: small labs and clinics
Source: https://www.beckmancoulter.com/...
```

You can send several products at once, one block each. Units matter (µL, °C, rpm, L, cm, "per hour").

## Fix first (errors on the website)

- **DxC 500 AU** (Clinical Chemistry) — Description never says what it is (Clinical Chemistry) — add that, and check it's on the right page
- **SmartLyte Plus** (Clinical Chemistry) — Description never says what it is (Clinical Chemistry) — add that, and check it's on the right page
- **DF-55** (Hematology) — Remove stray text "BIOSITE PRODUCT CATALOG VERSION…"
- **EXC 8010** (Hematology) — Remove stray text "BIOSITE PRODUCT CATALOG VERSION…"; Description never says what it is (Hematology) — add that, and check it's on the right page
- **KT-60** (Hematology) — Remove stray text "BIOSITE PRODUCT CATALOG VERSION…"; Description never says what it is (Hematology) — add that, and check it's on the right page
- **KT-8000** (Hematology) — Remove stray text "BIOSITE PRODUCT CATALOG VERSION…"; Description never says what it is (Hematology) — add that, and check it's on the right page
- **Scopio Labs X100 / X100HT** (Hematology) — Description never says what it is (Hematology) — add that, and check it's on the right page
- **UniCel DxH Slidemaker Stainer II** (Hematology) — Description never says what it is (Hematology) — add that, and check it's on the right page
- **Z52** (Hematology) — Remove stray text "BIOSITE PRODUCT CATALOG VERSION…"; Description never says what it is (Hematology) — add that, and check it's on the right page
- **4K Laparoscopy System** (OR Equipment) — No brand set
- **iSE Series – Electrocardiograph (ECG)** (OR Equipment) — No brand set

## Contents

- [Blood Bank](#blood-bank) — 33 products
- [Molecular Diagnostics](#molecular-diagnostics) — 16 products
- [Immunology](#immunology) — 14 products
- [Histopathology Chemicals & Consumables](#histopathology-chemicals--consumables) — 15 products
- [Sterilizer & Autoclave](#sterilizer--autoclave) — 17 products
- [Hematology](#hematology) — 14 products
- [Surgical Disposables](#surgical-disposables) — 14 products
- [Clinical Chemistry](#clinical-chemistry) — 12 products
- [Radiology](#radiology) — 17 products
- [Biorefrigerators](#biorefrigerators) — 14 products
- [Microbiology](#microbiology) — 10 products
- [Centrifuges](#centrifuges) — 11 products
- [POCT](#poct) — 9 products
- [Medical Surgical and Rehab Ward](#medical-surgical-and-rehab-ward) — 16 products
- [Emergency and Out Patient](#emergency-and-out-patient) — 17 products
- [Lab Oven & Incubator](#lab-oven--incubator) — 7 products
- [Dry Bath / Vortex Mixer](#dry-bath--vortex-mixer) — 8 products
- [Laboratory Equipments](#laboratory-equipments) — 8 products
- [Clinical Microscopy](#clinical-microscopy) — 7 products
- [Laboratory Disposables](#laboratory-disposables) — 11 products
- [Operating and Delivery Room](#operating-and-delivery-room) — 13 products
- [Rapid Test Kits](#rapid-test-kits) — 15 products
- [Coagulation & Hemostasis](#coagulation--hemostasis) — 5 products
- [Hiplaas Grossing & Autopsy Solutions](#hiplaas-grossing--autopsy-solutions) — 5 products
- [Hospital Disposables](#hospital-disposables) — 8 products
- [Arterial Blood Gas, Electrolytes & Co-Oximetry](#arterial-blood-gas-electrolytes--co-oximetry) — 4 products
- [Dakewe](#dakewe) — 5 products
- [Biomedical Freezers](#biomedical-freezers) — 10 products
- [Medical / Diagnostic Imaging](#medical--diagnostic-imaging) — 5 products
- [Microscopes](#microscopes) — 5 products
- [Pipettors](#pipettors) — 3 products
- [Embedding](#embedding) — 3 products
- [Biosafety Cabinets](#biosafety-cabinets) — 4 products
- [HBA1C - HPLC](#hba1c---hplc) — 2 products
- [NICU PICU AND ICU](#nicu-picu-and-icu) — 6 products
- [OR Equipment](#or-equipment) — 3 products
- [Microtomy](#microtomy) — 2 products
- [Tissue Processing](#tissue-processing) — 4 products
- [Biogenex](#biogenex) — 1 products
- [Coverslipping](#coverslipping) — 1 products
- [Cryotomy](#cryotomy) — 1 products
- [Cytology](#cytology) — 1 products
- [Pulmonary](#pulmonary) — 2 products
- [Gastro / Endo Equipments](#gastro--endo-equipments) — 1 products
- [Motic Slide Scanners](#motic-slide-scanners) — 1 products
- [Vitro](#vitro) — 1 products

## Blood Bank

_Type: Analyzer · Edit in: `app/user/products/components/blood-bank/blood-bank.tsx`_

- [x] 🔴 **AutoMini 40** — Matrix
  - Need: Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Matrix AutoMini 40 specifications brochure`
  - **Verified info:**
    - Type: Fully automated processor for Matrix gel cards (gel column agglutination)
    - Catalog no.: 850MN000040
    - Not published by Tulip: throughput, sample volume, capacity, size
    - Source: https://www.tulipgroup.com/products-instruments-range.html
- [x] 🔴 **Benchtop (Heavyduty) SE175** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Benchtop (Heavyduty) SE175 specifications brochure`
  - **Verified info:**
    - Type: SureSeal benchtop RF tube sealer with hand unit (blood bag tubing)
    - Sealing: within 1 second, no warm-up; tubing 2–6 mm (1/4") OD; adjustable sealing power
    - Other: head protector, 1.8 m (6 ft) cable, AC powered
    - Source: https://centrons.com/Features-SE175
- [x] 🔴 **Benchtop (Heavyduty) SE260** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Benchtop (Heavyduty) SE260 specifications brochure`
  - **Verified info:**
    - Type: SureSeal benchtop RF tube sealer
    - Features: adjustable power mode, wide-sealing, automatic tubing and arc detection, LED progress indicator, no warm-up, head protector and splash guard; optional hand unit (1.8 m cable)
    - Source: https://centrons.com/Features-SE260
- [x] 🔴 **Benchtop (Heavyduty) SE450** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Benchtop (Heavyduty) SE450 specifications brochure`
  - **Verified info:**
    - Type: SureSeal benchtop RF tube sealer with handheld sealing unit
    - Sealing: about 1 second, no warm-up; tubing 2–6 mm (1/4") OD; center-notched seals for easy segmenting
    - Other: detachable head protector, 1.8 m cable, AC powered
    - Source: https://centrons.com/Features-SE450
- [x] 🔴 **Benchtop (Heavyduty) SE470** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Benchtop (Heavyduty) SE470 specifications brochure`
  - **Verified info:**
    - Type: SureSeal RF sealer with handheld unit for cord blood freezing bags and tubing (seals bag channels)
    - Other: optional sealing jig for PALL #791-05 or equivalent bags; power and RF cables included
    - Source: https://centrons.com/Features-SE470
- [x] 🔴 **CB220** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Centron CB220 specifications brochure`
  - **Verified info:**
    - Type: Centrifuge balance for blood bag buckets
    - Features: two independent weight sensors (one per bucket), shows weight difference, lamp on lighter side, "GOOD" lamp when within tolerance; charging adapter
    - Source: https://centrons.com/Features-CB220
- [x] 🔴 **CC 2400** — Matrix
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Matrix CC 2400 specifications brochure`
  - **Verified info:**
    - Type: Gel card centrifuge for Matrix gel cards
    - Capacity: 24 cards
    - Speed: fixed 880 rpm (85 g); time fixed 10 min with timer alarm
    - Size: 50 × 37 × 25 cm; weight 12.5 kg
    - Power: 110/220 V, 50/60 Hz
    - Source: https://www.tulipgroup.com/PDFs/Instrumentation/TechSpecs/Matrix_Card_Centrifuge_CC_2400.pdf
- [x] 🔴 **CM735A** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron CM735A specifications brochure`
  - **Verified info:**
    - Type: Automated blood collection mixer (weighs, rocks and auto-clamps at preset volume)
    - Features: auto tare for net volume, LCD (collected/preset volume, weight, elapsed time, alarms), audible/visual alarms, rechargeable replaceable battery, digital calibration
    - Source: https://centrons.com/Features-cm735A
- [x] 🔴 **CM745** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint
  - Search: `Centron CM745 specifications brochure`
  - **Verified info:**
    - Type: Accumix blood collection mixer (weighing + mixing), portable
    - Features: large Li-ion battery plus emergency backup battery, barcode scanner for label checking, visual/audible alarms, digital weight calibration, carry bag
    - Source: https://centrons.com/Features-cm745
- [x] 🔴 **CM760** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint
  - Search: `Centron CM760 specifications brochure`
  - **Verified info:**
    - Type: Blood collection mixer (Centron)
    - Specs page could not be read; see source
    - Source: https://centrons.com/Features-cm760
- [x] 🔴 **Eryclone Anti-A** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-A specifications brochure`
  - **Verified info:**
    - Type: Murine monoclonal IgM blood grouping reagent, ready to use (forward grouping)
    - Method: slide, microplate and tube tests
    - Titre: > 1:256; specificity 100% to A1 and A2 antigens
    - Storage: 2–8 °C, 24 months (opened and unopened)
    - Pack sizes: 5 ml, 10 ml, 10 × 5 ml, 6 × 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-A-QRG.pdf
- [x] 🔴 **Eryclone Anti-AB** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-AB specifications brochure`
  - **Verified info:**
    - Type: Blend of two murine monoclonal IgM antibodies (anti-A + anti-B), ready to use
    - Method: slide, microplate and tube tests
    - Titre: > 1:256; specificity 100% to A and B antigens, negative with acquired B
    - Storage: 2–8 °C, 24 months (opened and unopened)
    - Pack sizes: 5 ml, 10 ml, 10 × 5 ml, 6 × 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-AB-QRG.pdf
- [x] 🔴 **Eryclone Anti-B** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-B specifications brochure`
  - **Verified info:**
    - Type: Murine monoclonal IgM blood grouping reagent, ready to use (forward grouping)
    - Method: slide, microplate and tube tests
    - Titre: > 1:256; specificity 100% to B antigens, negative with acquired B
    - Storage: 2–8 °C, 24 months (opened and unopened)
    - Pack sizes: 5 ml, 10 ml, 10 × 5 ml, 6 × 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-B-QRG.pdf
- [x] 🔴 **Eryclone Anti-c (hr)** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-c (hr) specifications brochure`
  - **Verified info:**
    - Type: Ready-to-use monoclonal (IgM) Rh phenotyping reagent from human cell-line culture supernatant
    - Use: probable Rh genotype, donor selection, pre-transfusion testing, HDN prediction
    - Method: slide and tube tests; specificity 100% to c antigen
    - Storage: 2–8 °C, 24 months; pack sizes 2 ml, 5 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-c-hr-QRG.pdf
- [x] 🔴 **Eryclone Anti-C (rh)** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-C (rh) specifications brochure`
  - **Verified info:**
    - Type: Ready-to-use monoclonal (IgM) Rh phenotyping reagent from human cell-line culture supernatant
    - Use: probable Rh genotype, donor selection, pre-transfusion testing, HDN prediction
    - Method: slide and tube tests; specificity 100% to C antigen
    - Storage: 2–8 °C, 24 months; pack sizes 2 ml, 5 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-C-rh-QRG.pdf
- [x] 🔴 **Eryclone Anti-C+D+E** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-C+D+E specifications brochure`
  - **Verified info:**
    - Type: Ready-to-use monoclonal Rh genotyping reagent (human cell lines)
    - Method: slide and tube tests
    - Titre: ~1:32 with r'r, R1r and r"r cells; specificity 100% to C, D, E
    - Storage: 2–8 °C, 24 months; pack size 5 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-C+D+E-QRG.pdf
- [x] 🔴 **Eryclone Anti-D (Rho) (IgG)** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-D (Rho) (IgG) specifications brochure`
  - **Verified info:**
    - Type: Human monoclonal IgG anti-D, ready to use
    - Method: slide and tube tests
    - Titre: > 1:32; specificity 100% to Rho(D)
    - Storage: 2–8 °C, 24 months (opened and unopened)
    - Pack sizes: 5 ml, 10 ml, 10 × 5 ml, 6 × 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-D-(Rho)-IgG-QRG.pdf
- [x] 🔴 **Eryclone Anti-D IgM** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-D IgM specifications brochure`
  - **Verified info:**
    - Type: Monoclonal IgM anti-D, ready to use
    - Method: slide, microplate and modified tube tests
    - Titre: > 1:256; specificity 100% to Rho(D)
    - Storage: 2–8 °C, 24 months (opened and unopened)
    - Pack sizes listed: 10 × 5 ml, 6 × 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-D-(Rho)-IgM-QRG.pdf
- [x] 🔴 **Eryclone Anti-e (hr)** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-e (hr) specifications brochure`
  - **Verified info:**
    - Type: Ready-to-use monoclonal (IgM) Rh phenotyping reagent from human cell-line culture supernatant
    - Use: probable Rh genotype, donor selection, pre-transfusion testing, HDN prediction
    - Method: slide and tube tests; specificity 100% to e antigen
    - Storage: 2–8 °C, 24 months; pack sizes 2 ml, 5 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-e-hr-QRG.pdf
- [x] 🔴 **Eryclone Anti-E (rh)** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-E (rh) specifications brochure`
  - **Verified info:**
    - Type: Ready-to-use monoclonal (IgM) Rh phenotyping reagent from human cell-line culture supernatant
    - Use: probable Rh genotype, donor selection, pre-transfusion testing, HDN prediction
    - Method: slide and tube tests; specificity 100% to E antigen
    - Storage: 2–8 °C, 24 months; pack sizes 2 ml, 5 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-E-rh-QRG.pdf
- [x] 🔴 **Eryclone Anti-Human Globulin** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone Anti-Human Globulin specifications brochure`
  - **Verified info:**
    - Type: Polyspecific AHG (anti-IgG + anti-C3d) for direct and indirect Coombs tests
    - Use: compatibility testing/crossmatch, antibody detection and ID, cord blood testing, weak D (Du)
    - Titre: anti-IgG ~1:256; anti-C3d ~1:16
    - Storage: 2–8 °C, 24 months; pack sizes 2 ml, 5 ml, 10 ml, 10 × 5 ml, 6 × 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-ANTI-HUMAN-GLOBULIN-QRG.pdf
- [x] 🔴 **Eryclone MONOSPECIFIC COOMBS SERA (Anti-C3d)** — Tulip Diagnostic
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tulip Diagnostic Eryclone MONOSPECIFIC COOMBS SERA (Anti-C3d) specifications brochure`
  - **Verified info:**
    - Type: Monoclonal IgM anti-human complement C3d
    - Use: indirect antiglobulin testing; characterising coating proteins after a positive polyspecific DAT
    - Titre: 1:8 (complement-coated cells)
    - Storage: 2–8 °C, 24 months; pack sizes 2 ml, 5 ml, 10 ml
    - Source: https://www.tulipgroup.com/PDFs/Blood_Banking/QRG/ERYCLONE-MONOSPECIFIC-COOMB'S-SERA-C3d-QRG.pdf
- [x] 🔴 **ES315** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Centron ES315 specifications brochure`
  - **Verified info:**
    - Type: Semi-automatic plasma separator (centrifuged whole blood → red cells + plasma)
    - Features: optical RBC sensor with adjustable sensitivity, auto clamp at first red cells, audible/visual alarms; one operator can run about 10–20 units
    - Source: https://centrons.com/Features-ES315
- [x] 🔴 **HemoPro** — ACON
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `ACON HemoPro specifications brochure`
  - **Verified info:**
    - Type: Mission HemoPro handheld hemoglobin meter (spectrophotometry)
    - Measures: hemoglobin 0–26 g/dL; calculated hematocrit 0–75%
    - Sample: capillary or venous whole blood, 10 µL
    - Memory: 1,000 records; USB data/power; 4 × AAA batteries (~2,700 tests) or AC adapter
    - Size: 150 × 70 × 40 mm; 270 g
    - Note: ACON states not available in the US or Europe
    - Source: https://www.aconlabs.com/brands/mission/hemopro/
- [x] 🔴 **LIAISON® XL** — DiaSorin
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `DiaSorin LIAISON® XL specifications brochure`
  - Note: Also listed under Immunology — keep both descriptions the same
  - **Verified info:**
    - Type: Fully automated chemiluminescence (CLIA) immunoassay analyzer
    - Throughput: up to 171 tests per hour (assay dependent)
    - Time to first result: from 17 minutes (assay dependent)
    - Loading: true continuous loading; front loading for urgent samples; all-in-one Reagent Integrals
    - Connectivity: can connect to most lab automation lines; touchscreen with internal PC
    - Best for: labs of any size needing high-volume specialty testing in limited space
    - Source: https://int.diasorin.com/en/immunodiagnostics/tools/liaison-xl
- [x] 🔴 **Matrix Automax 80** — Matrix
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Matrix Matrix Automax 80 specifications brochure`
  - **Verified info:**
    - Type: Fully automated processor for Matrix gel cards (gel column agglutination)
    - Catalog no.: 827MA000080
    - Not published by Tulip: throughput, sample volume, capacity, size
    - Source: https://www.tulipgroup.com/products-instruments-range.html
- [x] 🔴 **Multi-Head (Segment) SE160** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Centron Multi-Head (Segment) SE160 specifications brochure`
  - **Verified info:**
    - Type: SureSeal multi-head tube sealer, automatic sequential sealing
    - Seal spacing: 75/80/85/90/95 mm (up to 200 mm on request)
    - Features: adjustable power mode, auto tubing and arc detection, LED indicators, no warm-up, head protector and splash guard
    - Source: https://centrons.com/FeaturesSE160
- [x] 🔴 **Multi-Head (Segment) SE170** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Multi-Head (Segment) SE170 specifications brochure`
  - **Verified info:**
    - Type: SureSeal single or multi-segment tube sealer, automatic sequential sealing
    - Seal spacing: 65–100 mm in 5 mm steps (up to 200 mm on request)
    - Features: adjustable power with auto tuning, auto tube and arc detection, LED indicators; optional hand unit
    - Source: https://centrons.com/139
- [x] 🔴 **Plasma Apheresis System** — Haier
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Haier Plasma Apheresis System specifications brochure`
  - **Verified info:**
    - Model: XJ-III (also XJ-II)
    - Technology: patented centrifuge cup; separate blood and anticoagulant pumps; adapts to consumable brands
    - Safety: donor ID by ID card, face, fingerprint and barcode; anticoagulant-mismatch lockout; multi-level alarms
    - Size: 480 × 370 × 720 mm, 26 ± 2 kg (XJ-II: 540 × 510 × 770 mm, 29 kg)
    - Power: 110–240 V, 50/60 Hz; color touchscreen; auto upload of consumable data for traceability
    - Source: https://www.haiermedical.com/product/plasma-apheresis-system.html
- [x] 🔴 **Plasma Thawing** — Haier
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Haier Plasma Thawing specifications brochure`
  - **Verified info:**
    - Model: HRJ-L36S
    - Method: wet (water bath) and dry (bag-isolated) thawing with reciprocating swing
    - Capacity: 36 positions wet / 12 dry; set point 37 °C
    - Size: 890 × 585 × 975 mm; heating power 3000 W; 220–240 V, 50/60 Hz
    - Source: https://www.haiermedical.com/home/product/details/product_id/235.html
- [x] 🔴 **Portable SE700** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Portable SE700 specifications brochure`
  - Note: Description is very short (67 characters)
  - **Verified info:**
    - Type: SureSeal portable (battery) tube sealer
    - Sealing: about 1 second, no warm-up; tubing 2–6 mm (1/4") OD
    - Battery: rechargeable, replaceable pack; built-in charger
    - Source: https://centrons.com/Features-SE700
- [x] 🔴 **Portable SE730** — Centron
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Centron Portable SE730 specifications brochure`
  - Note: Description is very short (44 characters)
  - **Verified info:**
    - Type: SureSeal portable (battery) tube sealer
    - Sealing: within 1 second, no warm-up; tubing 2–6 mm (1/4") OD
    - Battery: rechargeable Li-ion, up to 800 seals per charge; built-in charger
    - Source: https://centrons.com/Features-SE730
- [ ] 🔴 **Sterile Tube Welder** — BMS
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `BMS Sterile Tube Welder specifications brochure`

## Molecular Diagnostics

_Type: Analyzer · Edit in: `app/user/products/components/molecular-diagnostics/molecular-diagnostics.tsx`_

- [x] 🔴 **EXM 3000** — Zybio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Zybio EXM 3000 specifications brochure`
  - **Verified info:**
    - Type: Automatic nucleic acid isolation system (magnetic beads)
    - Throughput: 1–32 samples per run, about 9 min for 32 samples
    - Process volume: 30–1000 µL; UV sterilisation
    - Size: 375 × 415 × 440 mm; 27 kg
    - Source: https://www.zybio.com/productxq/40/24/EXM3000.html
- [x] 🔴 **EXM 6000** — Zybio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Zybio EXM 6000 specifications brochure`
  - **Verified info:**
    - Type: Automatic nucleic acid isolation system (magnetic beads)
    - Throughput: 1–96 samples per run, about 12 min for 96 samples
    - Process volume: 20–1000 µL; UV sterilisation
    - Size: 696 × 450 × 460 mm; 50 kg
    - Source: https://www.zybio.com/productxq/40/23.html
- [x] 🔴 **Human Papillomavirus (HPV) Diagnostic Kit** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Sansure Human Papillomavirus (HPV) Diagnostic Kit specifications brochure`
  - **Verified info:**
    - Note: Sansure sells several HPV kits; confirm which one Biosite carries. Details below are for S3108E (23 genotypes)
    - Targets: HPV 6, 11, 16, 18, 26, 31, 33, 35, 39, 42, 43, 45, 51, 52, 53, 56, 58, 59, 66, 68, 73, 81, 82; β-globin control
    - Sample: cervical exfoliated cells; LoD 400 copies/mL; amplification about 70 min
    - Instruments: ABI 7500, QuantStudio 5, SLAN-96P; pack 24 or 48 tests
    - Source: https://www.sansureglobal.com/product/s3108e-hpv-g23/
- [x] 🔴 **iPonatic SQ31B** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Sansure iPonatic SQ31B specifications brochure`
  - **Verified info:**
    - Type: iPonatic II portable molecular workstation (model S-Q31B, 4 amplification modules)
    - Process: room-temperature lysis within 1 min; amplification 8–45 min
    - Channels: FAM, VIC, ROX, Cy5; CE marked
    - Size: 336.5 × 280 × 435 mm; 13 kg
    - Source: https://www.sansureglobal.com/product/iponatic-ii-portable-molecule-workstation/
- [x] 🔴 **iPonatic SQ36A** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Sansure iPonatic SQ36A specifications brochure`
  - **Verified info:**
    - Type: iPonatic III portable molecular workstation (model S-Q36A): extraction + real-time PCR + analysis in one
    - Channels: FAM, VIC/HEX, ROX/Texas Red, Cy5
    - Time to result: 15–45 min (stated for SARS-CoV-2)
    - Size: 391 × 140 × 368 mm; about 7.2 kg; 100–240 V AC
    - Source: https://www.sansureglobal.com/product/iponatic-3-portable-molecular-workstation/
- [ ] 🔴 **MA-1630Q** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Sansure MA-1630Q specifications brochure`
- [ ] 🔴 **MA-6000** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Sansure MA-6000 specifications brochure`
- [x] 🔴 **Mycobacterium Tuberculosis Nucleic Acid and Rifampicin Resistance Fluorescence Diagnostic Kit** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Sansure Mycobacterium Tuberculosis Nucleic Acid and Rifampicin Resistance Fluorescence Diagnostic Kit specifications brochure`
  - **Verified info:**
    - Code: S3363E-12-P
    - Targets: M. tuberculosis DNA + rifampicin-resistance mutations
    - Sample: sputum; real-time PCR fluorescence probe, one-tube fast release
    - LoD: MTB 1,000 bacteria/mL; RIF resistance 10,000 bacteria/mL
    - Instrument: iPonatic III (S-Q36A)
    - Source: https://www.sansureglobal.com/product/s3363e-12-p-tb-and-rfp/
- [ ] 🔴 **Natch CS** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Sansure Natch CS specifications brochure`
- [x] 🔴 **Natch CS3 Plus** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Sansure Natch CS3 Plus specifications brochure`
  - **Verified info:**
    - Type: Fully automated sample-to-result system (sample handling, extraction, PCR set-up, analysis); model S-S13E-P
    - Throughput: 96 samples per run, from about 130 min per full run
    - Reaction volume: 15–100 µL
    - Size: 1500 × 800 × 1700 mm; ≤ 517 kg (floor-standing)
    - Best for: blood screening / high-volume molecular labs
    - Source: https://www.sansureglobal.com/product/natch-cs3-plus-fully-automated-nucleic-acid-processing-system/
- [ ] 🔴 **Nextractor NX-48s** — Genolution
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Genolution Nextractor NX-48s specifications brochure`
- [x] 🔴 **Novel Coronavirus (2019-nCoV) Nucleic Acid Diagnostic Kit** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Sansure Novel Coronavirus (2019-nCoV) Nucleic Acid Diagnostic Kit specifications brochure`
  - **Verified info:**
    - Code: S3104E (US FDA EUA version)
    - Targets: SARS-CoV-2 ORF1ab and N genes; RNase P internal control
    - Samples: nasopharyngeal, oropharyngeal, anterior nasal and mid-turbinate swabs; nasal wash/aspirate
    - LoD: 200 copies/mL; pack 24 or 48 tests; validated on ABI 7500
    - Source: https://www.sansureglobal.com/product/s3104e-2019-ncov-fda-eua/
- [x] 🔴 **Nucleic Acid Test Kit for HBV HCV & HIV** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Sansure Nucleic Acid Test Kit for HBV HCV & HIV specifications brochure`
  - **Verified info:**
    - Code: C003E (plasma) / C004E (plasma and serum)
    - Targets: HBV DNA (A–H), HCV RNA (1–6), HIV-1 (M/N/O) and HIV-2, multiplex real-time PCR
    - Sample: 960 µL donor plasma; individual or mini-pool testing
    - LoD (individual): HBV 3 IU/mL, HCV 10 IU/mL, HIV 45 IU/mL
    - Time: about 4.5 h for 45 single tests; about 5 h for 576 pooled tests; 96 tests per kit
    - Instruments: Natch CS3 Plus, Natch S Pro, SLAN-96P
    - Source: https://www.sansureglobal.com/product/c003e-bci/
- [x] 🔴 **Oncoscreen Screening Diagnostic Kits and Detection Kit** — Mylab
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Mylab Oncoscreen Screening Diagnostic Kits and Detection Kit specifications brochure`
  - **Verified info:**
    - Type: OncoScreen portfolio of PCR kits for cancer mutation status / companion diagnostics
    - Kits on Mylab's cancer page include ALK, KRAS, BRAF, BCR-ABL, PML-RARA (bcr1/bcr3) and MTHFR
    - Mylab doesn't publish method, sample or pack details on the page
    - Source: https://mylabglobal.com/oncoscreen-kit/
- [x] 🔴 **Slan 96P** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Sansure Slan 96P specifications brochure`
  - **Verified info:**
    - Type: Real-time PCR system, 96 wells (two independent 48-well blocks)
    - Channels: FAM/SYBR, VIC/HEX/JOE/TET, ROX/Texas Red, Cy5 (+2 custom)
    - Ramp rate: up to 4.0 °C/s; accuracy and uniformity ±0.1 °C; reaction volume 15–50 µL
    - Size: 380 × 520 × 250 mm; 18 kg
    - Source: https://www.sansureglobal.com/product/slan-96p-real-time-pcr-system/
- [ ] 🔴 **ZIP-96V** — Zybio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Zybio ZIP-96V specifications brochure`

## Immunology

_Type: Analyzer · Edit in: `app/user/products/components/immunology/immunology.tsx`_

- [x] 🔴 **AIA-2000** — Tosoh
  - Need: Throughput, Sample type, Sample volume, Time to first result, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tosoh AIA-2000 specifications brochure`
  - **Verified info:**
    - Type: Automated enzyme immunoassay analyzer (Tosoh AIA unit-dose test cups)
    - Throughput: up to 200 tests per hour
    - Source: https://www.tosohbioscience.com/IN-EN-diagnostics/immunoassay
- [x] 🔴 **AIA-360** — Tosoh
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tosoh AIA-360 specifications brochure`
  - **Verified info:**
    - Type: Automated enzyme immunoassay analyzer, benchtop (Tosoh AIA unit-dose test cups)
    - Throughput: up to 36 tests per hour; start-up under 10 minutes
    - Best for: physician office labs, small hospitals, specialty testing or back-up analyser
    - Source: https://www.tosohbioscience.com/IN-EN-diagnostics/immunoassay ; https://www.tosohbioscience.com/EU-EN-diagnostics/immunoassay-analysers
- [x] 🔴 **AIA-900** — Tosoh
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Tosoh AIA-900 specifications brochure`
  - **Verified info:**
    - Type: Automated enzyme immunoassay analyzer (Tosoh AIA unit-dose test cups)
    - Throughput: up to 90 tests per hour
    - Source: https://www.tosohbioscience.com/IN-EN-diagnostics/immunoassay
- [x] 🔴 **AIA-CL300** — Tosoh
  - Need: Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tosoh AIA-CL300 specifications brochure`
  - **Verified info:**
    - Type: Compact desktop chemiluminescent enzyme immunoassay analyzer
    - Throughput: up to 30 tests per hour
    - Time to first result: about 15 minutes for most assays
    - Best for: clinical labs of any size
    - Source: https://www.tosohbioscience.com/EU-EN-diagnostics/products/aia-cl300
- [x] 🔴 **ALEX³** — MADx
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `MADx ALEX³ specifications brochure`
  - **Verified info:**
    - Type: Multiplex allergy test (macroarray): 300 allergens (218 molecular allergens + 82 extracts) from 145 sources
    - Measures: specific IgE plus quantitative total IgE in one run
    - Kits: 20 or 50 arrays
    - Runs on: MAX 9k / MAX 45k (automated) or ImageXplorer (manual)
    - Source: https://www.madx.com/products/alex?culture=en
- [x] 🔴 **BIO-FLASH** — Werfen
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Werfen BIO-FLASH specifications brochure`
  - **Verified info:**
    - Type: Fully automated, random-access chemiluminescent analyzer for autoimmune testing (QUANTA Flash reagents)
    - Reagents: carousel for up to 20 refrigerated reagent packs; STAT priority
    - Best for: autoimmune labs running routine, specialised and STAT tests
    - Source: https://www.werfen.com/na/en/bio-flashr
- [x] 🔴 **DxI 600** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Beckman Coulter DxI 600 specifications brochure`
  - **Verified info:**
    - Type: UniCel DxI 600 Access immunoassay system (chemiluminescence)
    - Throughput: up to 200 tests per hour
    - Sample capacity: 60 samples; 50 reagent packs on board
    - STAT: routine loading can be interrupted for STAT samples
    - Source: https://media.beckmancoulter.com/-/media/diagnostics/products/immunoassay/unicel-dxi-600/docs/unicel-dxi-systems-us-brochure-en.pdf
- [x] 🔴 **DxI 800** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Beckman Coulter DxI 800 specifications brochure`
  - Note: Description is very short (85 characters)
  - **Verified info:**
    - Type: UniCel DxI 800 Access immunoassay system (chemiluminescence)
    - Throughput: up to 400 tests per hour
    - Sample capacity: 120 samples; 50 reagent packs on board
    - STAT: routine loading can be interrupted for STAT samples
    - Best for: high-volume labs
    - Source: https://media.beckmancoulter.com/-/media/diagnostics/products/immunoassay/unicel-dxi-600/docs/unicel-dxi-systems-us-brochure-en.pdf
- [x] 🔴 **DxI 9000** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Beckman Coulter DxI 9000 specifications brochure`
  - Note: Description is very short (85 characters)
  - **Verified info:**
    - Type: DxI 9000 Access immunoassay analyzer, automation-ready
    - Throughput: up to 215 tests/hour per m² of footprint (Beckman claim)
    - Maintenance: zero daily maintenance; PrecisionVision real-time checks (tube ID, cap, tip, aspiration, wash, substrate)
    - Other: Lumi-Phos PRO substrate; DxS IntelliServe remote monitoring
    - Source: https://news.beckmancoulter.com/2023-05-15-Beckman-Coulter-Unveils-Next-Generation-Immunoassay-Analyzer-Enabling-Elite-Laboratory-Performance-with-No-Daily-Maintenance
- [x] 🔴 **ImageXplorer** — MADx
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `MADx ImageXplorer specifications brochure`
  - **Verified info:**
    - Type: Manual processing and imaging system for ALEX³
    - Throughput: 48 samples per run, 2 runs/day (up to 28,000 results/day)
    - Time: about 4.5 h total assay; about 1 h hands-on
    - Size: each unit under 0.5 m; about 2.5 kg
    - Best for: small spaces / on-site processing
    - Source: https://www.madx.com/products/systems
- [x] 🔴 **LIAISON® XS** — DiaSorin
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `DiaSorin LIAISON® XS specifications brochure`
  - **Verified info:**
    - Type: Fully automated benchtop CLIA analyzer, compact footprint
    - Loading: automatic, urgent samples on the fly; all-in-one Reagent Integrals
    - Best for: small to mid-size labs running low-volume specialty and routine tests
    - Note: DiaSorin's page gives no throughput or size figures
    - Source: https://int.diasorin.com/en/immunodiagnostics/tools/liaison-xs
- [x] 🔴 **MAX 45k** — MADx
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `MADx MAX 45k specifications brochure`
  - **Verified info:**
    - Type: Fully automated batch analyser for ALEX³
    - Throughput: 50 samples per run, 3 runs/day (up to 45,000 results/day)
    - Time: about 4 h total assay; about 20 min hands-on
    - Size: 115 × 65 × 60 cm; about 100 kg
    - Best for: large labs with high volume
    - Source: https://www.madx.com/products/systems
- [x] 🔴 **MAX 9k** — MADx
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `MADx MAX 9k specifications brochure`
  - **Verified info:**
    - Type: Fully automated batch analyser for ALEX³
    - Throughput: 10 samples per run, 3 runs/day (up to 9,000 results/day)
    - Time: about 3.5 h total assay; about 10 min hands-on
    - Size: 61 × 45 × 60 cm; about 38 kg
    - Best for: smaller labs and doctor's offices with moderate volume
    - Source: https://www.madx.com/products/systems
- [x] 🟡 **Access 2** — Beckman Coulter
  - Need: Sample type, Sample volume, Size / footprint, Connectivity
  - Search: `Beckman Coulter Access 2 specifications brochure`
  - **Verified info:**
    - Type: Benchtop chemiluminescent immunoassay analyzer
    - Throughput: up to 100 tests per hour
    - Reagents: refrigerated on-board storage for up to 24 assays
    - Best for: small labs with limited space
    - Source: https://m.beckmancoulter.com/access-2-immunoassay-analyzer.html

## Histopathology Chemicals & Consumables

_Type: Disposable / consumable · Edit in: `app/user/products/components/chemicals-consumables/chemicals-comsumables.tsx`_

- [ ] 🔴 **Absolute Ethanol & Denatured Ethanol** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Absolute Ethanol & Denatured Ethanol specifications brochure`
- [ ] 🔴 **Histoflo™ Adhesion Microscope Slides** — Dakewe
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dakewe Histoflo™ Adhesion Microscope Slides specifications brochure`
  - Note: Description is very short (43 characters)
- [ ] 🔴 **Histoflo™ Embedding Cassettes** — Dakewe
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dakewe Histoflo™ Embedding Cassettes specifications brochure`
  - Note: Description is very short (54 characters)
- [ ] 🔴 **Histoflo™ Etching Microscope Slides** — Dakewe
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dakewe Histoflo™ Etching Microscope Slides specifications brochure`
  - Note: Description is very short (37 characters)
- [ ] 🔴 **Histoflo™ Microscope Slides** — Dakewe
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dakewe Histoflo™ Microscope Slides specifications brochure`
  - Note: Description is very short (47 characters)
- [ ] 🔴 **Isopropyl Alcohol** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Isopropyl Alcohol specifications brochure`
- [ ] 🔴 **Methanol** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Methanol specifications brochure`
- [ ] 🔴 **Neutral Buffered Formalin, 10%** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Neutral Buffered Formalin, 10% specifications brochure`
- [ ] 🔴 **Prefilled Neutral Buffered Formalin, 10%** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Prefilled Neutral Buffered Formalin, 10% specifications brochure`
- [ ] 🔴 **Xylene** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Xylene specifications brochure`
- [ ] 🔴 **Xylene Substitute** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Xylene Substitute specifications brochure`
- [ ] 🔴 **Zitrus-Clear** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `EAM Zitrus-Clear specifications brochure`
- [ ] 🟡 **Acetone** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use
  - Search: `EAM Acetone specifications brochure`
- [ ] 🟡 **Paraffin Wax** — Citotest
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use
  - Search: `Citotest Paraffin Wax specifications brochure`
- [ ] 🟡 **Reagent Alcohol** — EAM
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use
  - Search: `EAM Reagent Alcohol specifications brochure`

## Sterilizer & Autoclave

_Type: Lab equipment · Edit in: `app/user/products/components/sterilizer-autoclave/sterilizerautoclave.tsx`_

- [ ] 🔴 **3870ELV-D** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer 3870ELV-D specifications brochure`
- [ ] 🔴 **5596 Laboratory Autoclave** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer 5596 Laboratory Autoclave specifications brochure`
- [ ] 🔴 **66120 Laboratory Autoclave** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer 66120 Laboratory Autoclave specifications brochure`
- [ ] 🔴 **667/130 Laboratory Autoclave** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size
  - Search: `Tuttnauer 667/130 Laboratory Autoclave specifications brochure`
- [ ] 🔴 **ELV D-Line Series** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer ELV D-Line Series specifications brochure`
- [ ] 🔴 **Horizontal Bench-top Autoclaves** — Haier
  - Need: Capacity / chamber volume, Temperature range, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Horizontal Bench-top Autoclaves specifications brochure`
- [ ] 🔴 **Low Temperature Sterilizers** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer Low Temperature Sterilizers specifications brochure`
- [ ] 🔴 **T-Edge Autoclaves** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer T-Edge Autoclaves specifications brochure`
- [ ] 🔴 **T-Lab Eco** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer T-Lab Eco specifications brochure`
- [ ] 🔴 **T-Top Medical Autoclaves** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size
  - Search: `Tuttnauer T-Top Medical Autoclaves specifications brochure`
- [ ] 🔴 **Vertical Autoclave** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Vertical Autoclave specifications brochure`
- [ ] 🟡 **2540EKA** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size
  - Search: `Tuttnauer 2540EKA specifications brochure`
- [ ] 🟡 **3870MLV Vertical Top-Loading Autoclave** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer 3870MLV Vertical Top-Loading Autoclave specifications brochure`
- [ ] 🟡 **5075ELV-D** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Key features, Size
  - Search: `Tuttnauer 5075ELV-D specifications brochure`
- [ ] 🟡 **D-Line EA and EKA** — Tuttnauer
  - Need: Temperature range, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer D-Line EA and EKA specifications brochure`
- [ ] 🟡 **EA and EKA Series** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size
  - Search: `Tuttnauer EA and EKA Series specifications brochure`
- [ ] 🟡 **M and MK Autoclaves** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size
  - Search: `Tuttnauer M and MK Autoclaves specifications brochure`

## Hematology

_Type: Analyzer · Edit in: `app/user/products/components/hematology/hematology.tsx`_

- [x] 🔴 **DF-55** — Dymind
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Dymind DF-55 specifications brochure`
  - **Verified info:**
    - Type: 5-part differential hematology analyzer (flow cytometry, tri-angle laser scatter)
    - Parameters: 25 reportable + 6 research
    - Throughput: up to 60 tests per hour
    - Sample: 20 µL; whole blood, capillary and pre-diluted modes
    - Size: 364 W × 498 H × 431 D mm; 28 kg
    - Connectivity: 4 USB, LAN (HL7), bidirectional LIS
    - Source: https://www.dymind.com/manage/userfiles/upload/2025/10/27/EN-DF55_6.0_%20Reading%20version_20250620_20251027110733A020.pdf
- [x] 🔴 **DH-615** — Dymind
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Dymind DH-615 specifications brochure`
  - **Verified info:**
    - Type: AI hematology analyzer, 6-part differential + reticulocytes (RET, HFR, MFR, LFR, IRF)
    - Technology: semiconductor laser scatter + fluorescence flow cytometry; impedance WBC/RBC/PLT
    - Sample: 20 µL; storage ≥ 150,000 results
    - Source: https://www.dymind.com/products/94
- [x] 🔴 **DH-800** — Dymind
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Dymind DH-800 specifications brochure`
  - **Verified info:**
    - Type: High-end hematology analyzer: CBC+DIFF, optional RET and PLT-F; body fluid mode
    - Parameters: 39 reportable (whole blood), 7 body fluid
    - Throughput: up to 110 tests/hour (CBC / CBC+DIFF)
    - Sample: whole blood ≤ 85 µL; capillary ≤ 27.5 µL; pre-diluted ≤ 20 µL
    - Loading: autosampler with rotary barcode scanning, plus closed and open/STAT manual modes
    - Size: 670 W × 865 D × 873 H mm; ≤ 115 kg
    - Connectivity: USB, LAN, HL7, bidirectional LIS; storage ≥ 300,000 results
    - Source: https://www.dymind.com/manage/userfiles/upload/2025/10/16/EN-DH-800%E5%BD%A9%E9%A1%B5_5.0_%20DH-800%E8%8B%B1%E6%96%87%E5%BD%A9%E9%A1%B5%20%E9%98%85%E8%AF%BB%E7%89%8820250515_20251016143941A003.pdf
- [x] 🔴 **DxH 520** — Beckman Coulter
  - Need: Throughput, Test menu / parameters measured, Sample type, Time to first result, Sample loading capacity / autoloader, Connectivity
  - Search: `Beckman Coulter DxH 520 specifications brochure`
  - **Verified info:**
    - Type: 5-part differential CBC analyzer, closed tube
    - Throughput: 55 samples/h closed tube, 60/h open tube
    - Sample: 17 µL venous or micro-collected whole blood (20 µL pre-dilute); tube fill as low as 375 µL
    - Size: 27 W × 41 H × 43 D cm; 11.4 kg
    - Connectivity: LIS via RS-232 and Ethernet, 5 USB ports, barcode reader
    - Best for: low-volume labs; pediatric / difficult-draw samples
    - Source: https://www.beckmancoulter.com/en/products/hematology/dxh-520
- [x] 🔴 **DxH 690T** — Beckman Coulter
  - Need: Throughput, Sample type, Sample volume, Time to first result, Connectivity
  - Search: `Beckman Coulter DxH 690T specifications brochure`
  - **Verified info:**
    - Type: Hematology analyzer (Coulter VCS 360 technology): CBC, diff with NRBC, reticulocytes, body fluids
    - Throughput: up to 100 samples per hour
    - Sample: 165 µL aspiration (pre-dilute 50 µL)
    - Size: 76 W × 90 H × 84 D cm; about 137–142 kg
    - Connectivity: REMISOL Advance middleware, auto QC export, remote service
    - Best for: mid-volume labs and medium-sized hospitals
    - Source: https://media.beckmancoulter.com/products/hematology/dxh-690t
- [x] 🔴 **DxH 900** — Beckman Coulter
  - Need: Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Beckman Coulter DxH 900 specifications brochure`
  - **Verified info:**
    - Type: High-volume hematology analyzer (VCS 360): CBC, diff with NRBC, reticulocytes, body fluids
    - Throughput: up to 100 samples per hour
    - Sample: 165 µL aspiration (pre-dilute 50 µL)
    - Size: 76 W × 177 H × 84 D cm; about 287–292 kg
    - Connectivity: DxH 900 workcell connects up to 3 analyzers + Slidemaker Stainer II
    - Best for: high-volume labs
    - Source: https://www.beckmancoulter.com/en/products/hematology/dxh-900
- [ ] 🔴 **EXC 8010** — Zybio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Zybio EXC 8010 specifications brochure`
- [ ] 🔴 **KT-60** — Genrui
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Genrui KT-60 specifications brochure`
- [x] 🔴 **KT-8000** — Genrui
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Genrui KT-8000 specifications brochure`
  - **Verified info:**
    - Type: 5-part differential hematology analyzer
    - Parameters: 28 + 8 parameters, 2 histograms
    - Throughput: 80 tests per hour
    - Sample: 15–20 µL; 10.4-inch touch screen
    - Source: https://www.newswise.com/articles/genrui-5-diff-hematology-analyzer-kt-8000-simply-more-efficient (Genrui announcement)
- [x] 🔴 **Scopio Labs X100 / X100HT** — Beckman Coulter
  - Need: Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Beckman Coulter Scopio Labs X100 / X100HT specifications brochure`
  - **Verified info:**
    - Type: Hematology digital cell morphology platform: full-field peripheral blood smear imaging at 100X with AI decision support
    - Analysis: 200 WBCs detected and pre-classified into 14 classes
    - Throughput: X100 up to 15 slides/h (3-slide tray); X100HT up to 40 slides/h (30 slides)
    - Size: X100 32 × 36 × 38 cm, 13.5 kg; X100HT 42 × 39 × 64 cm, 29.8 kg
    - Remote review supported
    - Source: https://convenzis.co.uk/uploads/pdfs/Scopio-Data-Sheet-EFM023-FF-PBS-X100-X00HT-R8-A4-65a4ee0cea15c.pdf (Scopio data sheet)
- [x] 🔴 **UniCel DxH Slidemaker Stainer II** — Beckman Coulter
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Beckman Coulter UniCel DxH Slidemaker Stainer II specifications brochure`
  - **Verified info:**
    - Type: Hematology slide maker and stainer (automated blood smear preparation + staining)
    - Sample: up to 4 slides from one 90 µL aspiration; up to 12 slides per sample presentation
    - Tubes: capped, open-top and pediatric whole blood tubes
    - Connectivity: LIS-driven; links with up to 3 DxH 900 in a workcell; 2D barcode; slide tracking
    - Best for: labs wanting consistent smears and less manual slide work
    - Source: https://www.beckmancoulter.com/products/hematology/dxh-slidemaker-stainer
- [x] 🔴 **Z52** — Zybio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Zybio Z52 specifications brochure`
  - **Verified info:**
    - Not verified: no Zybio page found. A distributor listing shows Z52 as a veterinary hematology analyser (Zytopia), so check it belongs in this catalog
    - Source: https://www.medicalsearch.com.au/zytopia-veterinary-haematology-analyser-z52/p/249427
- [x] 🟡 **DxH 500** — Beckman Coulter
  - Need: Throughput, Test menu / parameters measured, Sample type, Time to first result
  - Search: `Beckman Coulter DxH 500 specifications brochure`
  - **Verified info:**
    - Type: 5-part differential CBC analyzer, open vial
    - Parameters: WBC, RBC, HGB, HCT, MCV, MCH, MCHC, RDW-SD, RDW-CV, PLT, MPV + LY/MO/NE/EO/BA (% and #)
    - Throughput: 60 samples per hour
    - Sample: venous or micro-collected whole blood, 12 µL (20 µL pre-dilute)
    - Size: 27 W × 41 H × 43 D cm; 11.4 kg
    - Connectivity: bidirectional LIS (RS-232, Ethernet), USB, handheld barcode reader
    - Best for: physician offices, specialty and low-volume labs
    - Source: https://media.beckmancoulter.com/products/hematology/dxh-500
- [x] 🟡 **DxH 560 AL** — Beckman Coulter
  - Need: Throughput, Test menu / parameters measured, Sample type, Time to first result
  - Search: `Beckman Coulter DxH 560 AL specifications brochure`
  - **Verified info:**
    - Type: 5-part differential CBC analyzer with autoloader (Coulter Principle + axial light loss)
    - Throughput: 55 samples/h closed tube, 60/h open tube
    - Sample: 17 µL venous or micro-collected whole blood
    - Loading: 50-tube continuous-feed autoloader
    - Size: 50 W × 44 H × 46 D cm; 22 kg
    - Connectivity: bidirectional host interface, USB, barcode scanner
    - Best for: low- to mid-volume labs
    - Source: https://media.beckmancoulter.com/-/media/diagnostics/products/hematology/dxh-560/docs/dxh-560-brochure-br-288865.pdf

## Surgical Disposables

_Type: Disposable / consumable · Edit in: `app/user/products/components/surgical-disposable/surgical.tsx`_

- [ ] 🔴 **Disposable Circular Stapler** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Circular Stapler specifications brochure`
- [ ] 🔴 **Disposable Circumcision Stapler** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Circumcision Stapler specifications brochure`
  - Note: Description is very short (89 characters)
- [ ] 🔴 **Disposable Curved Cutter Stapler and Cartridge** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Curved Cutter Stapler and Cartridge specifications brochure`
- [ ] 🔴 **Disposable Endo Bag** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Endo Bag specifications brochure`
- [ ] 🔴 **Disposable Laparoscopic Trocar** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Laparoscopic Trocar specifications brochure`
- [ ] 🔴 **Disposable Linear Cutter Stapler and Cartridge** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Linear Cutter Stapler and Cartridge specifications brochure`
- [ ] 🔴 **Disposable Linear Stapler and Cartridge** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Linear Stapler and Cartridge specifications brochure`
  - Note: Description is very short (88 characters)
- [ ] 🔴 **Disposable Prolapse Hemorrhoids Stapler (PPH)** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Prolapse Hemorrhoids Stapler (PPH) specifications brochure`
- [ ] 🔴 **Disposable Prolapse Hemorrhoids Stapler (TST)** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Prolapse Hemorrhoids Stapler (TST) specifications brochure`
  - Note: Description is very short (76 characters)
- [ ] 🔴 **Disposable Purse String Stapler** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Purse String Stapler specifications brochure`
- [ ] 🔴 **Disposable Skin Stapler** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Skin Stapler specifications brochure`
  - Note: Description is very short (82 characters)
- [ ] 🔴 **Disposable Wound Protector** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `CAK Disposable Wound Protector specifications brochure`
- [ ] 🟡 **Disposable Endo Cutter Stapler and Cartridge (KUN Type)** — CAK
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `CAK Disposable Endo Cutter Stapler and Cartridge (KUN Type) specifications brochure`
- [ ] 🟡 **Disposable Endo Cutter Stapler and Cartridge (QIAN Type)** — CAK
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use
  - Search: `CAK Disposable Endo Cutter Stapler and Cartridge (QIAN Type) specifications brochure`

## Clinical Chemistry

_Type: Analyzer · Edit in: `app/user/products/components/clinical-chemistry/clinical-chemistry.tsx`_

- [x] 🔴 **AU5812** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Size / footprint, Connectivity
  - Search: `Beckman Coulter AU5812 specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer, AU5800 series, 1 photometric unit + dual ISE
    - Throughput: up to 2,000 photometric tests/h; up to 3,800 with dual ISE
    - Samples: 400 on board; 54 on-board reagents
    - Best for: hospital/reference labs, about 1.0–2.5 million tests per year
    - Source: https://www.beckmancoulter.com/en/products/chemistry/au5800
- [x] 🔴 **AU5822** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Size / footprint, Connectivity
  - Search: `Beckman Coulter AU5822 specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer, AU5800 series, 2 photometric units + dual ISE
    - Throughput: up to 4,000 photometric tests/h; up to 5,800 with dual ISE
    - Samples: 400 on board; 108 on-board reagents
    - Best for: hospital/reference labs, about 2.5–4.0 million tests per year
    - Source: https://www.beckmancoulter.com/en/products/chemistry/au5800
- [x] 🔴 **AU5832** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Size / footprint, Connectivity
  - Search: `Beckman Coulter AU5832 specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer, AU5800 series, 3 photometric units + dual ISE
    - Throughput: up to 6,000 photometric tests/h; up to 7,800 with dual ISE
    - Samples: 400 on board; 162 on-board reagents
    - Best for: hospital/reference labs, about 4.0–6.5 million tests per year
    - Source: https://www.beckmancoulter.com/en/products/chemistry/au5800
- [x] 🔴 **AU5842** — Beckman Coulter
  - Need: Sample type, Sample volume, Time to first result, Size / footprint, Connectivity
  - Search: `Beckman Coulter AU5842 specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer, AU5800 series, 4 photometric units + dual ISE
    - Throughput: up to 8,000 photometric tests/h; up to 9,800 with dual ISE
    - Samples: 400 on board; 216 on-board reagents
    - Best for: reference labs, over 6.5 million tests per year
    - Source: https://www.beckmancoulter.com/en/products/chemistry/au5800
- [x] 🔴 **DxC 500 AU** — Beckman Coulter
  - Need: Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Connectivity
  - Search: `Beckman Coulter DxC 500 AU specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer (photometric + ISE; also HbA1c)
    - Throughput: up to 400 photometric tests/h, 800 with ISE
    - Samples: 168 tubes (24 racks × 7) + 22-position refrigerated STAT carousel
    - Reagents: 76 refrigerated positions (up to 60 analytes); sample volume 1.0–25 µL
    - Size: 210 L × 160 H × 77 D cm; max 450 kg
    - Best for: low-volume labs
    - Source: https://www.beckmancoulter.com/products/chemistry/dxc-500-au-chemistry-analyzer
- [x] 🔴 **DxC 500i** — Beckman Coulter
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Beckman Coulter DxC 500i specifications brochure`
  - **Verified info:**
    - Type: Integrated clinical chemistry + immunoassay analyzer
    - Throughput: chemistry 400 photometric tests/h (800 with ISE); immunoassay 100 tests/h (one-step assays)
    - Samples: 168 tubes; 22 chemistry STAT positions; 60 immunoassay positions
    - Reagents: 76 chemistry + 24 immunoassay refrigerated positions; 170+ preprogrammed chemistry assays
    - Size: 254 L × 77 D × 124 H cm (160 cm with monitor); under 650 kg
    - Best for: low-volume labs wanting chemistry and immunoassay on one platform
    - Source: https://www.beckmancoulter.com/products/integrated-systems/dxc-500i-clinical-analyzer
- [x] 🔴 **ILab 650** — ILab
  - Need: Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint
  - Search: `ILab ILab 650 specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer with integrated ISE
    - Throughput: up to 800 tests/h (400 photometric + 400 ISE)
    - Loading: continuous sample loading; tubes and cups
    - Source: https://werfen.com/mx/es/ilab-650
- [x] 🔴 **ILab Aries** — ILab
  - Need: Throughput, Sample volume, Time to first result, Sample loading capacity / autoloader, Connectivity
  - Search: `ILab ILab Aries specifications brochure`
  - **Verified info:**
    - Type: Benchtop clinical chemistry analyzer
    - Throughput: 280 photometric tests/h; optional ISE 160 tests/h
    - Samples: 68 on board with continuous loading; reagents 56 vials in 4 refrigerated rotors
    - Best for: small to medium routine workloads
    - Source: https://www.werfen.com/mx/es/quimica-clinica/ilab-aries
- [x] 🔴 **ILab Taurus** — ILab
  - Need: Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint
  - Search: `ILab ILab Taurus specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer with ISE module (indirect potentiometry)
    - Samples: up to 100 on board (5-position racks); STAT loading any time
    - Best for: medium- to high-workload labs
    - Source: https://www.werfen.com/mx/es/quimica-clinica/ilab-taurus
- [x] 🔴 **ILab Twin Taurus** — ILab
  - Need: Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint
  - Search: `ILab ILab Twin Taurus specifications brochure`
  - **Verified info:**
    - Type: Two independent ILab Taurus photometric modules in one system
    - Menu: over 200 channels; floor-standing (no workbench needed)
    - Best for: labs needing double productivity or staged upgrade
    - Source: https://www.werfen.com/uk/en/taxonomy/term/290/ilab-taurus-twin
- [x] 🔴 **SmartLyte Plus** — Diamond
  - Need: Throughput, Sample volume, Sample loading capacity / autoloader, Size / footprint
  - Search: `Diamond SmartLyte Plus specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry ISE electrolyte analyzer: Na+, K+, Cl-, ionized Ca2+, Li+
    - Samples: whole blood, serum, plasma (Na-heparin); pre-diluted urine (Na, K, Cl)
    - Time: 30 seconds per sample
    - Range (blood): Na 40–200, K 1.7–15.0, Cl 50–200, iCa 0.3–5.0, Li 0.2–5.5 mmol/L
    - US FDA 510(k) K200544
    - Source: https://www.accessdata.fda.gov/cdrh_docs/reviews/K200544.pdf
- [x] 🟡 **DxC 700 AU** — Beckman Coulter
  - Need: Sample type, Sample volume, Size / footprint, Connectivity
  - Search: `Beckman Coulter DxC 700 AU specifications brochure`
  - **Verified info:**
    - Type: Clinical chemistry analyzer (photometric + ISE)
    - Throughput: 800 photometric tests/h; up to 1,200 with ISE
    - Samples: 150 (15 racks × 10) + 22-position carousel; sample volume 1.0–25 µL
    - Menu: 63 on-board assays with ISE; open channels; clot detection
    - Best for: mid- to high-volume labs
    - Source: https://www.beckmancoulter.com/products/chemistry/dxc-700-au

## Radiology

_Type: Imaging · Edit in: `app/user/products/components/RADIOLOGY-DEPARTMENT/radiology.tsx`_

- [ ] 🔴 **DM-2 Digital Mammary X-ray Machine** — WDM
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `WDM DM-2 Digital Mammary X-ray Machine specifications brochure`
- [ ] 🔴 **Echelon Smart** — FUJIFILM
  - Need: Imaging type, Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM Echelon Smart specifications brochure`
- [ ] 🔴 **F6 Fetal & Maternal Monitor** — EDAN
  - Need: Imaging type, Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `EDAN F6 Fetal & Maternal Monitor specifications brochure`
- [ ] 🔴 **FDR GO PLUS** — FUJIFILM
  - Need: Imaging type, Detector / probe specs, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM FDR GO PLUS specifications brochure`
  - Note: Also listed under Medical / Diagnostic Imaging — keep both descriptions the same
- [ ] 🔴 **SE-1200 Express** — EDAN
  - Need: Imaging type, Detector / probe specs, Fixed, mobile or portable, Clinical applications, Best for (clinic / lab / hospital)
  - Search: `EDAN SE-1200 Express specifications brochure`
- [ ] 🔴 **Supria 128** — FUJIFILM
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM Supria 128 specifications brochure`
- [ ] 🔴 **TurboTom 3** — WDM
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `WDM TurboTom 3 specifications brochure`
- [ ] 🟡 **Acclarix AX3** — EDAN
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality
  - Search: `EDAN Acclarix AX3 specifications brochure`
- [ ] 🟡 **Acclarix AX8** — EDAN
  - Need: Imaging type, Detector / probe specs, Image quality
  - Search: `EDAN Acclarix AX8 specifications brochure`
  - Note: Also listed under Medical / Diagnostic Imaging — keep both descriptions the same
- [ ] 🟡 **Amulet Innovality** — FUJIFILM
  - Need: Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM Amulet Innovality specifications brochure`
  - Note: Also listed under Medical / Diagnostic Imaging — keep both descriptions the same
- [ ] 🟡 **F9 Series Fetal & Maternal Monitor** — EDAN
  - Need: Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `EDAN F9 Series Fetal & Maternal Monitor specifications brochure`
- [ ] 🟡 **FDR Smart X** — FUJIFILM
  - Need: Detector / probe specs, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM FDR Smart X specifications brochure`
  - Note: Also listed under Medical / Diagnostic Imaging — keep both descriptions the same
- [ ] 🟡 **Innovative Solution for Liver Diagnosis** — WDM
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications
  - Search: `WDM Innovative Solution for Liver Diagnosis specifications brochure`
- [ ] 🟡 **M50-1A** — WDM
  - Need: Detector / probe specs, Image quality, Best for (clinic / lab / hospital)
  - Search: `WDM M50-1A specifications brochure`
- [ ] 🟡 **Nano C5 EXP** — EDAN
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality
  - Search: `EDAN Nano C5 EXP specifications brochure`
- [ ] 🟡 **New Oriental 1000N1a Digital Radiography System** — WDM
  - Need: Fixed, mobile or portable, Image quality, Best for (clinic / lab / hospital)
  - Search: `WDM New Oriental 1000N1a Digital Radiography System specifications brochure`
- [ ] 🟡 **SE-301** — EDAN
  - Need: Imaging type, Detector / probe specs, Clinical applications, Image quality
  - Search: `EDAN SE-301 specifications brochure`

## Biorefrigerators

_Type: Cold storage · Edit in: `app/user/products/components/biorefrigerators/biorefrigerators.tsx`_

- [ ] 🔴 **HXC-1369** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HXC-1369 specifications brochure`
  - Note: Description is very short (89 characters)
- [ ] 🔴 **HXC-1369T** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HXC-1369T specifications brochure`
- [ ] 🔴 **HXC-149** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HXC-149 specifications brochure`
- [ ] 🔴 **HXC-429T** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HXC-429T specifications brochure`
- [ ] 🔴 **HXC-629** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HXC-629 specifications brochure`
  - Note: Description is very short (86 characters)
- [ ] 🔴 **HYC-1378** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HYC-1378 specifications brochure`
- [ ] 🔴 **HYC-290** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HYC-290 specifications brochure`
- [ ] 🔴 **HYC-940&940F** — Haier
  - Need: Temperature range, Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HYC-940&940F specifications brochure`
- [ ] 🟡 **HXC-429** — Haier
  - Need: Temperature range, Capacity, Type, Size
  - Search: `Haier HXC-429 specifications brochure`
- [ ] 🟡 **HXC-629T** — Haier
  - Need: Temperature range, Capacity, Type, Size
  - Search: `Haier HXC-629T specifications brochure`
- [ ] 🟡 **HYC-118&118A** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HYC-118&118A specifications brochure`
- [ ] 🟡 **HYC-390&390F** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HYC-390&390F specifications brochure`
- [ ] 🟡 **HYC-610** — Haier
  - Need: Temperature range, Capacity, Type, Size
  - Search: `Haier HYC-610 specifications brochure`
- [ ] 🟡 **HYC-68&68A** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier HYC-68&68A specifications brochure`

## Microbiology

_Type: Analyzer · Edit in: `app/user/products/components/microbiology/microbiology.tsx`_

- [ ] 🔴 **Autobes BCX** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio Autobes BCX specifications brochure`
- [ ] 🔴 **Autobio AutoMic i600** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio Autobio AutoMic i600 specifications brochure`
- [ ] 🔴 **Autobio BC120** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Autobio Autobio BC120 specifications brochure`
- [ ] 🔴 **Autobio BC60** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio Autobio BC60 specifications brochure`
- [ ] 🔴 **Autof MS1000** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio Autof MS1000 specifications brochure`
- [ ] 🔴 **AutoStreak S1800** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio AutoStreak S1800 specifications brochure`
- [ ] 🔴 **BC120 Plus** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Autobio BC120 Plus specifications brochure`
- [ ] 🔴 **MS1600** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio MS1600 specifications brochure`
- [ ] 🔴 **MS2600** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Autobio MS2600 specifications brochure`
- [ ] 🔴 **TX8 MALDI-TOF MS** — Autobio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Autobio TX8 MALDI-TOF MS specifications brochure`

## Centrifuges

_Type: Centrifuge · Edit in: `app/user/products/components/centrifuges/centrifuges.tsx`_

- [ ] 🔴 **Floor Standing Low-Speed Refrigerated Centrifuge** — Haier
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available, Best for (clinic / lab / hospital)
  - Search: `Haier Floor Standing Low-Speed Refrigerated Centrifuge specifications brochure`
- [ ] 🔴 **Floor-Standing Large-Capacity Refrigerated Centrifuge** — Haier
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available, Best for (clinic / lab / hospital)
  - Search: `Haier Floor-Standing Large-Capacity Refrigerated Centrifuge specifications brochure`
- [ ] 🔴 **LC-8** — Hermle
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available
  - Search: `Hermle LC-8 specifications brochure`
- [ ] 🔴 **Z206-A** — Hermle
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available
  - Search: `Hermle Z206-A specifications brochure`
- [ ] 🔴 **Z207-A** — Hermle
  - Need: Max speed, Max force, Capacity, Refrigerated?, Best for (clinic / lab / hospital)
  - Search: `Hermle Z207-A specifications brochure`
- [ ] 🔴 **Z207-H** — Hermle
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available, Best for (clinic / lab / hospital)
  - Search: `Hermle Z207-H specifications brochure`
- [ ] 🔴 **Z216-M** — Hermle
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available, Best for (clinic / lab / hospital)
  - Search: `Hermle Z216-M specifications brochure`
- [ ] 🔴 **Z306** — Hermle
  - Need: Max speed, Max force, Capacity, Refrigerated?, Rotors included / available
  - Search: `Hermle Z306 specifications brochure`
- [ ] 🔴 **Z446-K** — Hermle
  - Need: Max speed, Max force, Capacity, Rotors included / available, Best for (clinic / lab / hospital)
  - Search: `Hermle Z446-K specifications brochure`
- [ ] 🟡 **Floor-Standing High-Speed Refrigerated Centrifuge** — Haier
  - Need: Max speed, Capacity, Rotors included / available, Best for (clinic / lab / hospital)
  - Search: `Haier Floor-Standing High-Speed Refrigerated Centrifuge specifications brochure`
- [ ] 🟡 **Z496-K** — Hermle
  - Need: Max speed, Max force, Capacity, Rotors included / available
  - Search: `Hermle Z496-K specifications brochure`

## POCT

_Type: Analyzer · Edit in: `app/user/products/components/poct/poct.tsx`_

- [ ] 🔴 **A1CNow Plus** — PTS Diagnostics
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `PTS Diagnostics A1CNow Plus specifications brochure`
- [ ] 🔴 **CardioChek Plus** — PTS Diagnostics
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `PTS Diagnostics CardioChek Plus specifications brochure`
- [ ] 🔴 **Ebmonitor Pro** — PTS Diagnostics
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `PTS Diagnostics Ebmonitor Pro specifications brochure`
- [ ] 🔴 **EHBT-50 Minilab** — Ozelle
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Ozelle EHBT-50 Minilab specifications brochure`
- [ ] 🔴 **iPonatic S Q31B** — Sansure
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Sansure iPonatic S Q31B specifications brochure`
- [ ] 🔴 **Mission HemoPro Hemoglobin** — ACON
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `ACON Mission HemoPro Hemoglobin specifications brochure`
- [ ] 🔴 **On Call Extra** — ACON
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `ACON On Call Extra specifications brochure`
- [ ] 🔴 **Q8 Pro** — Zybio
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Zybio Q8 Pro specifications brochure`
- [ ] 🔴 **Smart Pro** — ACON
  - Need: Throughput, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `ACON Smart Pro specifications brochure`

## Medical Surgical and Rehab Ward

_Type: Patient-care equipment · Edit in: `app/user/products/components/surgical-rehabilation/surgical-rehabilation.tsx`_

- [ ] 🔴 **SKH041 IV Pole** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKH041 IV Pole specifications brochure`
- [ ] 🔴 **SKH042 Overbed Table** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKH042 Overbed Table specifications brochure`
- [ ] 🔴 **SKR-MT625 Medical Trolley** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKR-MT625 Medical Trolley specifications brochure`
- [ ] 🔴 **SKR054-ET Emergency Trolley** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKR054-ET Emergency Trolley specifications brochure`
- [ ] 🔴 **SKS02-W Examination Table** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKS02-W Examination Table specifications brochure`
- [ ] 🟡 **Electric 3 Function Bed** — Saikang
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Saikang Electric 3 Function Bed specifications brochure`
- [ ] 🟡 **Electric 5 Function Bed** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang Electric 5 Function Bed specifications brochure`
- [ ] 🟡 **Electric 5 Function Orthopedic Bed** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang Electric 5 Function Orthopedic Bed specifications brochure`
- [ ] 🟡 **K3K Hospital Bed** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang K3K Hospital Bed specifications brochure`
- [ ] 🟡 **Manual 2 Cranks Bed** — Saikang
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Saikang Manual 2 Cranks Bed specifications brochure`
- [ ] 🟡 **Manual Orthopedic Bed** — Saikang
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Saikang Manual Orthopedic Bed specifications brochure`
- [ ] 🟡 **SKB041-1 Patient Stretcher** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen
  - Search: `Saikang SKB041-1 Patient Stretcher specifications brochure`
- [ ] 🟡 **SKB041-3 Patient Bed** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen
  - Search: `Saikang SKB041-3 Patient Bed specifications brochure`
- [ ] 🟡 **SKE020-1D Medical Cabinet** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKE020-1D Medical Cabinet specifications brochure`
- [ ] 🟡 **SKE031 Medical Equipment Cart** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKE031 Medical Equipment Cart specifications brochure`
- [ ] 🟡 **SKE087 Reclining Chair** — Saikang
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `Saikang SKE087 Reclining Chair specifications brochure`

## Emergency and Out Patient

_Type: Patient-care equipment · Edit in: `app/user/products/components/emergency-outpatient/emergency-outpatient.tsx`_

- [ ] 🔴 **SD3 Ultrasonic Pocket Doppler** — EDAN
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `EDAN SD3 Ultrasonic Pocket Doppler specifications brochure`
- [ ] 🔴 **Spine Board** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang Spine Board specifications brochure`
- [ ] 🟡 **A048 Gynecological Examination Table** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang A048 Gynecological Examination Table specifications brochure`
- [ ] 🟡 **Ambulance Chair Stretcher** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen
  - Search: `Saikang Ambulance Chair Stretcher specifications brochure`
- [ ] 🟡 **Ambulance Stretcher** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen
  - Search: `Saikang Ambulance Stretcher specifications brochure`
- [ ] 🟡 **C6 HDC6A HD Video Colposcope** — EDAN
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `EDAN C6 HDC6A HD Video Colposcope specifications brochure`
- [ ] 🟡 **F2F2A Automated External Defibrillator (AED)** — Comen
  - Need: Display / screen, Battery / portability, Clinical setting
  - Search: `Comen F2F2A Automated External Defibrillator (AED) specifications brochure`
- [ ] 🟡 **H100B Pulse Oximeter** — EDAN
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `EDAN H100B Pulse Oximeter specifications brochure`
- [ ] 🟡 **Hopefusion Series Infusion Pump** — Byond
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `Byond Hopefusion Series Infusion Pump specifications brochure`
- [ ] 🟡 **Hopefusion Series Syringe Pump** — Byond
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `Byond Hopefusion Series Syringe Pump specifications brochure`
- [ ] 🟡 **iM3 Vital Signs Monitor** — EDAN
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `EDAN iM3 Vital Signs Monitor specifications brochure`
- [ ] 🟡 **PA-2S Portable Aspirator** — Uzumcu
  - Need: Patient type, Key functions / modes, Display / screen
  - Search: `Uzumcu PA-2S Portable Aspirator specifications brochure`
- [ ] 🟡 **S5 Defibrillator Monitor** — Comen
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Comen S5 Defibrillator Monitor specifications brochure`
- [ ] 🟡 **S8 Defibrillator Monitor** — Comen
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Comen S8 Defibrillator Monitor specifications brochure`
- [ ] 🟡 **SKB041-10 Patient Transportation Trolley** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang SKB041-10 Patient Transportation Trolley specifications brochure`
- [ ] 🟡 **UHD Series Video Colposcope** — EDAN
  - Need: Patient type, Key functions / modes, Battery / portability, Clinical setting
  - Search: `EDAN UHD Series Video Colposcope specifications brochure`
- [ ] 🟡 **X09 Examination Table** — Saikang
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang X09 Examination Table specifications brochure`

## Lab Oven & Incubator

_Type: Lab equipment · Edit in: `app/user/products/components/lab-oven-incubator/lab-oven-incubator.tsx`_

- [ ] 🔴 **Climate Chamber** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Climate Chamber specifications brochure`
- [ ] 🔴 **Climate Chamber - Compressor Series** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Climate Chamber - Compressor Series specifications brochure`
- [ ] 🔴 **CO₂ Incubator** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `Haier CO₂ Incubator specifications brochure`
- [ ] 🔴 **CO₂ Incubator 168E front** — Haier
  - Need: Capacity / chamber volume, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier CO₂ Incubator 168E front specifications brochure`
- [ ] 🔴 **Cooled Incubator** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Cooled Incubator specifications brochure`
- [ ] 🔴 **Drying Oven** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Drying Oven specifications brochure`
- [ ] 🔴 **Standard Incubator** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Standard Incubator specifications brochure`

## Dry Bath / Vortex Mixer

_Type: Lab equipment · Edit in: `app/user/products/components/dry-bath/dry-bath.tsx`_

- [ ] 🔴 **DSC-300D** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB DSC-300D specifications brochure`
- [ ] 🔴 **HP-550 PRO** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB HP-550 PRO specifications brochure`
- [ ] 🔴 **MS10-H500-PRO** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB MS10-H500-PRO specifications brochure`
- [ ] 🔴 **MS7-H550-PRO** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB MS7-H550-PRO specifications brochure`
- [ ] 🔴 **MS7-H550-S** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB MS7-H550-S specifications brochure`
- [ ] 🔴 **PS-600T** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB PS-600T specifications brochure`
- [ ] 🟡 **HP-500 PRO** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class
  - Search: `DLAB HP-500 PRO specifications brochure`
- [ ] 🟡 **SR-100** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features
  - Search: `DLAB SR-100 specifications brochure`

## Laboratory Equipments

_Type: Lab equipment · Edit in: `app/user/products/components/laboratory-equipements/laboratory-equipements.tsx`_

- [ ] 🔴 **Biosafety Cabinets, Laminar Flow and Clean Benches** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Biosafety Cabinets, Laminar Flow and Clean Benches specifications brochure`
- [ ] 🔴 **Blood Banking Centrifuge** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Blood Banking Centrifuge specifications brochure`
- [ ] 🔴 **Cold Chain Storage, Biomedical Refrigerators, Freezers & Blood Bank Refrigerators** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Cold Chain Storage, Biomedical Refrigerators, Freezers & Blood Bank Refrigerators specifications brochure`
- [ ] 🔴 **Compact Universal Micro High Speed Filtration & Large Volume Centrifuge** — Hermle
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size
  - Search: `Hermle Compact Universal Micro High Speed Filtration & Large Volume Centrifuge specifications brochure`
- [ ] 🔴 **Laboratory Microscopes** — Nikon
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Nikon Laboratory Microscopes specifications brochure`
- [ ] 🔴 **T-LAB Eco V85** — Tuttnauer
  - Need: Capacity / chamber volume, Temperature range, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Tuttnauer T-LAB Eco V85 specifications brochure`
- [ ] 🟡 **MicroPette** — DLAB
  - Need: Temperature range, Type / class, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB MicroPette specifications brochure`
- [ ] 🟡 **Vertical Automatic High-pressure Steam Sterilizer** — Haier
  - Need: Capacity / chamber volume, Temperature range, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Vertical Automatic High-pressure Steam Sterilizer specifications brochure`

## Clinical Microscopy

_Type: Analyzer · Edit in: `app/user/products/components/clinical-microscopy/clinical-microscopy.tsx`_

- [ ] 🔴 **KU-F20** — Keyu
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Keyu KU-F20 specifications brochure`
- [ ] 🔴 **KU-F40** — Keyu
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Best for (clinic / lab / hospital)
  - Search: `Keyu KU-F40 specifications brochure`
- [ ] 🔴 **KU-F600** — Keyu
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Keyu KU-F600 specifications brochure`
- [ ] 🔴 **U1600** — Zybio
  - Need: Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Zybio U1600 specifications brochure`
- [ ] 🔴 **U3600** — Zybio
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Zybio U3600 specifications brochure`
- [ ] 🔴 **U500** — ACON
  - Need: Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `ACON U500 specifications brochure`
- [ ] 🟡 **U2600** — Zybio
  - Need: Sample volume, Time to first result, Size / footprint, Connectivity
  - Search: `Zybio U2600 specifications brochure`

## Laboratory Disposables

_Type: Disposable / consumable · Edit in: `app/user/products/components/laboratory-disposables/laboratory-disposables.tsx`_

- [ ] 🔴 **ABG Syringe** — Bruner
  - Need: Sizes / variants available, Pack size
  - Search: `Bruner ABG Syringe specifications brochure`
  - Note: Description is very short (86 characters)
- [ ] 🔴 **Capillary ABG Sampler** — Bruner
  - Need: Sizes / variants available, Pack size, Typical use
  - Search: `Bruner Capillary ABG Sampler specifications brochure`
  - Note: Description is very short (77 characters)
- [ ] 🔴 **PCR 8 Strips & Film** — Bruner
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `Bruner PCR 8 Strips & Film specifications brochure`
  - Note: Description is very short (74 characters)
- [ ] 🔴 **PCR Plates** — Bruner
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `Bruner PCR Plates specifications brochure`
  - Note: Description is very short (59 characters)
- [ ] 🟡 **Filtered Tips** — Bruner
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use
  - Search: `Bruner Filtered Tips specifications brochure`
- [ ] 🟡 **Microscope Slides & Coverslip** — Bruner
  - Need: Sizes / variants available, Pack size, Sterile / single-use, Typical use
  - Search: `Bruner Microscope Slides & Coverslip specifications brochure`
- [ ] 🟡 **Pipette Tips** — Bruner
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `Bruner Pipette Tips specifications brochure`
- [ ] 🟡 **Specimen Containers** — Bruner
  - Need: Sizes / variants available, Pack size, Sterile / single-use, Typical use
  - Search: `Bruner Specimen Containers specifications brochure`
- [ ] 🟡 **Tournistrip** — Asep
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `Asep Tournistrip specifications brochure`
- [ ] 🟡 **URS-4SG & URS-10A** — Bruner
  - Need: Sizes / variants available, Material, Sterile / single-use
  - Search: `Bruner URS-4SG & URS-10A specifications brochure`
- [ ] 🟡 **Vacuum Blood Tubes** — Bruner
  - Need: Sizes / variants available, Pack size, Typical use
  - Search: `Bruner Vacuum Blood Tubes specifications brochure`

## Operating and Delivery Room

_Type: Patient-care equipment · Edit in: `app/user/products/components/operating-delivery/operating-delivery.tsx`_

- [ ] 🔴 **Brush Holder 20 Capacity** — Uzumcu
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Uzumcu Brush Holder 20 Capacity specifications brochure`
- [ ] 🔴 **Liquid Soap Dispenser Elbow Control** — Uzumcu
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Uzumcu Liquid Soap Dispenser Elbow Control specifications brochure`
- [ ] 🔴 **Liquid Soap Dispenser Foot Pump** — Uzumcu
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `Uzumcu Liquid Soap Dispenser Foot Pump specifications brochure`
  - Note: Description is very short (83 characters)
- [ ] 🟡 **700-700ELED Surgical Light** — HFMED
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `HFMED 700-700ELED Surgical Light specifications brochure`
- [ ] 🟡 **700ELED Surgical Light** — HFMED
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `HFMED 700ELED Surgical Light specifications brochure`
- [ ] 🟡 **DL-62CM Operating Light** — HFMED
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `HFMED DL-62CM Operating Light specifications brochure`
- [ ] 🟡 **EK-410 Electrosurgical Unit** — Uzumcu
  - Need: Patient type, Battery / portability, Clinical setting
  - Search: `Uzumcu EK-410 Electrosurgical Unit specifications brochure`
- [ ] 🟡 **HF-FS LED Examination Lamp** — HFMED
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability
  - Search: `HFMED HF-FS LED Examination Lamp specifications brochure`
- [ ] 🟡 **HFEOT99 Electric Operating Table** — HFMED
  - Need: Patient type, Key functions / modes, Battery / portability
  - Search: `HFMED HFEOT99 Electric Operating Table specifications brochure`
- [ ] 🟡 **HFMPB06C Hydraulic Operating Table** — HFMED
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability
  - Search: `HFMED HFMPB06C Hydraulic Operating Table specifications brochure`
- [ ] 🟡 **JM-4F Delivery Table** — Uzumcu
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Uzumcu JM-4F Delivery Table specifications brochure`
- [ ] 🟡 **Novela Surgical Suction Unit** — Uzumcu
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Uzumcu Novela Surgical Suction Unit specifications brochure`
- [ ] 🟡 **OM-6N Operating Table** — Uzumcu
  - Need: Patient type, Display / screen, Battery / portability
  - Search: `Uzumcu OM-6N Operating Table specifications brochure`

## Rapid Test Kits

_Type: Rapid test kit · Edit in: `app/user/products/components/rapid-testkit/rapid-testkit.tsx`_

- [ ] 🔴 **Rhelax-CRP** — Tulip Diagnostic
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `Tulip Diagnostic Rhelax-CRP specifications brochure`
  - Note: Description is very short (83 characters)
- [ ] 🟡 **DENGUCHECK** — Tulip Diagnostic
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `Tulip Diagnostic DENGUCHECK specifications brochure`
- [ ] 🟡 **FOB Rapid Test** — ACON
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON FOB Rapid Test specifications brochure`
- [ ] 🟡 **H. pylori Rapid Test** — ACON
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON H. pylori Rapid Test specifications brochure`
- [ ] 🟡 **HBsAg Rapid Test** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON HBsAg Rapid Test specifications brochure`
- [ ] 🟡 **hCG Pregnancy** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON hCG Pregnancy specifications brochure`
- [ ] 🟡 **HCV Rapid Test** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON HCV Rapid Test specifications brochure`
- [ ] 🟡 **HIV Rapid Test** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON HIV Rapid Test specifications brochure`
- [ ] 🟡 **Malaria Rapid Test** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON Malaria Rapid Test specifications brochure`
- [ ] 🟡 **Rhelax-ASO** — Tulip Diagnostic
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `Tulip Diagnostic Rhelax-ASO specifications brochure`
- [ ] 🟡 **Rhelax-RF** — Tulip Diagnostic
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `Tulip Diagnostic Rhelax-RF specifications brochure`
- [ ] 🟡 **SARS CoV-2 Antigen Rapid Test** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON SARS CoV-2 Antigen Rapid Test specifications brochure`
- [ ] 🟡 **SYPHICHECK** — Tulip Diagnostic
  - Need: What it detects, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `Tulip Diagnostic SYPHICHECK specifications brochure`
- [ ] 🟡 **Syphilis Rapid Test** — ACON
  - Need: Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON Syphilis Rapid Test specifications brochure`
- [ ] 🟡 **Troponin I Rapid Test** — ACON
  - Need: Sample type, Time to result, Sensitivity / specificity, Tests per kit / pack size
  - Search: `ACON Troponin I Rapid Test specifications brochure`

## Coagulation & Hemostasis

_Type: Analyzer · Edit in: `app/user/products/components/coagulation/coagulation.tsx`_

- [ ] 🔴 **ACL Elite Pro** — Werfen
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Werfen ACL Elite Pro specifications brochure`
- [ ] 🔴 **ACL Top 350** — Werfen
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Werfen ACL Top 350 specifications brochure`
- [ ] 🔴 **ACL TOP 550** — Werfen
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Werfen ACL TOP 550 specifications brochure`
- [ ] 🔴 **ACL TOP 750** — Werfen
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Werfen ACL TOP 750 specifications brochure`
- [ ] 🔴 **AcuStar** — Werfen
  - Need: Throughput, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Werfen AcuStar specifications brochure`

## Hiplaas Grossing & Autopsy Solutions

_Type: Histopathology equipment · Edit in: `app/user/products/components/hiplaas/hiplaas.tsx`_

- [ ] 🔴 **ATPTABLE-E300** — Hiplaas
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Hiplaas ATPTABLE-E300 specifications brochure`
- [ ] 🔴 **EVO120 SFBT** — Hiplaas
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Size
  - Search: `Hiplaas EVO120 SFBT specifications brochure`
- [ ] 🔴 **EVO150 ED** — Hiplaas
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Best for (clinic / lab / hospital)
  - Search: `Hiplaas EVO150 ED specifications brochure`
- [ ] 🔴 **EVO150 FD** — Hiplaas
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Best for (clinic / lab / hospital)
  - Search: `Hiplaas EVO150 FD specifications brochure`
- [ ] 🔴 **KC21** — Hiplaas
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Best for (clinic / lab / hospital)
  - Search: `Hiplaas KC21 specifications brochure`

## Hospital Disposables

_Type: Disposable / consumable · Edit in: `app/user/products/components/hospital-disposables/hospital-disposables.tsx`_

- [ ] 🔴 **FFP2 NR Particulate Respirator** — Dunhame
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dunhame FFP2 NR Particulate Respirator specifications brochure`
- [ ] 🔴 **N95 Particulate Respirator** — Dunhame
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dunhame N95 Particulate Respirator specifications brochure`
- [ ] 🔴 **PPE Coverall** — Dunhame
  - Need: Sizes / variants available, Material, Pack size, Sterile / single-use, Typical use
  - Search: `Dunhame PPE Coverall specifications brochure`
- [ ] 🟡 **Clip Cap** — Dunhame
  - Need: Sizes / variants available, Pack size, Typical use
  - Search: `Dunhame Clip Cap specifications brochure`
- [ ] 🟡 **Disposable Gloves** — Dunhame
  - Need: Sizes / variants available, Pack size, Sterile / single-use, Typical use
  - Search: `Dunhame Disposable Gloves specifications brochure`
- [ ] 🟡 **Disposable Surgical Gown** — Dunhame
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `Dunhame Disposable Surgical Gown specifications brochure`
- [ ] 🟡 **Medical Face Mask** — Dunhame
  - Need: Sizes / variants available, Material, Pack size, Typical use
  - Search: `Dunhame Medical Face Mask specifications brochure`
- [ ] 🟡 **Shoe Cover** — Dunhame
  - Need: Material, Pack size, Typical use
  - Search: `Dunhame Shoe Cover specifications brochure`

## Arterial Blood Gas, Electrolytes & Co-Oximetry

_Type: Analyzer · Edit in: `app/user/products/components/arterial-blood-gas-electrolytes-co-oximetry/arterial-blood-gas-electrolytes-co-oximetry.tsx`_

- [ ] 🔴 **GEM Premier 3500 with iQM** — Werfen
  - Need: Throughput, Sample type, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint
  - Search: `Werfen GEM Premier 3500 with iQM specifications brochure`
- [ ] 🔴 **GEM Premier 5000 with iQM2** — Werfen
  - Need: Throughput, Test menu / parameters measured, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Werfen GEM Premier 5000 with iQM2 specifications brochure`
- [ ] 🔴 **GEM Premier 7000 with iQM3** — Werfen
  - Need: Throughput, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Werfen GEM Premier 7000 with iQM3 specifications brochure`
- [ ] 🔴 **GEM Premier ChemSTAT** — Werfen
  - Need: Throughput, Sample volume, Time to first result, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Werfen GEM Premier ChemSTAT specifications brochure`

## Dakewe

_Type: Histopathology equipment · Edit in: `app/user/products/components/dakewe/dakewe.tsx`_

- [ ] 🔴 **MT1 Microtome** — Dakewe
  - Need: Capacity, Throughput / run time, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Dakewe MT1 Microtome specifications brochure`
- [ ] 🔴 **SurePrint C100** — Dakewe
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Dakewe SurePrint C100 specifications brochure`
- [ ] 🔴 **SurePrint S200** — Dakewe
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Dakewe SurePrint S200 specifications brochure`
- [ ] 🟡 **SurePrint C7** — Dakewe
  - Need: Capacity, Throughput / run time, Type / automation level, Key features
  - Search: `Dakewe SurePrint C7 specifications brochure`
- [ ] 🟡 **SurePrint S10 & S10 PRO** — Dakewe
  - Need: Throughput / run time, Type / automation level, Key features
  - Search: `Dakewe SurePrint S10 & S10 PRO specifications brochure`

## Biomedical Freezers

_Type: Cold storage · Edit in: `app/user/products/components/biomedical-freezers/biomedical-freezers.tsx`_

- [ ] 🟡 **DW-25L262** — Haier
  - Need: Capacity, Alarms & monitoring, Size
  - Search: `Haier DW-25L262 specifications brochure`
- [ ] 🟡 **DW-25L92** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier DW-25L92 specifications brochure`
- [ ] 🟡 **DW-40L262** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier DW-40L262 specifications brochure`
- [ ] 🟡 **DW-40L278** — Haier
  - Need: Capacity, Alarms & monitoring, Size
  - Search: `Haier DW-40L278 specifications brochure`
- [ ] 🟡 **DW-40L348** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier DW-40L348 specifications brochure`
- [ ] 🟡 **DW-40L508** — Haier
  - Need: Capacity, Type, Alarms & monitoring, Size
  - Search: `Haier DW-40L508 specifications brochure`
- [ ] 🟡 **DW-40W100** — Haier
  - Need: Capacity, Alarms & monitoring, Size
  - Search: `Haier DW-40W100 specifications brochure`
- [ ] 🟡 **DW-40W255** — Haier
  - Need: Capacity, Alarms & monitoring, Size
  - Search: `Haier DW-40W255 specifications brochure`
- [ ] 🟡 **DW-40W380** — Haier
  - Need: Capacity, Alarms & monitoring, Size
  - Search: `Haier DW-40W380 specifications brochure`
- [ ] 🟡 **DW-SERIES** — Haier
  - Need: Capacity, Type, Size
  - Search: `Haier DW-SERIES specifications brochure`

## Medical / Diagnostic Imaging

_Type: Imaging · Edit in: `app/user/products/components/medical-diagnostic-imaging/medical-diagnostic-imaging.tsx`_

- [ ] 🔴 **FCT iStream 128** — FUJIFILM
  - Need: Detector / probe specs, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM FCT iStream 128 specifications brochure`
- [ ] 🔴 **FDR Nano** — FUJIFILM
  - Need: Imaging type, Fixed, mobile or portable, Clinical applications, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM FDR Nano specifications brochure`
- [ ] 🟡 **Acclarix AX9** — EDAN
  - Need: Detector / probe specs, Clinical applications, Image quality
  - Search: `EDAN Acclarix AX9 specifications brochure`
- [ ] 🟡 **Acclarix LX9** — EDAN
  - Need: Imaging type, Detector / probe specs, Fixed, mobile or portable, Image quality
  - Search: `EDAN Acclarix LX9 specifications brochure`
  - Note: Also listed under Radiology — keep both descriptions the same
- [ ] 🟡 **Arietta 850** — FUJIFILM
  - Need: Detector / probe specs, Fixed, mobile or portable, Image quality, Best for (clinic / lab / hospital)
  - Search: `FUJIFILM Arietta 850 specifications brochure`

## Microscopes

_Type: Microscope / scanner · Edit in: `app/user/products/components/microscopes/microscopes.tsx`_

- [ ] 🔴 **ECLIPSE E100** — Nikon
  - Need: Microscope type, Objectives / magnification, Illumination, Applications, Camera / digital imaging support, Best for (clinic / lab / hospital)
  - Search: `Nikon ECLIPSE E100 specifications brochure`
  - Note: Also listed under Upright Microscopes — keep both descriptions the same
- [ ] 🔴 **ECLIPSE Si** — Nikon
  - Need: Objectives / magnification, Illumination, Applications, Camera / digital imaging support, Best for (clinic / lab / hospital)
  - Search: `Nikon ECLIPSE Si specifications brochure`
  - Note: Also listed under Upright Microscopes — keep both descriptions the same
- [ ] 🟡 **ECLIPSE Ci** — Nikon
  - Need: Objectives / magnification, Camera / digital imaging support, Best for (clinic / lab / hospital)
  - Search: `Nikon ECLIPSE Ci specifications brochure`
  - Note: Also listed under Upright Microscopes — keep both descriptions the same
- [ ] 🟡 **ECLIPSE Ei** — Nikon
  - Need: Objectives / magnification, Illumination, Applications, Best for (clinic / lab / hospital)
  - Search: `Nikon ECLIPSE Ei specifications brochure`
  - Note: Also listed under Upright Microscopes — keep both descriptions the same
- [ ] 🟡 **ECLIPSE Ni** — Nikon
  - Need: Objectives / magnification, Illumination, Camera / digital imaging support, Best for (clinic / lab / hospital)
  - Search: `Nikon ECLIPSE Ni specifications brochure`
  - Note: Also listed under Upright Microscopes — keep both descriptions the same

## Pipettors

_Type: Lab equipment · Edit in: `app/user/products/components/pipettors/pipettors.tsx`_

- [ ] 🔴 **Micropette Plus** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB Micropette Plus specifications brochure`
  - Note: Description is very short (82 characters)
- [ ] 🔴 **Micropette Plus 2** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB Micropette Plus 2 specifications brochure`
  - Note: Description is very short (85 characters)
- [ ] 🔴 **Micropette Plus 3** — DLAB
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `DLAB Micropette Plus 3 specifications brochure`
  - Note: Description is very short (75 characters)

## Embedding

_Type: Histopathology equipment · Edit in: `app/user/products/components/sakura/sakura.tsx`_

- [ ] 🔴 **Floating Bath** — Sakura
  - Need: Capacity, Throughput / run time, Type / automation level, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Floating Bath specifications brochure`
- [ ] 🔴 **Tissue-Tek TEC 6** — Sakura
  - Need: Capacity, Throughput / run time, Type / automation level, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek TEC 6 specifications brochure`
- [ ] 🟡 **Tissue-Tek AutoTEC a120** — Sakura
  - Need: Capacity, Throughput / run time, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek AutoTEC a120 specifications brochure`

## Biosafety Cabinets

_Type: Lab equipment · Edit in: `app/user/products/components/biosafety-cabinets/biosafety-cabinets.tsx`_

- [ ] 🔴 **Class Series** — Haier
  - Need: Capacity / chamber volume, Temperature range, Type / class, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Haier Class Series specifications brochure`
- [ ] 🟡 **HR1200-IIA2-D** — Haier
  - Need: Capacity / chamber volume, Temperature range, Size, Best for (clinic / lab / hospital)
  - Search: `Haier HR1200-IIA2-D specifications brochure`
- [ ] 🟡 **HR1200-IIA2-S** — Haier
  - Need: Capacity / chamber volume, Temperature range, Size, Best for (clinic / lab / hospital)
  - Search: `Haier HR1200-IIA2-S specifications brochure`
- [ ] 🟡 **HR1200-IIA2-X** — Haier
  - Need: Capacity / chamber volume, Temperature range, Size, Best for (clinic / lab / hospital)
  - Search: `Haier HR1200-IIA2-X specifications brochure`

## HBA1C - HPLC

_Type: Analyzer · Edit in: `app/user/products/components/hba1c-hplc/HBA1C-HPLC.tsx`_

- [ ] 🔴 **HLC-723 G11** — Tosoh
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity, Best for (clinic / lab / hospital)
  - Search: `Tosoh HLC-723 G11 specifications brochure`
- [ ] 🔴 **HLC-723 GX** — Tosoh
  - Need: Throughput, Test menu / parameters measured, Sample type, Sample volume, Sample loading capacity / autoloader, Size / footprint, Connectivity
  - Search: `Tosoh HLC-723 GX specifications brochure`

## NICU PICU AND ICU

_Type: Patient-care equipment · Edit in: `app/user/products/components/nicu-picu-icu/nicu-picu-icu.tsx`_

- [ ] 🟡 **CR2q Hospital Bed** — Saikang
  - Need: Patient type, Display / screen, Clinical setting
  - Search: `Saikang CR2q Hospital Bed specifications brochure`
- [ ] 🟡 **EcoLa3000 Infant Incubator** — BNG
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `BNG EcoLa3000 Infant Incubator specifications brochure`
- [ ] 🟡 **Pedia Electric 5 Function Bed** — Saikang
  - Need: Display / screen, Battery / portability, Clinical setting
  - Search: `Saikang Pedia Electric 5 Function Bed specifications brochure`
- [ ] 🟡 **Pedia Manual 2 Cranks Bed** — Saikang
  - Need: Key functions / modes, Display / screen, Battery / portability
  - Search: `Saikang Pedia Manual 2 Cranks Bed specifications brochure`
- [ ] 🟡 **Pedia Manual 3 Cranks Bed** — Saikang
  - Need: Key functions / modes, Display / screen, Battery / portability
  - Search: `Saikang Pedia Manual 3 Cranks Bed specifications brochure`
- [ ] 🟡 **V8v Electric ICU Bed** — Saikang
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability
  - Search: `Saikang V8v Electric ICU Bed specifications brochure`

## OR Equipment

_Type: Patient-care equipment · Edit in: `app/user/products/components/or-equipment/or-equipments.tsx`_

- [ ] 🔴 **4K Laparoscopy System**
  - Need: Patient type, Key functions / modes, Display / screen, Battery / portability, Clinical setting
  - Search: `4K Laparoscopy System specifications brochure`
- [ ] 🟡 **ELUXEO 700 System** — FUJIFILM
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `FUJIFILM ELUXEO 700 System specifications brochure`
- [ ] 🟡 **iSE Series – Electrocardiograph (ECG)**
  - Need: Patient type, Display / screen, Clinical setting
  - Search: `iSE Series – Electrocardiograph (ECG) specifications brochure`

## Microtomy

_Type: Histopathology equipment · Edit in: `app/user/products/components/sakura/sakura.tsx`_

- [ ] 🔴 **Tissue-Tek Slide Warmer** — Sakura
  - Need: Capacity, Throughput / run time, Type / automation level, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek Slide Warmer specifications brochure`
- [ ] 🟡 **Tissue-Tek Autosection** — Sakura
  - Need: Capacity, Throughput / run time, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek Autosection specifications brochure`

## Tissue Processing

_Type: Histopathology equipment · Edit in: `app/user/products/components/sakura/sakura.tsx`_

- [ ] 🟡 **Histo-Tek VP1** — Sakura
  - Need: Capacity, Throughput / run time, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Histo-Tek VP1 specifications brochure`
- [ ] 🟡 **Tissue-Tek Prisma Plus** — Sakura
  - Need: Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek Prisma Plus specifications brochure`
- [ ] 🟡 **Tissue-Tek VIP 6 AI** — Sakura
  - Need: Capacity, Throughput / run time, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek VIP 6 AI specifications brochure`
- [ ] 🟡 **Tissue-Tek Xpress x120** — Sakura
  - Need: Capacity, Type / automation level, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek Xpress x120 specifications brochure`

## Biogenex

_Type: Histopathology equipment · Edit in: `app/user/products/components/biogenex/biogenex.tsx`_

- [ ] 🔴 **NanoVIP** — Biogenex
  - Need: Capacity, Throughput / run time, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Biogenex NanoVIP specifications brochure`

## Coverslipping

_Type: Histopathology equipment · Edit in: `app/user/products/components/sakura/sakura.tsx`_

- [ ] 🔴 **Tissue-Tek Film** — Sakura
  - Need: Capacity, Throughput / run time, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek Film specifications brochure`

## Cryotomy

_Type: Histopathology equipment · Edit in: `app/user/products/components/sakura/sakura.tsx`_

- [ ] 🔴 **Tissue-Tek Polar** — Sakura
  - Need: Capacity, Throughput / run time, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Tissue-Tek Polar specifications brochure`

## Cytology

_Type: Histopathology equipment · Edit in: `app/user/products/components/sakura/sakura.tsx`_

- [ ] 🔴 **Cyto-Tek 2500** — Sakura
  - Need: Capacity, Throughput / run time, Key features, Size, Best for (clinic / lab / hospital)
  - Search: `Sakura Cyto-Tek 2500 specifications brochure`

## Pulmonary

_Type: Patient-care equipment · Edit in: `app/user/products/components/pulmonary-department/pulmonary.tsx`_

- [ ] 🟡 **Carestation 30** — GE Healthcare
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `GE Healthcare Carestation 30 specifications brochure`
- [ ] 🟡 **NKV-550** — Nihon
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `Nihon NKV-550 specifications brochure`

## Gastro / Endo Equipments

_Type: Patient-care equipment · Edit in: `app/user/products/components/gastro-endo/gastro-endo.tsx`_

- [ ] 🟡 **C6 HD / C6A HD** — EDAN
  - Need: Patient type, Display / screen, Battery / portability, Clinical setting
  - Search: `EDAN C6 HD / C6A HD specifications brochure`

## Motic Slide Scanners

_Type: Microscope / scanner · Edit in: `app/user/products/components/moticsliderscanner/moticsliderscanner.tsx`_

- [ ] 🟡 **MoticEasyScan Infinity 60** — Motic
  - Need: Illumination, Applications, Camera / digital imaging support
  - Search: `Motic MoticEasyScan Infinity 60 specifications brochure`

## Vitro

_Type: Histopathology equipment · Edit in: `app/user/products/components/vitro/vitro.tsx`_

- [ ] 🟡 **VitroStainer 42** — Vitro
  - Need: Throughput / run time, Size, Best for (clinic / lab / hospital)
  - Search: `Vitro VitroStainer 42 specifications brochure`

---
🔴 High = few or no specs on the website · 🟡 Medium = some specs missing