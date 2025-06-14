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
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* House outline - curved left side wrapping around GM */}
        <path
          d="M20 85C20 75 25 65 35 60L65 35L95 60C105 65 110 75 110 85V90H105L95 65L65 45L35 65L25 90H20V85Z"
          fill="#EF4444"
          stroke="#EF4444"
          strokeWidth="2"
        />
        
        {/* Chimney */}
        <rect
          x="85"
          y="40"
          width="8"
          height="15"
          fill="#EF4444"
        />
        
        {/* Curved house base that wraps around the left side of GM */}
        <path
          d="M20 85C20 75 25 65 35 60C35 65 35 70 35 75C35 80 40 85 45 85H25C22 85 20 85 20 85Z"
          fill="#EF4444"
        />
        
        {/* Letter G - bold, matching the actual logo style */}
        <path
          d="M45 45C40 45 35 50 35 55V85C35 90 40 95 45 95H65C70 95 75 90 75 85V80H60V75H80V85C80 95 70 105 60 105H45C30 105 20 95 20 80V60C20 45 30 35 45 35H65C70 35 75 40 75 45H45Z"
          fill="#1E3A8A"
        />
        
        {/* Letter M - bold, matching the actual logo style */}
        <path
          d="M90 45H105L120 75L135 45H150V105H135V75L120 95L105 75V105H90V45Z"
          fill="#1E3A8A"
        />
      </svg>
    </div>
  );
};

export default GMLogo;

