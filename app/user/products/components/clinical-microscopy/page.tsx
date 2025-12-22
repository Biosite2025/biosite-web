import ClinicalMicroscopy from './clinical-microscopy';
import Footer from './Footer';

export default function Page() {
  return (
      <div className="min-h-screen pt-16 lg:pt-0">
        <ClinicalMicroscopy />
        <Footer />
      </div>
    );
}