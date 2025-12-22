import LaboratoryEquipements from './laboratory-equipements';
import Footer from './Footer';

export default function Page() {
  return (
      <div className="min-h-screen pt-16 lg:pt-0">
        <LaboratoryEquipements />
        <Footer />
      </div>
    );
}