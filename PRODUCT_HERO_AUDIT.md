# Product Page Hero Audit

Audit of every product/brand page under `app/user/products`, checked against the reference hero pattern used by the **Nikon Microscopes** page (logo image + background image + tagline + scroll-down arrow).

Read-only audit — no page files were modified.

## Key findings

- **Base path:** pages live under `app/user/products/components/<slug>/page.tsx`, not directly under `products/`. Actual routes are `/user/products/components/<slug>`.
- **No shared hero component.** All 45 pages hand-roll their own hero JSX. The only shared pieces are `ParticlesBackground.tsx` (particle overlay) and `src/components/layout/Preloader.tsx` (loading screen) — both imported everywhere, but neither renders the logo/background.
- Only **3 of 45 pages** fully match the Nikon pattern (logo + background): **Nikon Microscopes, Hamamatsu Slide Scanner, Sakura**.
- **Dakewe** and **Motic Slide Scanners** have a background image but no logo.
- All other 40 pages (every generic category/department page, plus Vitro, Biogenex, Hiplaas) render a plain CSS-gradient hero with a text `<h1>` — no logo, no background image.
- Some pages already have logo/background files sitting unused on disk (see below) — for those, the fix is wiring up existing assets, not sourcing new ones.

## Audit table

| Product / Brand | Nav Category | Subcategory | Route path | File path | Has Logo? | Has BG Image? | Missing Assets |
|---|---|---|---|---|---|---|---|
| Nikon Microscopes | II. Histopathology | Nikon Microscopes | `/user/products/components/nikonmicroscopes` | `app/user/products/components/nikonmicroscopes/nikonmicroscopes.tsx` | ✅ (remote Cloudinary) | ✅ (local `/asset/nikon microscopes/nikonbackground.jpg`) | — |
| Hamamatsu Slide Scanner | II. Histopathology | Hamamatsu Slide Scanners | `/user/products/components/hamamatsusliderscanner` | `.../hamamatsusliderscanner/hamamatsusliderscanner.tsx` | ✅ (remote Cloudinary) | ✅ (remote Cloudinary) | — |
| Sakura | II. Histopathology | Sakura | `/user/products/components/sakura` | `.../sakura/sakura.tsx` | ✅ (remote Cloudinary) | ✅ (remote DO Spaces) | — |
| Dakewe | II. Histopathology | Dakewe | `/user/products/components/dakewe` | `.../dakewe/dakewe.tsx` | ❌ (plain `<h1>`) | ✅ (remote Cloudinary) | logo |
| Motic Slide Scanner | II. Histopathology | Motic Slide Scanners | `/user/products/components/moticsliderscanner` | `.../moticsliderscanner/moticsliderscanner.tsx` | ❌ (plain `<h1>`) | ✅ (local `/asset/motic/motic-bg.png`) | logo |
| Vitro | II. Histopathology | Vitro | `/user/products/components/vitro` | `.../vitro/vitro.tsx` | ❌ | ❌ (gradient only) | logo, background image |
| Biogenex | II. Histopathology | Biogenex | `/user/products/components/biogenex` | `.../biogenex/biogenex.tsx` | ❌ | ❌ (gradient only) | logo, background image |
| Hiplaas | II. Histopathology | Hiplaas | `/user/products/components/hiplaas` | `.../hiplaas/hiplaas.tsx` | ❌ | ❌ (gradient only) | logo, background image |
| Microscopes (generic) | III. General Lab Equipments | Microscopes | `/user/products/components/microscopes` | `.../microscopes/microscopes.tsx` | ❌ | ❌ (dead Nikon preload code, unused) | logo, background image |
| Centrifuges | III. General Lab Equipments | Centrifuges | `/user/products/components/centrifuges` | `.../centrifuges/centrifuges.tsx` | ❌ | ❌ | logo, background image |
| Pipettors | III. General Lab Equipments | Pipettors | `/user/products/components/pipettors` | `.../pipettors/pipettors.tsx` | ❌ | ❌ | logo, background image |
| Biorefrigerators | III. General Lab Equipments | Biorefrigerators | `/user/products/components/biorefrigerators` | `.../biorefrigerators/biorefrigerators.tsx` | ❌ | ❌ | logo, background image |
| Biomedical Freezers | III. General Lab Equipments | Freezers/Cryo/LN2 Storage | `/user/products/components/biomedical-freezers` | `.../biomedical-freezers/biomedical-freezers.tsx` | ❌ | ❌ | logo, background image |
| Biosafety Cabinets | III. General Lab Equipments | Biosafety & Laminar Flow Cabinets | `/user/products/components/biosafety-cabinets` | `.../biosafety-cabinets/biosafety-cabinets.tsx` | ❌ | ❌ | logo, background image |
| Lab Oven / Incubator | III. General Lab Equipments | Lab Oven, Incubator, CO₂ Incubator | `/user/products/components/lab-oven-incubator` | `.../lab-oven-incubator/lab-oven-incubator.tsx` | ❌ | ❌ | logo, background image |
| Sterilizer & Autoclave | III. General Lab Equipments | Sterilizer & Autoclave | `/user/products/components/sterilizer-autoclave` | `.../sterilizer-autoclave/sterilizerautoclave.tsx` | ❌ | ❌ | logo, background image |
| Dry Bath / Vortex Mixer | III. General Lab Equipments | Dry Bath, Vortex Mixer, Rotator, etc. | `/user/products/components/dry-bath` | `.../dry-bath/dry-bath.tsx` | ❌ | ❌ | logo, background image |
| Radiology | IV. Medical & Hospital Equipments | Radiology | `/user/products/components/RADIOLOGY-DEPARTMENT` | `.../RADIOLOGY-DEPARTMENT/radiology.tsx` | ❌ | ❌ | logo, background image |
| Pulmonary | IV. Medical & Hospital Equipments | Pulmonary | `/user/products/components/pulmonary-department` | `.../pulmonary-department/pulmonary.tsx` | ❌ | ❌ | logo, background image |
| Emergency and Out Patient | IV. Medical & Hospital Equipments | Emergency and Out Patient | `/user/products/components/emergency-outpatient` | `.../emergency-outpatient/emergency-outpatient.tsx` | ❌ | ❌ | logo, background image |
| Medical Surgical and Rehab Ward | IV. Medical & Hospital Equipments | Medical Surgical and Rehab Ward | `/user/products/components/surgical-rehabilation` | `.../surgical-rehabilation/surgical-rehabilation.tsx` | ❌ | ❌ | logo, background image |
| Operating and Delivery Room | IV. Medical & Hospital Equipments | Operating and Delivery Room | `/user/products/components/operating-delivery` | `.../operating-delivery/operating-delivery.tsx` | ❌ | ❌ | logo, background image |
| NICU PICU AND ICU | IV. Medical & Hospital Equipments | NICU PICU AND ICU | `/user/products/components/nicu-picu-icu` | `.../nicu-picu-icu/nicu-picu-icu.tsx` | ❌ | ❌ | logo, background image |
| Laboratory Equipments | V. Disposables/Consumables | Laboratory Equipments | `/user/products/components/laboratory-equipements` | `.../laboratory-equipements/laboratory-equipements.tsx` | ❌ | ❌ | logo, background image |
| Laboratory Disposables | V. Disposables/Consumables | Laboratory Disposables | `/user/products/components/laboratory-disposables` | `.../laboratory-disposables/laboratory-disposables.tsx` | ❌ | ❌ | logo, background image |
| Hospital Disposables | V. Disposables/Consumables | Hospital Disposables | `/user/products/components/hospital-disposables` | `.../hospital-disposables/hospital-disposables.tsx` | ❌ | ❌ | logo, background image |
| Histopathology Chemicals & Consumables | V. Disposables/Consumables | Chemicals & Consumables | `/user/products/components/chemicals-consumables` | `.../chemicals-consumables/chemicals-comsumables.tsx` | ❌ | ❌ | logo, background image |
| Surgical Disposables | V. Disposables/Consumables | Surgical Disposables | `/user/products/components/surgical-disposable` | `.../surgical-disposable/surgical.tsx` | ❌ | ❌ | logo, background image |
| Clinical Chemistry | I. Clinical | Clinical Chemistry | `/user/products/components/clinical-chemistry` | `.../clinical-chemistry/clinical-chemistry.tsx` | ❌ | ❌ | logo, background image |
| HBA1C-HPLC | I. Clinical | HBA1C-HPLC | `/user/products/components/hba1c-hplc` | `.../hba1c-hplc/HBA1C-HPLC.tsx` | ❌ | ❌ | logo, background image |
| Immunology | I. Clinical | Immunology | `/user/products/components/immunology` | `.../immunology/immunology.tsx` | ❌ | ❌ | logo, background image |
| Coagulation & Hemostasis | I. Clinical | Coagulation & Hemostasis | `/user/products/components/coagulation` | `.../coagulation/coagulation.tsx` | ❌ | ❌ | logo, background image |
| Blood Bank | I. Clinical | Blood Bank | `/user/products/components/blood-bank` | `.../blood-bank/blood-bank.tsx` | ❌ | ❌ | logo, background image |
| Arterial Blood Gas, Electrolytes & Co-Oximetry | I. Clinical | ABG/Electrolytes/Co-Oximetry | `/user/products/components/arterial-blood-gas-electrolytes-co-oximetry` | `.../arterial-blood-gas-electrolytes-co-oximetry/arterial-blood-gas-electrolytes-co-oximetry.tsx` | ❌ | ❌ | logo, background image |
| POCT | I. Clinical | POCT | `/user/products/components/poct` | `.../poct/poct.tsx` | ❌ | ❌ | logo, background image |
| Microbiology | I. Clinical | Microbiology | `/user/products/components/microbiology` | `.../microbiology/microbiology.tsx` | ❌ | ❌ | logo, background image |
| Clinical Microscopy | I. Clinical | Clinical Microscopy | `/user/products/components/clinical-microscopy` | `.../clinical-microscopy/clinical-microscopy.tsx` | ❌ | ❌ | logo, background image |
| Hematology | I. Clinical | Hematology | `/user/products/components/hematology` | `.../hematology/hematology.tsx` | ❌ | ❌ | logo, background image |
| Molecular Diagnostics | I. Clinical | Molecular Diagnostics | `/user/products/components/molecular-diagnostics` | `.../molecular-diagnostics/molecular-diagnostics.tsx` | ❌ | ❌ | logo, background image |
| Rapid Test Kits | I. Clinical | Rapid Test Kits | `/user/products/components/rapid-testkit` | `.../rapid-testkit/rapid-testkit.tsx` | ❌ | ❌ | logo, background image |
| Medical/Diagnostic Imaging *(extra, not in dropdown)* | II. Histopathology (adjacent) | combines Dakewe+Sakura products | `/user/products/components/medical-diagnostic-imaging` | `.../medical-diagnostic-imaging/medical-diagnostic-imaging.tsx` | ❌ | ❌ | logo, background image |
| Dialysis/Renal Equipments *(extra, not in dropdown)* | IV. Medical & Hospital Equipments (adjacent) | — | `/user/products/components/dialysis-renal-equipments` | `.../dialysis-renal-equipments/dialysis-renal-equipments.tsx` | ❌ | ❌ | logo, background image |
| Gastro/Endo Equipments *(extra, not in dropdown)* | IV. Medical & Hospital Equipments (adjacent) | — | `/user/products/components/gastro-endo` | `.../gastro-endo/gastro-endo.tsx` | ❌ | ❌ | logo, background image |
| ICU/ER Equipments *(extra, likely dup of Emergency/OutPatient)* | IV. Medical & Hospital Equipments (adjacent) | — | `/user/products/components/icu-er-equipments` | `.../icu-er-equipments/icu-er-equipments.tsx` | ❌ | ❌ | logo, background image |
| OR Equipment *(extra, likely dup of Operating & Delivery Room)* | IV. Medical & Hospital Equipments (adjacent) | — | `/user/products/components/or-equipment` | `.../or-equipment/or-equipments.tsx` | ❌ | ❌ | logo, background image |

