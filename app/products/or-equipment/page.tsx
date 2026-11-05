import ORequipments from './or-equipments';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('or-equipment');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <ORequipments />
        <Footer />
      </div>
    );
}