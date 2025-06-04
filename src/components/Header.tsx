'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Glodinas Makelaardij"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              About
            </a>
            <a href="#properties" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Properties
            </a>
            <a href="/contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+31681348551" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              (6) 81 34 85 51
            </a>
            <Button variant="green" size="sm" className="bg-green-600 hover:bg-green-700">
              <Calendar className="h-4 w-4 mr-2" />
              <a href="/schedule" className="text-white">Book Consultation</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#home" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#properties" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </a>
              <a 
                href="/contact" 
                className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-4 border-t border-gray-100">
                <a 
                  href="tel:+31681348551" 
                  className="text-green-600 hover:text-green-700 font-medium flex items-center mb-3"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (6) 81 34 85 51
                </a>
                <Button variant="green" size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  <a href="/schedule" className="text-white">Book Consultation</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