## Missing-assets checklist

Sorted by category with the most gaps first.

### I. Clinical (11 missing)
- [ ] Clinical Chemistry — needs: logo, background image — file: `app/user/products/components/clinical-chemistry/clinical-chemistry.tsx`
- [ ] HBA1C-HPLC — needs: logo, background image — file: `app/user/products/components/hba1c-hplc/HBA1C-HPLC.tsx`
- [ ] Immunology — needs: logo, background image — file: `app/user/products/components/immunology/immunology.tsx`
- [ ] Coagulation & Hemostasis — needs: logo, background image — file: `app/user/products/components/coagulation/coagulation.tsx`
- [ ] Blood Bank — needs: logo, background image — file: `app/user/products/components/blood-bank/blood-bank.tsx`
- [ ] Arterial Blood Gas, Electrolytes & Co-Oximetry — needs: logo, background image — file: `app/user/products/components/arterial-blood-gas-electrolytes-co-oximetry/arterial-blood-gas-electrolytes-co-oximetry.tsx`
- [ ] POCT — needs: logo, background image — file: `app/user/products/components/poct/poct.tsx`
- [ ] Microbiology — needs: logo, background image — file: `app/user/products/components/microbiology/microbiology.tsx`
- [ ] Clinical Microscopy — needs: logo, background image — file: `app/user/products/components/clinical-microscopy/clinical-microscopy.tsx`
- [ ] Hematology — needs: logo, background image — file: `app/user/products/components/hematology/hematology.tsx`
- [ ] Molecular Diagnostics — needs: logo, background image — file: `app/user/products/components/molecular-diagnostics/molecular-diagnostics.tsx`
- [ ] Rapid Test Kits — needs: logo, background image — file: `app/user/products/components/rapid-testkit/rapid-testkit.tsx`

