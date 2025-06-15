import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/context/ComparisonContext';
import { useSavedProperties } from '@/context/SavedPropertiesContext';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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
  showSaveButton?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  language = 'nl',
  showSaveButton = true 
}) => {
  const { selectedPropertyIds, addToComparison, removeFromComparison } = useComparison();
  const { 
    saveProperty, 
    unsaveProperty, 
    isSaved, 
    getPropertyLoadingState,
    error 
  } = useSavedProperties();
  
  const isSelected = selectedPropertyIds.includes(property.id);
  const isPropertySaved = isSaved(property.id);
  const isLoading = getPropertyLoadingState(property.id);

  // Translations
  const translations = {
    nl: {
      new: 'Nieuw',
      underOffer: 'Onder Bod',
      viewProperty: 'Bekijk Woning',
      compare: 'Vergelijken',
      saveProperty: 'Woning opslaan',
      unsaveProperty: 'Woning verwijderen',
      saved: 'Opgeslagen',
      saving: 'Opslaan...',
      removing: 'Verwijderen...',
    },
    en: {
      new: 'New',
      underOffer: 'Under Offer',
      viewProperty: 'View Property',
      compare: 'Compare',
      saveProperty: 'Save property',
      unsaveProperty: 'Remove property',
      saved: 'Saved',
      saving: 'Saving...',
      removing: 'Removing...',
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

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    try {
      if (isPropertySaved) {
        await unsaveProperty(property.id);
      } else {
        await saveProperty(property.id, {
          title: property.title,
          price: property.price,
          location: property.location,
          imageUrl: property.mainImage
        });
      }
    } catch (error) {
      console.error('Failed to toggle save state:', error);
    }
  };

  const getSaveButtonText = () => {
    if (isLoading) {
      return isPropertySaved ? t.removing : t.saving;
    }
    return isPropertySaved ? t.unsaveProperty : t.saveProperty;
  };

  const getSaveButtonIcon = () => {
    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    return (
      <Heart 
        className={cn(
          "h-4 w-4 transition-colors",
          isPropertySaved ? "fill-current text-red-500" : "text-gray-600"
        )} 
      />
    );
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
        
        {/* Save Button */}
        {showSaveButton && (
          <button
            onClick={handleSaveToggle}
            disabled={isLoading}
            className={cn(
              "absolute top-2 right-12 p-2 rounded-full shadow-md transition-all duration-200",
              "bg-white/90 hover:bg-white hover:scale-110",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              isPropertySaved && "bg-red-50 hover:bg-red-100"
            )}
            aria-label={getSaveButtonText()}
            title={getSaveButtonText()}
          >
            {getSaveButtonIcon()}
          </button>
        )}
        
        {/* Compare Checkbox */}
        <div className="absolute top-2 right-2 z-10">
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
        {/* Property Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{property.title}</h3>
        
        {/* Location */}
        <p className="text-gray-900 text-sm font-medium mb-2">{property.location}</p>
        
        {/* Price */}
        <div className="mb-3">
          <span className="font-semibold text-orange-600">{property.price}</span>
          {property.originalPrice && (
            <span className="text-sm text-gray-600 line-through ml-2">{property.originalPrice}</span>
          )}
        </div>
        
        {/* Property Features */}
        <div className="flex justify-between text-sm text-gray-900 font-medium mb-4">
          <div>{property.bedrooms} slaapkamers</div>
          <div>{property.bathrooms} badkamers</div>
          <div>{property.size}</div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          {/* View Property Button */}
          <Link href={`/properties/${property.id}`}>
            <Button variant="ctaOutline" className="w-full">
              {t.viewProperty}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          {/* Save Button (Mobile/Alternative) */}
          {showSaveButton && (
            <button
              onClick={handleSaveToggle}
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                "border border-gray-300 hover:border-gray-400",
                isPropertySaved 
                  ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300" 
                  : "bg-white text-gray-700 hover:bg-gray-50",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "lg:hidden" // Hide on desktop, show on mobile
              )}
              aria-label={getSaveButtonText()}
            >
              {getSaveButtonIcon()}
              <span>{getSaveButtonText()}</span>
            </button>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-xs">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;

