'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

const ScheduleForm = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    meetingType: '',
    message: '',
    location: 'office'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates.slice(0, 20); // Limit to 20 available dates
  };

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const meetingTypes = [
    { value: 'consultation', label: 'General Consultation (30 min)' },
    { value: 'valuation', label: 'Property Valuation (45 min)' },
    { value: 'buying', label: 'Buying Consultation (60 min)' },
    { value: 'selling', label: 'Selling Consultation (60 min)' },
    { value: 'investment', label: 'Investment Advice (45 min)' },
    { value: 'viewing', label: 'Property Viewing (30 min)' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.meetingType) return;
    
    setIsSubmitting(true);
    
    const scheduleData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      meetingType: formData.meetingType,
      date: selectedDate,
      time: selectedTime,
      location: formData.location,
      message: formData.message
    };

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          meetingType: '',
          location: 'office',
          message: ''
        });
        setSelectedDate('');
        setSelectedTime('');
      } else {
        const errorData = await response.json();
        console.error('Form submission error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-900 mb-2">Meeting Scheduled Successfully!</h3>
        <p className="text-green-700 mb-4">
          Your meeting has been scheduled for {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} at {selectedTime}.
        </p>
        <p className="text-green-700 mb-6">
          You&apos;ll receive a confirmation email shortly with meeting details and our office location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => {
              setSubmitStatus('');
              setSelectedDate('');
              setSelectedTime('');
              setFormData({
                name: '',
                email: '',
                phone: '',
                meetingType: '',
                message: '',
                location: 'office'
              });
            }}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Schedule Another Meeting
          </Button>
          <Button 
            onClick={() => window.location.href = '/contact'}
            className="bg-green-600 hover:bg-green-700"
          >
            Contact Us
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Meeting Type Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Meeting Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetingTypes.map((type) => (
            <label key={type.value} className="relative">
              <input
                type="radio"
                name="meetingType"
                value={type.value}
                checked={formData.meetingType === type.value}
                onChange={handleChange}
                className="sr-only"
                required
              />
              <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.meetingType === type.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}>
                <div className="font-medium text-gray-900">{type.label}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
          {generateAvailableDates().map((date) => (
            <label key={date.value} className="relative">
              <input
                type="radio"
                name="date"
                value={date.value}
                checked={selectedDate === date.value}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="sr-only"
                required
              />
              <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                selectedDate === date.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}>
                <div className="text-sm font-medium text-gray-900">
                  {date.label.split(',')[0]}
                </div>
                <div className="text-xs text-gray-600">
                  {date.label.split(',').slice(1).join(',')}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {availableTimes.map((time) => (
              <label key={time} className="relative">
                <input
                  type="radio"
                  name="time"
                  value={time}
                  checked={selectedTime === time}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="sr-only"
                  required
                />
                <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                  selectedTime === time
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}>
                  <Clock className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                  <div className="text-sm font-medium text-gray-900">{time}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      {selectedDate && selectedTime && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
          
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
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="+31 6 1234 5678"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="office">Our Office (Den Haag)</option>
                <option value="property">At Property Location</option>
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-vertical"
                placeholder="Any specific topics you'd like to discuss or questions you have..."
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
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5 mr-2" />
                  Confirm Meeting
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us Instead
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ScheduleForm;

