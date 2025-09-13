'use client';

export default function AboutSection() {
  const stats = [
    { number: '80k', label: 'Successful Delivery', icon: 'ri-truck-line' },
    { number: '456', label: 'Top Freight', icon: 'ri-ship-line' },
    { number: '45+', label: 'Countries of Operation', icon: 'ri-global-line' },
    { number: '325', label: 'Satisfaction Clients', icon: 'ri-user-star-line' }
  ];

  const services = [
    'Container Freight',
    'Frozen Product Shipping', 
    'Intermodal Shipping',
    'Sea Road Trucking',
    'Rail Road Shipping',
    'Project Shipping'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-accent rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-white text-xl`}></i>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <span className="text-secondary font-semibold text-lg mb-4 block">About Us</span>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              We'll keep your items damage free
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Ship Wide Logistics Air freight service delivers the knowledge & opportunity to minimize every mile in every lane. Get Far more Transport and Logistics work experience with Ship Wide Logistics supply chain technology Intelligence.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center">
                  <i className="ri-check-line text-secondary-500 text-xl mr-3"></i>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>

            <div className="bg-secondary text-white p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <i className="ri-phone-line text-background text-xl mr-3"></i>
                <span className="text-gray-300">Have Questions?</span>
              </div>
              <p className="text-xl font-semibold">Call Us Any Time</p>
              <p className="text-background text-lg">+1 704 000-0000</p>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=Professional%20logistics%20worker%20in%20safety%20helmet%20and%20vest%20working%20at%20modern%20cargo%20warehouse%20with%20containers%20and%20shipping%20equipment%2C%20industrial%20setting%20with%20clean%20professional%20lighting%20showcasing%20freight%20transportation%20industry&width=600&height=400&seq=about001&orientation=landscape"
              alt="Logistics worker"
              className="rounded-lg shadow-lg object-cover w-full h-96"
            />
            <div className="absolute bottom-4 right-4 bg-secondary text-white p-6 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">35</div>
                <div className="text-sm">YEARS OF EXPERIENCE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}