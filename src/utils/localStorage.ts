// Utility functions for localStorage operations
import { SavedProperty, LocalStorageData, SavedPropertiesError, ERROR_CODES } from '@/types/savedProperties';

const STORAGE_KEY = 'gm_saved_properties';
const STORAGE_VERSION = '1.0';

/**
 * Safely parse JSON with error handling
 */
function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON from localStorage:', error);
    return fallback;
  }
}

/**
 * Validate saved property data structure
 */
function validateSavedProperty(property: any): property is SavedProperty {
  return (
    typeof property === 'object' &&
    property !== null &&
    typeof property.id === 'string' &&
    typeof property.savedAt === 'string' &&
    property.id.length > 0
  );
}

/**
 * Validate localStorage data structure
 */
function validateLocalStorageData(data: any): data is LocalStorageData {
  return (
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(data.savedProperties) &&
    typeof data.version === 'string' &&
    typeof data.lastUpdated === 'string'
  );
}

/**
 * Get saved properties from localStorage
 */
export function getLocalStorageProperties(): SavedProperty[] {
  try {
    if (typeof window === 'undefined') {
      return [];
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const data = safeJsonParse<LocalStorageData>(stored, {
      savedProperties: [],
      version: STORAGE_VERSION,
      lastUpdated: new Date().toISOString()
    });

    if (!validateLocalStorageData(data)) {
      console.warn('Invalid localStorage data structure, clearing storage');
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    // Validate each property and filter out invalid ones
    const validProperties = data.savedProperties.filter(validateSavedProperty);
    
    if (validProperties.length !== data.savedProperties.length) {
      console.warn('Some saved properties were invalid and have been filtered out');
      // Save the cleaned data back to localStorage
      setLocalStorageProperties(validProperties);
    }

    return validProperties;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    throw new SavedPropertiesError(
      'Failed to read saved properties from local storage',
      ERROR_CODES.STORAGE_ERROR
    );
  }
}

/**
 * Save properties to localStorage
 */
export function setLocalStorageProperties(properties: SavedProperty[]): void {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    // Validate all properties before saving
    const validProperties = properties.filter(validateSavedProperty);
    
    if (validProperties.length !== properties.length) {
      console.warn('Some properties were invalid and were not saved to localStorage');
    }

    const data: LocalStorageData = {
      savedProperties: validProperties,
      version: STORAGE_VERSION,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Dispatch custom event for cross-tab synchronization
    window.dispatchEvent(new CustomEvent('savedPropertiesUpdated', {
      detail: { properties: validProperties }
    }));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    throw new SavedPropertiesError(
      'Failed to save properties to local storage',
      ERROR_CODES.STORAGE_ERROR
    );
  }
}

/**
 * Add a property to localStorage
 */
export function addPropertyToLocalStorage(property: SavedProperty): void {
  const currentProperties = getLocalStorageProperties();
  
  // Check if property already exists
  const existingIndex = currentProperties.findIndex(p => p.id === property.id);
  
  if (existingIndex >= 0) {
    // Update existing property
    currentProperties[existingIndex] = property;
  } else {
    // Add new property
    currentProperties.push(property);
  }
  
  setLocalStorageProperties(currentProperties);
}

/**
 * Remove a property from localStorage
 */
export function removePropertyFromLocalStorage(propertyId: string): void {
  const currentProperties = getLocalStorageProperties();
  const filteredProperties = currentProperties.filter(p => p.id !== propertyId);
  setLocalStorageProperties(filteredProperties);
}

/**
 * Clear all properties from localStorage
 */
export function clearLocalStorageProperties(): void {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    
    // Dispatch custom event for cross-tab synchronization
    window.dispatchEvent(new CustomEvent('savedPropertiesUpdated', {
      detail: { properties: [] }
    }));
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    throw new SavedPropertiesError(
      'Failed to clear saved properties from local storage',
      ERROR_CODES.STORAGE_ERROR
    );
  }
}

/**
 * Check if a property is saved in localStorage
 */
export function isPropertySavedInLocalStorage(propertyId: string): boolean {
  const properties = getLocalStorageProperties();
  return properties.some(p => p.id === propertyId);
}

/**
 * Get the count of saved properties in localStorage
 */
export function getLocalStoragePropertiesCount(): number {
  return getLocalStorageProperties().length;
}

/**
 * Migrate localStorage properties to a format suitable for API upload
 */
export function preparePropertiesForMigration(): Array<{ property_id: string; saved_at: string }> {
  const properties = getLocalStorageProperties();
  return properties.map(property => ({
    property_id: property.id,
    saved_at: property.savedAt
  }));
}

/**
 * Check if localStorage is available and working
 */
export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get storage usage information
 */
export function getStorageInfo(): { used: number; available: boolean } {
  try {
    if (!isLocalStorageAvailable()) {
      return { used: 0, available: false };
    }

    const data = localStorage.getItem(STORAGE_KEY);
    const used = data ? new Blob([data]).size : 0;
    
    return { used, available: true };
  } catch (error) {
    return { used: 0, available: false };
  }
}

