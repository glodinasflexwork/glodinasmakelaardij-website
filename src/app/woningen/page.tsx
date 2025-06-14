'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import ComparisonButton from '@/components/ComparisonButton';
import ComparisonModal from '@/components/ComparisonModal';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
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

export default function WoningenPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [bedroomFilter, setBedroomFilter] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties from database
  useEffect(() => {
    fetchProperties();
  }, [sortBy, bedroomFilter, priceRange]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (sortBy) params.append('sort_by', sortBy);
      if (bedroomFilter) params.append('bedrooms', bedroomFilter);
      if (priceRange.min) params.append('min_price', priceRange.min);
      if (priceRange.max) params.append('max_price', priceRange.max);

      const response = await fetch(`/api/properties?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.properties || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/hero-building.jpeg')" }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Woningen in Den Haag</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Ontdek ons zorgvuldig geselecteerde aanbod van hoogwaardige woningen in Den Haag en omgeving.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Zoek op locatie, type woning of kenmerken..."
                  className="pl-12 pr-4 py-3 rounded-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Zoeken
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Advanced Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Woningen Zoeken</h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Nieuwste eerst</option>
                    <option value="price_asc">Prijs (laag naar hoog)</option>
                    <option value="price_desc">Prijs (hoog naar laag)</option>
                    <option value="area_asc">Oppervlakte (klein naar groot)</option>
                    <option value="area_desc">Oppervlakte (groot naar klein)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Filter Toggle Button */}
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  <span>Filters</span>
                  {showFilters ? (
                    <ChevronUp className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 ml-2" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Expanded Filters */}
            <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prijsklasse
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="€ Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <span>-</span>
                    <input
                      type="text"
                      placeholder="€ Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slaapkamers
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={bedroomFilter}
                    onChange={(e) => setBedroomFilter(e.target.value)}
                  >
                    <option value="">Alle</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type Woning
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="">Alle</option>
                    <option value="apartment">Appartement</option>
                    <option value="house">Huis</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
              </div>
              
              {/* Status Filters */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Alle
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Nieuw
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Onder bod
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Beschikbaar
                  </button>
                </div>
              </div>
              
              {/* Filter Actions */}
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => {
                    setPriceRange({ min: '', max: '' });
                    setBedroomFilter('');
                    setPropertyType('');
                  }}
                  className="text-orange-600 hover:text-orange-700 text-sm mr-4"
                >
                  Alles wissen
                </button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                  Filters Toepassen
                </Button>
              </div>
            </div>
          </div>
          
          {/* Property Gallery */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Woningen laden...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={fetchProperties}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Opnieuw proberen
              </Button>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Geen woningen gevonden met de huidige filters.</p>
              <Button 
                onClick={() => {
                  setPriceRange({ min: '', max: '' });
                  setBedroomFilter('');
                  setSortBy('newest');
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Filters wissen
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} language="nl" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Niet gevonden wat u zoekt?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Wij hebben toegang tot exclusieve woningen die niet openbaar worden aangeboden. Neem contact met ons op voor een persoonlijk zoekprofiel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Neem Contact Op
            </Button>
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 text-base md:text-lg font-semibold">
              Maak een Afspraak
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Comparison Components */}
      <ComparisonButton language="nl" />
      <ComparisonModal language="nl" />
    </div>
  );
}

