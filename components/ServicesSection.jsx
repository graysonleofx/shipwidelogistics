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
            Wide Variety of Logistics Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At the heart of our company lies a commitment to delivering comprehensive logistics solutions tailored to meet the diverse needs of our clients. We offer a wide variety of logistics services designed to streamline your supply chain and enhance operational efficiency. Whether you require freight transportation, warehousing, distribution, or specialized logistics management, our expert team is equipped to provide reliable and cost-effective solutions.
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