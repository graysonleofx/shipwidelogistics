import services from '@/data/services';
import Link from 'next/link';
export default function ContactSection({params}){
  const service = services.find((service) => service.id === params.id);
  
  return(
    <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center bg-slate-800 rounded-2xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Ready to get started?</h2>
        <p className="text-white text-lg mb-6 text-center max-w-xl">
          Join thousands of happy customers and experience premium delivery services today.
        </p>
        <Link href="/#contact" className="px-8 py-3 bg-white text-slate-800 font-semibold rounded-full shadow hover:bg-blue-50 transition">
          {/* <a
            className="px-8 py-3 bg-white text-slate-800 font-semibold rounded-full shadow hover:bg-blue-50 transition"
          > */}
            Contact Us
          {/* </a> */}
        </Link>
    </section>
  )
}