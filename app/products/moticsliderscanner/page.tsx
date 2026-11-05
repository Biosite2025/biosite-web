import MoticSlideScanner from './moticsliderscanner';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('moticsliderscanner');


export default function ProductPage() {
  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
      <MoticSlideScanner />
      <Footer />
    </div>
  );
}
