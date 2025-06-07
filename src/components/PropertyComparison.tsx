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
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{t.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))]">
              {/* Header row with property images */}
              <div className="p-4 border-b border-r bg-gray-50"></div>
              {properties.map((property) => (
                <div key={property.id} className="p-4 border-b border-r flex flex-col items-center">
                  <div className="relative w-full h-40 mb-3">
                    <Image 
                      src={property.mainImage} 
                      alt={property.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    {property.status === 'new' && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Nieuw
                      </span>
                    )}
                    {property.status === 'under_offer' && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Onder Bod
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-center mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 text-center mb-3">{property.location}</p>
                  <Link href={`/properties/${property.id}`}>
                    <Button variant="ctaOutline" size="sm" className="w-full">
                      {t.viewProperty}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}

              {/* Price row */}
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.price}</div>
              {properties.map((property) => (
                <div key={`${property.id}-price`} className="p-4 border-b border-r">
                  <div className="font-semibold text-orange-600">{property.price}</div>
                  {property.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">{property.originalPrice}</div>
                  )}
                </div>
              ))}

              {/* Location row */}
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.location}</div>
              {properties.map((property) => (
                <div key={`${property.id}-location`} className="p-4 border-b border-r">
                  {property.location}
                </div>
              ))}

              {/* Size row */}
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.size}</div>
              {properties.map((property) => (
                <div key={`${property.id}-size`} className="p-4 border-b border-r">
                  {property.size}
                </div>
              ))}

              {/* Bedrooms row */}
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.bedrooms}</div>
              {properties.map((property) => (
                <div key={`${property.id}-bedrooms`} className="p-4 border-b border-r">
                  {property.bedrooms}
                </div>
              ))}

              {/* Bathrooms row */}
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.bathrooms}</div>
              {properties.map((property) => (
                <div key={`${property.id}-bathrooms`} className="p-4 border-b border-r">
                  {property.bathrooms}
                </div>
              ))}

              {/* Energy Label row */}
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.energyLabel}</div>
              {properties.map((property) => (
                <div key={`${property.id}-energy`} className="p-4 border-b border-r">
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
              <div className="p-4 border-b border-r bg-gray-50 font-semibold">{t.features}</div>
              {properties.map((property) => (
                <div key={`${property.id}-features`} className="p-4 border-b border-r">
                  <ul className="list-disc list-inside">
                    {property.features.map((feature, index) => (
                      <li key={index} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Description row */}
              <div className="p-4 border-r bg-gray-50 font-semibold">Beschrijving</div>
              {properties.map((property) => (
                <div key={`${property.id}-description`} className="p-4 border-r">
                  <p className="text-sm">{property.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <Button variant="outline" onClick={onClose}>
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;

