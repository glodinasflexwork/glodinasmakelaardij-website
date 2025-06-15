'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  SavedPropertiesState, 
  SavedPropertiesContextType, 
  SavedPropertiesAction, 
  SavedProperty,
  SavedPropertiesError,
  ERROR_CODES
} from '@/types/savedProperties';
import {
  getLocalStorageProperties,
  setLocalStorageProperties,
  addPropertyToLocalStorage,
  removePropertyFromLocalStorage,
  clearLocalStorageProperties,
  isPropertySavedInLocalStorage,
  preparePropertiesForMigration,
  isLocalStorageAvailable
} from '@/utils/localStorage';
import {
  fetchSavedProperties,
  savePropertyToApi,
  removePropertyFromApi,
  clearAllSavedPropertiesFromApi,
  migrateSavedPropertiesToApi,
  retryApiOperation
} from '@/utils/savedPropertiesApi';

// Initial state
const initialState: SavedPropertiesState = {
  savedProperties: [],
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Reducer for state management
function savedPropertiesReducer(state: SavedPropertiesState, action: SavedPropertiesAction): SavedPropertiesState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'SET_SAVED_PROPERTIES':
      return {
        ...state,
        savedProperties: action.payload,
        isLoading: false,
        error: null,
      };

    case 'ADD_PROPERTY':
      return {
        ...state,
        savedProperties: [...state.savedProperties, action.payload],
        isLoading: false,
        error: null,
      };

    case 'REMOVE_PROPERTY':
      return {
        ...state,
        savedProperties: state.savedProperties.filter(p => p.id !== action.payload),
        isLoading: false,
        error: null,
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        savedProperties: [],
        isLoading: false,
        error: null,
      };

    case 'SET_INITIALIZED':
      return {
        ...state,
        isInitialized: true,
      };

    default:
      return state;
  }
}

// Create context
const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

// Property loading states (for individual property operations)
interface PropertyLoadingStates {
  [propertyId: string]: boolean;
}

