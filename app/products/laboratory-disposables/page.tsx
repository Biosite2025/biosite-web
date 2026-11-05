import LaboratoryDisposables from './laboratory-disposables';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('laboratory-disposables');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <LaboratoryDisposables />
        <Footer />
      </div>
    );
}