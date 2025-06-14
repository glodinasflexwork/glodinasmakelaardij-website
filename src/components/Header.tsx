'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Home, Users, Building, Mail, Calendar, Heart, BookOpen, User, LogIn, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SavedProperties from '@/components/SavedProperties';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';
import GMLogo from '@/components/GMLogo';
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
  
  // Use useRef for timeout to avoid stale closure issues
  const dropdownTimeoutRef = useRef<number | null>(null);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  // Cleanup function for timeouts
  const clearDropdownTimeout = useCallback(() => {
    if (dropdownTimeoutRef.current !== null) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearDropdownTimeout();
    };
  }, [clearDropdownTimeout]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      try {
        if (window.scrollY > 10) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      } catch (error) {
        console.error('Error in scroll handler:', error);
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
      try {
        if (isAuthenticated && user) {
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
        } else if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('savedProperties');
          if (saved) {
            try {
              const properties = JSON.parse(saved);
              setSavedPropertiesCount(Array.isArray(properties) ? properties.length : 0);
            } catch (e) {
              setSavedPropertiesCount(0);
            }
          } else {
            setSavedPropertiesCount(0);
          }
        }
      } catch (err) {
        console.error('Error fetching saved properties count:', err);
        setSavedPropertiesCount(0);
      }
    };

    updateSavedPropertiesCount();

    // Listen for storage changes to update count in real-time
    const handleStorageChange = () => {
      updateSavedPropertiesCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('savedPropertiesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedPropertiesUpdated', handleStorageChange);
    };
  }, [isAuthenticated, user]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        const target = event.target as HTMLElement;
        if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
          setIsMenuOpen(false);
        }
      } catch (error) {
        console.error('Error in click outside handler:', error);
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
    setHoveredMenu(null);
    clearDropdownTimeout();
  }, [pathname, clearDropdownTimeout]);

  const isActive = (path: string) => {
    try {
      if (path === '/') {
        return pathname === '/' || pathname === '/nl';
      }
      return pathname.includes(path);
    } catch (error) {
      console.error('Error in isActive:', error);
      return false;
    }
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
    try {
      setAuthView('login');
      setShowAuthModal(true);
    } catch (error) {
      console.error('Error in handleLoginClick:', error);
    }
  };

  const handleRegisterClick = () => {
    try {
      setAuthView('register');
      setShowAuthModal(true);
    } catch (error) {
      console.error('Error in handleRegisterClick:', error);
    }
  };

  const handleMenuHover = useCallback((menuName: string) => {
    try {
      clearDropdownTimeout();
      setHoveredMenu(menuName);
    } catch (error) {
      console.error('Error in handleMenuHover:', error);
    }
  }, [clearDropdownTimeout]);

  const handleMenuLeave = useCallback(() => {
    try {
      clearDropdownTimeout();
      dropdownTimeoutRef.current = window.setTimeout(() => {
        setHoveredMenu(null);
      }, 150);
    } catch (error) {
      console.error('Error in handleMenuLeave:', error);
    }
  }, [clearDropdownTimeout]);

  const handleDropdownEnter = useCallback(() => {
    try {
      clearDropdownTimeout();
    } catch (error) {
      console.error('Error in handleDropdownEnter:', error);
    }
  }, [clearDropdownTimeout]);

  const handleUserDashboardClick = () => {
    try {
      setShowUserDashboard(true);
    } catch (error) {
      console.error('Error in handleUserDashboardClick:', error);
    }
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
                <GMLogo 
                  size="lg" 
                  className="transition-transform duration-200 group-hover:scale-105" 
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
                          {item.megaMenu.sections?.map((section, index) => (
                            <div key={index}>
                              <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.links?.map((link) => (
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
                        onMouseLeave={handleMenuLeave}
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
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {savedPropertiesCount > 99 ? '99+' : savedPropertiesCount}
                    </span>
                  )}
                </button>

                {/* Language Switcher */}
                <div className="flex items-center bg-white rounded-md shadow-sm">
                  <Link
                    href={isEnglish ? pathname.replace('/en', '') || '/' : `/en${pathname}`}
                    className={`flex items-center px-2 py-1 text-xs font-medium rounded-l-md transition-all duration-200 ${
                      !isEnglish 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    NL
                  </Link>
                  <Link
                    href={isEnglish ? pathname : `/en${pathname}`}
                    className={`flex items-center px-2 py-1 text-xs font-medium rounded-r-md transition-all duration-200 ${
                      isEnglish 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    EN
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center space-x-3">
                <a
                  href="tel:+31681348551"
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-all duration-200 group"
                >
                  <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">(6) 81 34 85 51</span>
                </a>
              </div>

              {/* Authentication */}
              <div className="flex items-center space-x-2">
                {isAuthenticated && user ? (
                  <button
                    onClick={handleUserDashboardClick}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.firstName || user.email?.split('@')[0] || 'User'}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600 transition-all duration-200 font-medium text-sm rounded-lg hover:bg-orange-50"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      {isEnglish ? 'Login' : 'Inloggen'}
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {isEnglish ? 'Register' : 'Registreer'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mobile-menu-container">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-lg">
              {/* Primary Navigation */}
              {primaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              
              {/* Secondary Navigation */}
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between px-3 py-2">
                  <button
                    onClick={() => setShowSavedProperties(true)}
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">
                      {isEnglish ? 'Saved Properties' : 'Opgeslagen Woningen'}
                    </span>
                    {savedPropertiesCount > 0 && (
                      <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                        {savedPropertiesCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between px-3 py-2">
                  <a
                    href="tel:+31681348551"
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">(6) 81 34 85 51</span>
                  </a>
                </div>

                {/* Mobile Authentication */}
                <div className="px-3 py-2 space-y-2">
                  {isAuthenticated && user ? (
                    <button
                      onClick={handleUserDashboardClick}
                      className="w-full flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.firstName || user.email?.split('@')[0] || 'User'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        {isEnglish ? 'Login' : 'Inloggen'}
                      </button>
                      <button
                        onClick={handleRegisterClick}
                        className="w-full flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {isEnglish ? 'Register' : 'Registreer'}
                      </button>
                    </>
                  )}
                </div>

                {/* Language Switcher */}
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={isEnglish ? pathname.replace('/en', '') || '/' : `/en${pathname}`}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        !isEnglish 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Nederlands
                    </Link>
                    <Link
                      href={isEnglish ? pathname : `/en${pathname}`}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isEnglish 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      English
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CTA Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <Link
          href={isEnglish ? '/en/contact' : '/contact'}
          className="flex items-center px-4 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105 group"
        >
          <Mail className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium text-sm">
            {isEnglish ? 'Contact Us' : 'Neem Contact Op'}
          </span>
        </Link>
        <Link
          href={isEnglish ? '/en/schedule' : '/schedule'}
          className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 group"
        >
          <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium text-sm">
            {isEnglish ? 'Schedule' : 'Plan Afspraak'}
          </span>
        </Link>
      </div>

      {/* Modals */}
      {showSavedProperties && (
        <SavedProperties onClose={() => setShowSavedProperties(false)} />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialView={authView}
        />
      )}

      {showUserDashboard && (
        <UserDashboard onClose={() => setShowUserDashboard(false)} />
      )}
    </>
  );
};

export default Header;

