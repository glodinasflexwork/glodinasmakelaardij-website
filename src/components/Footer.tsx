import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image 
                src="/logo.png" 
                alt="Glodinas Makelaardij" 
                width={200}
                height={60}
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted real estate expert in Den Haag, dedicated to helping you find the perfect property or achieve the best value for your investment.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                150+ Properties Sold
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                98% Client Satisfaction
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                €50M+ Sales Volume
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <a href="tel:+31681348551" className="text-gray-300 hover:text-white transition-colors">
                  (6) 81 34 85 51
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <a href="mailto:cihatkaya@glodinas.nl" className="text-gray-300 hover:text-white transition-colors">
                  cihatkaya@glodinas.nl
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Den Haag, Netherlands</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Property Valuation</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Buyer Representation</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Seller Services</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Investment Consulting</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Market Analysis</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Negotiation Expertise</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Glodinas Makelaardij. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">NVM Member</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

