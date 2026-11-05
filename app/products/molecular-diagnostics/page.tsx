import MolecularDiagnostics from './molecular-diagnostics';
import Footer from '@/src/components/layout/Footer';
import { productMetadata } from '@/lib/productCategories';

export const metadata = productMetadata('molecular-diagnostics');

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <MolecularDiagnostics />
        <Footer />
      </div>
    );
}