'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

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

// Define the context type
interface ComparisonContextType {
  selectedPropertyIds: string[];
  properties: Property[];
  addToComparison: (property: Property) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isComparisonOpen: boolean;
  openComparison: () => void;
  closeComparison: () => void;
}

// Create the context with default values
export const ComparisonContext = createContext<ComparisonContextType>({
  selectedPropertyIds: [],
  properties: [],
  addToComparison: () => {},
  removeFromComparison: () => {},
  clearComparison: () => {},
  isComparisonOpen: false,
  openComparison: () => {},
  closeComparison: () => {},
});

// Create a provider component
export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Add a property to comparison
  const addToComparison = (property: Property) => {
    if (selectedPropertyIds.includes(property.id)) return;
    
    // Limit to 4 properties for comparison
    if (selectedPropertyIds.length >= 4) {
      // Remove the first property if we already have 4
      setSelectedPropertyIds(prev => [...prev.slice(1), property.id]);
      setProperties(prev => [...prev.slice(1), property]);
    } else {
      setSelectedPropertyIds(prev => [...prev, property.id]);
      setProperties(prev => [...prev, property]);
    }
  };

  // Remove a property from comparison
  const removeFromComparison = (id: string) => {
    setSelectedPropertyIds(prev => prev.filter(propId => propId !== id));
    setProperties(prev => prev.filter(prop => prop.id !== id));
  };

  // Clear all properties from comparison
  const clearComparison = () => {
    setSelectedPropertyIds([]);
    setProperties([]);
    setIsComparisonOpen(false);
  };

  // Open the comparison modal
  const openComparison = () => {
    if (selectedPropertyIds.length > 0) {
      setIsComparisonOpen(true);
    }
  };

  // Close the comparison modal
  const closeComparison = () => {
    setIsComparisonOpen(false);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedPropertyIds,
        properties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isComparisonOpen,
        openComparison,
        closeComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

// Create a custom hook for using the comparison context
export const useComparison = () => useContext(ComparisonContext);

