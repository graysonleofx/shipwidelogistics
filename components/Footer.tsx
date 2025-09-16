'use client';

import Link from 'next/link';
import logo from '@/public/assets/brand.png';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Track Shipment', href: '#tracking' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Maritime Freight',
    'Land Transportation',
    'Rail Freight',
    'Air Cargo',
    'Warehousing',
    'Custom Clearance'
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Image src={logo} alt="Logo" style={{objectFit: "contain", height: "100px", width: "100px"}} />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in global logistics and freight transportation. We deliver excellence across land, sea, and rail.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
            </div> */}
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <i className="ri-map-pin-line text-background text-lg mr-3 mt-1"></i>
                <p className="text-gray-300">10685-B Hazelhurst Dr. Houston, Tx 77043 United State</p>
              </div>
              {/* <div className="flex items-center">
                <i className="ri-phone-line text-background text-lg mr-3"></i>
                <p className="text-gray-300">+1 704 677-4835</p>
              </div> */}
              <div className="flex items-center">
                <i className="ri-mail-line text-background text-lg mr-3"></i>
                <p className="text-gray-300">contact-us@shipwidelogistics.online</p>
              </div>
              <div className="flex items-center">
                <i className="ri-time-line text-background text-lg mr-3"></i>
                <p className="text-gray-300">24/7 Support Service</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Ship wide Logistics & Transportation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 text-sm transition-colors cursor-pointer">Terms of Service</a>
              {/* <Link href="/admin" className="text-gray-400 hover:text-orange-400 text-sm transition-colors cursor-pointer">Admin Portal</Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}