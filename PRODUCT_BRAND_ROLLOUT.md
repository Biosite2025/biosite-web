# Product Page Brand Rollout — Report

The "Immunology page pattern" (gradient hero over `background.png`, brand logo
sub-tabs, section-level cross-fading brand watermark, card corner logo, subtle
3D image tilt, layered card shadows, ghost "View Details" button, refined modal,
focus-visible outlines) has been applied to **37 pages** across categories
**I. Clinical**, **III. General Lab Equipments**, **IV. Medical & Hospital
Equipments**, and **V. Disposables / Consumables**.

**II. HISTOPATHOLOGY was not touched** — verified via `git status`: Sakura,
Dakewe, Hiplaas, Vitro, Biogenex, Nikon Microscopes, Motic Slide Scanners and
Hamamatsu Slide Scanners are all unmodified.

**Totals: 362 products — 202 branded (56%), 160 unbranded (44%).**

---

## How a brand was assigned

A product only got a logo when the repo itself provided evidence:

| Evidence | Meaning |
|---|---|
| **name** | Brand appears in the product name (e.g. `Hermle Z206-A`, `EDAN Nano C5 EXP`) |
| **desc** | Brand is named in the product's own description (e.g. "The **Fujifilm** ARIETTA 850 SE…") |
| **img** | Brand appears in the image path (e.g. `.../sterilizer-autoclave/**Tuttnauer**/2540EKA.png`) |
| **line** | Product is an unambiguous model line of a brand confirmed by the above on the same page (e.g. `KT-8000` shares the KT line with `Genrui KT-60`) |

Anything without such evidence was **left unbranded and reported below** rather
than guessed. Unbranded products still render normally; on pages that have at
least one brand they collect under an automatic **"Others"** tab.

---

## Coverage by page

### I. Clinical
| Page | Total | Matched | Missing | Brand tabs |
|---|--:|--:|--:|---|
| Clinical Chemistry | 5 | 5 | 0 | ILab (4), Diamond (1) |
| HBA1C-HPLC | 2 | 2 | 0 | Tosoh (2) |
| Immunology | 7 | 7 | 0 | Tosoh (4), DiaSorin (2), Werfen (1) |
| Coagulation & Hemostasis | 5 | 5 | 0 | Werfen (5) |
| Blood Bank | 33 | 17 | 16 | Matrix (3), DiaSorin (1), ACON (1), Tulip Diagnostic (12) |
| ABG / Electrolytes / Co-Ox | 4 | 4 | 0 | Werfen (4) |
| POCT | 9 | 4 | 5 | ACON (3), Sansure (1) |
| Microbiology | 10 | 9 | 1 | Autobio (9) |
| Clinical Microscopy | 7 | 7 | 0 | ACON (1), Zybio (3), Keyu (3) |
| Hematology | 7 | 3 | 4 | Dymind (1), Genrui (2) |
| Molecular Diagnostics | 16 | 14 | 2 | Sansure (9), Zybio (3), Genolution (1), Mylab (1) |
| Rapid Test Kits | 16 | 16 | 0 | ACON (10), Tulip Diagnostic (6) |

### III. General Lab Equipments
| Page | Total | Matched | Missing | Brand tabs |
|---|--:|--:|--:|---|
| Microscopes | 5 | 0 | 5 | — none — |
| Centrifuges | 11 | 11 | 0 | Hermle (8), Haier (3) |
| Pipettors | 3 | 3 | 0 | DLAB (3) |
| Biorefrigerators | 14 | 14 | 0 | Haier (14) |
| Biomedical Freezers | 10 | 10 | 0 | Haier (10) |
| Biosafety Cabinets | 4 | 3 | 1 | Haier (3) |
| Lab Oven / Incubator | 7 | 7 | 0 | Haier (7) |
| Sterilizer & Autoclave | 17 | 17 | 0 | Tuttnauer (15), Haier (2) |
| Dry Bath / Vortex Mixer | 8 | 8 | 0 | DLAB (8) |

### IV. Medical & Hospital Equipments
`*` = page exists in the repo but is not in the nav dropdown.

