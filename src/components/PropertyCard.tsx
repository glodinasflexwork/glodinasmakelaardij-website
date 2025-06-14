import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useComparison } from '@/context/ComparisonContext';
import { useSavedProperties } from '@/context/SavedPropertiesContext';
import { useAuth } from '@/context/AuthContext';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  size?: string;
  mainImage: string;
  images: string[];
  status: 'available' | 'new' | 'under_offer';
  energyLabel: string;
  description?: string;
}

interface PropertyCardProps {
  property: Property;
  language?: 'nl' | 'en';
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, language = 'nl' }) => {
  const { selectedProperties, addProperty, removeProperty } = useComparison();
  const { isSaved, saveProperty, removeProperty: removeSavedProperty } = useSavedProperties();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isSelected = selectedProperties.some(p => p.id === property.id);
  const isPropertySaved = isSaved(property.id);

  // Handle saving/removing property from favorites
  const handleSaveToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isPropertySaved) {
        await removeSavedProperty(property.id);
      } else {
        await saveProperty(property);
      }
    } catch (error) {
      console.error('Error toggling saved status:', error);
      // Show user-friendly error message
      if (!user) {
        alert('Please log in to save properties.');
      } else {
        alert('Failed to save property. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle comparison toggle
  const handleCompareToggle = () => {
    if (isSelected) {
      removeProperty(property.id);
    } else {
      addProperty({
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        originalPrice: property.originalPrice,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size: property.area || property.size || '',
        mainImage: property.mainImage,
        status: property.status,
        energyLabel: property.energyLabel,
        features: [], // Add features if available
        description: property.description || '',
      });
    }
  };

  // Translations
  const translations = {
    nl: {
      new: 'Nieuw',
      underOffer: 'Onder Bod',
      viewProperty: 'Bekijk Woning',
      compare: 'Vergelijken',
    },
    en: {
      new: 'New',
      underOffer: 'Under Offer',
      viewProperty: 'View Property',
      compare: 'Compare',
    },
  };

  const t = translations[language];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image 
          src={property.mainImage} 
          alt={property.title}
          width={400}
          height={250}
          className="w-full h-64 object-cover"
        />
        
        {/* Status Badge */}
        {property.status === 'new' && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {t.new}
          </span>
        )}
        {property.status === 'under_offer' && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {t.underOffer}
          </span>
        )}
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Heart button */}
          <button
            onClick={handleSaveToggle}
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isPropertySaved 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart className={`h-4 w-4 ${isPropertySaved ? 'fill-current' : ''}`} />
          </button>
          
          {/* Compare Checkbox */}
          <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 shadow-sm">
            <Checkbox 
              id={`compare-${property.id}`}
              checked={isSelected}
              onCheckedChange={handleCompareToggle}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
            />
            <label 
              htmlFor={`compare-${property.id}`}
              className="text-xs font-semibold cursor-pointer text-gray-900"
            >
              {t.compare}
            </label>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{property.title}</h3>
        <p className="text-gray-900 mb-3 font-medium">{property.location}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xl font-bold text-orange-600">{property.price}</span>
            {property.originalPrice && (
              <span className="text-sm text-gray-600 line-through ml-2">{property.originalPrice}</span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-900 mb-4">
          <span>{property.bedrooms} slaapkamers</span>
          <span>{property.bathrooms} badkamers</span>
          <span>{property.area}</span>
        </div>
        
        <Link href={`/properties/${property.id}`}>
          <Button variant="ctaOutline" className="w-full">
            {t.viewProperty}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;