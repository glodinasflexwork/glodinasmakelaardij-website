'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user type
interface User {
  id: number;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profile_image?: string;
  emailVerified: boolean;
  notification_preferences?: {
    email_alerts: boolean;
    property_updates: boolean;
    saved_search_alerts: boolean;
    marketing: boolean;
  };
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  error: string | null;
  clearError: () => void;
}

// API URL - Use relative URLs for Next.js API routes
const API_URL = '';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
  error: null,
  clearError: () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Fetch user profile
        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Token might be expired, try to refresh
          await refreshToken();
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        logout();
        return;
      }
      
      const response = await fetch('/api/users/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        
        // Fetch user profile with new token
        const profileResponse = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${data.access_token}`
          }
        });
        
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUser(profileData.user);
        } else {
          logout();
        }
      } else {
        logout();
      }
    } catch (err) {
      console.error('Token refresh error:', err);
      logout();
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Save tokens to localStorage (using the correct field names from our API)
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // Fetch user profile after successful login
      const profileResponse = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUser(profileData.user);
      } else {
        // If profile fetch fails, still consider login successful but without user data
        console.warn('Could not fetch user profile after login');
        setUser({
          id: 0,
          username: email.split('@')[0],
          email: email,
          firstName: '',
          lastName: '',
          emailVerified: true
        });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, username, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Don't automatically log in after registration since email verification is required
      setError(null);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      console.error('Registration error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Migrate saved properties from localStorage to user account when logged in
  useEffect(() => {
    const migrateSavedProperties = async () => {
      if (user && localStorage.getItem('savedProperties')) {
        try {
          const token = localStorage.getItem('accessToken');
          const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
          
          // Skip if no saved properties
          if (savedProperties.length === 0) return;
          
          // Migrate each property
          for (const property of savedProperties) {
            try {
              await fetch('/api/saved-properties', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ property_id: property.id })
              });
            } catch (err) {
              console.error('Error migrating property:', err);
            }
          }
          
          // Clear localStorage saved properties after migration
          localStorage.removeItem('savedProperties');
        } catch (err) {
          console.error('Error migrating saved properties:', err);
        }
      }
    };
    
    migrateSavedProperties();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