### III. General Lab Equipments (9 missing)
- [ ] Microscopes (generic) — needs: logo, background image — file: `app/user/products/components/microscopes/microscopes.tsx`
- [ ] Centrifuges — needs: logo, background image — file: `app/user/products/components/centrifuges/centrifuges.tsx`
- [ ] Pipettors — needs: logo, background image — file: `app/user/products/components/pipettors/pipettors.tsx`
- [ ] Biorefrigerators — needs: logo, background image — file: `app/user/products/components/biorefrigerators/biorefrigerators.tsx`
- [ ] Biomedical Freezers — needs: logo, background image — file: `app/user/products/components/biomedical-freezers/biomedical-freezers.tsx`
- [ ] Biosafety Cabinets — needs: logo, background image — file: `app/user/products/components/biosafety-cabinets/biosafety-cabinets.tsx`
- [ ] Lab Oven / Incubator — needs: logo, background image — file: `app/user/products/components/lab-oven-incubator/lab-oven-incubator.tsx`
- [ ] Sterilizer & Autoclave — needs: logo, background image — file: `app/user/products/components/sterilizer-autoclave/sterilizerautoclave.tsx`
- [ ] Dry Bath / Vortex Mixer — needs: logo, background image — file: `app/user/products/components/dry-bath/dry-bath.tsx`

