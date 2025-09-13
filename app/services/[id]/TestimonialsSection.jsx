import services from '@/data/services';

export default function TestimonialsSection({params}){
  const service = services.find((service) => service.id === params.id);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Absolutely reliable and fast! My packages always arrive on time.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Lee",
      text: "The tracking feature gives me peace of mind. Highly recommended.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return(
    <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Customer Testimonials</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover shadow" />
              <p className="text-gray-700 text-lg mb-2">&quot;{t.text}&quot;</p>
              <span className="text-slate-800 font-semibold">{t.name}</span>
            </div>
          ))}
        </div>
      </section>
  )
}