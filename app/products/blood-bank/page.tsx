import BloodBank from './blood-bank';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('blood-bank');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <BloodBank />
        <Footer />
      </div>
    );
}