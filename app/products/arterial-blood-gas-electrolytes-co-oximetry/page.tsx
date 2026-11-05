import ArterialBloodGasElectrolytesCoOximetry from './arterial-blood-gas-electrolytes-co-oximetry';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('arterial-blood-gas-electrolytes-co-oximetry');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <ArterialBloodGasElectrolytesCoOximetry />
        <Footer />
      </div>
    );
}