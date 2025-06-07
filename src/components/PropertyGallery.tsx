'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X, MapPin, Bed, Bath, Square, Eye, Heart, Search, SlidersHorizontal, Check } from 'lucide-react';

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
  mainImage: string;
  images: string[];
  rating: number;
  status: 'new' | 'under_offer' | 'available';
  description?: string;
}

interface PropertyGalleryProps {
  properties: Property[];
  language?: 'nl' | 'en';
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ properties, language = 'nl' }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' });
  const [bedroomFilter, setBedroomFilter] = useState<string>('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Apply filters when search term, price range, or bedroom filter changes
  useEffect(() => {
    let result = [...properties];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(property => 
        property.title.toLowerCase().includes(term) || 
        property.location.toLowerCase().includes(term) ||
        property.features.some(feature => feature.toLowerCase().includes(term))
      );
    }
    
    // Apply price range filter
    if (priceRange.min) {
      const minPrice = parseInt(priceRange.min.replace(/[^0-9]/g, ''));
      if (!isNaN(minPrice)) {
        result = result.filter(property => {
          const propertyPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
          return propertyPrice >= minPrice;
        });
      }
    }
    
    if (priceRange.max) {
      const maxPrice = parseInt(priceRange.max.replace(/[^0-9]/g, ''));
      if (!isNaN(maxPrice)) {
        result = result.filter(property => {
          const propertyPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
          return propertyPrice <= maxPrice;
        });
      }
    }
    
    // Apply bedroom filter
    if (bedroomFilter) {
      const minBedrooms = parseInt(bedroomFilter);
      if (!isNaN(minBedrooms)) {
        result = result.filter(property => property.bedrooms >= minBedrooms);
      }
    }
    
    setFilteredProperties(result);
  }, [searchTerm, priceRange, bedroomFilter, properties]);

  const closeModal = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      );
    }
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const PropertyCard = ({ property }: { property: Property }) => {
    const isFavorite = favorites.includes(property.id);
    
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full border border-gray-100">
        <div className="relative">
          <Link href={`/properties/${property.id}`}>
            <img
              src={property.mainImage || property.images[0] || '/placeholder-property.jpg'}
              alt={property.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Status Badge */}
          {property.status && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
              property.status === 'new'
                ? 'bg-orange-500 text-white'
                : property.status === 'under_offer'
                ? 'bg-orange-100 text-orange-800 border border-orange-300'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {property.status === 'new' ? 'Nieuw in verkoop' : 
               property.status === 'under_offer' ? 'Onder bod' : 
               'Beschikbaar'}
            </div>
          )}

          {/* Image Count */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {property.images.length} foto&apos;s
          </div>
          
          {/* Energy Label */}
          <div className={`absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-xs ${
            property.energyLabel === 'A' ? 'bg-green-500' :
            property.energyLabel === 'B' ? 'bg-green-400' :
            property.energyLabel === 'C' ? 'bg-yellow-400' :
            property.energyLabel === 'D' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}>
            {property.energyLabel}
          </div>
          
          {/* Favorite Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className="absolute top-4 right-16 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Price */}
          <div className="flex justify-between items-center mb-3">
            <div className="bg-orange-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg inline-block">
              <span className="text-base md:text-lg font-bold">{property.price}</span>
            </div>
            {property.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {property.originalPrice}
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/properties/${property.id}`}>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3 md:mb-4">
            <MapPin className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{property.features.length - 3}
              </span>
            )}
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-3 md:pt-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1 text-orange-500" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1 text-orange-500" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1 text-orange-500" />
              <span>{property.area}m²</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {language === 'en' ? 'Our Properties' : 'Onze Woningen'}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our carefully selected offering of high-quality properties in The Hague and surrounding areas.'
              : 'Ontdek ons zorgvuldig geselecteerde aanbod van hoogwaardige woningen in Den Haag en omgeving.'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search properties...' : 'Zoek woningen...'}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 md:w-auto w-full"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              <span>{language === 'en' ? 'Filters' : 'Filters'}</span>
              <ChevronRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${showFilters ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          {/* Filters (Collapsible) */}
          <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Price Range' : 'Prijsklasse'}
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Bedrooms' : 'Slaapkamers'}
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={bedroomFilter}
                  onChange={(e) => setBedroomFilter(e.target.value)}
                >
                  <option value="">{language === 'en' ? 'Any' : 'Alle'}</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Status' : 'Status'}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'All' : 'Alle'}
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {language === 'en' ? 'New' : 'Nieuw'}
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {language === 'en' ? 'Under Offer' : 'Onder bod'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setPriceRange({ min: '', max: '' });
                  setBedroomFilter('');
                }}
                className="text-orange-600 hover:text-orange-700 text-sm mr-4"
              >
                {language === 'en' ? 'Clear All' : 'Alles wissen'}
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                {language === 'en' ? 'Apply Filters' : 'Filters Toepassen'}
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            {filteredProperties.length} {language === 'en' ? 'properties found' : 'woningen gevonden'}
          </div>
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
                className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {language === 'en' ? 'Gallery' : 'Galerij'}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {language === 'en' ? 'List' : 'Lijst'}
            </button>
          </div>
        </div>

        {/* Property Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Property List */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3">
                    <Link href={`/properties/${property.id}`}>
                      <img
                        src={property.mainImage || property.images[0] || '/placeholder-property.jpg'}
                        alt={property.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </Link>
                    
                    {/* Status Badge */}
                    {property.status && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        property.status === 'new'
                          ? 'bg-orange-500 text-white'
                          : property.status === 'under_offer'
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status === 'new' ? 'Nieuw in verkoop' : 
                         property.status === 'under_offer' ? 'Onder bod' : 
                         'Beschikbaar'}
                      </div>
                    )}
                    
                    {/* Energy Label */}
                    <div className={`absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-xs ${
                      property.energyLabel === 'A' ? 'bg-green-500' :
                      property.energyLabel === 'B' ? 'bg-green-400' :
                      property.energyLabel === 'C' ? 'bg-yellow-400' :
                      property.energyLabel === 'D' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {property.energyLabel}
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 md:w-2/3">
                    <div className="flex flex-col h-full">
                      <div className="mb-auto">
                        <div className="flex justify-between items-center mb-3">
                          <div className="bg-orange-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg inline-block">
                            <span className="text-base md:text-lg font-bold">{property.price}</span>
                          </div>
                          {property.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {property.originalPrice}
                            </div>
                          )}
                        </div>
                        
                        <Link href={`/properties/${property.id}`}>
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors duration-200">
                            {property.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {property.features.map((feature, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-3">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1 text-orange-500" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1 text-orange-500" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1 text-orange-500" />
                          <span>{property.area}m²</span>
                        </div>
                        <button 
                          onClick={() => toggleFavorite(property.id)}
                          className="flex items-center"
                          aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                          <span>{favorites.includes(property.id) ? (language === 'en' ? 'Saved' : 'Bewaard') : (language === 'en' ? 'Save' : 'Bewaren')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'en' ? 'No properties found' : 'Geen woningen gevonden'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Try adjusting your search filters or criteria.'
                : 'Probeer uw zoekcriteria aan te passen.'
              }
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPriceRange({ min: '', max: '' });
                setBedroomFilter('');
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
            >
              {language === 'en' ? 'Clear All Filters' : 'Alle Filters Wissen'}
            </button>
          </div>
        )}
        
        {/* Property Image Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <button 
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-orange-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="relative">
                <img 
                  src={selectedProperty.images[currentImageIndex]} 
                  alt={`${selectedProperty.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
                  {currentImageIndex + 1} / {selectedProperty.images.length}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* View More Button */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/woningen">
              <button className="bg-white border border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                {language === 'en' ? 'View All Properties' : 'Bekijk Alle Woningen'}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGallery;

