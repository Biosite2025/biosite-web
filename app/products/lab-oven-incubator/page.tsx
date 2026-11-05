import LabOvenIncubator from './lab-oven-incubator';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('lab-oven-incubator');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <LabOvenIncubator />
        <Footer />
      </div>
    );
}