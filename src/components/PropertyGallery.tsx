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
          <Link href={`/property/${property.id}`}>
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
          <Link href={`/property/${property.id}`}>
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

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className={`grid gap-4 md:gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'en' ? 'No properties found' : 'Geen woningen gevonden'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {language === 'en' 
                ? 'Try adjusting your search criteria or filters to see more results.'
                : 'Pas uw zoekcriteria of filters aan om meer resultaten te zien.'
              }
            </p>
          </div>
        )}
        
        {/* Load More Button */}
        {filteredProperties.length > 0 && (
          <div className="flex justify-center mt-8 md:mt-12">
            <button className="bg-white hover:bg-gray-50 text-orange-600 border border-orange-500 px-6 py-2 rounded-lg font-medium transition-all duration-200">
              {language === 'en' ? 'View All Properties' : 'Alle Woningen Bekijken'}
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image Carousel */}
                <div className="relative h-64 sm:h-80 md:h-96">
                  <img
                    src={selectedProperty.images[currentImageIndex]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {selectedProperty.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedProperty.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? 'bg-orange-500' : 'bg-white bg-opacity-60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {selectedProperty.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2 md:mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                        <span className="text-sm">{selectedProperty.location}</span>
                      </div>
                    </div>
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-lg self-start">
                      <span className="text-lg md:text-xl font-bold">{selectedProperty.price}</span>
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Bed className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-orange-500" />
                      <div className="text-xs md:text-sm text-gray-600">Slaapkamers</div>
                      <div className="font-semibold">{selectedProperty.bedrooms}</div>
                    </div>
                    <div className="text-center">
                      <Bath className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-orange-500" />
                      <div className="text-xs md:text-sm text-gray-600">Badkamers</div>
                      <div className="font-semibold">{selectedProperty.bathrooms}</div>
                    </div>
                    <div className="text-center">
                      <Square className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2 text-orange-500" />
                      <div className="text-xs md:text-sm text-gray-600">Oppervlakte</div>
                      <div className="font-semibold">{selectedProperty.area}m²</div>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedProperty.description && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Beschrijving</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedProperty.description}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium transition-all duration-200">
                      Bezichtiging Plannen
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(selectedProperty.id);
                      }}
                      className={`px-4 md:px-6 py-2 md:py-3 border rounded-lg font-medium transition-all duration-200 ${
                        favorites.includes(selectedProperty.id) 
                          ? 'border-red-500 text-red-600 hover:bg-red-50' 
                          : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(selectedProperty.id) ? 'fill-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGallery;

