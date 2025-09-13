'use client';

import fedx from './src/assets/hero.jpeg'

const partners = [
  { name: 'FedEx', logo: 'https://www.fedex.com/content/dam/fedex-com/logos/logo.png' },
  { name: 'DHL', logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg' },
  { name: 'UPS', logo: 'https://www.ups.com/webassets/icons/logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
];

export default function TrustedBySection() {
  return (
    <section id="trusted" className="py-12 bg-slate-100">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-secondary font-semibold mb-8 text-lg">Trusted By Leading Companies</h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center justify-center h-16">
              <img src={partner.logo} alt={partner.name} className="h-10 max-w-[120px] grayscale-0 hover:grayscale transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}