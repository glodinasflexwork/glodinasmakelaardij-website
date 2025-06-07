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
  
  // API URL - Updated for production using environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://api.glodinasmakelaardij.nl' 
      : 'http://localhost:5000');
  
  // Translations
  const translations = {
    nl: {

