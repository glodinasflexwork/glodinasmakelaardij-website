'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define saved property type
interface SavedProperty {
  id: number;
  property_id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
  notes?: string;
  saved_at: string;
}

// Define context type
interface SavedPropertiesContextType {
  savedProperties: SavedProperty[];
  isSaved: (propertyId: number) => boolean;
  saveProperty: (property: any) => Promise<void>;
  removeProperty: (propertyId: number) => Promise<void>;
  getSavedCount: () => number;
  isLoading: boolean;
}

// Create the context
export const SavedPropertiesContext = createContext<SavedPropertiesContextType>({
  savedProperties: [],
  isSaved: () => false,
  saveProperty: async () => {},
  removeProperty: async () => {},
  getSavedCount: () => 0,
  isLoading: false,
});

// Create a provider component
export const SavedPropertiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load saved properties on mount and when auth state changes
  useEffect(() => {
    loadSavedProperties();
  }, [user, isAuthenticated]);

  // Load saved properties from database or localStorage
  const loadSavedProperties = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated && user) {
        // Load from database
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await fetch('/api/saved-properties', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setSavedProperties(data.saved_properties || []);
          }
        }
      } else {
        // Load from localStorage
        const localSaved = localStorage.getItem('savedProperties');
        if (localSaved) {
          const parsed = JSON.parse(localSaved);
          setSavedProperties(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading saved properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if a property is saved
  const isSaved = (propertyId: number): boolean => {
    return savedProperties.some(p => p.property_id === propertyId);
  };

  // Save a property
  const saveProperty = async (property: any) => {
    try {
      const savedProperty: SavedProperty = {
        id: Date.now(), // Temporary ID for localStorage
        property_id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || property.size || '',
        images: property.images || [],
        notes: property.description || '',
        saved_at: new Date().toISOString(),
      };

      if (isAuthenticated && user) {
        // Save to database
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await fetch('/api/saved-properties', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              property_id: property.id,
              title: property.title,
              location: property.location,
              price: property.price,
              bedrooms: property.bedrooms || 0,
              bathrooms: property.bathrooms || 0,
              area: property.area || property.size || '',
              images: property.images || [],
              notes: property.description || '',
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setSavedProperties(prev => [...prev, data.saved_property]);
          } else {
            throw new Error('Failed to save to database');
          }
        }
      } else {
        // Save to localStorage
        const newSavedProperties = [...savedProperties, savedProperty];
        setSavedProperties(newSavedProperties);
        localStorage.setItem('savedProperties', JSON.stringify(newSavedProperties));
      }
    } catch (error) {
      console.error('Error saving property:', error);
      throw error;
    }
  };

  // Remove a property
  const removeProperty = async (propertyId: number) => {
    try {
      if (isAuthenticated && user) {
        // Remove from database
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await fetch(`/api/saved-properties/${propertyId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setSavedProperties(prev => prev.filter(p => p.property_id !== propertyId));
          } else {
            throw new Error('Failed to remove from database');
          }
        }
      } else {
        // Remove from localStorage
        const newSavedProperties = savedProperties.filter(p => p.property_id !== propertyId);
        setSavedProperties(newSavedProperties);
        localStorage.setItem('savedProperties', JSON.stringify(newSavedProperties));
      }
    } catch (error) {
      console.error('Error removing property:', error);
      throw error;
    }
  };

  // Get saved properties count
  const getSavedCount = (): number => {
    return savedProperties.length;
  };

  // Migrate localStorage saved properties to database when user logs in
  useEffect(() => {
    const migrateLocalStorageToDatabase = async () => {
      if (isAuthenticated && user) {
        const localSaved = localStorage.getItem('savedProperties');
        if (localSaved) {
          try {
            const localProperties = JSON.parse(localSaved);
            const token = localStorage.getItem('accessToken');
            
            if (localProperties.length > 0 && token) {
              // Migrate each property
              for (const property of localProperties) {
                try {
                  await fetch('/api/saved-properties', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      property_id: property.property_id,
                      title: property.title,
                      location: property.location,
                      price: property.price,
                      bedrooms: property.bedrooms,
                      bathrooms: property.bathrooms,
                      area: property.area,
                      images: property.images,
                      notes: property.notes,
                    }),
                  });
                } catch (err) {
                  console.error('Error migrating property:', err);
                }
              }
              
              // Clear localStorage after migration
              localStorage.removeItem('savedProperties');
              
              // Reload saved properties from database
              await loadSavedProperties();
            }
          } catch (err) {
            console.error('Error migrating saved properties:', err);
          }
        }
      }
    };

    migrateLocalStorageToDatabase();
  }, [isAuthenticated, user]);

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedProperties,
        isSaved,
        saveProperty,
        removeProperty,
        getSavedCount,
        isLoading,
      }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
};

// Create a custom hook for using the saved properties context
export const useSavedProperties = () => useContext(SavedPropertiesContext);

