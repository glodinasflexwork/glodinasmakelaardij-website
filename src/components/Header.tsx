'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown, Home, Users, Building, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '/nl';
    }
    return pathname.includes(path);
  };

  const isEnglish = pathname.startsWith('/en');

  const navigation = [
    { 
      name: isEnglish ? 'Home' : 'Home', 
      href: isEnglish ? '/en' : '/',
      icon: <Home className="w-4 h-4 mr-2" />
    },
    { 
      name: isEnglish ? 'About' : 'Over Ons', 
      href: isEnglish ? '/en/about' : '/about',
      icon: <Users className="w-4 h-4 mr-2" />
    },
    { 
      name: isEnglish ? 'Properties' : 'Woningen', 
      href: isEnglish ? '/en#properties' : '/#properties',
      icon: <Building className="w-4 h-4 mr-2" />
    },
    { 
      name: isEnglish ? 'Contact' : 'Contact', 
      href: isEnglish ? '/en/contact' : '/contact',
      icon: <Mail className="w-4 h-4 mr-2" />
    },
  ];

  return (
    <header 
      className={`bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={isEnglish ? '/en' : '/'} className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/logo.png"
                alt="Glodinas Makelaardij"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  isActive(item.href)
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Language switcher and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-50 rounded-lg p-1">
              <Link
                href="/"
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isEnglish
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                NL
              </Link>
              <Link
                href="/en"
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  isEnglish
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                EN
              </Link>
            </div>

            {/* Phone */}
            <a
              href="tel:+31681348551"
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">(6) 81 34 85 51</span>
            </a>

            {/* Primary CTA Button */}
            <Link href={isEnglish ? '/en/schedule' : '/schedule'}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {isEnglish ? 'Book Consultation' : 'Afspraak Maken'}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button and phone */}
          <div className="md:hidden flex items-center">
            <a
              href="tel:+31681348551"
              className="mr-4 flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button text-gray-600 hover:text-orange-600 transition-colors duration-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`mobile-menu-container md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100 bg-white">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
              <span className="text-sm text-gray-500">Taal / Language:</span>
              <div className="flex items-center bg-gray-50 rounded-lg p-1">
                <Link
                  href="/"
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    !isEnglish
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  NL
                </Link>
                <Link
                  href="/en"
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    isEnglish
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  EN
                </Link>
              </div>
            </div>

            {/* Mobile Phone */}
            <a
              href="tel:+31681348551"
              className="flex items-center px-3 py-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">(6) 81 34 85 51</span>
            </a>

            {/* Mobile Primary CTA */}
            <Link
              href={isEnglish ? '/en/schedule' : '/schedule'}
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-all duration-200 mt-2 flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                {isEnglish ? 'Book Consultation' : 'Afspraak Maken'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

