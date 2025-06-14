'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Loader2, Check, ArrowLeft } from 'lucide-react';

interface ForgotPasswordModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  language?: 'nl' | 'en';
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ 
  onClose, 
  onSwitchToLogin,
  language = 'nl' 
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Translations
  const translations = {
    nl: {
      title: 'Wachtwoord Vergeten',
      subtitle: 'Voer uw e-mailadres in om een wachtwoord reset link te ontvangen',
      email: 'E-mailadres',
      sendButton: 'Reset Link Verzenden',
      backToLogin: 'Terug naar inloggen',
      emailRequired: 'E-mailadres is verplicht',
      invalidEmail: 'Voer een geldig e-mailadres in',
      successTitle: 'E-mail Verzonden!',
      successMessage: 'Er is een wachtwoord reset link verzonden naar uw e-mailadres. Controleer uw inbox en klik op de link in de e-mail om uw wachtwoord te wijzigen.',
      goToLogin: 'Ga naar inloggen'
    },
    en: {
      title: 'Forgot Password',
      subtitle: 'Enter your email address to receive a password reset link',
      email: 'Email address',
      sendButton: 'Send Reset Link',
      backToLogin: 'Back to login',
      emailRequired: 'Email is required',
      invalidEmail: 'Please enter a valid email address',
      successTitle: 'Email Sent!',
      successMessage: 'A password reset link has been sent to your email address. Check your inbox and click the link in the email to change your password.',
      goToLogin: 'Go to login'
    }
  };

  const t = translations[language];
  
  // Form validation
  const [emailError, setEmailError] = useState('');
  
  const validateForm = () => {
    let valid = true;
    
    if (!email) {
      setEmailError(t.emailRequired);
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t.invalidEmail);
      valid = false;
    } else {
      setEmailError('');
    }
    
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (validateForm()) {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/users/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to send reset email');
        }
        
        setIsSuccess(true);
      } catch (err: any) {
        setError(err.message || 'An error occurred while sending the reset email');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Success screen
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">{t.successTitle}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="mb-6 text-gray-600">{t.successMessage}</p>
            <Button 
              onClick={onSwitchToLogin}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              {t.goToLogin}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onSwitchToLogin} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold">{t.title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <p className="text-gray-600 mb-6">{t.subtitle}</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 border rounded-md ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voorbeeld@email.com"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mb-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.sendButton}...
                </>
              ) : (
                t.sendButton
              )}
            </Button>
          </form>
          
          <div className="text-center">
            <button 
              onClick={onSwitchToLogin}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              {t.backToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

