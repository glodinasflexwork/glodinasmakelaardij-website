'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, Save, X, Home, MapPin, Euro, Bed, Bath, Square, Zap, Star, Calendar, Car, TreePine, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  originalPrice?: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  energyLabel: string;
  features: string[];
  mainImage?: string;
  images: string[];
  rating: number;
  status: 'available' | 'under_offer' | 'sold' | 'new';
  description: string;
  neighborhood?: string;
  yearBuilt?: number;
  plotSize?: number;
  heating?: string;
  parking?: string;
  garden?: string;
}

export default function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: '',
    originalPrice: '',
    size: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    energyLabel: 'A',
    features: [],
    mainImage: '',
    images: [],
    rating: 5,
    status: 'available',
    description: '',
    neighborhood: '',
    yearBuilt: new Date().getFullYear(),
    plotSize: 0,
    heating: '',
    parking: '',
    garden: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [priceAmount, setPriceAmount] = useState('');
  const [priceType, setPriceType] = useState('k.k.');
  const [originalPriceAmount, setOriginalPriceAmount] = useState('');
  const [originalPriceType, setOriginalPriceType] = useState('k.k.');
  const [sizeNumber, setSizeNumber] = useState(0);
  const [originalPriceTypeManuallySet, setOriginalPriceTypeManuallySet] = useState(false);

  // Industry standard price types
  const priceTypes = [
    { value: 'k.k.', label: 'k.k. (kosten koper)' },
    { value: 'v.o.n.', label: 'v.o.n. (vrij op naam)' },
    { value: 'v.b.', label: 'v.b. (verkoop bij)' },
    { value: 'bieden vanaf', label: 'Bieden vanaf' },
    { value: 'in overleg', label: 'Prijs in overleg' }
  ];

  // Den Haag neighborhoods
  const neighborhoods = [
    'Centrum',
    'Benoordenhout', 
    'Scheveningen',
    'Voorburg',
    'Leidschenveen-Ypenburg',
    'Haagse Hout',
    'Bezuidenhout',
    'Statenkwartier',
    'Archipelbuurt',
    'Groente- en Fruitmarkt',
    'Zeeheldenkwartier',
    'Duinoord',
    'Marlot',
    'Bouwlust',
    'Vruchtenbuurt',
    'Laakkwartier',
    'Schilderswijk',
    'Transvaal',
    'Moerwijk',
    'Morgenstond',
    'Ypenburg',
    'Wateringse Veld',
    'Escamp',
    'Segbroek'
  ];

  // Heating options - organized by type and frequency
  const heatingOptions = [
    // Most common residential
    'Centrale verwarming',
    'Stadsverwarming',
    'Vloerverwarming',
    'Radiatoren',
    
    // Heat pumps (growing popularity)
    'Warmtepomp',
    'Hybride warmtepomp',
    'Airconditioning met warmtepomp',
    
    // Gas/Electric
    'Gaskachels',
    'Elektrische verwarming',
    'Convectoren',
    'Infraroodverwarming',
    
    // Sustainable/Alternative
    'Zonneboiler',
    'Geothermie',
    'Warmte-terugwinning',
    
    // Solid fuel
    'Houtkachel',
    'Pelletkachel',
    
    // Industrial/Commercial
    'Industriële ketel',
    'Stoomverwarming',
    'Olieketel',
    'Biomassaketel',
    
    // None
    'Geen verwarming'
  ];

  // Parking options - organized by type and frequency
  const parkingOptions = [
    // Most common private parking
    'Eigen parkeerplaats',
    'Garage',
    'Carport',
    'Parkeerplaats op eigen terrein',
    
    // Underground/Covered
    'Ondergrondse garage',
    'Parkeerkelder',
    'Gemeenschappelijke parkeerplaats',
    
    // Location-based
    'Parkeerplaats achter',
    'Parkeerplaats voor',
    'Parkeerplaats naast',
    'Parkeergarage nabij',
    
    // Street parking
    'Straatparkeren',
    'Parkeervergunning',
    'Betaald parkeren',
    'Gratis parkeren',
    
    // Electric/Multiple vehicles
    'Laadpaal aanwezig',
    'Elektrisch laden mogelijk',
    'Parkeerplaats voor meerdere auto\'s',
    
    // Commercial/Industrial
    'Parkeerplaats voor vrachtwagen',
    'Parkeerplaats voor bedrijfsvoertuigen',
    
    // None
    'Geen parkeermogelijkheid'
  ];

  // Garden options
  const gardenOptions = [
    'Achtertuin',
    'Voortuin', 
    'Zijtuin',
    'Daktuin',
    'Balkon',
    'Terras',
    'Patio',
    'Geen tuin'
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  // Initialize price fields when editing
  useEffect(() => {
    if (editingProperty && editingProperty.price) {
      const priceMatch = editingProperty.price.match(/€([\d.]+)\s*(.+)/);
      if (priceMatch) {
        setPriceAmount(priceMatch[1]);
        setPriceType(priceMatch[2].trim());
      }
    }
    if (editingProperty && editingProperty.originalPrice) {
      const originalPriceMatch = editingProperty.originalPrice.match(/€([\d.]+)\s*(.+)/);
      if (originalPriceMatch) {
        setOriginalPriceAmount(originalPriceMatch[1]);
        setOriginalPriceType(originalPriceMatch[2].trim());
      }
    }
    if (editingProperty && editingProperty.size) {
      const sizeMatch = editingProperty.size.match(/(\d+)/);
      if (sizeMatch) {
        setSizeNumber(parseInt(sizeMatch[1]));
      }
    }
  }, [editingProperty]);

  // Update formData when price/size values change
  useEffect(() => {
    if (priceAmount) {
      const formattedPrice = `€${priceAmount} ${priceType}`;
      setFormData(prev => ({ ...prev, price: formattedPrice }));
    }
  }, [priceAmount, priceType]);

  useEffect(() => {
    if (originalPriceAmount) {
      const formattedOriginalPrice = `€${originalPriceAmount} ${originalPriceType}`;
      setFormData(prev => ({ ...prev, originalPrice: formattedOriginalPrice }));
    }
  }, [originalPriceAmount, originalPriceType]);

  // Update original price type when main price type changes (unless manually set)
  useEffect(() => {
    if (!originalPriceTypeManuallySet) {
      setOriginalPriceType(priceType);
    }
  }, [priceType, originalPriceTypeManuallySet]);

  useEffect(() => {
    if (sizeNumber > 0) {
      const formattedSize = `${sizeNumber}m²`;
      setFormData(prev => ({ ...prev, size: formattedSize }));
    }
  }, [sizeNumber]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title?.trim()) newErrors.title = 'Property title is required';
      if (!formData.location?.trim()) newErrors.location = 'Location is required';
      if (!formData.price?.trim()) newErrors.price = 'Price is required';
      if (!formData.size?.trim()) newErrors.size = 'Size is required';
    }

    if (step === 2) {
      if (!formData.bedrooms || formData.bedrooms < 0) newErrors.bedrooms = 'Valid number of bedrooms required';
      if (!formData.bathrooms || formData.bathrooms < 0) newErrors.bathrooms = 'Valid number of bathrooms required';
      if (!formData.area || formData.area < 0) newErrors.area = 'Valid area required';
    }

    if (step === 3) {
      if (!formData.description?.trim()) newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof Property, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = formData.features || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    handleInputChange('features', newFeatures);
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all steps
    let isValid = true;
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        isValid = false;
        setCurrentStep(step);
        break;
      }
    }

    if (!isValid) return;

    try {
      const url = editingProperty 
        ? `/api/properties/${editingProperty.id}`
        : '/api/properties';
      
      const method = editingProperty ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: editingProperty?.id || generateId(formData.title || '')
        }),
      });

      if (response.ok) {
        await fetchProperties();
        resetForm();
        setCurrentStep(1);
      } else {
        const errorData = await response.json();
        alert(`Error saving property: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProperties();
      } else {
        alert('Error deleting property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      price: '',
      originalPrice: '',
      size: '',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      energyLabel: 'A',
      features: [],
      mainImage: '',
      images: [],
      rating: 5,
      status: 'available',
      description: '',
      neighborhood: '',
      yearBuilt: new Date().getFullYear(),
      plotSize: 0,
      heating: '',
      parking: '',
      garden: ''
    });
    setPriceAmount('');
    setPriceType('k.k.');
    setOriginalPriceAmount('');
    setOriginalPriceType('k.k.');
    setSizeNumber(0);
    setOriginalPriceTypeManuallySet(false);
    setEditingProperty(null);
    setShowAddForm(false);
    setCurrentStep(1);
    setErrors({});
    setIsDirty(false);
  };

  const startEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData(property);
    setShowAddForm(true);
    setCurrentStep(1);
    setIsDirty(false);
  };

  const generateId = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const commonFeatures = [
    'Tuin', 'Balkon', 'Terras', 'Garage', 'Parkeerplaats', 'Lift', 
    'Airconditioning', 'Vloerverwarming', 'Open Keuken', 'Moderne Keuken',
    'Inbouwkeuken', 'Serre', 'Zolder', 'Kelder', 'Zwembad', 'Sauna',
    'Jacuzzi', 'Alarm', 'Videofoon', 'Dubbel Glas', 'HR++ Glas',
    'Zonnepanelen', 'Energiezuinig', 'Monumentaal', 'Nieuwbouw'
  ];

  const steps = [
    { number: 1, title: 'Basic Info', icon: Home },
    { number: 2, title: 'Details', icon: Square },
    { number: 3, title: 'Description', icon: Edit },
    { number: 4, title: 'Review', icon: Eye }
  ];

  const formatPrice = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    
    // Format with dots as thousands separators
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePriceAmountChange = (value: string) => {
    const formatted = formatPrice(value);
    setPriceAmount(formatted);
    setIsDirty(true);
  };

  const handleOriginalPriceAmountChange = (value: string) => {
    const formatted = formatPrice(value);
    setOriginalPriceAmount(formatted);
    setIsDirty(true);
  };

  const handleSizeChange = (value: number) => {
    setSizeNumber(value);
    setIsDirty(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
            <p className="text-gray-600 mt-2">Manage your property listings efficiently</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Property
          </Button>
        </div>

        {/* Property List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              Properties ({properties.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-white">
                              {property.bedrooms}BR
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {property.title}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-3">
                            <span>{property.size}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Bed className="w-3 h-3 mr-1" />
                              {property.bedrooms}
                            </span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Bath className="w-3 h-3 mr-1" />
                              {property.bathrooms}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {property.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.price}</div>
                      {property.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">{property.originalPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        property.status === 'available' ? 'bg-green-100 text-green-800' :
                        property.status === 'under_offer' ? 'bg-yellow-100 text-yellow-800' :
                        property.status === 'sold' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {property.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/properties/${property.id}`, '_blank')}
                          className="hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(property)}
                          className="hover:bg-orange-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(property.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Add/Edit Property Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {editingProperty ? 'Edit Property' : 'Add New Property'}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {editingProperty ? 'Update property information' : 'Fill in the details to create a new property listing'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Progress Steps */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                      const StepIcon = step.icon;
                      const isActive = currentStep === step.number;
                      const isCompleted = currentStep > step.number;
                      
                      return (
                        <div key={step.number} className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                            isCompleted ? 'bg-green-500 border-green-500 text-white' :
                            isActive ? 'bg-orange-500 border-orange-500 text-white' :
                            'bg-white border-gray-300 text-gray-400'
                          }`}>
                            <StepIcon className="w-5 h-5" />
                          </div>
                          <div className="ml-3">
                            <div className={`text-sm font-medium ${
                              isActive ? 'text-orange-600' : 
                              isCompleted ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              {step.title}
                            </div>
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`w-16 h-0.5 mx-4 ${
                              isCompleted ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
                <form onSubmit={handleSubmit} className="p-6">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Home className="w-4 h-4 inline mr-2" />
                            Property Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Jacob Schorerlaan 201"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900 ${
                              errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Location *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="e.g., Den Haag, Centrum"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900 ${
                              errors.location ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Neighborhood
                          </label>
                          <select
                            value={formData.neighborhood || ''}
                            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            <option value="">Select neighborhood</option>
                            {neighborhoods.map((neighborhood) => (
                              <option key={neighborhood} value={neighborhood}>
                                {neighborhood}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Euro className="w-4 h-4 inline mr-2" />
                            Price *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                required
                                value={priceAmount}
                                onChange={(e) => handlePriceAmountChange(e.target.value)}
                                placeholder="465.000"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900 ${
                                  errors.price ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              <p className="text-xs text-gray-500 mt-1">Amount (without €)</p>
                            </div>
                            <div>
                              <select
                                value={priceType}
                                onChange={(e) => setPriceType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                              >
                                {priceTypes.map((type) => (
                                  <option key={type.value} value={type.value}>
                                    {type.label}
                                  </option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 mt-1">Price type</p>
                            </div>
                          </div>
                          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                          {priceAmount && (
                            <p className="text-sm text-green-600 mt-2 font-medium">
                              Preview: €{priceAmount} {priceType}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Original Price
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                value={originalPriceAmount}
                                onChange={(e) => handleOriginalPriceAmountChange(e.target.value)}
                                placeholder="475.000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                              />
                              <p className="text-xs text-gray-500 mt-1">Amount (without €)</p>
                            </div>
                            <div>
                              <select
                                value={originalPriceType}
                                onChange={(e) => {
                                  setOriginalPriceType(e.target.value);
                                  setOriginalPriceTypeManuallySet(true);
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                              >
                                {priceTypes.map((type) => (
                                  <option key={type.value} value={type.value}>
                                    {type.label}
                                  </option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 mt-1">Price type</p>
                            </div>
                          </div>
                          {originalPriceAmount && (
                            <p className="text-sm text-green-600 mt-2 font-medium">
                              Preview: €{originalPriceAmount} {originalPriceType}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Square className="w-4 h-4 inline mr-2" />
                            Size *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={sizeNumber || ''}
                            onChange={(e) => handleSizeChange(parseInt(e.target.value) || 0)}
                            placeholder="107"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900 ${
                              errors.size ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <p className="text-xs text-gray-500 mt-1">Size in m² (number only)</p>
                          {sizeNumber > 0 && (
                            <p className="text-sm text-green-600 mt-1 font-medium">
                              Preview: {sizeNumber}m²
                            </p>
                          )}
                          {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Status
                          </label>
                          <select
                            value={formData.status || 'available'}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            <option value="available">Available</option>
                            <option value="under_offer">Under Offer</option>
                            <option value="sold">Sold</option>
                            <option value="new">New</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Zap className="w-4 h-4 inline mr-2" />
                            Energy Label
                          </label>
                          <select
                            value={formData.energyLabel || 'A'}
                            onChange={(e) => handleInputChange('energyLabel', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(label => (
                              <option key={label} value={label}>{label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Property Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Bed className="w-4 h-4 inline mr-2" />
                            Bedrooms *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.bedrooms || ''}
                            onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                              errors.bedrooms ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Bath className="w-4 h-4 inline mr-2" />
                            Bathrooms *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.bathrooms || ''}
                            onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 0)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900 ${
                              errors.bathrooms ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Square className="w-4 h-4 inline mr-2" />
                            Area (m²) *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.area || ''}
                            onChange={(e) => handleInputChange('area', parseInt(e.target.value) || 0)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900 ${
                              errors.area ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Year Built
                          </label>
                          <input
                            type="number"
                            min="1800"
                            max={new Date().getFullYear()}
                            value={formData.yearBuilt || ''}
                            onChange={(e) => handleInputChange('yearBuilt', parseInt(e.target.value) || new Date().getFullYear())}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <TreePine className="w-4 h-4 inline mr-2" />
                            Plot Size (m²)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={formData.plotSize || ''}
                            onChange={(e) => handleInputChange('plotSize', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Star className="w-4 h-4 inline mr-2" />
                            Rating
                          </label>
                          <select
                            value={formData.rating || 5}
                            onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            {[1, 2, 3, 4, 5].map(rating => (
                              <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Thermometer className="w-4 h-4 inline mr-2" />
                            Heating
                          </label>
                          <select
                            value={formData.heating || ''}
                            onChange={(e) => handleInputChange('heating', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            <option value="">Select heating type</option>
                            {heatingOptions.map((heating) => (
                              <option key={heating} value={heating}>
                                {heating}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Car className="w-4 h-4 inline mr-2" />
                            Parking
                          </label>
                          <select
                            value={formData.parking || ''}
                            onChange={(e) => handleInputChange('parking', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            <option value="">Select parking type</option>
                            {parkingOptions.map((parking) => (
                              <option key={parking} value={parking}>
                                {parking}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <TreePine className="w-4 h-4 inline mr-2" />
                            Garden
                          </label>
                          <select
                            value={formData.garden || ''}
                            onChange={(e) => handleInputChange('garden', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          >
                            <option value="">Select garden type</option>
                            {gardenOptions.map((garden) => (
                              <option key={garden} value={garden}>
                                {garden}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Features Section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-4">
                          Property Features
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {commonFeatures.map((feature) => (
                            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.features?.includes(feature) || false}
                                onChange={() => handleFeatureToggle(feature)}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <span className="text-sm text-gray-900">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Description */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          <Edit className="w-4 h-4 inline mr-2" />
                          Property Description *
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe the property in detail. Include unique features, location benefits, and what makes this property special..."
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none text-gray-900 ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        <p className="text-sm text-gray-500 mt-2">
                          {formData.description?.length || 0} characters
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Main Image URL
                          </label>
                          <input
                            type="url"
                            value={formData.mainImage || ''}
                            onChange={(e) => handleInputChange('mainImage', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Additional Images
                          </label>
                          <textarea
                            rows={3}
                            value={formData.images?.join('\n') || ''}
                            onChange={(e) => handleInputChange('images', e.target.value.split('\n').filter(url => url.trim()))}
                            placeholder="Enter image URLs, one per line"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Property Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                            <div className="space-y-2 text-sm text-gray-900">
                              <p><span className="font-medium">Title:</span> {formData.title}</p>
                              <p><span className="font-medium">Location:</span> {formData.location}</p>
                              <p><span className="font-medium">Price:</span> {formData.price}</p>
                              <p><span className="font-medium">Size:</span> {formData.size}</p>
                              <p><span className="font-medium">Status:</span> {formData.status}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                            <div className="space-y-2 text-sm text-gray-900">
                              <p><span className="font-medium">Bedrooms:</span> {formData.bedrooms}</p>
                              <p><span className="font-medium">Bathrooms:</span> {formData.bathrooms}</p>
                              <p><span className="font-medium">Area:</span> {formData.area}m²</p>
                              <p><span className="font-medium">Energy Label:</span> {formData.energyLabel}</p>
                              <p><span className="font-medium">Year Built:</span> {formData.yearBuilt}</p>
                            </div>
                          </div>
                        </div>

                        {formData.features && formData.features.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                            <div className="flex flex-wrap gap-2">
                              {formData.features.map((feature) => (
                                <span key={feature} className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {formData.description && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                            <p className="text-sm text-gray-900">{formData.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex space-x-3">
                  {isDirty && (
                    <span className="text-sm text-orange-600 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Unsaved changes
                    </span>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingProperty ? 'Update Property' : 'Create Property'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

