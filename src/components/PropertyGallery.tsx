'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Home, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  size: string;
  bedrooms: number;
  energyLabel: string;
  features: string[];
  mainImage: string;
  images: string[];
  rating: number;
  status?: 'available' | 'under_offer' | 'new' | 'sold';
}

interface PropertyGalleryProps {
  properties: Property[];
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
  propertyTitle: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onImageChange,
  propertyTitle,
}) => {
  if (!isOpen) return null;

  const nextImage = () => {
    onImageChange((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    onImageChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronRight size={48} />
        </button>

        {/* Main image */}
        <div className="flex-1 flex items-center justify-center p-8">
          <img
            src={images[currentIndex]}
            alt={`${propertyTitle} - Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Image info */}
        <div className="text-center text-white py-4">
          <h3 className="text-xl font-semibold mb-2">{propertyTitle}</h3>
          <p className="text-gray-300">Image {currentIndex + 1} of {images.length}</p>
        </div>

        {/* Thumbnail strip */}
        <div className="bg-black bg-opacity-50 p-4">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageChange(index)}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-400'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyCard: React.FC<{ property: Property; onGalleryClick: () => void }> = ({
  property,
  onGalleryClick,
}) => {
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Nieuw in verkoop
            </span>
          </div>
        );
      case 'under_offer':
        return (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Onder bod
            </span>
          </div>
        );
      case 'sold':
        return (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Verkocht
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const getEnergyLabelColor = (label: string) => {
    switch (label) {
      case 'A': return 'bg-green-600';
      case 'B': return 'bg-lime-600';
      case 'C': return 'bg-yellow-600';
      case 'D': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative h-80 overflow-hidden">
        <img
          src={property.mainImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        {getStatusBadge(property.status)}
        
        {/* Energy Label */}
        <div className="absolute top-4 right-4">
          <span className={`${getEnergyLabelColor(property.energyLabel)} text-white px-2 py-1 rounded text-xs font-medium shadow-lg`}>
            {property.energyLabel}
          </span>
        </div>

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <h3 className="text-xl font-bold text-white mb-1">{property.title}</h3>
          <div className="flex items-center text-white/90 text-sm mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center space-x-4 text-white/80 text-sm">
            <div className="flex items-center">
              <Home size={14} className="mr-1" />
              <span>{property.bedrooms} kamers</span>
            </div>
            <div className="flex items-center">
              <Ruler size={14} className="mr-1" />
              <span>{property.size}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Bar - Rentastone Style */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-white">{property.price}</span>
            {property.originalPrice && (
              <span className="text-white/80 line-through ml-2 text-sm">{property.originalPrice}</span>
            )}
          </div>
          <Button
            onClick={onGalleryClick}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all"
          >
            {property.images.length} foto's
          </Button>
        </div>
      </div>
    </div>
  );
};

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery');

  const openGallery = (property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Bekijk onze <span className="text-orange-500">toppers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ontdek onze uitgelichte woningen in Den Haag
            </p>
            
            {/* View Toggle - Rentastone Style */}
            <div className="flex justify-center space-x-2 mb-8">
              <Button
                onClick={() => setViewMode('gallery')}
                variant={viewMode === 'gallery' ? 'default' : 'outline'}
                className={`${
                  viewMode === 'gallery' 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}
              >
                Galerij
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className={`${
                  viewMode === 'list' 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : 'border-amber-500 text-amber-500 hover:bg-amber-50'
                }`}
              >
                Lijst
              </Button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className={`grid gap-8 ${
            viewMode === 'gallery' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onGalleryClick={() => openGallery(property)}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Bekijk alle woningen
            </Button>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedProperty}
        onClose={closeGallery}
        images={selectedProperty?.images || []}
        currentIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
        propertyTitle={selectedProperty?.title || ''}
      />
    </div>
  );
};

export default PropertyGallery;

