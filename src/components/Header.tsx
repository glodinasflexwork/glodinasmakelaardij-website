'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('nl');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Glodinas <span className="text-secondary">Makelaardij</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium">
            {language === 'nl' ? 'Home' : 'Home'}
          </Link>
          <Link href="/over-ons" className="text-gray-700 hover:text-primary font-medium">
            {language === 'nl' ? 'Over Ons' : 'About Us'}
          </Link>
          <Link href="/woningen" className="text-gray-700 hover:text-primary font-medium">
            {language === 'nl' ? 'Woningen' : 'Properties'}
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">
            {language === 'nl' ? 'Contact' : 'Contact'}
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            {language === 'nl' ? 'Afspraak' : 'Appointment'}
          </Button>
          <button 
            onClick={toggleLanguage}
            className="flex items-center text-gray-700 hover:text-primary"
            aria-label="Toggle language"
          >
            <Globe className="w-5 h-5 mr-1" />
            {language.toUpperCase()}
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-primary mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'nl' ? 'Home' : 'Home'}
            </Link>
            <Link 
              href="/over-ons" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'nl' ? 'Over Ons' : 'About Us'}
            </Link>
            <Link 
              href="/woningen" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'nl' ? 'Woningen' : 'Properties'}
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'nl' ? 'Contact' : 'Contact'}
            </Link>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === 'nl' ? 'Afspraak' : 'Appointment'}
            </Button>
            <button 
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="flex items-center text-gray-700 hover:text-primary py-2"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5 mr-1" />
              {language.toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

