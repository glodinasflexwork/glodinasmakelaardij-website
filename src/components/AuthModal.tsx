'use client';

import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface AuthModalProps {
  initialView?: 'login' | 'register';
  onClose: () => void;
  language?: 'nl' | 'en';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  initialView = 'login', 
  onClose,
  language = 'nl'
}) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  
  const switchToLogin = () => setView('login');
  const switchToRegister = () => setView('register');
  
  return (
    <>
      {view === 'login' ? (
        <LoginModal 
          onClose={onClose} 
          onSwitchToRegister={switchToRegister}
          language={language}
        />
      ) : (
        <RegisterModal 
          onClose={onClose} 
          onSwitchToLogin={switchToLogin}
          language={language}
        />
      )}
    </>
  );
};

export default AuthModal;

