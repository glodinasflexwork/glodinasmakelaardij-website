'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';

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

interface PropertyCardProps {
  property: Property;
  language?: 'nl' | 'en';
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, language = 'nl' }) => {
  const { selectedPropertyIds, addToComparison, removeFromComparison } = useComparison();
  const { user } = useAuth();
  const isSelected = selectedPropertyIds.includes(property.id);
  const [isSaved, setIsSaved] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://api.glodinasmakelaardij.nl' 
      : 'http://localhost:5000');

  // Check if property is saved on component mount
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user || !user.token) return;
      try {
        const response = await fetch(`${API_URL}/api/saved-properties`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsSaved(data.saved_properties.some((p: any) => p.property_id === property.id));
        }
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };
    checkSavedStatus();
  }, [user, property.id, API_URL]);

  // Handle saving/removing property from favorites
  const handleSaveToggle = async () => {
    if (!user || !user.token) {
      alert('Please log in to save properties.');
      return;
    }

    try {
      if (isSaved) {
        // Remove from saved properties
        const response = await fetch(`${API_URL}/api/saved-properties/${property.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          setIsSaved(false);
        } else {
          console.error('Failed to remove property:', response.status);
        }
      } else {
        // Add to saved properties
        const response = await fetch(`${API_URL}/api/saved-properties`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            property_id: property.id,
            title: property.title,
            location: property.location,
            price: property.price,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area,
            images: property.images,
            notes: property.description, // Using description as notes for now
          }),
        });
        if (response.ok) {
          setIsSaved(true);
        } else {
          console.error('Failed to save property:', response.status);
        }
      }
    } catch (error) {
      console.error('Error toggling saved status:', error);
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
    }
  };

  const t = translations[language];

  const handleCompareToggle = (checked: boolean) => {
    if (checked) {
      addToComparison(property);
    } else {
      removeFromComparison(property.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {/* Property Image */}
        <div className="relative h-48 w-full">
          <Image 
            src={property.mainImage} 
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Status Badge */}
        {property.status === 'new' && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {t.new}
          </span>
        )}
        {property.status === 'under_offer' && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {t.underOffer}
          </span>
        )}
        
        {/* Compare Checkbox and Favorites Heart */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {/* Favorites Heart */}
          <button
            onClick={handleSaveToggle}
            className={`p-2 rounded-full transition-all duration-200 ${
              isSaved 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white/80 text-gray-600 hover:bg-orange-50 hover:text-orange-500'
            }`}
            aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          
          {/* Compare Checkbox */}
          <div className="flex items-center gap-1 bg-white/80 rounded-full px-2 py-1">
            <Checkbox 
              id={`compare-${property.id}`}
              checked={isSelected}
              onCheckedChange={handleCompareToggle}
              className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
            />
            <label 
              htmlFor={`compare-${property.id}`}
              className="text-xs font-medium cursor-pointer"
            >
              {t.compare}
            </label>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Property Title */}
        <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
        
        {/* Location */}
        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        
        {/* Price */}
        <div className="mb-3">
          <span className="font-semibold text-orange-600">{property.price}</span>
          {property.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">{property.originalPrice}</span>
          )}
        </div>
        
        {/* Property Features */}
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div>{property.bedrooms} slaapkamers</div>
          <div>{property.bathrooms} badkamers</div>
          <div>{property.size}</div>
        </div>
        
        {/* View Property Button */}
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

