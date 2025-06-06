'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, Send, User, Home } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    propertyType: '',
    budget: '',
    message: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Prepare data for API
      const apiData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.subject,
        propertyType: formData.propertyType,
        budgetRange: formData.budget,
        preferredContact: formData.preferredContact,
        message: formData.message
      };

      // Send to backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          propertyType: '',
          budget: '',
          message: '',
          preferredContact: 'email'
        });
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-red-900 mb-2">Er is een fout opgetreden</h3>
        <p className="text-red-700 mb-4">
          Het verzenden van uw bericht is mislukt. Probeer het opnieuw of neem direct contact met ons op.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => setSubmitStatus('')}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            Opnieuw Proberen
          </Button>
          <Button 
            onClick={() => window.location.href = 'tel:+31681348551'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Phone className="mr-2 h-4 w-4" />
            Direct Bellen
          </Button>
        </div>
      </div>
    );
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">Bericht Succesvol Verzonden!</h3>
        <p className="text-green-700 mb-4">
          Bedankt voor uw bericht aan Glodinas Makelaardij. Wij nemen binnen 24 uur contact met u op.
        </p>
        <Button 
          onClick={() => setSubmitStatus('')}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          Nog een Bericht Sturen
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="+31 6 1234 5678"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Select a subject</option>
            <option value="buying">I want to buy a property</option>
            <option value="selling">I want to sell my property</option>
            <option value="valuation">Property valuation</option>
            <option value="investment">Investment advice</option>
            <option value="consultation">General consultation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-200k">Under €200,000</option>
            <option value="200k-400k">€200,000 - €400,000</option>
            <option value="400k-600k">€400,000 - €600,000</option>
            <option value="600k-800k">€600,000 - €800,000</option>
            <option value="800k-1m">€800,000 - €1,000,000</option>
            <option value="over-1m">Over €1,000,000</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={handleChange}
              className="mr-2 text-green-600 focus:ring-green-500"
            />
            Email
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={handleChange}
              className="mr-2 text-green-600 focus:ring-green-500"
            />
            Phone
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="both"
              checked={formData.preferredContact === 'both'}
              onChange={handleChange}
              className="mr-2 text-green-600 focus:ring-green-500"
            />
            Both
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-vertical"
            placeholder="Please describe your requirements, questions, or how we can help you..."
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 flex-1"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
          onClick={() => window.location.href = '/schedule'}
        >
          Schedule Meeting Instead
        </Button>
      </div>

      <p className="text-sm text-gray-500">
        * Required fields. We&apos;ll respond within 24 hours during business days.
      </p>
    </form>
  );
};

export default ContactForm;

