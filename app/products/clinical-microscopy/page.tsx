import ClinicalMicroscopy from './clinical-microscopy';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('clinical-microscopy');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <ClinicalMicroscopy />
        <Footer />
      </div>
    );
}