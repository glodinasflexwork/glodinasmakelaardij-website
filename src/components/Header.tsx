'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Glodinas Makelaardij" 
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              About
            </a>
            <a href="#services" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Services
            </a>
            <a href="#properties" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Properties
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Contact Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:+31681348551" 
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">(6) 81 34 85 51</span>
              </a>
            </div>
            <Button variant="green" className="hidden md:flex">
              <Calendar className="h-4 w-4 mr-2" />
              Book Consultation
            </Button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pt-4">
              <a href="#home" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Home
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Services
              </a>
              <a href="#properties" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Properties
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Contact
              </a>
              <div className="pt-4 space-y-3">
                <a 
                  href="tel:+31681348551" 
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">(6) 81 34 85 51</span>
                </a>
                <Button variant="green" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Consultation
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

