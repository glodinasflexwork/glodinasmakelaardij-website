'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X, MapPin, Bed, Bath, Square, Eye, Heart } from 'lucide-react';

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

  const PropertyCard = ({ property }: { property: Property }) => (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="relative">
          <img
            src={property.mainImage || property.images[0] || '/placeholder-property.jpg'}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
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
        </div>

        <div className="p-6">
          {/* Price */}
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block mb-4">
            <span className="text-lg font-bold">{property.price}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200 px-6">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4 px-6">
          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-4 px-6">
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
    </Link>
  );

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Our Properties' : 'Onze Woningen'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our carefully selected offering of high-quality properties in The Hague and surrounding areas.'
              : 'Ontdek ons zorgvuldig geselecteerde aanbod van hoogwaardige woningen in Den Haag en omgeving.'
            }
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {language === 'en' ? 'Gallery' : 'Galerij'}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
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
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

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
                <div className="relative h-96">
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
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedProperty.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span>{selectedProperty.location}</span>
                      </div>
                    </div>
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                      <span className="text-xl font-bold">{selectedProperty.price}</span>
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Bed className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                      <div className="text-sm text-gray-600">Slaapkamers</div>
                      <div className="font-semibold">{selectedProperty.bedrooms}</div>
                    </div>
                    <div className="text-center">
                      <Bath className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                      <div className="text-sm text-gray-600">Badkamers</div>
                      <div className="font-semibold">{selectedProperty.bathrooms}</div>
                    </div>
                    <div className="text-center">
                      <Square className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                      <div className="text-sm text-gray-600">Oppervlakte</div>
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
                    <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200">
                      Bezichtiging Plannen
                    </button>
                    <button className="px-6 py-3 border border-orange-500 text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-all duration-200">
                      <Heart className="w-5 h-5" />
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

