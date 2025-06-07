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
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
  });
  
  // API URL
  const API_URL = 'https://5000-i4vuvsa1jufrqbkqp2qpt-4eba7cf5.manusvm.computer';
  
  // Translations
  const translations = {
    nl: {
      title: 'Mijn Account',
      profile: 'Profiel',
      savedProperties: 'Opgeslagen Woningen',
      alerts: 'Mijn Alerts',
      settings: 'Instellingen',
      logout: 'Uitloggen',
      welcome: 'Welkom',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      memberSince: 'Lid sinds',
      edit: 'Bewerken',
      save: 'Opslaan',
      cancel: 'Annuleren',
      noSavedProperties: 'Geen opgeslagen woningen gevonden',
      startSaving: 'Klik op het hartje bij woningen om ze op te slaan',
      viewProperty: 'Bekijk Woning',
      remove: 'Verwijderen',
      noSavedSearches: 'Geen opgeslagen zoekopdrachten gevonden',
      createSearch: 'Maak een zoekopdracht aan om alerts te ontvangen',
      alertFrequency: 'Alert frequentie',
      daily: 'Dagelijks',
      weekly: 'Wekelijks',
      never: 'Nooit',
      notificationSettings: 'Notificatie instellingen',
      emailAlerts: 'E-mail alerts',
      propertyUpdates: 'Woning updates',
      savedSearchAlerts: 'Alerts voor opgeslagen zoekopdrachten',
      marketing: 'Marketing e-mails',
      saveSettings: 'Instellingen opslaan',
      passwordSettings: 'Wachtwoord instellingen',
      changePassword: 'Wijzig wachtwoord',
      deleteAccount: 'Account verwijderen',
      deleteWarning: 'Let op: Deze actie kan niet ongedaan worden gemaakt',
      bedrooms: 'slaapkamers',
      bathrooms: 'badkamers',
      area: 'oppervlakte'
    },
    en: {
      title: 'My Account',
      profile: 'Profile',
      savedProperties: 'Saved Properties',
      alerts: 'My Alerts',
      settings: 'Settings',
      logout: 'Logout',
      welcome: 'Welcome',
      email: 'Email address',
      phone: 'Phone number',
      firstName: 'First name',
      lastName: 'Last name',
      memberSince: 'Member since',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      noSavedProperties: 'No saved properties found',
      startSaving: 'Click the heart icon on properties to save them',
      viewProperty: 'View Property',
      remove: 'Remove',
      noSavedSearches: 'No saved searches found',
      createSearch: 'Create a search to receive alerts',
      alertFrequency: 'Alert frequency',
      daily: 'Daily',
      weekly: 'Weekly',
      never: 'Never',
      notificationSettings: 'Notification settings',
      emailAlerts: 'Email alerts',
      propertyUpdates: 'Property updates',
      savedSearchAlerts: 'Saved search alerts',
      marketing: 'Marketing emails',
      saveSettings: 'Save settings',
      passwordSettings: 'Password settings',
      changePassword: 'Change password',
      deleteAccount: 'Delete account',
      deleteWarning: 'Warning: This action cannot be undone',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
      area: 'area'
    }
  };

  const t = translations[language];
  
  // Fetch saved properties
  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!user) return;
      
      setIsLoadingProperties(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/users/saved-properties`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSavedProperties(data.saved_properties || []);
        }
      } catch (err) {
        console.error('Error fetching saved properties:', err);
      } finally {
        setIsLoadingProperties(false);
      }
    };
    
    fetchSavedProperties();
  }, [user]);
  
  // Fetch saved searches
  useEffect(() => {
    const fetchSavedSearches = async () => {
      if (!user) return;
      
      setIsLoadingSearches(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${API_URL}/api/users/saved-searches`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSavedSearches(data.saved_searches || []);
        }
      } catch (err) {
        console.error('Error fetching saved searches:', err);
      } finally {
        setIsLoadingSearches(false);
      }
    };
    
    fetchSavedSearches();
  }, [user]);
  
  // Handle profile update
  const handleProfileUpdate = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
        setIsEditingProfile(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };
  
  // Handle notification settings update
  const handleNotificationUpdate = async (settings: any) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notification_preferences: settings
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
      }
    } catch (err) {
      console.error('Error updating notification settings:', err);
    }
  };
  
  // Handle remove saved property
  const handleRemoveProperty = async (propertyId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/users/saved-properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setSavedProperties(prev => prev.filter(p => p.property_id !== propertyId));
      }
    } catch (err) {
      console.error('Error removing saved property:', err);
    }
  };
  
  // Handle update saved search alert frequency
  const handleUpdateSearchFrequency = async (searchId: number, frequency: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/users/saved-searches/${searchId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alert_frequency: frequency
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedSearches(prev => 
          prev.map(search => 
            search.id === searchId ? data.saved_search : search
          )
        );
      }
    } catch (err) {
      console.error('Error updating search frequency:', err);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    onClose();
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'nl' ? 'nl-NL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (!user || isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-96 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{t.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 p-4 border-r border-gray-200 md:h-[calc(90vh-4rem)] overflow-y-auto">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-green-100 text-green-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                {t.profile}
              </button>
              
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'saved' 
                    ? 'bg-green-100 text-green-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Heart className="h-5 w-5 mr-3" />
                {t.savedProperties}
              </button>
              
              <button
                onClick={() => setActiveTab('alerts')}
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'alerts' 
                    ? 'bg-green-100 text-green-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Bell className="h-5 w-5 mr-3" />
                {t.alerts}
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-3 py-2 rounded-md ${
                  activeTab === 'settings' 
                    ? 'bg-green-100 text-green-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                {t.settings}
              </button>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                {t.logout}
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto md:h-[calc(90vh-4rem)]">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">{t.profile}</h3>
                  {!isEditingProfile ? (
                    <Button 
                      onClick={() => setIsEditingProfile(true)}
                      variant="outline"
                      className="flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t.edit}
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setIsEditingProfile(false)}
                        variant="outline"
                      >
                        {t.cancel}
                      </Button>
                      <Button 
                        onClick={handleProfileUpdate}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {t.save}
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-4">
                        {t.welcome}, {user.username}!
                      </h4>
                      
                      {isEditingProfile ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t.firstName}
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={profileData.first_name}
                                onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t.lastName}
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={profileData.last_name}
                                onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t.phone}
                            </label>
                            <input
                              type="tel"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">{t.email}</p>
                              <p>{user.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">{t.phone}</p>
                              <p>{user.phone || '-'}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">{t.firstName}</p>
                              <p>{user.first_name || '-'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">{t.lastName}</p>
                              <p>{user.last_name || '-'}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{t.memberSince}</p>
                            <p>{user.created_at ? formatDate(user.created_at) : '-'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Saved Properties Tab */}
            {activeTab === 'saved' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">{t.savedProperties}</h3>
                
                {isLoadingProperties ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  </div>
                ) : savedProperties.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-2">{t.noSavedProperties}</p>
                    <p className="text-gray-500">{t.startSaving}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedProperties.map((property) => (
                      <div 
                        key={property.id} 
                        className="border rounded-lg overflow-hidden flex flex-col bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48">
                          <img 
                            src={property.images?.[0] || '/placeholder-property.jpg'} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => handleRemoveProperty(property.property_id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="p-4 flex-grow">
                          <h4 className="font-semibold text-lg mb-1">{property.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                          <p className="font-semibold text-green-600 mb-3">{property.price}</p>
                          
                          <div className="flex justify-between text-sm text-gray-600 mb-4">
                            <span>{property.bedrooms} {t.bedrooms}</span>
                            <span>{property.bathrooms} {t.bathrooms}</span>
                            <span>{property.area}m² {t.area}</span>
                          </div>
                        </div>
                        
                        <div className="p-4 border-t">
                          <Link href={`/properties/${property.property_id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              <Home className="h-4 w-4 mr-2" />
                              {t.viewProperty}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Alerts Tab */}
            {activeTab === 'alerts' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">{t.alerts}</h3>
                
                {isLoadingSearches ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  </div>
                ) : savedSearches.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Bell className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-600 mb-2">{t.noSavedSearches}</p>
                    <p className="text-gray-500">{t.createSearch}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedSearches.map((search) => (
                      <div 
                        key={search.id} 
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold">{search.name}</h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(search.created_at)}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(search.search_criteria).map(([key, value]) => (
                              value && (
                                <span 
                                  key={key} 
                                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                >
                                  {key}: {value}
                                </span>
                              )
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center border-t pt-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{t.alertFrequency}</p>
                            <select
                              value={search.alert_frequency}
                              onChange={(e) => handleUpdateSearchFrequency(search.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded-md px-2 py-1"
                            >
                              <option value="daily">{t.daily}</option>
                              <option value="weekly">{t.weekly}</option>
                              <option value="never">{t.never}</option>
                            </select>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => {
                              // TODO: Implement delete saved search
                            }}
                          >
                            {t.remove}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">{t.settings}</h3>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h4 className="font-semibold mb-4">{t.notificationSettings}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 rounded"
                          checked={user.notification_preferences?.email_alerts}
                          onChange={(e) => {
                            const newSettings = {
                              ...user.notification_preferences,
                              email_alerts: e.target.checked
                            };
                            handleNotificationUpdate(newSettings);
                          }}
                        />
                        <span className="ml-2">{t.emailAlerts}</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 rounded"
                          checked={user.notification_preferences?.property_updates}
                          onChange={(e) => {
                            const newSettings = {
                              ...user.notification_preferences,
                              property_updates: e.target.checked
                            };
                            handleNotificationUpdate(newSettings);
                          }}
                        />
                        <span className="ml-2">{t.propertyUpdates}</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 rounded"
                          checked={user.notification_preferences?.saved_search_alerts}
                          onChange={(e) => {
                            const newSettings = {
                              ...user.notification_preferences,
                              saved_search_alerts: e.target.checked
                            };
                            handleNotificationUpdate(newSettings);
                          }}
                        />
                        <span className="ml-2">{t.savedSearchAlerts}</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 rounded"
                          checked={user.notification_preferences?.marketing}
                          onChange={(e) => {
                            const newSettings = {
                              ...user.notification_preferences,
                              marketing: e.target.checked
                            };
                            handleNotificationUpdate(newSettings);
                          }}
                        />
                        <span className="ml-2">{t.marketing}</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h4 className="font-semibold mb-4">{t.passwordSettings}</h4>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // TODO: Implement change password
                    }}
                  >
                    {t.changePassword}
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-semibold text-red-600 mb-4">{t.deleteAccount}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t.deleteWarning}</p>
                  
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      // TODO: Implement delete account
                    }}
                  >
                    {t.deleteAccount}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

