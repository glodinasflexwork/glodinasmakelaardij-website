import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define the property type
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
  description: string;
}

interface PropertyComparisonProps {
  properties: Property[];
  onClose: () => void;
  language?: 'nl' | 'en';
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({ 
  properties, 
  onClose,
  language = 'nl' 
}) => {
  // Translations
  const translations = {
    nl: {
      title: 'Woningen Vergelijken',
      price: 'Prijs',
      location: 'Locatie',
      size: 'Grootte',
      bedrooms: 'Slaapkamers',
      bathrooms: 'Badkamers',
      energyLabel: 'Energielabel',
      features: 'Kenmerken',
      close: 'Sluiten',
      viewProperty: 'Bekijk Woning',
      noProperties: 'Geen woningen geselecteerd om te vergelijken.',
      selectProperties: 'Selecteer woningen om te vergelijken.',
    },
    en: {
      title: 'Compare Properties',
      price: 'Price',
      location: 'Location',
      size: 'Size',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      energyLabel: 'Energy Label',
      features: 'Features',
      close: 'Close',
      viewProperty: 'View Property',
      noProperties: 'No properties selected for comparison.',
      selectProperties: 'Select properties to compare.',
    }
  };

  const t = translations[language];

  // If no properties are provided, show a message
  if (properties.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">{t.title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-8 text-center">
            <Home className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">{t.noProperties}</p>
            <p className="text-gray-500">{t.selectProperties}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
          <div className="min-w-max">
            <div className={`grid gap-0 border border-gray-300 ${properties.length === 1 ? 'grid-cols-[200px_300px]' : 
                                        properties.length === 2 ? 'grid-cols-[200px_repeat(2,300px)]' : 
                                        properties.length === 3 ? 'grid-cols-[200px_repeat(3,280px)]' : 
                                        'grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))]'}`}>
              {/* Header row with property images */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900"></div>
              {properties.map((property) => (
                <div key={property.id} className="p-4 border-b border-r border-gray-300 flex flex-col items-center bg-white">
                  <div className="relative w-full h-40 mb-3">
                    <Image 
                      src={property.mainImage} 
                      alt={property.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    {property.status === 'new' && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Nieuw
                      </span>
                    )}
                    {property.status === 'under_offer' && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Onder Bod
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-center mb-1 text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-700 text-center mb-3 font-medium">{property.location}</p>
                  <Link href={`/properties/${property.id}`}>
                    <Button variant="ctaOutline" size="sm" className="w-full">
                      {t.viewProperty}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}

              {/* Price row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.price}</div>
              {properties.map((property) => (
                <div key={`${property.id}-price`} className="p-4 border-b border-r border-gray-300 bg-white">
                  <div className="font-semibold text-orange-600">{property.price}</div>
                  {property.originalPrice && (
                    <div className="text-sm text-gray-600 line-through">{property.originalPrice}</div>
                  )}
                </div>
              ))}

              {/* Location row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.location}</div>
              {properties.map((property) => (
                <div key={`${property.id}-location`} className="p-4 border-b border-r border-gray-300 bg-white text-gray-900 font-medium">
                  {property.location}
                </div>
              ))}

              {/* Size row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.size}</div>
              {properties.map((property) => (
                <div key={`${property.id}-size`} className="p-4 border-b border-r border-gray-300 bg-white text-gray-900 font-medium">
                  {property.size}
                </div>
              ))}

              {/* Bedrooms row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.bedrooms}</div>
              {properties.map((property) => (
                <div key={`${property.id}-bedrooms`} className="p-4 border-b border-r border-gray-300 bg-white text-gray-900 font-medium">
                  {property.bedrooms}
                </div>
              ))}

              {/* Bathrooms row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.bathrooms}</div>
              {properties.map((property) => (
                <div key={`${property.id}-bathrooms`} className="p-4 border-b border-r border-gray-300 bg-white text-gray-900 font-medium">
                  {property.bathrooms}
                </div>
              ))}

              {/* Energy Label row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.energyLabel}</div>
              {properties.map((property) => (
                <div key={`${property.id}-energy`} className="p-4 border-b border-r border-gray-300 bg-white">
                  <span className={`inline-block px-2 py-1 rounded-md text-white text-xs font-semibold
                    ${property.energyLabel === 'A' ? 'bg-green-500' : 
                      property.energyLabel === 'B' ? 'bg-green-400' : 
                      property.energyLabel === 'C' ? 'bg-yellow-500' : 
                      property.energyLabel === 'D' ? 'bg-yellow-600' : 
                      property.energyLabel === 'E' ? 'bg-orange-500' : 
                      property.energyLabel === 'F' ? 'bg-orange-600' : 
                      'bg-red-500'}`}>
                    {property.energyLabel}
                  </span>
                </div>
              ))}

              {/* Features row */}
              <div className="p-4 border-b border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">{t.features}</div>
              {properties.map((property) => (
                <div key={`${property.id}-features`} className="p-4 border-b border-r border-gray-300 bg-white">
                  <ul className="list-disc list-inside">
                    {property.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-900 font-medium">{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Description row */}
              <div className="p-4 border-r border-gray-300 bg-gray-50 font-semibold text-gray-900">Beschrijving</div>
              {properties.map((property) => (
                <div key={`${property.id}-description`} className="p-4 border-r border-gray-300 bg-white">
                  <p className="text-sm text-gray-900">{property.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t mt-auto bg-white">
          <Button variant="outline" onClick={onClose} className="text-gray-900 border-gray-300 hover:bg-gray-50">
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;

