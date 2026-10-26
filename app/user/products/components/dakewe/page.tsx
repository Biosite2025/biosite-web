
'use client';

import Dakewe from './dakewe';
import Footer from './Footer';


export default function ProductPage() {
  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] pt-16 lg:pt-0">
      <Dakewe />
      <Footer />
    </div>
  );
}
