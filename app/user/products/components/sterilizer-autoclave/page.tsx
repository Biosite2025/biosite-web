import SterilizerAutoclave from './sterilizerautoclave';
import Footer from './Footer';

export default function Page() {
  return (
      <div className="min-h-screen pt-16 lg:pt-0">
        <SterilizerAutoclave  />
        <Footer />
      </div>
    );
}