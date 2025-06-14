import React from 'react';

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
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* House outline */}
        <path
          d="M20 45L60 10L100 45V50H95L60 20L25 50H20V45Z"
          fill="#EF4444"
          className="drop-shadow-sm"
        />
        <rect
          x="85"
          y="25"
          width="12"
          height="20"
          fill="#EF4444"
          className="drop-shadow-sm"
        />
        
        {/* House base */}
        <path
          d="M20 50C20 47 22 45 25 45H95C98 45 100 47 100 50V52H20V50Z"
          fill="#EF4444"
          className="drop-shadow-sm"
        />
        
        {/* Letter G */}
        <path
          d="M25 60C25 57 27 55 30 55H50C53 55 55 57 55 60V65H45V65C45 63 43 62 41 62H35C33 62 32 63 32 65V85C32 87 33 88 35 88H41C43 88 45 87 45 85V80H40V75H55V85C55 88 53 90 50 90H30C27 90 25 88 25 85V60Z"
          fill="#1E3A8A"
          className="drop-shadow-sm"
        />
        
        {/* Letter M */}
        <path
          d="M65 55H72L78 70L84 55H91V90H84V70L78 82L72 70V90H65V55Z"
          fill="#1E3A8A"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  );
};

export default GMLogo;

