import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { X, Camera, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from './ui/Button';

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'register' | 'login';
}

const FaceRecognitionModal: React.FC<FaceRecognitionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  mode
}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'capturing' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Initialisation de la caméra...');
  const [faceDescriptor, setFaceDescriptor] = useState<Float32Array | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Charger les modèles Face-API
  const loadModels = useCallback(async () => {
    try {
      setMessage('Chargement des modèles IA...');
      
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      
      setStatus('ready');
      setMessage('Positionnez votre visage dans le cadre');
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des modèles:', error);
      setStatus('error');
      setMessage('Erreur lors du chargement des modèles IA');
      setIsLoading(false);
    }
  }, []);

  // Détecter et analyser le visage
  const detectFace = useCallback(async () => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    
    if (!video || video.readyState !== 4) return;

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    try {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const resizedDetections = faceapi.resizeResults(detection, displaySize);
        
        // Effacer le canvas précédent
        const context = canvas.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          
          // Dessiner le rectangle de détection
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }

        return detection.descriptor;
      }
    } catch (error) {
      console.error('Erreur lors de la détection:', error);
    }
    
    return null;
  }, []);

  // Démarrer la capture
  const startCapture = useCallback(async () => {
    if (status !== 'ready') return;
    
    setIsCapturing(true);
    setStatus('capturing');
    setMessage('Analyse du visage en cours...');

    let captureCount = 0;
    const maxCaptures = 30; // 3 secondes à 10 FPS
    const descriptors: Float32Array[] = [];

    intervalRef.current = setInterval(async () => {
      const descriptor = await detectFace();
      
      if (descriptor) {
        descriptors.push(descriptor);
        captureCount++;
        
        setMessage(`Analyse en cours... ${Math.round((captureCount / maxCaptures) * 100)}%`);
        
        if (captureCount >= maxCaptures) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          
          // Calculer le descripteur moyen
          if (descriptors.length > 0) {
            const avgDescriptor = new Float32Array(descriptors[0].length);
            for (let i = 0; i < avgDescriptor.length; i++) {
              avgDescriptor[i] = descriptors.reduce((sum, desc) => sum + desc[i], 0) / descriptors.length;
            }
            
            if (mode === 'register') {
              // Sauvegarder le descripteur pour l'enregistrement
              localStorage.setItem('userFaceDescriptor', JSON.stringify(Array.from(avgDescriptor)));
              setStatus('success');
              setMessage('Visage enregistré avec succès !');
              setTimeout(() => {
                onSuccess();
              }, 1500);
            } else {
              // Comparer avec le descripteur sauvegardé
              const savedDescriptor = localStorage.getItem('userFaceDescriptor');
              if (savedDescriptor) {
                const saved = new Float32Array(JSON.parse(savedDescriptor));
                const distance = faceapi.euclideanDistance(avgDescriptor, saved);
                
                if (distance < 0.6) { // Seuil de reconnaissance
                  setStatus('success');
                  setMessage('Reconnaissance réussie !');
                  setTimeout(() => {
                    onSuccess();
                  }, 1500);
                } else {
                  setStatus('error');
                  setMessage('Visage non reconnu. Veuillez réessayer.');
                  setTimeout(() => {
                    setStatus('ready');
                    setMessage('Positionnez votre visage dans le cadre');
                    setIsCapturing(false);
                  }, 2000);
                }
              } else {
                setStatus('error');
                setMessage('Aucun visage enregistré trouvé.');
              }
            }
          } else {
            setStatus('error');
            setMessage('Aucun visage détecté. Veuillez réessayer.');
            setTimeout(() => {
              setStatus('ready');
              setMessage('Positionnez votre visage dans le cadre');
              setIsCapturing(false);
            }, 2000);
          }
        }
      }
    }, 100); // 10 FPS
  }, [status, mode, detectFace, onSuccess]);

  // Initialiser quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      loadModels();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, loadModels]);

  // Nettoyer à la fermeture
  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus('loading');
    setIsLoading(true);
    setIsCapturing(false);
    onClose();
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader className="h-6 w-6 animate-spin text-blue-500" />;
      case 'ready':
        return <Camera className="h-6 w-6 text-blue-500" />;
      case 'capturing':
        return <Loader className="h-6 w-6 animate-spin text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Camera className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'capturing': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl z-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                {mode === 'register' ? 'Enregistrer votre visage' : 'Reconnaissance faciale'}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="relative mb-6">
              <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                {!isLoading && (
                  <>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                      mirrored
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </>
                )}
                
                {/* Overlay de guidage */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-primary-green rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {message}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleClose}
                disabled={isCapturing}
              >
                Annuler
              </Button>
              <Button
                fullWidth
                onClick={startCapture}
                disabled={status !== 'ready' || isCapturing}
                isLoading={isCapturing}
              >
                {mode === 'register' ? 'Enregistrer' : 'Scanner'}
              </Button>
            </div>

            {mode === 'register' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                Positionnez votre visage dans le cercle et restez immobile pendant l'analyse
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FaceRecognitionModal;