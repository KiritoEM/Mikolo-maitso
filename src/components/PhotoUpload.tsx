import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface PhotoUploadProps {
  onFileSelected: (file: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  const clearPreview = () => {
    setPreview(null);
  };
  
  return (
    <div className="w-full">
      {preview ? (
        <div className="relative w-full h-48 rounded-md overflow-hidden border-2 border-primary-green">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover" 
          />
          <button 
            onClick={clearPreview}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-48 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-500 mb-1">
            Télécharger une photo
          </p>
          <p className="text-xs text-center text-gray-400">
            ou cliquer pour télécharger
          </p>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;