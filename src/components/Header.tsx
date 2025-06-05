'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {Link} from '@/i18n/routing';
import {useTranslations, useLocale} from 'next-intl';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const locale = useLocale();

  const isActive = (path: string) => {
    // Remove locale prefix for comparison
    const cleanPathname = pathname.replace(`/${locale}`, '') || '/';
    if (path === '/') {
      return cleanPathname === '/';
    }
    return cleanPathname.startsWith(path);
  };

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/contact', label: t('contact') },
    { href: '/schedule', label: t('schedule') },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Glodinas Makelaardij"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors font-medium ${
                  isActive(item.href)
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Button & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Link 
                href="/" 
                locale="en"
                className={`px-2 py-1 text-sm rounded ${locale === 'en' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
              >
                EN
              </Link>
              <Link 
                href="/" 
                locale="nl"
                className={`px-2 py-1 text-sm rounded ${locale === 'nl' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
              >
                NL
              </Link>
            </div>
            
            <a 
              href="tel:+31681348551" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              (6) 81 34 85 51
            </a>
            <Link href="/schedule">
              <Button variant="green" size="sm" className="bg-green-600 hover:bg-green-700">
                <Calendar className="h-4 w-4 mr-2" />
                {t('bookConsultation')}
              </Button>
            </Link>
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium py-2 ${
                    isActive(item.href)
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 py-2">
                <span className="text-sm text-gray-600 mr-2">{t('language')}:</span>
                <Link 
                  href="/" 
                  locale="en"
                  className={`px-2 py-1 text-sm rounded ${locale === 'en' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  EN
                </Link>
                <Link 
                  href="/" 
                  locale="nl"
                  className={`px-2 py-1 text-sm rounded ${locale === 'nl' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  NL
                </Link>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <a 
                  href="tel:+31681348551" 
                  className="text-green-600 hover:text-green-700 font-medium flex items-center mb-3"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (6) 81 34 85 51
                </a>
                <Link href="/schedule">
                  <Button variant="green" size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('bookConsultation')}
                  </Button>
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

