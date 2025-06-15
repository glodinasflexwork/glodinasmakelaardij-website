// API utilities for saved properties operations
import { SavedProperty, SavedPropertiesApiResponse, ApiResponse, SavedPropertiesError, ERROR_CODES } from '@/types/savedProperties';

const API_BASE_URL = '/api';

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('accessToken');
}

/**
 * Create headers for API requests
 */
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Handle API response and extract data
 */
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    let errorCode = ERROR_CODES.SERVER_ERROR;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If we can't parse the error response, use the default message
    }

    // Determine error code based on status
    if (response.status === 401) {
      errorCode = ERROR_CODES.AUTH_ERROR;
    } else if (response.status >= 400 && response.status < 500) {
      errorCode = ERROR_CODES.VALIDATION_ERROR;
    } else if (response.status >= 500) {
      errorCode = ERROR_CODES.SERVER_ERROR;
    }

    throw new SavedPropertiesError(errorMessage, errorCode);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new SavedPropertiesError(
      'Failed to parse server response',
      ERROR_CODES.SERVER_ERROR
    );
  }
}

/**
 * Fetch saved properties from the API
 */
export async function fetchSavedProperties(): Promise<SavedProperty[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-properties`, {
      method: 'GET',
      headers: createHeaders(),
    });

    const data = await handleApiResponse<SavedPropertiesApiResponse>(response);
    
    // Transform API response to our internal format
    return data.saved_properties.map(item => ({
      id: item.property_id,
      savedAt: item.saved_at,
      title: item.property?.title,
      price: item.property?.price,
      location: item.property?.location,
      imageUrl: item.property?.images?.[0]
    }));
  } catch (error) {
    if (error instanceof SavedPropertiesError) {
      throw error;
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new SavedPropertiesError(
        'Network error: Unable to connect to server',
        ERROR_CODES.NETWORK_ERROR
      );
    }

    throw new SavedPropertiesError(
      'Failed to fetch saved properties',
      ERROR_CODES.UNKNOWN_ERROR
    );
  }
}

/**
 * Save a property via the API
 */
export async function savePropertyToApi(propertyId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-properties`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({
        property_id: propertyId,
        saved_at: new Date().toISOString()
      }),
    });

    await handleApiResponse<ApiResponse<any>>(response);
  } catch (error) {
    if (error instanceof SavedPropertiesError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new SavedPropertiesError(
        'Network error: Unable to save property',
        ERROR_CODES.NETWORK_ERROR
      );
    }

    throw new SavedPropertiesError(
      'Failed to save property',
      ERROR_CODES.UNKNOWN_ERROR
    );
  }
}

/**
 * Remove a property via the API
 */
export async function removePropertyFromApi(propertyId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-properties`, {
      method: 'DELETE',
      headers: createHeaders(),
      body: JSON.stringify({
        property_id: propertyId
      }),
    });

    await handleApiResponse<ApiResponse<any>>(response);
  } catch (error) {
    if (error instanceof SavedPropertiesError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new SavedPropertiesError(
        'Network error: Unable to remove property',
        ERROR_CODES.NETWORK_ERROR
      );
    }

    throw new SavedPropertiesError(
      'Failed to remove property',
      ERROR_CODES.UNKNOWN_ERROR
    );
  }
}

/**
 * Clear all saved properties via the API
 */
export async function clearAllSavedPropertiesFromApi(): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-properties/clear`, {
      method: 'DELETE',
      headers: createHeaders(),
    });

    await handleApiResponse<ApiResponse<any>>(response);
  } catch (error) {
    if (error instanceof SavedPropertiesError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new SavedPropertiesError(
        'Network error: Unable to clear saved properties',
        ERROR_CODES.NETWORK_ERROR
      );
    }

    throw new SavedPropertiesError(
      'Failed to clear saved properties',
      ERROR_CODES.UNKNOWN_ERROR
    );
  }
}

/**
 * Migrate localStorage properties to the database
 */
export async function migrateSavedPropertiesToApi(
  properties: Array<{ property_id: string; saved_at: string }>
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-properties/migrate`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({
        properties
      }),
    });

    await handleApiResponse<ApiResponse<any>>(response);
  } catch (error) {
    if (error instanceof SavedPropertiesError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new SavedPropertiesError(
        'Network error: Unable to migrate saved properties',
        ERROR_CODES.NETWORK_ERROR
      );
    }

    throw new SavedPropertiesError(
      'Failed to migrate saved properties',
      ERROR_CODES.UNKNOWN_ERROR
    );
  }
}

/**
 * Check if user is authenticated by validating token
 */
export async function validateAuthToken(): Promise<boolean> {
  try {
    const token = getAuthToken();
    if (!token) {
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'GET',
      headers: createHeaders(),
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Retry mechanism for failed API operations
 */
export async function retryApiOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry auth errors or validation errors
      if (error instanceof SavedPropertiesError) {
        if (error.code === ERROR_CODES.AUTH_ERROR || error.code === ERROR_CODES.VALIDATION_ERROR) {
          throw error;
        }
      }

      if (attempt < maxRetries) {
        // Exponential backoff
        const waitTime = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError!;
}

