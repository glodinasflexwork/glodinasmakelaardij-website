'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Home, Users, Building, Mail, Calendar, BookOpen, User, LogIn, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';
import GMLogo from '@/components/GMLogo';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
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
        console.error('Error handling scroll:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown hover with delay
  const handleMouseEnter = useCallback((menu: string) => {
    clearDropdownTimeout();
    setHoveredMenu(menu);
  }, [clearDropdownTimeout]);

  const handleMouseLeave = useCallback(() => {
    clearDropdownTimeout();
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  }, [clearDropdownTimeout]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle authentication actions
  const handleLogin = () => {
    setAuthView('login');
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthView('register');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  // Navigation items
  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      current: pathname === '/'
    },
    {
      name: 'Woningen',
      href: '/woningen',
      icon: Building,
      current: pathname.startsWith('/woningen'),
      dropdown: [
        { name: 'Alle Woningen', href: '/woningen' },
        { name: 'Koop', href: '/woningen/kopen' },
        { name: 'Huur', href: '/woningen/huren' },
      ]
    },
    {
      name: 'Diensten',
      href: '/diensten',
      icon: Users,
      current: pathname.startsWith('/diensten'),
      dropdown: [
        { name: 'Verkopen', href: '/diensten/verkopen' },
        { name: 'Verhuren', href: '/diensten/verhuren' },
        { name: 'Taxatie', href: '/diensten/taxatie' },
        { name: 'Hypotheek', href: '/diensten/hypotheek' },
      ]
    },
    {
      name: 'Informatie',
      href: '/informatie',
      icon: BookOpen,
      current: pathname.startsWith('/informatie'),
      dropdown: [
        { name: 'Over Ons', href: '/about' },
        { name: 'Team', href: '/team' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
      ]
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: Mail,
      current: pathname === '/contact'
    }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <GMLogo className="h-10 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                      item.current
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                        hoveredMenu === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && hoveredMenu === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Phone Number */}
              <a
                href="tel:+31681348551"
                className="flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200"
              >
                <Phone className="h-4 w-4 mr-1" />
                (6) 81 34 85 51
              </a>

              {/* Language Switcher */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <Link
                  href="/"
                  className={`px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                    !pathname.startsWith('/en')
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  NL
                </Link>
                <Link
                  href="/en"
                  className={`px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                    pathname.startsWith('/en')
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  EN
                </Link>
              </div>

              {/* Authentication */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserDashboard(true)}
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600"
                  >
                    <User className="h-4 w-4" />
                    {user.name || user.email}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogin}
                    className="text-gray-700 hover:text-orange-600"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Inloggen
                  </Button>
                  <Button
                    variant="cta"
                    size="sm"
                    onClick={handleRegister}
                  >
                    Registreer
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              {/* Navigation Items */}
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      item.current
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Authentication */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700"
                      onClick={() => {
                        setShowUserDashboard(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Uitloggen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700"
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Inloggen
                    </Button>
                    <Button
                      variant="cta"
                      className="w-full"
                      onClick={() => {
                        handleRegister();
                        setIsMenuOpen(false);
                      }}
                    >
                      Registreer
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile Contact */}
              <div className="border-t border-gray-200 pt-3">
                <a
                  href="tel:+31681348551"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  (6) 81 34 85 51
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
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

