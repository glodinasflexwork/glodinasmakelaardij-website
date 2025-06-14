'use client';

import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';

interface AuthModalProps {
  initialView?: 'login' | 'register' | 'forgot-password';
  onClose: () => void;
  language?: 'nl' | 'en';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  initialView = 'login', 
  onClose,
  language = 'nl'
}) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot-password'>(initialView);
  
  const switchToLogin = () => setView('login');
  const switchToRegister = () => setView('register');
  const switchToForgotPassword = () => setView('forgot-password');
  
  return (
    <>
      {view === 'login' ? (
        <LoginModal 
          onClose={onClose} 
          onSwitchToRegister={switchToRegister}
          onSwitchToForgotPassword={switchToForgotPassword}
          language={language}
        />
      ) : view === 'register' ? (
        <RegisterModal 
          onClose={onClose} 
          onSwitchToLogin={switchToLogin}
          language={language}
        />
      ) : (
        <ForgotPasswordModal 
          onClose={onClose} 
          onSwitchToLogin={switchToLogin}
          language={language}
        />
      )}
    </>
  );
};

export default AuthModal;

