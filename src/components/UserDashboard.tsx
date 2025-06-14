'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { X, User, Heart, Bell, Settings, LogOut, Loader2, Home, Edit, Save } from 'lucide-react';
import Link from 'next/link';

interface SavedProperty {
  id: number;
  property_id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  created_at: string;
  notes?: string;
}

interface SavedSearch {
  id: number;
  name: string;
  search_criteria: any;
  alert_frequency: string;
  created_at: string;
}

interface UserDashboardProps {
  onClose: () => void;
  language?: 'nl' | 'en';
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  onClose,
  language = 'nl' 
}) => {
  const { user, logout, updateUser, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'alerts' | 'settings'>('profile');
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);
  const [isLoadingSearches, setIsLoadingSearches] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  
  // API URL - Updated for production using environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://api.glodinasmakelaardij.nl' 
      : 'http://localhost:5000');
  
  // Translations
  const translations = {
    nl: {
      profile: 'Profiel',
      savedProperties: 'Opgeslagen Woningen',
      alerts: 'Alerts',
      settings: 'Instellingen',
      welcome: 'Welkom',
      email: 'E-mail',
      phone: 'Telefoon',
      edit: 'Bewerken',
      save: 'Opslaan',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      noSavedProperties: 'Geen opgeslagen woningen gevonden',
      noSavedSearches: 'Geen opgeslagen zoekopdrachten gevonden',
      logout: 'Uitloggen',
      close: 'Sluiten',
      viewProperty: 'Bekijk Woning',
      removeProperty: 'Verwijderen',
      editNotes: 'Notities Bewerken',
      price: 'Prijs',
      location: 'Locatie',
      bedrooms: 'Slaapkamers',
      bathrooms: 'Badkamers',
      area: 'Oppervlakte',
      m2: 'm²',
      notes: 'Notities',
      saveChanges: 'Wijzigingen Opslaan',
      cancel: 'Annuleren'
    },
    en: {
      profile: 'Profile',
      savedProperties: 'Saved Properties',
      alerts: 'Alerts',
      settings: 'Settings',
      welcome: 'Welcome',
      email: 'Email',
      phone: 'Phone',
      edit: 'Edit',
      save: 'Save',
      firstName: 'First Name',
      lastName: 'Last Name',
      noSavedProperties: 'No saved properties found',
      noSavedSearches: 'No saved searches found',
      logout: 'Logout',
      close: 'Close',
      viewProperty: 'View Property',
      removeProperty: 'Remove',
      editNotes: 'Edit Notes',
      price: 'Price',
      location: 'Location',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      m2: 'm²',
      notes: 'Notes',
      saveChanges: 'Save Changes',
      cancel: 'Cancel'
    }
  };
  
  // Get translations based on current language
  const t = translations[language];
  
  useEffect(() => {
    if (user) {
      fetchSavedProperties();
      fetchSavedSearches();
    }
  }, [user]);
  
  const fetchSavedProperties = async () => {
    if (!user) return;
    
    setIsLoadingProperties(true);
    try {
      const response = await fetch(`${API_URL}/api/users/saved-properties`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedProperties(data.saved_properties || []);
      }
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    } finally {
      setIsLoadingProperties(false);
    }
  };
  
  const fetchSavedSearches = async () => {
    if (!user) return;
    
    setIsLoadingSearches(true);
    try {
      const response = await fetch(`${API_URL}/api/users/saved-searches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedSearches(data.saved_searches || []);
      }
    } catch (error) {
      console.error('Error fetching saved searches:', error);
    } finally {
      setIsLoadingSearches(false);
    }
  };
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        const data = await response.json();
        updateUser({
          ...user,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone
        });
        setIsEditingProfile(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const handleRemoveProperty = async (propertyId: number) => {
    if (!user) return;
    
    try {
      const response = await fetch(`${API_URL}/api/users/saved-properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        setSavedProperties(savedProperties.filter(prop => prop.id !== propertyId));
      }
    } catch (error) {
      console.error('Error removing property:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{t.welcome}, {user.firstName || user.username || user.email.split('@')[0]}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] max-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r bg-gray-50">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full p-2 rounded-md ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {t.profile}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('saved')}
                    className={`flex items-center w-full p-2 rounded-md ${activeTab === 'saved' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    {t.savedProperties}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className={`flex items-center w-full p-2 rounded-md ${activeTab === 'alerts' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    <Bell className="h-5 w-5 mr-2" />
                    {t.alerts}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center w-full p-2 rounded-md ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    {t.settings}
                  </button>
                </li>
                <li className="pt-4 border-t mt-4">
                  <button
                    onClick={logout}
                    className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t.logout}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-medium mb-4">{t.profile}</h3>
                
                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.firstName}</label>
                      <input
                        type="text"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.lastName}</label>
                      <input
                        type="text"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.email}</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.phone}</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleUpdateProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        {t.save}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        {t.cancel}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t.firstName}</p>
                        <p>{user.first_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.lastName}</p>
                        <p>{user.last_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.email}</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t.phone}</p>
                        <p>{user.phone || '-'}</p>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditingProfile(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {t.edit}
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'saved' && (
              <div>
                <h3 className="text-lg font-medium mb-4">{t.savedProperties}</h3>
                
                {isLoadingProperties ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : savedProperties.length === 0 ? (
                  <p className="text-gray-500 py-4">{t.noSavedProperties}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedProperties.map((property) => (
                      <div key={property.id} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="relative h-40 bg-gray-200">
                          {property.images && property.images.length > 0 ? (
                            <img 
                              src={property.images[0]} 
                              alt={property.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Home className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium">{property.title}</h4>
                          <p className="text-gray-600">{property.location}</p>
                          <p className="text-primary font-bold mt-1">{property.price}</p>
                          <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>{property.bedrooms} {t.bedrooms}</span>
                            <span>{property.bathrooms} {t.bathrooms}</span>
                            <span>{property.area} {t.m2}</span>
                          </div>
                          
                          {property.notes && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                              <p className="font-medium">{t.notes}:</p>
                              <p>{property.notes}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-between mt-4">
                            <Link href={`/properties/${property.property_id}`} className="text-primary hover:underline">
                              {t.viewProperty}
                            </Link>
                            <button 
                              onClick={() => handleRemoveProperty(property.id)}
                              className="text-red-600 hover:underline"
                            >
                              {t.removeProperty}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'alerts' && (
              <div>
                <h3 className="text-lg font-medium mb-4">{t.alerts}</h3>
                
                {isLoadingSearches ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : savedSearches.length === 0 ? (
                  <p className="text-gray-500 py-4">{t.noSavedSearches}</p>
                ) : (
                  <div className="space-y-4">
                    {savedSearches.map((search) => (
                      <div key={search.id} className="border rounded-lg p-4">
                        <h4 className="font-medium">{search.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(search.created_at).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                          <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                            {JSON.stringify(search.search_criteria, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-medium mb-4">{t.settings}</h3>
                {/* Settings content will go here */}
                <p className="text-gray-500">Settings functionality coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

