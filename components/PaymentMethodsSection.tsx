'use client';


const payments = [
  { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
  { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  // { name: 'American Express', logo: '../components/src/assets/dls-logo-stack.svg'}
];

export default function PaymentMethodsSection() {
  return (
    <section id="payments" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-secondary font-semibold mb-8 text-lg">We Accept</h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {payments.map((p, idx) => (
            <div key={idx} className="flex items-center justify-center h-12">
              <img src={p.logo} alt={p.name} className="h-8 max-w-[80px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}