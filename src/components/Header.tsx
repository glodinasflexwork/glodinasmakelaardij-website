'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Home, Users, Building, Mail, Calendar, Heart, BookOpen, User, LogIn, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SavedProperties from '@/components/SavedProperties';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSavedProperties, setShowSavedProperties] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [savedPropertiesCount, setSavedPropertiesCount] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

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

  // Load saved properties count
  useEffect(() => {
    const updateSavedPropertiesCount = async () => {
      if (isAuthenticated && user) {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch('/api/saved-properties', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setSavedPropertiesCount(data.saved_properties?.length || 0);
          }
        } catch (err) {
          console.error('Error fetching saved properties count:', err);
        }
      } else if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('savedProperties');
        if (saved) {
          try {
            const properties = JSON.parse(saved);
            setSavedPropertiesCount(properties.length);
          } catch (e) {
            setSavedPropertiesCount(0);
          }
        } else {
          setSavedPropertiesCount(0);
        }
      }
    };

    updateSavedPropertiesCount();

    // Listen for storage changes to update count in real-time
    const handleStorageChange = () => {
      updateSavedPropertiesCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('savedPropertiesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedPropertiesUpdated', handleStorageChange);
    };
  }, [isAuthenticated, user]);

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

  // New hierarchical navigation structure
  const primaryNavigation = [
    { 
      name: isEnglish ? 'Home' : 'Home', 
      href: isEnglish ? '/en' : '/',
      icon: <Home className="w-4 h-4" />,
    },
    { 
      name: isEnglish ? 'Properties' : 'Woningen', 
      href: isEnglish ? '/en/properties' : '/woningen',
      icon: <Building className="w-4 h-4" />,
      megaMenu: {
        sections: [
          {
            title: isEnglish ? 'Buy & Sell' : 'Kopen & Verkopen',
            links: [
              { name: isEnglish ? 'Buy Properties' : 'Woningen Kopen', href: isEnglish ? '/en/properties/buy' : '/woningen/kopen' },
              { name: isEnglish ? 'Sell Properties' : 'Woningen Verkopen', href: isEnglish ? '/en/properties/sell' : '/woningen/verkopen' },
              { name: isEnglish ? 'Property Valuation' : 'Taxatie', href: isEnglish ? '/en/valuation' : '/taxatie' },
            ]
          },
          {
            title: isEnglish ? 'Rental' : 'Verhuur',
            links: [
              { name: isEnglish ? 'Rent Properties' : 'Woningen Huren', href: isEnglish ? '/en/properties/rent' : '/woningen/huren' },
              { name: isEnglish ? 'Rental Management' : 'Verhuur Beheer', href: isEnglish ? '/en/rental-management' : '/verhuur-beheer' },
            ]
          }
        ]
      }
    },
    { 
      name: isEnglish ? 'Services' : 'Diensten', 
      href: isEnglish ? '/en/services' : '/diensten',
      icon: <Users className="w-4 h-4" />,
      megaMenu: {
        sections: [
          {
            title: isEnglish ? 'About' : 'Over Ons',
            links: [
              { name: isEnglish ? 'About Us' : 'Over Glodinas', href: isEnglish ? '/en/about' : '/about' },
              { name: isEnglish ? 'Our Team' : 'Ons Team', href: isEnglish ? '/en/team' : '/team' },
              { name: isEnglish ? 'Reviews' : 'Reviews', href: isEnglish ? '/en/reviews' : '/reviews' },
            ]
          },
          {
            title: isEnglish ? 'Professional Services' : 'Professionele Diensten',
            links: [
              { name: isEnglish ? 'Market Analysis' : 'Marktanalyse', href: isEnglish ? '/en/market-analysis' : '/marktanalyse' },
              { name: isEnglish ? 'Mortgage Advice' : 'Hypotheekadvies', href: isEnglish ? '/en/mortgage' : '/hypotheek' },
            ]
          }
        ]
      }
    },
  ];

  const secondaryNavigation = [
    { 
      name: isEnglish ? 'Resources' : 'Informatie', 
      href: isEnglish ? '/en/resources' : '/informatie',
      icon: <BookOpen className="w-4 h-4" />,
      submenu: [
        { name: isEnglish ? 'Blog' : 'Blog', href: isEnglish ? '/en/blog' : '/blog' },
        { name: isEnglish ? 'Market Reports' : 'Marktrapportages', href: isEnglish ? '/en/reports' : '/rapporten' },
        { name: isEnglish ? 'Buying Guide' : 'Koopgids', href: isEnglish ? '/en/buying-guide' : '/koopgids' },
      ]
    },
    { 
      name: isEnglish ? 'Contact' : 'Contact', 
      href: isEnglish ? '/en/contact' : '/contact',
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  const handleLoginClick = () => {
    setAuthView('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthView('register');
    setShowAuthModal(true);
  };

  const handleMenuHover = (menuName: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setHoveredMenu(menuName);
  };

  const handleMenuLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleUserDashboardClick = () => {
    setShowUserDashboard(true);
  };

  return (
    <>
      <header 
        className={`bg-white border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={isEnglish ? '/en' : '/'} className="flex items-center group">
                <img
                  className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                  src="/images/glodinas_logo_128x128.png"
                  alt="Glodinas Makelaardij"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {/* Primary Navigation */}
              <div className="flex items-center space-x-1 mr-6">
                {primaryNavigation.map((item) => (
                  <div 
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleMenuHover(item.name)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                      {(item.megaMenu || item.submenu) && (
                        <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                          hoveredMenu === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                    </Link>
                    
                    {/* Mega Menu */}
                    {item.megaMenu && hoveredMenu === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 py-6 px-6 z-50"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleMenuLeave}
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {item.megaMenu.sections.map((section, index) => (
                            <div key={index}>
                              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.links.map((link) => (
                                  <li key={link.name}>
                                    <Link
                                      href={link.href}
                                      className="block text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-2 py-1 rounded-md transition-colors duration-200"
                                    >
                                      {link.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Regular Dropdown */}
                    {item.submenu && hoveredMenu === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleMenuLeave}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Visual Separator */}
              <div className="h-6 w-px bg-gray-200 mr-6"></div>
              
              {/* Secondary Navigation */}
              <div className="flex items-center space-x-1">
                {secondaryNavigation.map((item) => (
                  <div 
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.submenu && handleMenuHover(item.name)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                      {item.submenu && (
                        <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                          hoveredMenu === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {item.submenu && hoveredMenu === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Quick Actions Group */}
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                {/* Saved Properties Button */}
                <button
                  onClick={() => setShowSavedProperties(true)}
                  className="relative flex items-center text-gray-600 hover:text-orange-600 transition-all duration-200 p-2 rounded-md hover:bg-white hover:shadow-sm group"
                  aria-label={isEnglish ? 'View saved properties' : 'Bekijk opgeslagen woningen'}
                >
                  <Heart className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  {savedPropertiesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium animate-pulse">
                      {savedPropertiesCount}
                    </span>
                  )}
                </button>
                
                {/* Language Switcher */}
                <div className="flex items-center bg-white rounded-md p-1">
                  <Link
                    href="/"
                    className={`flex items-center px-2 py-1 rounded text-xs font-semibold transition-all duration-200 ${
                      !isEnglish
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    NL
                  </Link>
                  <Link
                    href="/en"
                    className={`flex items-center px-2 py-1 rounded text-xs font-semibold transition-all duration-200 ${
                      isEnglish
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    EN
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <a
                href="tel:+31681348551"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-all duration-200 text-sm font-medium group"
              >
                <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span>(6) 81 34 85 51</span>
              </a>

              {/* Auth Section */}
              {isAuthenticated ? (
                <button
                  onClick={handleUserDashboardClick}
                  className="flex items-center bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-md group"
                >
                  <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  {user?.firstName || user?.username || (isEnglish ? 'My Account' : 'Mijn Account')}
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-green-50"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    {isEnglish ? 'Login' : 'Inloggen'}
                  </button>
                  <Button
                    onClick={handleRegisterClick}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-md"
                  >
                    {isEnglish ? 'Get Started' : 'Registreer'}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mobile-menu-container">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-lg">
              {/* Primary Navigation Mobile */}
              <div className="space-y-1 mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  {isEnglish ? 'Main Menu' : 'Hoofdmenu'}
                </div>
                {primaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Secondary Navigation Mobile */}
              <div className="space-y-1 mb-4 border-t border-gray-100 pt-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  {isEnglish ? 'More' : 'Meer'}
                </div>
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <button
                  onClick={() => setShowSavedProperties(true)}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors duration-200"
                >
                  <Heart className="h-5 w-5 mr-3" />
                  {isEnglish ? 'Saved Properties' : 'Opgeslagen Woningen'}
                  {savedPropertiesCount > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {savedPropertiesCount}
                    </span>
                  )}
                </button>

                {isAuthenticated ? (
                  <button
                    onClick={handleUserDashboardClick}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors duration-200"
                  >
                    <User className="h-5 w-5 mr-3" />
                    {user?.firstName || user?.username || (isEnglish ? 'My Account' : 'Mijn Account')}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handleLoginClick}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
                    >
                      <LogIn className="h-5 w-5 mr-3" />
                      {isEnglish ? 'Login' : 'Inloggen'}
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="flex items-center w-full px-3 py-2 text-base font-medium bg-orange-500 text-white hover:bg-orange-600 rounded-md transition-colors duration-200"
                    >
                      {isEnglish ? 'Get Started' : 'Registreer'}
                    </button>
                  </div>
                )}

                {/* Language Switcher Mobile */}
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <Link
                    href="/"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      !isEnglish
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    Nederlands
                  </Link>
                  <Link
                    href="/en"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isEnglish
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    English
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      {showSavedProperties && (
        <SavedProperties 
          onClose={() => setShowSavedProperties(false)} 
          language={isEnglish ? 'en' : 'nl'}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialView={authView}
          language={isEnglish ? 'en' : 'nl'}
        />
      )}

      {showUserDashboard && (
        <UserDashboard
          onClose={() => setShowUserDashboard(false)}
          language={isEnglish ? 'en' : 'nl'}
        />
      )}
    </>
  );
};

export default Header;

