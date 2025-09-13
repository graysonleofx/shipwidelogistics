'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-slate-800 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <i className="ri-truck-line text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold" style={{fontFamily: "Roboto, serif"}}>PENNY<span style={{color: '#fb923c'}}>WISE</span></h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#home" className="hover:text-orange-400 transition-colors cursor-pointer">
              Home
            </Link>

            <Link href="/#about" className="hover:text-orange-400 transition-colors cursor-pointer">
              About
            </Link>

            <Link href="/#services" className="hover:text-orange-400 transition-colors cursor-pointer">Services</Link>
            <Link href="/#tracking" className="hover:text-orange-400 transition-colors cursor-pointer">Track</Link>
            <Link href="/#testimonials" className="hover:text-orange-400 transition-colors cursor-pointer">Testimonials</Link>
            <Link href="/#contact" className="hover:text-orange-400 transition-colors cursor-pointer">Contact</Link>
          </nav>

          <button 
            className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-700 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/#home" className="hover:text-orange-400 transition-colors cursor-pointer">Home</Link>
              <Link href="/#about" className="hover:text-orange-400 transition-colors cursor-pointer">About</Link>
              <Link href="/#services" className="hover:text-orange-400 transition-colors cursor-pointer">Services</Link>
              <Link href="/#tracking" className="hover:text-orange-400 transition-colors cursor-pointer">Track</Link>
              <Link href="/#testimonials" className="hover:text-orange-400 transition-colors cursor-pointer">Testimonials</Link>
              <Link href="/#contact" className="hover:text-orange-400 transition-colors cursor-pointer">Contact</Link>
              {/* <Link href="/admin" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full transition-colors text-center whitespace-nowrap cursor-pointer">
                Login
              </Link> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}