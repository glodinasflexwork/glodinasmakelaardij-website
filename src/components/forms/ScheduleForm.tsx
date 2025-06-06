'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, User, MessageSquare } from 'lucide-react';

export default function ScheduleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    propertyType: '',
    budget: '',
    preferredDate: '',
    preferredTime: '',
    alternativeDate: '',
    alternativeTime: '',
    message: '',
    meetingType: 'office' // office, property, video
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Generate time slots (9 AM to 6 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break; // Stop at 5:30 PM
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('nl-NL', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email content with scheduling details
    const emailContent = `
AFSPRAAK AANVRAAG - ${formData.subject || 'Vastgoed Consult'}

CONTACTGEGEVENS:
Naam: ${formData.name}
Email: ${formData.email}
Telefoon: ${formData.phone}

GEWENSTE AFSPRAAK:
Datum: ${formData.preferredDate}
Tijd: ${formData.preferredTime}
Type: ${formData.meetingType === 'office' ? 'Kantoor bezoek' : formData.meetingType === 'property' ? 'Bezichtiging ter plaatse' : 'Video call'}

ALTERNATIEF (indien gewenste tijd niet beschikbaar):
Datum: ${formData.alternativeDate || 'Niet opgegeven'}
Tijd: ${formData.alternativeTime || 'Niet opgegeven'}

VASTGOED DETAILS:
Type woning: ${formData.propertyType || 'Niet opgegeven'}
Budget: ${formData.budget || 'Niet opgegeven'}

BERICHT:
${formData.message}

---
Deze afspraak is aangevraagd via de website. Neem contact op om te bevestigen.
    `.trim();

    const mailtoLink = `mailto:cihatkaya@glodinas.nl?subject=${encodeURIComponent(`Afspraak Aanvraag - ${formData.preferredDate} ${formData.preferredTime}`)}&body=${encodeURIComponent(emailContent)}`;
    
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setSubmitStatus('Uw email programma wordt geopend met de afspraak details. Als dit niet werkt, email ons direct op cihatkaya@glodinas.nl');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitStatus) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Afspraak Aangevraagd!</h3>
        <p className="text-green-700 mb-4">{submitStatus}</p>
        <Button 
          onClick={() => setSubmitStatus('')}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          Nieuwe Afspraak Maken
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Uw Gegevens
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Volledige Naam *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Uw volledige naam"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Adres *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="uw.email@voorbeeld.nl"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefoonnummer *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+31 6 1234 5678"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Onderwerp *
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecteer onderwerp</option>
              <option value="Woning kopen">Woning kopen</option>
              <option value="Woning verkopen">Woning verkopen</option>
              <option value="Woningtaxatie">Woningtaxatie</option>
              <option value="Beleggingsadvies">Beleggingsadvies</option>
              <option value="Algemeen consult">Algemeen consult</option>
              <option value="Anders">Anders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Afspraak Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
              Gewenste Datum *
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              required
              min={getMinDate()}
              max={getMaxDate()}
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
              Gewenste Tijd *
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              required
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecteer tijd</option>
              {timeSlots.map(slot => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="alternativeDate" className="block text-sm font-medium text-gray-700 mb-2">
              Alternatieve Datum
            </label>
            <input
              type="date"
              id="alternativeDate"
              name="alternativeDate"
              min={getMinDate()}
              max={getMaxDate()}
              value={formData.alternativeDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="alternativeTime" className="block text-sm font-medium text-gray-700 mb-2">
              Alternatieve Tijd
            </label>
            <select
              id="alternativeTime"
              name="alternativeTime"
              value={formData.alternativeTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecteer tijd</option>
              {timeSlots.map(slot => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type Afspraak *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="meetingType"
                value="office"
                checked={formData.meetingType === 'office'}
                onChange={handleChange}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Kantoor Bezoek</div>
                <div className="text-sm text-gray-600">Den Haag kantoor</div>
              </div>
            </label>
            
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="meetingType"
                value="property"
                checked={formData.meetingType === 'property'}
                onChange={handleChange}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Ter Plaatse</div>
                <div className="text-sm text-gray-600">Bij de woning</div>
              </div>
            </label>
            
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="meetingType"
                value="video"
                checked={formData.meetingType === 'video'}
                onChange={handleChange}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Video Call</div>
                <div className="text-sm text-gray-600">Online vergadering</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Type Woning
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecteer type</option>
            <option value="Appartement">Appartement</option>
            <option value="Eengezinswoning">Eengezinswoning</option>
            <option value="Villa">Villa</option>
            <option value="Commercieel">Commercieel</option>
            <option value="Grond">Grond</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Selecteer budget</option>
            <option value="Onder €200.000">Onder €200.000</option>
            <option value="€200.000 - €400.000">€200.000 - €400.000</option>
            <option value="€400.000 - €600.000">€400.000 - €600.000</option>
            <option value="€600.000 - €800.000">€600.000 - €800.000</option>
            <option value="€800.000 - €1.000.000">€800.000 - €1.000.000</option>
            <option value="Boven €1.000.000">Boven €1.000.000</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Aanvullende Informatie
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Vertel ons meer over uw vastgoedbehoeften, specifieke vragen, of andere relevante informatie..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <Calendar className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Afspraak Aanvragen...' : 'Afspraak Inplannen'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
          onClick={() => window.location.href = '/contact'}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Bericht Sturen
        </Button>
      </div>

      <p className="text-sm text-gray-600 text-center">
        * Verplichte velden. We nemen binnen 24 uur contact met u op om de afspraak te bevestigen.
      </p>
    </form>
  );
}

