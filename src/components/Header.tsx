'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Determine if we're on English pages
  const isEnglish = pathname.startsWith('/en');
  
  const navItems = isEnglish ? [
    { href: '/en', label: 'Home', color: 'bg-purple-500 hover:bg-purple-600' },
    { href: '/en#about', label: 'About', color: 'bg-teal-500 hover:bg-teal-600' },
    { href: '/en#properties', label: 'Properties', color: 'bg-pink-500 hover:bg-pink-600' },
    { href: '/en/contact', label: 'Contact', color: 'bg-green-500 hover:bg-green-600' },
  ] : [
    { href: '/', label: 'Home', color: 'bg-purple-500 hover:bg-purple-600' },
    { href: '/#about', label: 'Over Ons', color: 'bg-teal-500 hover:bg-teal-600' },
    { href: '/#properties', label: 'Woningen', color: 'bg-pink-500 hover:bg-pink-600' },
    { href: '/contact', label: 'Contact', color: 'bg-green-500 hover:bg-green-600' },
  ];

  const isActive = (path: string) => {
    if (path === '/' || path === '/en') {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={isEnglish ? '/en' : '/'} className="flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Glodinas Makelaardij" 
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Rentastone Style */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all px-4 py-2 rounded-md text-white font-medium ${
                  isActive(item.href)
                    ? `${item.color} shadow-md`
                    : `${item.color} opacity-90 hover:opacity-100 hover:shadow-md`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Button & Language Switcher */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher - Rentastone Style */}
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
              <Link 
                href="/" 
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  !isEnglish 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                NL
              </Link>
              <Link 
                href="/en" 
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  isEnglish 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                EN
              </Link>
            </div>
            
            {/* Call Button - Rentastone Style */}
            <a 
              href="tel:+31681348551" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              (6) 81 34 85 51
            </a>
            
            {/* Schedule Button - Rentastone Style */}
            <Link href={isEnglish ? '/en/schedule' : '/schedule'}>
              <Button 
                size="sm" 
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {isEnglish ? 'Book Consultation' : 'Afspraak Maken'}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button - Rentastone Style */}
          <button
            className="md:hidden p-2 bg-amber-500 text-white rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Rentastone Style */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white shadow-lg rounded-b-lg">
            <nav className="flex flex-col space-y-2 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all px-4 py-3 rounded-md text-white font-medium ${item.color}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 py-3 px-4">
                <span className="text-sm text-gray-600 mr-2">{isEnglish ? 'Language:' : 'Taal:'}</span>
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <Link 
                    href="/" 
                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                      !isEnglish 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    NL
                  </Link>
                  <Link 
                    href="/en" 
                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                      isEnglish 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    EN
                  </Link>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 px-2 space-y-3">
                <a 
                  href="tel:+31681348551" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md font-medium flex items-center transition-colors w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (6) 81 34 85 51
                </a>
                <Link 
                  href={isEnglish ? '/en/schedule' : '/schedule'}
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-md font-medium flex items-center justify-center transition-colors w-full"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {isEnglish ? 'Book Consultation' : 'Afspraak Maken'}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

