import React from 'react';

interface DividerProps {
  text: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className = '' }) => {
  return (
    <div className={`flex items-center my-4 ${className}`}>
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="px-4 text-sm text-gray-500">{text}</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>
  );
};

export default Divider;