// Provider component
export function SavedPropertiesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(savedPropertiesReducer, initialState);
  const { isAuthenticated, user } = useAuth();
  const [propertyLoadingStates, setPropertyLoadingStates] = React.useState<PropertyLoadingStates>({});
  const lastOperationRef = useRef<(() => Promise<void>) | null>(null);
  const initializationRef = useRef<boolean>(false);

  // Set property loading state
  const setPropertyLoading = useCallback((propertyId: string, loading: boolean) => {
    setPropertyLoadingStates(prev => ({
      ...prev,
      [propertyId]: loading
    }));
  }, []);

  // Clear property loading state
  const clearPropertyLoading = useCallback((propertyId: string) => {
    setPropertyLoadingStates(prev => {
      const newState = { ...prev };
      delete newState[propertyId];
      return newState;
    });
  }, []);

  // Error handling utility
  const handleError = useCallback((error: unknown, operation: string) => {
    console.error(`SavedProperties ${operation} error:`, error);
    
    let errorMessage = `Failed to ${operation}`;
    
    if (error instanceof SavedPropertiesError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
  }, []);

  // Initialize saved properties
  const initializeSavedProperties = useCallback(async () => {
    if (initializationRef.current) {
      return;
    }
    
    initializationRef.current = true;
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      if (isAuthenticated) {
        // Load from database
        try {
          const properties = await retryApiOperation(() => fetchSavedProperties());
          dispatch({ type: 'SET_SAVED_PROPERTIES', payload: properties });
        } catch (apiError) {
          console.warn('Failed to load from database, falling back to localStorage:', apiError);
          // Fallback to localStorage if database fails
          if (isLocalStorageAvailable()) {
            const properties = getLocalStorageProperties();
            dispatch({ type: 'SET_SAVED_PROPERTIES', payload: properties });
          } else {
            dispatch({ type: 'SET_SAVED_PROPERTIES', payload: [] });
          }
        }
        
        // Check for localStorage data to migrate
        if (isLocalStorageAvailable()) {
          try {
            const localProperties = getLocalStorageProperties();
            if (localProperties.length > 0) {
              try {
                const migrationData = preparePropertiesForMigration();
                await migrateSavedPropertiesToApi(migrationData);
                clearLocalStorageProperties();
                
                // Reload from database after migration
                const updatedProperties = await retryApiOperation(() => fetchSavedProperties());
                dispatch({ type: 'SET_SAVED_PROPERTIES', payload: updatedProperties });
              } catch (migrationError) {
                console.warn('Failed to migrate localStorage data:', migrationError);
                // Continue with database data even if migration fails
              }
            }
          } catch (localError) {
            console.warn('Error checking localStorage for migration:', localError);
          }
        }
      } else {
        // Load from localStorage
        try {
          if (isLocalStorageAvailable()) {
            const properties = getLocalStorageProperties();
            dispatch({ type: 'SET_SAVED_PROPERTIES', payload: properties });
          } else {
            dispatch({ type: 'SET_SAVED_PROPERTIES', payload: [] });
          }
        } catch (localError) {
          console.warn('Error loading from localStorage:', localError);
          dispatch({ type: 'SET_SAVED_PROPERTIES', payload: [] });
        }
      }
    } catch (error) {
      console.error('Error in initializeSavedProperties:', error);
      handleError(error, 'initialize');
      
      // Final fallback - always set some state
      try {
        if (isLocalStorageAvailable()) {
          const properties = getLocalStorageProperties();
          dispatch({ type: 'SET_SAVED_PROPERTIES', payload: properties });
        } else {
          dispatch({ type: 'SET_SAVED_PROPERTIES', payload: [] });
        }
      } catch (fallbackError) {
        console.error('Even fallback failed:', fallbackError);
        dispatch({ type: 'SET_SAVED_PROPERTIES', payload: [] });
      }
    } finally {
      dispatch({ type: 'SET_INITIALIZED' });
    }
  }, [isAuthenticated, handleError]);

  // Save property
  const saveProperty = useCallback(async (propertyId: string, propertyData?: Partial<SavedProperty>): Promise<boolean> => {
    if (!propertyId) {
      handleError(new Error('Property ID is required'), 'save property');
      return false;
    }

    setPropertyLoading(propertyId, true);
    
    const property: SavedProperty = {
      id: propertyId,
      savedAt: new Date().toISOString(),
      ...propertyData
    };

    // Optimistic update
    dispatch({ type: 'ADD_PROPERTY', payload: property });

    const operation = async () => {
      if (isAuthenticated) {
        await savePropertyToApi(propertyId);
      } else {
        addPropertyToLocalStorage(property);
      }
    };

    lastOperationRef.current = operation;

    try {
      await retryApiOperation(operation);
      clearPropertyLoading(propertyId);
      return true;
    } catch (error) {
      // Revert optimistic update
      dispatch({ type: 'REMOVE_PROPERTY', payload: propertyId });
      handleError(error, 'save property');
      clearPropertyLoading(propertyId);
      return false;
    }
  }, [isAuthenticated, handleError, setPropertyLoading, clearPropertyLoading]);

  // Unsave property
  const unsaveProperty = useCallback(async (propertyId: string): Promise<boolean> => {
    if (!propertyId) {
      handleError(new Error('Property ID is required'), 'unsave property');
      return false;
    }

    setPropertyLoading(propertyId, true);

    // Store the property for potential rollback
    const propertyToRemove = state.savedProperties.find(p => p.id === propertyId);
    
    // Optimistic update
    dispatch({ type: 'REMOVE_PROPERTY', payload: propertyId });

    const operation = async () => {
      if (isAuthenticated) {
        await removePropertyFromApi(propertyId);
      } else {
        removePropertyFromLocalStorage(propertyId);
      }
    };

    lastOperationRef.current = operation;

    try {
      await retryApiOperation(operation);
      clearPropertyLoading(propertyId);
      return true;
    } catch (error) {
      // Revert optimistic update
      if (propertyToRemove) {
        dispatch({ type: 'ADD_PROPERTY', payload: propertyToRemove });
      }
      handleError(error, 'unsave property');
      clearPropertyLoading(propertyId);
      return false;
    }
  }, [isAuthenticated, state.savedProperties, handleError, setPropertyLoading, clearPropertyLoading]);

  // Check if property is saved
  const isSaved = useCallback((propertyId: string): boolean => {
    return state.savedProperties.some(p => p.id === propertyId);
  }, [state.savedProperties]);

  // Clear all saved properties
  const clearAllSaved = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Store current properties for potential rollback
    const currentProperties = [...state.savedProperties];
    
    // Optimistic update
    dispatch({ type: 'CLEAR_ALL' });

    const operation = async () => {
      if (isAuthenticated) {
        await clearAllSavedPropertiesFromApi();
      } else {
        clearLocalStorageProperties();
      }
    };

    lastOperationRef.current = operation;

    try {
      await retryApiOperation(operation);
      return true;
    } catch (error) {
      // Revert optimistic update
      dispatch({ type: 'SET_SAVED_PROPERTIES', payload: currentProperties });
      handleError(error, 'clear all saved properties');
      return false;
    }
  }, [isAuthenticated, state.savedProperties, handleError]);

  // Get saved count
  const getSavedCount = useCallback((): number => {
    return state.savedProperties.length;
  }, [state.savedProperties]);

  // Get property loading state
  const getPropertyLoadingState = useCallback((propertyId: string): boolean => {
    return propertyLoadingStates[propertyId] || false;
  }, [propertyLoadingStates]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  // Retry last operation
  const retryLastOperation = useCallback(async (): Promise<void> => {
    if (lastOperationRef.current) {
      try {
        await retryApiOperation(lastOperationRef.current);
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        handleError(error, 'retry operation');
      }
    }
  }, [handleError]);

  // Initialize on mount and auth changes
  useEffect(() => {
    initializationRef.current = false;
    initializeSavedProperties();
  }, [initializeSavedProperties]);

  // Listen for storage events (cross-tab synchronization)
  useEffect(() => {
    if (typeof window === 'undefined' || isAuthenticated) {
      return;
    }

    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      if (event instanceof StorageEvent && event.key === 'gm_saved_properties') {
        // Handle localStorage changes from other tabs
        try {
          const properties = getLocalStorageProperties();
          dispatch({ type: 'SET_SAVED_PROPERTIES', payload: properties });
        } catch (error) {
          console.warn('Failed to sync localStorage changes:', error);
        }
      } else if (event instanceof CustomEvent && event.type === 'savedPropertiesUpdated') {
        // Handle custom events from our localStorage utilities
        const properties = event.detail?.properties || [];
        dispatch({ type: 'SET_SAVED_PROPERTIES', payload: properties });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('savedPropertiesUpdated', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedPropertiesUpdated', handleStorageChange as EventListener);
    };
  }, [isAuthenticated]);

  // Context value
  const contextValue: SavedPropertiesContextType = {
    // State
    savedProperties: state.savedProperties,
    isLoading: state.isLoading,
    error: state.error,
    isInitialized: state.isInitialized,
    
    // Methods
    saveProperty,
    unsaveProperty,
    isSaved,
    clearAllSaved,
    getSavedCount,
    getPropertyLoadingState,
    clearError,
    retryLastOperation,
  };

  return (
    <SavedPropertiesContext.Provider value={contextValue}>
      {children}
    </SavedPropertiesContext.Provider>
  );
}

// Hook to use the context
export function useSavedProperties(): SavedPropertiesContextType {
  const context = useContext(SavedPropertiesContext);
  
  if (context === undefined) {
    throw new Error('useSavedProperties must be used within a SavedPropertiesProvider');
  }
  
  return context;
}

// Error boundary component
interface SavedPropertiesErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class SavedPropertiesErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error?: Error; retry: () => void }> },
  SavedPropertiesErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SavedPropertiesErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SavedProperties Error Boundary caught an error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} retry={this.retry} />;
      }

      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-medium mb-2">Something went wrong with saved properties</h3>
          <p className="text-red-600 text-sm mb-3">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.retry}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

