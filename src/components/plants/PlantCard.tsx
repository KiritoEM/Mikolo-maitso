import React from 'react';
import { ExternalLink } from 'lucide-react';

interface PlantCardProps {
  image: string;
  name: string;
  scientificName: string;
  description: string;
  onClick: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({
  image,
  name,
  scientificName,
  description,
  onClick,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm group border border-gray-100 dark:border-gray-700">
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClick}
          className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 italic">{scientificName}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default PlantCard;