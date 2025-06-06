'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.mainImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`${getEnergyLabelColor(property.energyLabel)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            Energy {property.energyLabel}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < property.rating ? 'fill-current' : ''}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4">{property.location} • {property.bedrooms} bedrooms • {property.size}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-purple-600">{property.price}</span>
            {property.originalPrice && (
              <span className="text-gray-400 line-through ml-2">{property.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.slice(0, 4).map((feature, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        <Button
          onClick={onGalleryClick}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          View Gallery ({property.images.length} photos)
        </Button>
      </div>
    </div>
  );
};

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (property: Property) => {
    setSelectedProperty(property);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProperty(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Premium Properties
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Discover exceptional homes in the heart of Den Haag
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onGalleryClick={() => openGallery(property)}
              />
            ))}
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

