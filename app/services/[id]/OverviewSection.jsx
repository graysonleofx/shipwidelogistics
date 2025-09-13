import services from '@/data/services';

export default function OverviewSecion({params}) {
  const service = services.find((service) => service.id === params.id);

  return(
    <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Overview</h2>
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <p>
                Our <span className="font-semibold">{service.title}</span> is designed to meet the needs of modern businesses and individuals who value speed, reliability, and transparency.
              </p>
              <p>
                Whether you’re sending a single package or managing bulk shipments, our service adapts to your requirements. Our dedicated team works around the clock to guarantee satisfaction and peace of mind.
              </p>
              <p>
                Experience hassle-free logistics with flexible options, competitive pricing, and a commitment to excellence that sets us apart in the industry.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="rounded-2xl shadow-xl overflow-hidden w-full max-w-xs bg-white">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
    </section>
  )
}