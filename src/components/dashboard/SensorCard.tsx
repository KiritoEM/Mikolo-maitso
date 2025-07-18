import React from 'react';
import { Info } from 'lucide-react';

interface SensorCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBgColor: string;
  iconColor: string;
}

const SensorCard: React.FC<SensorCardProps> = ({
  icon,
  value,
  label,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-full`}>
          <div className={`${iconColor}`}>{icon}</div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Info className="h-5 w-5" />
        </button>
      </div>
      <div className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white">{value}</div>
      <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
        {label}
      </div>
    </div>
  );
};

export default SensorCard;