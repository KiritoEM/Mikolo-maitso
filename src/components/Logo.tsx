import React from 'react';
import logo from '../assets/image/Logo light.svg'; // Import de l'image

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  // Tailles correspondantes pour l'image
  const sizeStyles = {
    small: 'h-8',    // ~32px
    medium: 'h-12',  // ~48px
    large: 'h-16'    // ~64px
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logo} 
        alt="Mikolo Maitso Logo"
        className={`${sizeStyles[size]} w-auto`} 
      />
    </div>
  );
};

export default Logo;