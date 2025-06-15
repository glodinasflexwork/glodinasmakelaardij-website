// Types for the saved properties system
export interface SavedProperty {
  id: string;
  savedAt: string;
  title?: string;
  price?: string;
  location?: string;
  imageUrl?: string;
}

export interface SavedPropertiesState {
  savedProperties: SavedProperty[];
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export interface SavedPropertiesContextType {
  // State
  savedProperties: SavedProperty[];
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Methods
  saveProperty: (propertyId: string, propertyData?: Partial<SavedProperty>) => Promise<boolean>;
  unsaveProperty: (propertyId: string) => Promise<boolean>;
  isSaved: (propertyId: string) => boolean;
  clearAllSaved: () => Promise<boolean>;
  getSavedCount: () => number;
  
  // Loading states for individual properties
  getPropertyLoadingState: (propertyId: string) => boolean;
  
  // Error handling
  clearError: () => void;
  retryLastOperation: () => Promise<void>;
}

export interface SavedPropertiesAction {
  type: 'SET_LOADING' | 'SET_ERROR' | 'SET_SAVED_PROPERTIES' | 'ADD_PROPERTY' | 'REMOVE_PROPERTY' | 'CLEAR_ALL' | 'SET_INITIALIZED' | 'SET_PROPERTY_LOADING' | 'CLEAR_PROPERTY_LOADING';
  payload?: any;
}

export interface LocalStorageData {
  savedProperties: SavedProperty[];
  version: string;
  lastUpdated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SavedPropertiesApiResponse {
  saved_properties: Array<{
    id: string;
    property_id: string;
    saved_at: string;
    property?: {
      title: string;
      price: string;
      location: string;
      images: string[];
    };
  }>;
}

// Error types
export class SavedPropertiesError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = 'SavedPropertiesError';
  }
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

