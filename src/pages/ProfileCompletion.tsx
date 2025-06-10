import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PhotoUpload from '../components/PhotoUpload';
import FaceRecognitionModal from '../components/FaceRecognitionModal';
import { useAuth } from '../context/AuthContext';

const ProfileCompletion: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you would upload the photo to a server
      // and get back a URL to store in the user profile
      const photoUrl = selectedFile ? URL.createObjectURL(selectedFile) : undefined;
      
      updateUser({
        profilePhoto: photoUrl,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceRecognitionSuccess = () => {
    setShowFaceRecognition(false);
    updateUser({});
    navigate('/dashboard');
  };
  
  const handleSkip = () => {
    updateUser({});
    navigate('/dashboard');
  };
  
  return (
    <>
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="large" />
          </div>
          
          <Card>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Finaliser votre inscription
            </h1>
            <p className="text-gray-600 mb-6">
              Ajouter une photo de profil ou configurez la reconnaissance faciale pour une connexion sécurisée.
            </p>
            
            <PhotoUpload onFileSelected={handleFileSelected} />
            
            <div className="mt-6">
              <Button
                variant="secondary"
                fullWidth
                className="mb-4"
                onClick={() => setShowFaceRecognition(true)}
              >
                Configurer la reconnaissance faciale
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!selectedFile}
                fullWidth
              >
                Confirmer
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSkip}
                fullWidth
              >
                Ignorer
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <FaceRecognitionModal
        isOpen={showFaceRecognition}
        onClose={() => setShowFaceRecognition(false)}
        onSuccess={handleFaceRecognitionSuccess}
        mode="register"
      />
    </>
  );
};

export default ProfileCompletion;