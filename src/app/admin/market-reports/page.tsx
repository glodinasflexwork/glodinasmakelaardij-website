import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, Save, X, FileText, Calendar, MapPin, Tag, Download, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MarketReport {
  id: string;
  title: string;
  description?: string;
  quarter?: string;
  year: number;
  location: string;
  reportType: string;
  pdfUrl: string;
  coverImageUrl?: string;
  isLatest: boolean;
  isFeatured: boolean;
  downloadCount: number;
  fileSize?: string;
  tags: string[];
  summary?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function MarketReportManagement() {
  const [reports, setReports] = useState<MarketReport[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReport, setEditingReport] = useState<MarketReport | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MarketReport>>({
    title: '',
    description: '',
    quarter: '',
    year: new Date().getFullYear(),
    location: 'Den Haag',
    reportType: 'Marktrapport',
    pdfUrl: '',
    coverImageUrl: '',
    isLatest: false,
    isFeatured: false,
    fileSize: '',
    tags: [],
    summary: '',
    publishedAt: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);

  // Report types
  const reportTypes = [
    'Marktrapport',
    'Jaaroverzicht',
    'Wijkrapport',
    'Nieuwbouw Monitor',
    'Huurmarkt Rapport',
    'Marktanalyse',
    'Vastgoedtrends',
    'Investeringsrapport'
  ];

  // Locations
  const locations = [
    'Den Haag',
    'Amsterdam',
    'Rotterdam',
    'Utrecht',
    'Eindhoven',
    'Tilburg',
    'Groningen',
    'Almere',
    'Breda',
    'Nijmegen',
    'Nederland'
  ];

  // Quarters
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Common tags
  const commonTags = [
    'vastgoed',
    'marktanalyse',
    'den-haag',
    'koopprijzen',
    'huurprijzen',
    'nieuwbouw',
    'bestaande-bouw',
    'investeringen',
    'trends',
    'vooruitzichten',
    'woningmarkt',
    'commercieel',
    'residentieel'
  ];

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/market-reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = formData.tags || [];
    if (currentTags.includes(tag)) {
      handleInputChange('tags', currentTags.filter(t => t !== tag));
    } else {
      handleInputChange('tags', [...currentTags, tag]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.reportType?.trim()) {
      newErrors.reportType = 'Report type is required';
    }

    if (!formData.pdfUrl?.trim()) {
      newErrors.pdfUrl = 'PDF URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const url = editingReport 
        ? `/api/market-reports/${editingReport.id}`
        : '/api/market-reports';
      
      const method = editingReport ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchReports();
        resetForm();
        setShowAddForm(false);
        setEditingReport(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to save report:', errorData);
      }
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  const handleEdit = (report: MarketReport) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      description: report.description || '',
      quarter: report.quarter || '',
      year: report.year,
      location: report.location,
      reportType: report.reportType,
      pdfUrl: report.pdfUrl,
      coverImageUrl: report.coverImageUrl || '',
      isLatest: report.isLatest,
      isFeatured: report.isFeatured,
      fileSize: report.fileSize || '',
      tags: report.tags || [],
      summary: report.summary || '',
      publishedAt: report.publishedAt.split('T')[0]
    });
    setCurrentStep(1);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await fetch(`/api/market-reports/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchReports();
      } else {
        console.error('Failed to delete report');
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      quarter: '',
      year: new Date().getFullYear(),
      location: 'Den Haag',
      reportType: 'Marktrapport',
      pdfUrl: '',
      coverImageUrl: '',
      isLatest: false,
      isFeatured: false,
      fileSize: '',
      tags: [],
      summary: '',
      publishedAt: new Date().toISOString().split('T')[0]
    });
    setErrors({});
    setIsDirty(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Market Reports Management</h1>
            <p className="text-gray-600 mt-2">Manage market reports and publications</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowAddForm(true);
              setEditingReport(null);
            }}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Report
          </Button>
        </div>

        {/* Reports List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading reports...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type & Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-orange-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                            <div className="text-sm text-gray-500">{report.fileSize}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.reportType}</div>
                        <div className="text-sm text-gray-500">{report.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.quarter ? `${report.quarter} ` : ''}{report.year}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(report.publishedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          {report.isLatest && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Latest
                            </span>
                          )}
                          {report.isFeatured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Download className="h-4 w-4 text-gray-400 mr-1" />
                          {report.downloadCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(report.pdfUrl, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(report)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(report.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {editingReport ? 'Edit Market Report' : 'Add New Market Report'}
                    </h2>
                    <div className="flex items-center mt-2">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentStep >= step 
                              ? 'bg-orange-600 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {step}
                          </div>
                          {step < 3 && (
                            <div className={`w-12 h-1 ${
                              currentStep > step ? 'bg-orange-600' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingReport(null);
                      resetForm();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <FileText className="w-4 h-4 inline mr-2" />
                            Report Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Marktrapport Q2 2025 Den Haag"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                              errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Tag className="w-4 h-4 inline mr-2" />
                            Report Type *
                          </label>
                          <select
                            required
                            value={formData.reportType || ''}
                            onChange={(e) => handleInputChange('reportType', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                              errors.reportType ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            {reportTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          {errors.reportType && <p className="text-red-500 text-sm mt-1">{errors.reportType}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Location *
                          </label>
                          <select
                            required
                            value={formData.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                              errors.location ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            {locations.map((location) => (
                              <option key={location} value={location}>{location}</option>
                            ))}
                          </select>
                          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Year *
                          </label>
                          <input
                            type="number"
                            required
                            min="2020"
                            max="2030"
                            value={formData.year || ''}
                            onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                              errors.year ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Quarter (Optional)
                          </label>
                          <select
                            value={formData.quarter || ''}
                            onChange={(e) => handleInputChange('quarter', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                          >
                            <option value="">Select Quarter</option>
                            {quarters.map((quarter) => (
                              <option key={quarter} value={quarter}>{quarter}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Brief description of the report content..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Files & Media */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          <Upload className="w-4 h-4 inline mr-2" />
                          PDF URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.pdfUrl || ''}
                          onChange={(e) => handleInputChange('pdfUrl', e.target.value)}
                          placeholder="https://example.com/report.pdf"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                            errors.pdfUrl ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.pdfUrl && <p className="text-red-500 text-sm mt-1">{errors.pdfUrl}</p>}
                        <p className="text-sm text-gray-500 mt-2">
                          Upload your PDF to a file hosting service and paste the direct download URL here
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Cover Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={formData.coverImageUrl || ''}
                          onChange={(e) => handleInputChange('coverImageUrl', e.target.value)}
                          placeholder="https://example.com/cover-image.jpg"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            File Size (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.fileSize || ''}
                            onChange={(e) => handleInputChange('fileSize', e.target.value)}
                            placeholder="e.g., 2.5 MB"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Published Date
                          </label>
                          <input
                            type="date"
                            value={formData.publishedAt || ''}
                            onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Summary (Optional)
                        </label>
                        <textarea
                          rows={4}
                          value={formData.summary || ''}
                          onChange={(e) => handleInputChange('summary', e.target.value)}
                          placeholder="Brief summary for display on the reports page..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Settings & Tags */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isLatest"
                              checked={formData.isLatest || false}
                              onChange={(e) => handleInputChange('isLatest', e.target.checked)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label htmlFor="isLatest" className="ml-2 text-sm text-gray-900">
                              Mark as Latest Report
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isFeatured"
                              checked={formData.isFeatured || false}
                              onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-900">
                              Feature on Homepage
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                          Tags
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {commonTags.map((tag) => (
                            <label key={tag} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                              <input
                                type="checkbox"
                                checked={formData.tags?.includes(tag) || false}
                                onChange={() => handleTagToggle(tag)}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <span className="text-sm text-gray-900">{tag}</span>
                            </label>
                          ))}
                        </div>

                        {/* Selected Tags Summary */}
                        {formData.tags && formData.tags.length > 0 && (
                          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <h5 className="font-medium text-orange-900 mb-2">Selected Tags ({formData.tags.length})</h5>
                            <div className="flex flex-wrap gap-2">
                              {formData.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => handleTagToggle(tag)}
                                    className="ml-1 text-orange-600 hover:text-orange-800"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Review Section */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Report Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                            <div className="space-y-2 text-sm text-gray-900">
                              <p><span className="font-medium">Title:</span> {formData.title}</p>
                              <p><span className="font-medium">Type:</span> {formData.reportType}</p>
                              <p><span className="font-medium">Location:</span> {formData.location}</p>
                              <p><span className="font-medium">Period:</span> {formData.quarter ? `${formData.quarter} ` : ''}{formData.year}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Settings</h4>
                            <div className="space-y-2 text-sm text-gray-900">
                              <p><span className="font-medium">Latest:</span> {formData.isLatest ? 'Yes' : 'No'}</p>
                              <p><span className="font-medium">Featured:</span> {formData.isFeatured ? 'Yes' : 'No'}</p>
                              <p><span className="font-medium">File Size:</span> {formData.fileSize || 'Not specified'}</p>
                              <p><span className="font-medium">Tags:</span> {formData.tags?.length || 0} selected</p>
                            </div>
                          </div>
                        </div>
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
                  
                  {currentStep < 3 ? (
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
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {editingReport ? 'Update Report' : 'Create Report'}
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

