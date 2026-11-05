import ICUERequipments from './icu-er-equipments';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('icu-er-equipments');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <ICUERequipments />
        <Footer />
      </div>
    );
}