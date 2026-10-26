import SterilizerAutoclave from './sterilizerautoclave';
import Footer from './Footer';

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <SterilizerAutoclave  />
        <Footer />
      </div>
    );
}