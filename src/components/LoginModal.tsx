'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  language?: 'nl' | 'en';
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  onClose, 
  onSwitchToRegister,
  language = 'nl' 
}) => {
  const { login, error, clearError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Translations
  const translations = {
    nl: {
      title: 'Inloggen',
      email: 'E-mailadres',
      password: 'Wachtwoord',
      loginButton: 'Inloggen',
      forgotPassword: 'Wachtwoord vergeten?',
      noAccount: 'Nog geen account?',
      register: 'Registreer nu',
      showPassword: 'Toon wachtwoord',
      hidePassword: 'Verberg wachtwoord',
      emailRequired: 'E-mailadres is verplicht',
      passwordRequired: 'Wachtwoord is verplicht',
      invalidEmail: 'Voer een geldig e-mailadres in'
    },
    en: {
      title: 'Login',
      email: 'Email address',
      password: 'Password',
      loginButton: 'Login',
      forgotPassword: 'Forgot password?',
      noAccount: 'Don\'t have an account?',
      register: 'Register now',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      invalidEmail: 'Please enter a valid email address'
    }
  };

  const t = translations[language];
  
  // Form validation
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
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
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (validateForm()) {
      try {
        await login(email, password);
        // If login is successful, the AuthContext will update and the modal will be closed by the parent component
      } catch (err) {
        // Error is handled by the AuthContext
      }
    }
  };
  
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
            
            <div className="mb-6">
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
            
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.loginButton}...
                </>
              ) : (
                t.loginButton
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-green-600 hover:text-green-700">
              {t.forgotPassword}
            </a>
          </div>
          
          <div className="mt-6 text-center border-t pt-4">
            <p className="text-sm text-gray-600">
              {t.noAccount}{' '}
              <button 
                onClick={onSwitchToRegister}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {t.register}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

