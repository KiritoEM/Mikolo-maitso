import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-green hover:bg-primary-green/90 text-white focus:ring-primary-green/50',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-200',
    text: 'bg-transparent hover:bg-gray-100 text-primary-green hover:text-primary-green/90',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Chargement...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;