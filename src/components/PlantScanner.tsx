import { useRef, useCallback, FC, Fragment } from "react";
import Webcam from "react-webcam";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./ui/Button";
import usePlantScan from "../hooks/usePlantScan";

interface PlantScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (imageData: string) => void;
  onRecognize: (imageData: string) => void;
}

const PlantScanner: FC<PlantScannerProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onRecognize,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const { status, setStatus, plantRecognized } = usePlantScan(); // Ajout de setStatus

  const startCapture = useCallback(() => {
    if (!webcamRef.current) return;

    setStatus("capturing");

    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      setStatus("loading");
      onSuccess(imageSrc);
    } else {
      setStatus("error");
    }
  }, [onSuccess, setStatus]);

  const handleClose = () => {
    setStatus("ready");
    onClose();
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
                  Veuillez positionner correctement la plante devant la caméra
                  pour lancer l'analyse.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            {(status === "ready" || status === "capturing" || !status) && (
              <Fragment>
                <div className="relative mb-6">
                  <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-primary-green rounded-lg opacity-50"></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" fullWidth onClick={handleClose}>
                    Annuler
                  </Button>
                  <Button fullWidth onClick={startCapture}>
                    Scanner
                  </Button>
                </div>
              </Fragment>
            )}

            {status === "loading" && (
              <div className="h-80 flex flex-col items-center justify-center rounded-xl">
                <div className="w-8 h-8 border-2 border-primary-green border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Prédiction en cours...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="h-80 flex flex-col items-center justify-center rounded-xl">
                <CheckCircle className="w-16 h-16 text-primary-green mb-4" />
                <p className="font-medium text-gray-600 dark:text-gray-400">
                  Une plante reconnue:{" "}
                  <span className="text-gray-900 dark:text-white text-lg">
                    "{plantRecognized?.name.toUpperCase()}"
                  </span>
                </p>
                <Button className="mt-4" onClick={handleClose}>
                  Fermer
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="h-80 flex flex-col items-center justify-center rounded-xl">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <p className="text-red-600 dark:text-red-400 font-medium text-center">
                  Erreur lors de la reconnaissance: aucune plante reconnue
                </p>
                <Button
                  className="mt-4 !py-2"
                  variant="secondary"
                  onClick={() => setStatus("ready")}
                >
                  Réessayer
                </Button>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PlantScanner;