### IV. Medical & Hospital Equipments (6 missing, + 4 unlisted-but-adjacent pages also missing)
- [ ] Radiology — needs: logo, background image — file: `app/user/products/components/RADIOLOGY-DEPARTMENT/radiology.tsx`
- [ ] Pulmonary — needs: logo, background image — file: `app/user/products/components/pulmonary-department/pulmonary.tsx`
- [ ] Emergency and Out Patient — needs: logo, background image — file: `app/user/products/components/emergency-outpatient/emergency-outpatient.tsx`
- [ ] Medical Surgical and Rehab Ward — needs: logo, background image — file: `app/user/products/components/surgical-rehabilation/surgical-rehabilation.tsx`
- [ ] Operating and Delivery Room — needs: logo, background image — file: `app/user/products/components/operating-delivery/operating-delivery.tsx`
- [ ] NICU PICU AND ICU — needs: logo, background image — file: `app/user/products/components/nicu-picu-icu/nicu-picu-icu.tsx`
- [ ] Dialysis/Renal Equipments *(extra page, not in dropdown)* — needs: logo, background image — file: `app/user/products/components/dialysis-renal-equipments/dialysis-renal-equipments.tsx`
- [ ] Gastro/Endo Equipments *(extra page, not in dropdown)* — needs: logo, background image — file: `app/user/products/components/gastro-endo/gastro-endo.tsx`
- [ ] ICU/ER Equipments *(extra page, possible dup of Emergency/OutPatient)* — needs: logo, background image — file: `app/user/products/components/icu-er-equipments/icu-er-equipments.tsx`
- [ ] OR Equipment *(extra page, possible dup of Operating & Delivery Room)* — needs: logo, background image — file: `app/user/products/components/or-equipment/or-equipments.tsx`