| Page | Total | Matched | Missing | Brand tabs |
|---|--:|--:|--:|---|
| Radiology | 18 | 7 | 11 | FUJIFILM (3), EDAN (4) |
| Pulmonary | 9 | 0 | 9 | — none — |
| Emergency and Out Patient | 20 | 4 | 16 | EDAN (4) |
| Medical Surgical and Rehab Ward | 16 | 0 | 16 | — none — |
| Operating and Delivery Room | 15 | 0 | 15 | — none — |
| NICU PICU AND ICU | 10 | 0 | 10 | — none — |
| Dialysis / Renal * | 1 | 1 | 0 | Biolight (1) |
| Gastro / Endo * | 1 | 1 | 0 | EDAN (1) |
| ICU / ER Equipments * | 1 | 1 | 0 | EDAN (1) |
| OR Equipment * | 3 | 1 | 2 | FUJIFILM (1) |
| Medical / Diagnostic Imaging * | 10 | 10 | 0 | EDAN (4), FUJIFILM (6) |

### V. Disposables / Consumables
| Page | Total | Matched | Missing | Brand tabs |
|---|--:|--:|--:|---|
| Laboratory Equipments | 8 | 1 | 7 | Hermle (1) |
| Laboratory Disposables | 12 | 5 | 7 | Bruner (4), Asep (1) |
| Hospital Disposables | 9 | 5 | 4 | Dunhame (5) |
| Histopathology Chemicals & Consumables | 15 | 0 | 15 | — none — |
| Surgical Disposables | 14 | 0 | 14 | — none — |

---

## MISSING LOGO — page-level view

### 1) Pages with ZERO logos (7)
These render with no tabs and no watermark until a brand is identified.

| Page | Products | Note |
|---|--:|---|
| Microscopes | 5 | All ECLIPSE = **Nikon**, but there is **no Nikon logo file** in `public/asset/logo`. Add `NIKON.png` and this page is instantly 5/5. |
| Pulmonary | 9 | Multiple different makers, none with a logo on disk — Hamilton (`Hamilton MR1/T1`), Dräger (`Babylog VN600`), Penlon (`Prima 320`), plus Crius / Atlas N7 / NKV-550 / Carestation 30. |
| Medical Surgical and Rehab Ward | 16 | All SK-prefixed ward furniture; no maker named anywhere. |
| Operating and Delivery Room | 15 | Surgical lights/tables + `Novela` suction unit; no maker named, no matching logo. |
| NICU PICU AND ICU | 10 | Infant warmers/incubators/beds; no maker named. |
| Histopathology Chemicals & Consumables | 15 | Reagents + `Histoflo™` consumables; `Histoflo` has no logo file. |
| Surgical Disposables | 14 | Staplers/trocars; no maker named. |

### 2) Pages with PARTIAL coverage (12)

| Page | Total | Matched | Products still missing a logo |
|---|--:|--:|---|
| Blood Bank | 33 | 17 | Plasma Apheresis System; Plasma Thawing; Sterile Tube Welder; the 8 `SureSeal™` tube sealers (SE170/SE160/SE730/SE700/SE260/SE175/SE470/SE450); CM735A; CM760; CM745; ES315; CB220 |
| Emergency and Out Patient | 20 | 4 | iM3; H100B; PA-2S; SD3; Hopefusion Infusion Pump; Hopefusion Syringe Pump; F2F2A AED; S8; S5; UHD Colposcope; X09 Table; A048 Table; SKB041-10 Trolley; Spine Board; Ambulance Stretcher; Ambulance Chair Stretcher |
| Radiology | 18 | 7 | New Oriental 1000N1a; DM-2; M50-1A; Supria 128; TurboTom 3; Echelon Smart; F9 Series; F6; SE-301; SE-1200 Express; Innovative Solution for Liver Diagnosis |
| Laboratory Equipments | 8 | 1 | Biosafety Cabinets…; Blood Banking Centrifuge; Cold Chain Storage…; Laboratory Microscopes; MicroPette; T-LAB Eco V85; Vertical Automatic High-pressure Steam Sterilizer |
| Laboratory Disposables | 12 | 5 | Vacuum Blood Tubes; Pipette Tips; Sharps Container; ABG Syringe; Capillary ABG Sampler; PCR 8 Strips & Film; PCR Plates |
| POCT | 9 | 4 | A1CNow Plus; CardioChek Plus; Ebmonitor Pro; EHBT-50 Minilab; Q8 Pro |
| Hematology | 7 | 3 | Z52; EXC 8010; DH-800; DH-615 |
| Hospital Disposables | 9 | 5 | Disposable Gloves; FFP2 NR Respirator; N95 Respirator; Disposable Syringe |
| OR Equipment * | 3 | 1 | iSE Series – Electrocardiograph (ECG); 4K Laparoscopy System |
| Molecular Diagnostics | 16 | 14 | Human Papillomavirus (HPV) Diagnostic Kit; Nucleic Acid Test Kit for HBV HCV & HIV |
| Biosafety Cabinets | 4 | 3 | Class Series |
| Microbiology | 10 | 9 | TX8 MALDI-TOF MS |

