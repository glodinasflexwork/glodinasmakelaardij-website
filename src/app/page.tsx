'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/PropertyGallery';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Home, Search, Handshake, Building, Calculator, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  energyLabel: string;
  features: string[];
  mainImage?: string;
  images: string[];
  rating: number;
  status: 'available' | 'under_offer' | 'sold' | 'new';
  description: string;
}

export default function HomePage() {
  const [galleryProperties, setGalleryProperties] = useState<Property[]>([]);

  // Fetch featured properties for homepage
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await fetch('/api/properties?sort_by=newest');
        if (response.ok) {
          const data = await response.json();
          // Show only first 4 properties for homepage gallery
          setGalleryProperties(data.properties.slice(0, 4) || []);
        }
      } catch (error) {
        console.error('Error fetching featured properties:', error);
        // Keep empty array if fetch fails
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - New premium image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-building.jpeg')"
          }}
        />
        
        {/* Enhanced Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-0">
          <div className="max-w-4xl mx-auto">
            {/* Orange accent bar above heading */}
            <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto md:mx-0"></div>
            
            <p className="text-base md:text-lg lg:text-xl font-medium mb-3 md:mb-4 text-orange-400 tracking-wide text-center md:text-left">
              PROFESSIONELE MAKELAARSDIENSTEN
            </p>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 md:mb-8 text-center md:text-left text-white">
              Uw woning verkopen<br />
              in <span className="text-orange-400">Den Haag</span>?
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              Wij zorgen voor een snelle en succesvolle verkoop tegen de beste prijs
            </p>
            
            {/* CTA Buttons - Stacked on Mobile, Side by Side on Desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-12">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="cta" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/schedule" className="w-full sm:w-auto">
                <Button variant="cta" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
            
            {/* Stats Row - 2x2 Grid on Mobile, 4x1 on Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto md:mx-0">
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">150+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Verkochte Woningen</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">98%</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Klanttevredenheid</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">€50M+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Verkoopvolume</div>
              </div>
              <div className="text-center md:text-left bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400">15+</div>
                <div className="text-xs md:text-sm lg:text-base text-white/90">Jaar Ervaring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section id="properties">
        <PropertyGallery properties={galleryProperties} language="nl" />
      </section>

      {/* Services Section - Enhanced for Mobile */}
      <section id="about" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-16">
              Onze Diensten
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woning Kopen</h3>
                <p className="text-gray-600">Vind uw droomhuis met deskundige begeleiding tijdens het gehele aankoopproces.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woning Verkopen</h3>
                <p className="text-gray-600">Maximaliseer de waarde van uw woning met onze bewezen marketingstrategieën.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Woningtaxatie</h3>
                <p className="text-gray-600">Krijg nauwkeurige marktwaarderingen van gecertificeerde makelaars.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marktanalyse</h3>
                <p className="text-gray-600">Uitgebreide marktanalyses om de beste beslissingen te nemen.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Onderhandeling</h3>
                <p className="text-gray-600">Professionele onderhandelingsexpertise voor de beste resultaten.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Service</h3>
                <p className="text-gray-600">Persoonlijke begeleiding en premium service voor elke klant.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="cta" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Neem Contact Op
                </Button>
              </Link>
              <Link href="/schedule" className="w-full sm:w-auto">
                <Button variant="ctaOutline" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan Afspraak
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

