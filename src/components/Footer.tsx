'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Glodinas Makelaardij</h3>
            <p className="mb-4">
              Uw betrouwbare partner voor alle vastgoedzaken in Den Haag en omgeving.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/woningen" className="text-gray-300 hover:text-white transition-colors">
                  Woningen
                </Link>
              </li>
              <li>
                <Link href="/diensten" className="text-gray-300 hover:text-white transition-colors">
                  Diensten
                </Link>
              </li>
              <li>
                <Link href="/informatie" className="text-gray-300 hover:text-white transition-colors">
                  Informatie
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Diensten</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/woningen/kopen" className="text-gray-300 hover:text-white transition-colors">
                  Woningen Kopen
                </Link>
              </li>
              <li>
                <Link href="/woningen/verkopen" className="text-gray-300 hover:text-white transition-colors">
                  Woningen Verkopen
                </Link>
              </li>
              <li>
                <Link href="/woningen/huren" className="text-gray-300 hover:text-white transition-colors">
                  Woningen Huren
                </Link>
              </li>
              <li>
                <Link href="/taxatie" className="text-gray-300 hover:text-white transition-colors">
                  Taxatie
                </Link>
              </li>
              <li>
                <Link href="/verhuur-beheer" className="text-gray-300 hover:text-white transition-colors">
                  Verhuur Beheer
                </Link>
              </li>
              <li>
                <Link href="/marktanalyse" className="text-gray-300 hover:text-white transition-colors">
                  Marktanalyse
                </Link>
              </li>
              <li>
                <Link href="/hypotheek" className="text-gray-300 hover:text-white transition-colors">
                  Hypotheekadvies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-primary" />
                <span>Den Haag, Nederland</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>(6) 81 34 85 51</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>cihat@glodinasmakelaardij.nl</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Glodinas Makelaardij. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

