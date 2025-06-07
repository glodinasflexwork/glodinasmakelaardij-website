'use client'

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Footer = () => {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on the client side and update the isMobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
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
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                {isEnglish ? "€50M+ Sales Volume" : "€50M+ Verkoopvolume"}
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                {isEnglish ? "150+ Properties Sold" : "150+ Verkochte Woningen"}
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                {isEnglish ? "98% Client Satisfaction" : "98% Klanttevredenheid"}
              </div>
            </div>
          </div>
          
          {/* Contact - Mobile Collapsible, Desktop Always Visible */}
          <div className="border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
            <div 
              className="flex justify-between items-center md:block mb-4 cursor-pointer md:cursor-default"
              onClick={() => toggleSection('contact')}
            >
              <h3 className="text-lg font-semibold">{isEnglish ? "Contact" : "Contact"}</h3>
              <ChevronDown className={`h-5 w-5 md:hidden transition-transform duration-300 ${expandedSection === 'contact' ? 'rotate-180' : ''}`} />
            </div>
            <div className={`space-y-3 ${expandedSection === 'contact' || !isMobile ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a href="tel:+31681348551" className="text-gray-300 hover:text-white">
                  (6) 81 34 85 51
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a href="mailto:cihatkaya@glodinas.nl" className="text-gray-300 hover:text-white break-all">
                  cihatkaya@glodinas.nl
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{isEnglish ? "Den Haag, Netherlands" : "Den Haag, Nederland"}</span>
              </div>
            </div>
          </div>
          
          {/* Services - Mobile Collapsible, Desktop Always Visible */}
          <div className="border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
            <div 
              className="flex justify-between items-center md:block mb-4 cursor-pointer md:cursor-default"
              onClick={() => toggleSection('services')}
            >
              <h3 className="text-lg font-semibold">{isEnglish ? "Services" : "Diensten"}</h3>
              <ChevronDown className={`h-5 w-5 md:hidden transition-transform duration-300 ${expandedSection === 'services' ? 'rotate-180' : ''}`} />
            </div>
            <ul className={`space-y-2 ${expandedSection === 'services' || !isMobile ? 'block' : 'hidden md:block'}`}>
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
        
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © 2024 Glodinas Makelaardij. {isEnglish ? "All rights reserved." : "Alle rechten voorbehouden."}
          </p>
          <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
            <Link href={isEnglish ? "/en/privacy" : "/privacy"} className="text-gray-400 hover:text-white text-xs md:text-sm">
              {isEnglish ? "Privacy Policy" : "Privacyverklaring"}
            </Link>
            <Link href={isEnglish ? "/en/terms" : "/terms"} className="text-gray-400 hover:text-white text-xs md:text-sm">
              {isEnglish ? "Terms & Conditions" : "Algemene Voorwaarden"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