### 3) Pages with FULL coverage (18)
Clinical Chemistry · HBA1C-HPLC · Immunology · Coagulation & Hemostasis ·
ABG/Electrolytes/Co-Ox · Clinical Microscopy · Rapid Test Kits · Centrifuges ·
Pipettors · Biorefrigerators · Biomedical Freezers · Lab Oven/Incubator ·
Sterilizer & Autoclave · Dry Bath/Vortex Mixer · Dialysis/Renal · Gastro/Endo ·
ICU/ER Equipments · Medical/Diagnostic Imaging

---

## Why individual matches failed

**No maker stated anywhere (name, description, or image path)** — the largest
group. Applies to: the `SureSeal™` blood-bank line, all SK-prefixed ward
furniture, the operating/delivery and NICU ranges, all surgical disposables, the
histopathology chemicals, `TX8 MALDI-TOF MS`, `Class Series`, `Z52`, `EXC 8010`,
`DH-800`, `DH-615`, `Q8 Pro`, `EHBT-50 Minilab`, the HPV and HBV/HCV/HIV kits.

**Maker known from the description but no logo file on disk** — a logo drop
fixes these instantly:

| Product(s) | Maker named in description | Needed file |
|---|---|---|
| ECLIPSE Ci / E100 / Ei / Ni / Si | Nikon (image path is `/products/nikon/`) | `NIKON.png` |
| Hamilton MR1, Hamilton T1 | Hamilton Medical | `HAMILTON.png` ⚠️ note: `HAMAMATSU.png` is a **different company** |
| Babylog VN600 | Dräger | `DRAGER.png` |
| Prima 320 | Penlon | `PENLON.png` |
| TurboTom 3 | WDM | `WDM.png` |
| A1CNow Plus, CardioChek Plus | PTS Diagnostics | `PTS.png` |
| Ebmonitor Pro | Visgeneer | `VISGENEER.png` |
| Histoflo™ consumables | Histoflo | `HISTOFLO.png` |

**Ambiguous — needs your decision:**

- **`ASEP.png` vs `ASEP HEALTHCARE.png`** — both exist. `Tournistrip` is
  currently mapped to `ASEP.png`.
- **`TULIP DIAGNOSTIC.png` vs `TULIP DIAGNOSTICS.png`** — both exist. Currently
  using `TULIP DIAGNOSTIC.png` (Rapid Test Kits + Blood Bank Eryclone sera).
- **`HERMLE.png` vs `HERMLE BENCHMARK.png`** — currently using `HERMLE.png`.
- **`MATRIX.png` vs `MATRIX AUTOMINI.png`** — currently using `MATRIX.png` for
  the Matrix tab, including for the `AutoMini 40` product.
- **`Echelon Smart` / `Supria 128`** — Hitachi-origin lines now under Fujifilm
  Healthcare. Left unbranded rather than guess between Hitachi and Fujifilm.
- **`Medical / Diagnostic Imaging`** — the old `PRODUCT_HERO_AUDIT.md` filed this
  under "II. Histopathology (adjacent)", but its actual products are Fujifilm/EDAN
  imaging systems, so it was treated as **IV. Medical** and included. Say the word
  and it can be reverted.

---

## Notable fixes made along the way

- **Case-sensitivity bug (would have broken production).** Immunology referenced
  `/asset/logo/tosoh.png` and `/asset/logo/werfen.png`, but the files on disk are
  `TOSOH.png` and `WERFEN.png`. This works on Windows (case-insensitive) but 404s
  on Linux. All 29 asset references are now verified to resolve with exact case.
- **Immunology's Liaison tab** now uses `DIASORIN.png` (the actual brand) instead
  of `liason.png`, so the padding hacks tuned for that artwork were removed.

## Where the code lives

- `app/user/products/components/shared/BrandedProductPage.tsx` — the whole
  pattern as one component (hero, tabs, watermark, grid, modal, CTA). Most pages
  are now ~20 lines of data plus one call to it.
- `app/user/products/components/shared/ProductCard.tsx` — card: corner brand
  badge, subtle 3D tilt (off on touch / `prefers-reduced-motion`), layered
  shadow, ghost button.
- Immunology and Clinical Chemistry keep their own files because they have custom
  test-menu modals; they wire up the same tabs + watermark locally.
