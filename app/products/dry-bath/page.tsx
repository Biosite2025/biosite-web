import DryBath from './dry-bath';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('dry-bath');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <DryBath />
        <Footer />
      </div>
    );
}