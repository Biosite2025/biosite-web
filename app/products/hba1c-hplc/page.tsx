import HBA1CHPLC from './HBA1C-HPLC';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('hba1c-hplc');


export default function ProductPage() {
  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
      <HBA1CHPLC />
      <Footer />
    </div>
  );
}
