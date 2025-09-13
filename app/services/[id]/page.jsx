
// import { useEffect, useState } from "react";
import services from '@/data/services';
import Header from './Header';
import HeroSection from './HeroSection';
import OverviewSection from './OverviewSection'
import FeatureSection from '@/components/TrustedBySection'
import ChooseSection from './ChooseSection'
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import Footer from '@/components/Footer';
// Example icons from Heroicons (install @heroicons/react if needed)


export async function generateStaticParams() {
  return services.map(service => ({
    id: service.id,
  }));
}

export default function Page({ params }) {
  const service = services.find((service) => service.id === params.id);

  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   setLoaded(true);
  // }, []);

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Service not found</h1>
      </div>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <HeroSection params={params}/>

      {/* Overview Section */}
      <OverviewSection params={params}/>

      {/* Features Section */}
      <FeatureSection params={params}/>

      {/* Why Choose Us Section */}
      <ChooseSection params={params}/>

      {/* Testimonials Section */}
      <TestimonialsSection params={params}/>

      {/* CTA Section */}
      <ContactSection params={params}/>

      <Footer />
    </>
  );
};

