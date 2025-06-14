import React from 'react';
import Image from 'next/image';

interface GMLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GMLogo: React.FC<GMLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <Image
        src="/images/gm-logo.png"
        alt="Glodinas Makelaardij Logo"
        fill
        className="object-contain"
        priority
        unoptimized={true}
        onError={(e) => {
          console.error('GM Logo failed to load:', e);
          // Fallback to text if image fails
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

export default GMLogo;