### V. Disposables / Consumables (5 missing)
- [ ] Laboratory Equipments — needs: logo, background image — file: `app/user/products/components/laboratory-equipements/laboratory-equipements.tsx`
- [ ] Laboratory Disposables — needs: logo, background image — file: `app/user/products/components/laboratory-disposables/laboratory-disposables.tsx`
- [ ] Hospital Disposables — needs: logo, background image — file: `app/user/products/components/hospital-disposables/hospital-disposables.tsx`
- [ ] Histopathology Chemicals & Consumables — needs: logo, background image — file: `app/user/products/components/chemicals-consumables/chemicals-comsumables.tsx`
- [ ] Surgical Disposables — needs: logo, background image — file: `app/user/products/components/surgical-disposable/surgical.tsx`

### II. Histopathology (4 missing, 2 partial)
- [ ] Vitro — needs: logo, background image — file: `app/user/products/components/vitro/vitro.tsx`
- [ ] Biogenex — needs: logo, background image — file: `app/user/products/components/biogenex/biogenex.tsx`
- [ ] Hiplaas — needs: logo, background image — file: `app/user/products/components/hiplaas/hiplaas.tsx`
- [ ] Medical/Diagnostic Imaging *(extra page, not in dropdown)* — needs: logo, background image — file: `app/user/products/components/medical-diagnostic-imaging/medical-diagnostic-imaging.tsx`
- [ ] Dakewe — needs: logo — file: `app/user/products/components/dakewe/dakewe.tsx` *(background OK)*
- [ ] Motic Slide Scanners — needs: logo — file: `app/user/products/components/moticsliderscanner/moticsliderscanner.tsx` *(background OK)*

## Asset conventions

**Where existing assets live:**
`biosite-web/public/asset/<brand name, lowercase, spaces allowed>/` — e.g. `public/asset/nikon microscopes/`, `public/asset/dakewe/`, `public/asset/Sakura/`, `public/asset/motic/`, `public/asset/Hamamatsu/`, `public/asset/vitro/`. Inside each folder: `<Brand>-Logo.png` (or `<brand>-logo.png`) for the logo, `<brand>background.jpg` / `<brand>-bg.jpg` / `<brand>-bg.png` for the hero background. Folder-name casing/spacing is inconsistent today (`nikon microscopes` has a space, `Hamamatsu` is capitalized, `dakewe` is lowercase) — worth standardizing going forward.

**Assets that already exist on disk but aren't wired into the code** (fix is a code change, not new asset sourcing):
- `public/asset/dakewe/dakewe-logo.png` — unused (Dakewe hero shows a plain `<h1>` instead)
- `public/asset/motic/motic-logo.png` — unused (Motic hero shows a plain `<h1>` instead)
- `public/asset/vitro/vitro-logo.png` and `vitro-bg.png` — both exist, both unused (Vitro hero is gradient-only)
- `public/asset/Hamamatsu/hamamatsu-bg.jpg` / `hamamatsu-logo.png` — exist locally but the live page pulls remote Cloudinary copies instead

**Naming convention for new assets:** `public/asset/<slug>/<slug>-logo.png` and `public/asset/<slug>/<slug>-bg.jpg`, using the route slug from the table above — e.g. `public/asset/centrifuges/centrifuges-logo.png` + `centrifuges-bg.jpg`, `public/asset/blood-bank/blood-bank-logo.png` + `blood-bank-bg.jpg`.

## Shared vs. hardcoded hero markup

None are shared. All 45 pages hardcode their own hero JSX independently — there is no `ProductHero` / `BrandHero` component. If a single point of fix is wanted, extract a shared hero component (props: `logoSrc`, `bgSrc`, `tagline`) before filling in the ~38 missing asset sets — otherwise each of the ~38 files needs to be edited by hand.
