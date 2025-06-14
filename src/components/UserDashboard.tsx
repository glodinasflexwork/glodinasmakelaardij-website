'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  X, User, Heart, Bell, Settings, LogOut, Loader2, Home, Edit, Save, 
  ChevronRight, ChevronLeft, Search, AlertCircle, Shield, Palette,
  Download, HelpCircle, Star, Calendar, MapPin, Phone, Mail,
  Building, TrendingUp, FileText, Archive
} from 'lucide-react';
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

type MainSection = 'dashboard' | 'properties' | 'account';
type SubSection = 'overview' | 'saved' | 'alerts' | 'searches' | 'profile' | 'settings' | 'security';

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  onClose,
  language = 'nl' 
}) => {
  const { user, logout, updateUser, isLoading } = useAuth();
  const [activeMainSection, setActiveMainSection] = useState<MainSection>('dashboard');
  const [activeSubSection, setActiveSubSection] = useState<SubSection>('overview');
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
  
  // Translations
  const translations = {
    nl: {
      // Main sections
      dashboard: 'Dashboard',
      properties: 'Woningen',
      account: 'Account',
      
      // Sub sections
      overview: 'Overzicht',
      saved: 'Opgeslagen',
      alerts: 'Alerts',
      searches: 'Zoekopdrachten',
      profile: 'Profiel',
      settings: 'Instellingen',
      security: 'Beveiliging',
      
      // Common
      welcome: 'Welkom',
      email: 'E-mail',
      phone: 'Telefoon',
      edit: 'Bewerken',
      save: 'Opslaan',
      cancel: 'Annuleren',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      logout: 'Uitloggen',
      close: 'Sluiten',
      
      // Dashboard
      recentActivity: 'Recente Activiteit',
      quickActions: 'Snelle Acties',
      statistics: 'Statistieken',
      
      // Properties
      savedProperties: 'Opgeslagen Woningen',
      propertyAlerts: 'Woning Alerts',
      searchHistory: 'Zoekgeschiedenis',
      noSavedProperties: 'Geen opgeslagen woningen gevonden',
      noSavedSearches: 'Geen opgeslagen zoekopdrachten gevonden',
      viewProperty: 'Bekijk Woning',
      removeProperty: 'Verwijderen',
      
      // Settings
      notifications: 'Notificaties',
      privacy: 'Privacy',
      preferences: 'Voorkeuren',
      dataExport: 'Data Export',
      help: 'Help & Support',
      
      // Actions
      searchProperties: 'Zoek Woningen',
      createAlert: 'Maak Alert',
      updateProfile: 'Update Profiel',
      changePassword: 'Wijzig Wachtwoord',
    },
    en: {
      // Main sections
      dashboard: 'Dashboard',
      properties: 'Properties',
      account: 'Account',
      
      // Sub sections
      overview: 'Overview',
      saved: 'Saved',
      alerts: 'Alerts',
      searches: 'Searches',
      profile: 'Profile',
      settings: 'Settings',
      security: 'Security',
      
      // Common
      welcome: 'Welcome',
      email: 'Email',
      phone: 'Phone',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      firstName: 'First Name',
      lastName: 'Last Name',
      logout: 'Logout',
      close: 'Close',
      
      // Dashboard
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      statistics: 'Statistics',
      
      // Properties
      savedProperties: 'Saved Properties',
      propertyAlerts: 'Property Alerts',
      searchHistory: 'Search History',
      noSavedProperties: 'No saved properties found',
      noSavedSearches: 'No saved searches found',
      viewProperty: 'View Property',
      removeProperty: 'Remove',
      
      // Settings
      notifications: 'Notifications',
      privacy: 'Privacy',
      preferences: 'Preferences',
      dataExport: 'Data Export',
      help: 'Help & Support',
      
      // Actions
      searchProperties: 'Search Properties',
      createAlert: 'Create Alert',
      updateProfile: 'Update Profile',
      changePassword: 'Change Password',
    }
  };

  const t = translations[language];

  // Navigation structure
  const navigationStructure = {
    dashboard: {
      icon: <Home className="w-5 h-5" />,
      label: t.dashboard,
      subsections: [
        { key: 'overview', icon: <TrendingUp className="w-4 h-4" />, label: t.overview }
      ]
    },
    properties: {
      icon: <Building className="w-5 h-5" />,
      label: t.properties,
      subsections: [
        { key: 'saved', icon: <Heart className="w-4 h-4" />, label: t.saved },
        { key: 'alerts', icon: <Bell className="w-4 h-4" />, label: t.alerts },
        { key: 'searches', icon: <Search className="w-4 h-4" />, label: t.searches }
      ]
    },
    account: {
      icon: <User className="w-5 h-5" />,
      label: t.account,
      subsections: [
        { key: 'profile', icon: <User className="w-4 h-4" />, label: t.profile },
        { key: 'settings', icon: <Settings className="w-4 h-4" />, label: t.settings },
        { key: 'security', icon: <Shield className="w-4 h-4" />, label: t.security }
      ]
    }
  };

  // Load data based on active section
  useEffect(() => {
    if (activeMainSection === 'properties') {
      if (activeSubSection === 'saved') {
        loadSavedProperties();
      } else if (activeSubSection === 'alerts' || activeSubSection === 'searches') {
        loadSavedSearches();
      }
    }
  }, [activeMainSection, activeSubSection]);

  // Set default subsection when main section changes
  useEffect(() => {
    const defaultSubsection = navigationStructure[activeMainSection].subsections[0].key as SubSection;
    setActiveSubSection(defaultSubsection);
  }, [activeMainSection]);

  const loadSavedProperties = async () => {
    setIsLoadingProperties(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/saved-properties', {
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

  const loadSavedSearches = async () => {
    setIsLoadingSearches(true);
    try {
      // Placeholder for saved searches API
      setSavedSearches([]);
    } catch (err) {
      console.error('Error fetching saved searches:', err);
    } finally {
      setIsLoadingSearches(false);
    }
  };

  const handleProfileSave = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser.user);
        setIsEditingProfile(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const renderMainNavigation = () => (
    <div className="space-y-1">
      {Object.entries(navigationStructure).map(([key, section]) => (
        <button
          key={key}
          onClick={() => setActiveMainSection(key as MainSection)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
            activeMainSection === key
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <div className="flex items-center">
            <span className={`mr-3 ${activeMainSection === key ? 'text-white' : 'text-gray-500 group-hover:text-orange-500'}`}>
              {section.icon}
            </span>
            <span className="font-medium">{section.label}</span>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
            activeMainSection === key ? 'rotate-90 text-white' : 'text-gray-400 group-hover:text-orange-500'
          }`} />
        </button>
      ))}
    </div>
  );

  const renderSubNavigation = () => {
    const currentSection = navigationStructure[activeMainSection];
    if (!currentSection || currentSection.subsections.length <= 1) return null;

    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 mb-3">
          {currentSection.label}
        </div>
        <div className="space-y-1">
          {currentSection.subsections.map((subsection) => (
            <button
              key={subsection.key}
              onClick={() => setActiveSubSection(subsection.key as SubSection)}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left transition-all duration-200 text-sm ${
                activeSubSection === subsection.key
                  ? 'bg-orange-100 text-orange-700 border-l-4 border-orange-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`mr-3 ${
                activeSubSection === subsection.key ? 'text-orange-600' : 'text-gray-400'
              }`}>
                {subsection.icon}
              </span>
              {subsection.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {t.welcome}, {user?.firstName || user?.username}! 👋
        </h2>
        <p className="text-orange-100">
          {language === 'nl' 
            ? 'Hier is uw persoonlijke dashboard met al uw activiteiten.'
            : 'Here is your personal dashboard with all your activities.'
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t.savedProperties}</p>
              <p className="text-2xl font-bold text-gray-900">{savedProperties.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t.alerts}</p>
              <p className="text-2xl font-bold text-gray-900">{savedSearches.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <Search className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">{t.searches}</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 text-left">
            <Search className="w-5 h-5 text-orange-500 mr-3" />
            <span className="font-medium text-gray-700">{t.searchProperties}</span>
          </button>
          
          <button className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-left">
            <Bell className="w-5 h-5 text-blue-500 mr-3" />
            <span className="font-medium text-gray-700">{t.createAlert}</span>
          </button>
          
          <button 
            onClick={() => {
              setActiveMainSection('account');
              setActiveSubSection('profile');
            }}
            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all duration-200 text-left"
          >
            <User className="w-5 h-5 text-green-500 mr-3" />
            <span className="font-medium text-gray-700">{t.updateProfile}</span>
          </button>
          
          <button className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 text-left">
            <Shield className="w-5 h-5 text-purple-500 mr-3" />
            <span className="font-medium text-gray-700">{t.changePassword}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSavedProperties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{t.savedProperties}</h2>
        <span className="text-sm text-gray-500">{savedProperties.length} {language === 'nl' ? 'woningen' : 'properties'}</span>
      </div>

      {isLoadingProperties ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : savedProperties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{t.noSavedProperties}</p>
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
            {t.searchProperties}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                <p className="text-lg font-bold text-orange-600 mb-3">{property.price}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{property.bedrooms} bed • {property.bathrooms} bath • {property.area}m²</span>
                  <button className="text-red-500 hover:text-red-700 transition-colors duration-200">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{t.profile}</h2>
        {!isEditingProfile && (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200"
          >
            <Edit className="w-4 h-4 mr-1" />
            {t.edit}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {isEditingProfile ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.firstName}
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.lastName}
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.phone}
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleProfileSave}
                className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </button>
              <button
                onClick={() => {
                  setIsEditingProfile(false);
                  setProfileData({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    phone: user?.phone || '',
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  {t.firstName}
                </label>
                <p className="text-lg text-gray-900">{user?.firstName || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  {t.lastName}
                </label>
                <p className="text-lg text-gray-900">{user?.lastName || '-'}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t.email}
              </label>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {t.phone}
              </label>
              <p className="text-lg text-gray-900">{user?.phone || '-'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeMainSection === 'dashboard' && activeSubSection === 'overview') {
      return renderDashboardOverview();
    }
    
    if (activeMainSection === 'properties') {
      if (activeSubSection === 'saved') {
        return renderSavedProperties();
      }
      if (activeSubSection === 'alerts') {
        return (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.noSavedSearches}</p>
          </div>
        );
      }
      if (activeSubSection === 'searches') {
        return (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{language === 'nl' ? 'Zoekgeschiedenis komt binnenkort' : 'Search history coming soon'}</p>
          </div>
        );
      }
    }
    
    if (activeMainSection === 'account') {
      if (activeSubSection === 'profile') {
        return renderProfile();
      }
      if (activeSubSection === 'settings') {
        return (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{language === 'nl' ? 'Instellingen komen binnenkort' : 'Settings coming soon'}</p>
          </div>
        );
      }
      if (activeSubSection === 'security') {
        return (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{language === 'nl' ? 'Beveiligingsinstellingen komen binnenkort' : 'Security settings coming soon'}</p>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">{t.dashboard}</h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 overflow-y-auto">
            {renderMainNavigation()}
            {renderSubNavigation()}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              {t.logout}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{navigationStructure[activeMainSection].label}</span>
              {navigationStructure[activeMainSection].subsections.length > 1 && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-900 font-medium">
                    {navigationStructure[activeMainSection].subsections.find(s => s.key === activeSubSection)?.label}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

