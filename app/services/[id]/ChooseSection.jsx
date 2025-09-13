import services from '@/data/services';
import { TruckIcon, ClockIcon, PhoneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';


export default function ChooseSection({params}){
  const service = services.find((service) => service.id === params.id);

  const whyChooseUs = [
    "Trusted by thousands of customers nationwide.",
    "Advanced security protocols for every shipment.",
    "Flexible delivery options tailored to your schedule.",
    "Transparent pricing with no hidden fees.",
  ];

  return(
    <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {whyChooseUs.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white rounded-lg shadow p-4">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1" />
              <span className="text-gray-700 text-lg">{item}</span>
            </div>
          ))}
        </div>
      </section>
  )
}