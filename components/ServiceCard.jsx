import React from 'react';
import Link from 'next/link';



const ServiceCard = ({ id, title, description, image, icon }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
          <i className={`${icon} text-white text-xl`}></i>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <Link href={`/services/${id}`}>
          <button className="bg-secondary hover:bg-secondary-600 text-white px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;