'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff, Loader2, Check } from 'lucide-react';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  language?: 'nl' | 'en';
}

const RegisterModal: React.FC<RegisterModalProps> = ({ 
  onClose, 
  onSwitchToLogin,
  language = 'nl' 
}) => {
  const { register, error, clearError, isLoading } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Translations
  const translations = {
    nl: {
      title: 'Registreren',
      firstName: 'Voornaam',
      lastName: 'Achternaam',
      username: 'Gebruikersnaam',
      email: 'E-mailadres',
      password: 'Wachtwoord',
      confirmPassword: 'Bevestig wachtwoord',
      registerButton: 'Registreren',
      haveAccount: 'Heb je al een account?',
      login: 'Log in',
      showPassword: 'Toon wachtwoord',
      hidePassword: 'Verberg wachtwoord',
      firstNameRequired: 'Voornaam is verplicht',
      lastNameRequired: 'Achternaam is verplicht',
      usernameRequired: 'Gebruikersnaam is verplicht',
      emailRequired: 'E-mailadres is verplicht',
      passwordRequired: 'Wachtwoord is verplicht',
      passwordLength: 'Wachtwoord moet minimaal 8 tekens bevatten',
      passwordsNotMatch: 'Wachtwoorden komen niet overeen',
      invalidEmail: 'Voer een geldig e-mailadres in',
      successTitle: 'Registratie succesvol!',
      successMessage: 'Er is een verificatie-e-mail verzonden naar je e-mailadres. Klik op de link in de e-mail om je account te activeren.',
      goToLogin: 'Ga naar inloggen'
    },
    en: {
      title: 'Register',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      registerButton: 'Register',
      haveAccount: 'Already have an account?',
      login: 'Log in',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      usernameRequired: 'Username is required',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 8 characters',
      passwordsNotMatch: 'Passwords do not match',
      invalidEmail: 'Please enter a valid email address',
      successTitle: 'Registration successful!',
      successMessage: 'A verification email has been sent to your email address. Please click the link in the email to activate your account.',
      goToLogin: 'Go to login'
    }
  };

  const t = translations[language];
  
  // Form validation
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      firstName: '',
      lastName: '',
      username: '', 
      email: '', 
      password: '', 
      confirmPassword: '' 
    };
    
    // First name validation
    if (!firstName.trim()) {
      newErrors.firstName = t.firstNameRequired;
      valid = false;
    }
    
    // Last name validation
    if (!lastName.trim()) {
      newErrors.lastName = t.lastNameRequired;
      valid = false;
    }
    
    // Username validation
    if (!username) {
      newErrors.username = t.usernameRequired;
      valid = false;
    }
    
    // Email validation
    if (!email) {
      newErrors.email = t.emailRequired;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t.invalidEmail;
      valid = false;
    }
    
    // Password validation
    if (!password) {
      newErrors.password = t.passwordRequired;
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = t.passwordLength;
      valid = false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = t.passwordsNotMatch;
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (validateForm()) {
      try {
        await register(firstName, lastName, username, email, password);
        setRegistrationSuccess(true);
      } catch (err) {
        // Error is handled by the AuthContext
      }
    }
  };
  
  // Success screen
  if (registrationSuccess) {
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
          <h2 className="text-xl font-bold">{t.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.firstName}
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`w-full px-3 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.lastName}
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`w-full px-3 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                {t.username}
              </label>
              <input
                type="text"
                id="username"
                className={`w-full px-3 py-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t.confirmPassword}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.registerButton}...
                </>
              ) : (
                t.registerButton
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center border-t pt-4">
            <p className="text-sm text-gray-600">
              {t.haveAccount}{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t.login}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

