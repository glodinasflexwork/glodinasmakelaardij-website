'use client'

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Image 
              src="/logo.png" 
              alt="Glodinas Makelaardij" 
              width={200}
              height={60}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              {isEnglish 
                ? "Your trusted real estate partner in Den Haag. Expert guidance for buying, selling, and investing in premium properties."
                : "Uw vertrouwde makelaar in Den Haag. Deskundige begeleiding bij het kopen, verkopen en investeren in premium woningen."
              }
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {isEnglish ? "€50M+ Sales Volume" : "€50M+ Verkoopvolume"}
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {isEnglish ? "150+ Properties Sold" : "150+ Verkochte Woningen"}
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {isEnglish ? "98% Client Satisfaction" : "98% Klanttevredenheid"}
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{isEnglish ? "Contact" : "Contact"}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <a href="tel:+31681348551" className="text-gray-300 hover:text-white">
                  (6) 81 34 85 51
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <a href="mailto:cihatkaya@glodinas.nl" className="text-gray-300 hover:text-white">
                  cihatkaya@glodinas.nl
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{isEnglish ? "Den Haag, Netherlands" : "Den Haag, Nederland"}</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{isEnglish ? "Services" : "Diensten"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={isEnglish ? "/en#about" : "/#about"} className="text-gray-300 hover:text-white">
                  {isEnglish ? "Property Buying" : "Woning Kopen"}
                </Link>
              </li>
              <li>
                <Link href={isEnglish ? "/en#about" : "/#about"} className="text-gray-300 hover:text-white">
                  {isEnglish ? "Property Selling" : "Woning Verkopen"}
                </Link>
              </li>
              <li>
                <Link href={isEnglish ? "/en#about" : "/#about"} className="text-gray-300 hover:text-white">
                  {isEnglish ? "Property Valuation" : "Woningtaxatie"}
                </Link>
              </li>
              <li>
                <Link href={isEnglish ? "/en/contact" : "/contact"} className="text-gray-300 hover:text-white">
                  {isEnglish ? "Consultation" : "Advies"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Glodinas Makelaardij. {isEnglish ? "All rights reserved." : "Alle rechten voorbehouden."}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={isEnglish ? "/en/privacy" : "/privacy"} className="text-gray-400 hover:text-white text-sm">
              {isEnglish ? "Privacy Policy" : "Privacyverklaring"}
            </Link>
            <Link href={isEnglish ? "/en/terms" : "/terms"} className="text-gray-400 hover:text-white text-sm">
              {isEnglish ? "Terms & Conditions" : "Algemene Voorwaarden"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

