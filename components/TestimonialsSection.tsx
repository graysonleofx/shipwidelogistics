'use client';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'E-commerce Manager, ShopEase',
    feedback: 'M.Smart Shipment & Logistics has been a game changer for our business. Fast, reliable, and always professional!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Michael Lee',
    role: 'Supply Chain Lead, TechNova',
    feedback: 'Their tracking system and customer support are top-notch. Highly recommended for any growing company.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Priya Patel',
    role: 'Operations Director, FreshMart',
    feedback: 'We trust M.Smart Shipment for all our logistics needs. They always deliver on time and keep us updated.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold text-lg mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-orange-100" />
              <p className="text-gray-600 mb-4 italic">"{t.feedback}"</p>
              <div>
                <div className="font-semibold text-slate-800">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}