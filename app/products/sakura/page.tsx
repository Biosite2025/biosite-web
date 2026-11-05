import Sakura from './sakura';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('sakura');


export default function ProductsPage() {
  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
      <Sakura />
      <Footer />
      
    </div>
  );
}
