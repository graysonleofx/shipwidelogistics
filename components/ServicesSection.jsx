'use client';

import services from '@/data/services';
import ServiceCard from '@/components/ServiceCard.jsx';

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-lg mb-4 block">Our Services</span>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            A Broad Range of Logistics Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are dedicated to providing end-to-end logistics services tailored to the unique requirements of each client. Our offerings cover everything from freight transport and warehousing to distribution and specialized logistics management. Rely on our experienced team to optimize your supply chain with dependable and cost-efficient solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}