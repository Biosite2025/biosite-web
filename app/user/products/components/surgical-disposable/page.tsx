import Surgical from './surgical';
import Footer from './Footer';

export default function Page() {
  return (
      <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
        <Surgical  />
        <Footer />
      </div>
    );
}