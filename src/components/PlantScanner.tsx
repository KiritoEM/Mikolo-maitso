import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { X, Camera, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from './ui/Button';

interface PlantScannerProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (imageData: string) => void;
}

const PlantScanner: React.FC<PlantScannerProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const webcamRef = useRef<Webcam>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [status, setStatus] = useState<'ready' | 'capturing' | 'success' | 'error'>('ready');
    const [message, setMessage] = useState('Positionnez la plante dans le cadre');

    const startCapture = useCallback(() => {
        if (!webcamRef.current) return;

        setIsCapturing(true);
        setStatus('capturing');
        setMessage('Analyse en cours...');

        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
            setStatus('success');
            setMessage('Plante scannée avec succès');
            onSuccess(imageSrc);
        } else {
            setStatus('error');
            setMessage("Échec de la capture d'image");
        }

        setIsCapturing(false);
    }, [onSuccess]);

    const handleClose = () => {
        setStatus('ready');
        setIsCapturing(false);
        setMessage('Positionnez la plante dans le cadre');
        onClose();
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'capturing':
                return <Loader className="h-6 w-6 animate-spin text-orange-500" />;
            case 'success':
                return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'error':
                return <AlertCircle className="h-6 w-6 text-red-500" />;
            default:
                return <Camera className="h-6 w-6 text-blue-500" />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
            case 'capturing':
                return 'text-orange-600';
            default:
                return 'text-blue-600';
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl z-50">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Scanner une plante
                                </Dialog.Title>
                                <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Veuillez positionner correctement la plante devant la caméra pour lancer l’analyse.
                                </Dialog.Description>
                            </div>
                            <Dialog.Close asChild>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    <X className="h-5 w-5" />
                                </button>
                            </Dialog.Close>
                        </div>

                        <div className="relative mb-6">
                            <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover"
                                />
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
                                disabled={isCapturing}
                                isLoading={isCapturing}
                            >
                                Scanner
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default PlantScanner;
