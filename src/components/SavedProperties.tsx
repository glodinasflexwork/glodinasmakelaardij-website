import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart, Trash2, Home } from 'lucide-react';
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

interface SavedPropertiesProps {
  onClose: () => void;
  language?: 'nl' | 'en';
}

const SavedProperties: React.FC<SavedPropertiesProps> = ({ 
  onClose,
  language = 'nl' 
}) => {
  // State for saved properties
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  
  // Translations
  const translations = {
    nl: {
      title: 'Opgeslagen Woningen',
      noSavedProperties: 'Geen opgeslagen woningen gevonden.',
      startSaving: 'Klik op het hartje bij woningen om ze op te slaan.',
      remove: 'Verwijderen',
      close: 'Sluiten',
      viewProperty: 'Bekijk Woning',
      removeAll: 'Alles Verwijderen',
      bedrooms: 'slaapkamers',
      bathrooms: 'badkamers',
      size: 'grootte',
    },
    en: {
      title: 'Saved Properties',
      noSavedProperties: 'No saved properties found.',
      startSaving: 'Click the heart icon on properties to save them.',
      remove: 'Remove',
      close: 'Close',
      viewProperty: 'View Property',
      removeAll: 'Remove All',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
      size: 'size',
    }
  };

  const t = translations[language];

  // Load saved properties from localStorage on component mount
  useEffect(() => {
    const loadSavedProperties = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('savedProperties');
        if (saved) {
          try {
            setSavedProperties(JSON.parse(saved));
          } catch (e) {
            console.error('Error parsing saved properties:', e);
            setSavedProperties([]);
          }
        }
      }
    };

    loadSavedProperties();
  }, []);

  // Remove a property from saved properties
  const removeProperty = (propertyId: string) => {
    const updatedProperties = savedProperties.filter(p => p.id !== propertyId);
    setSavedProperties(updatedProperties);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedProperties', JSON.stringify(updatedProperties));
    }
  };

  // Remove all saved properties
  const removeAllProperties = () => {
    setSavedProperties([]);
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedProperties', JSON.stringify([]));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-orange-500 mr-2" />
            <h2 className="text-xl font-bold">{t.title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="overflow-y-auto flex-grow p-4">
          {savedProperties.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">{t.noSavedProperties}</p>
              <p className="text-gray-500">{t.startSaving}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedProperties.map((property) => (
                <div 
                  key={property.id} 
                  className="border rounded-lg overflow-hidden flex flex-col bg-white hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <div className="relative h-48 w-full">
                      <Image 
                        src={property.mainImage} 
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
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
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={() => removeProperty(property.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                    <p className="font-semibold text-orange-600 mb-3">{property.price}</p>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{property.bedrooms} {t.bedrooms}</span>
                      <span>{property.bathrooms} {t.bathrooms}</span>
                      <span>{property.size} {t.size}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t">
                    <Link href={`/properties/${property.id}`}>
                      <Button variant="cta" size="sm" className="w-full">
                        {t.viewProperty}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t flex justify-between">
          {savedProperties.length > 0 && (
            <Button variant="outline" onClick={removeAllProperties} className="text-red-500 border-red-200 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              {t.removeAll}
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="ml-auto">
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedProperties;

