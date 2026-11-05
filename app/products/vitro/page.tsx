import Vitro from './vitro';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('vitro');


export default function ProductsPage() {
  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
      <Vitro />
      <Footer />
    </div>
  );
}
