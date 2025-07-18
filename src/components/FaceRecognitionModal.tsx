import { useRef, useEffect, useState, useCallback, FC } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { X, Camera, CheckCircle, AlertCircle, Loader } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./ui/Button";
import { data } from "../constants/constants";
import { LoginFormData } from "../types";

interface FaceRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: LoginFormData) => void;
}

const FaceRecognitionModal: FC<FaceRecognitionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [status, setStatus] = useState<
    "loading" | "ready" | "capturing" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("Initialisation de la caméra...");
  //@ts-ignore
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadModels = useCallback(async () => {
    try {
      setMessage("Chargement des modèles IA...");
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      if (
        !faceapi.nets.tinyFaceDetector.isLoaded ||
        !faceapi.nets.faceLandmark68Net.isLoaded ||
        !faceapi.nets.faceRecognitionNet.isLoaded
      ) {
        throw new Error("Certains modèles n'ont pas pu être chargés");
      }

      setStatus("ready");
      setMessage("Positionnez votre visage dans le cadre");
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des modèles:", error);
      setStatus("error");
      setMessage("Erreur lors du chargement des modèles IA");
      setIsLoading(false);
    }
  }, []);

  const detectFace = useCallback(async () => {
    if (!webcamRef.current || !canvasRef.current) return;
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    if (!video || video.readyState !== 4) return;

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    try {
      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const resizedDetections = faceapi.resizeResults(detection, displaySize);
        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }
        return detection.descriptor;
      }
    } catch (error) {
      console.error("Erreur lors de la détection:", error);
    }
    return null;
  }, []);

  const labeledDescriptors = async () => {
    const descriptors = await Promise.all(
      data.map(async (item) => {
        const img = await faceapi.fetchImage(`/faces-images/${item.imageName}`);
        const fullFaceDescription = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!fullFaceDescription) {
          throw new Error(`no faces detected for ${item.imageName}`);
        }

        const faceDescriptors = [fullFaceDescription.descriptor];
        return new faceapi.LabeledFaceDescriptors(
          `${item.email}+${item.password}`,
          faceDescriptors
        );
      })
    );

    return descriptors;
  };

  const compareFace = async (
    labeledDescriptors: faceapi.LabeledFaceDescriptors[],
    queryDescriptor: Float32Array
  ) => {
    const threshold = 0.6;
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, threshold);
    const results = faceMatcher.findBestMatch(queryDescriptor);
    return {
      label: results.label,
      distance: results.distance,
      isMatch: results.distance < threshold && results.label !== "unknown",
    };
  };

  const startCapture = useCallback(async () => {
    if (status !== "ready") return;
    setIsCapturing(true);
    setStatus("capturing");
    setMessage("Analyse du visage en cours...");

    let captureCount = 0;
    const maxCaptures = 30;
    const descriptors: Float32Array[] = [];

    intervalRef.current = setInterval(async () => {
      const descriptor = await detectFace();
      if (descriptor) {
        descriptors.push(descriptor);
        captureCount++;
        setMessage(
          `Analyse en cours... ${Math.round(
            (captureCount / maxCaptures) * 100
          )}%`
        );

        if (captureCount >= maxCaptures) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          if (descriptors.length) {
            try {
              const LabeledFaceDescriptors = await labeledDescriptors();
              const results = await compareFace(
                LabeledFaceDescriptors,
                descriptor
              );

              if (results.isMatch) {
                setStatus("success");
                setMessage(
                  "Visage reconnu, création de la session en cours..."
                );
                setTimeout(() => {
                  onSuccess({
                    email: (results.label as string).split("+")[0],
                    password: (results.label as string).split("+")[1],
                  });
                }, 1500);
              } else {
                setStatus("error");
                setMessage("Visage non reconnu. Veuillez réessayer.");
                setTimeout(() => {
                  setStatus("ready");
                  setMessage("Positionnez votre visage dans le cadre");
                  setIsCapturing(false);
                }, 2000);
              }
            } catch (error) {
              console.error("Erreur lors de la reconnaissance:", error);
              setStatus("error");
              setMessage("Erreur lors de la reconnaissance.");
              setTimeout(() => {
                setStatus("ready");
                setMessage("Positionnez votre visage dans le cadre");
                setIsCapturing(false);
              }, 2000);
            }
          } else {
            setStatus("error");
            setMessage("Aucun visage détecté. Veuillez réessayer.");
            setTimeout(() => {
              setStatus("ready");
              setMessage("Positionnez votre visage dans le cadre");
              setIsCapturing(false);
            }, 2000);
          }
        }
      }
    }, 100);
  }, [status, detectFace, onSuccess]);

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

  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus("loading");
    setIsLoading(true);
    setIsCapturing(false);
    onClose();
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader className="h-6 w-6 animate-spin text-blue-500" />;
      case "ready":
        return <Camera className="h-6 w-6 text-blue-500" />;
      case "capturing":
        return <Loader className="h-6 w-6 animate-spin text-orange-500" />;
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Camera className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "capturing":
        return "text-orange-600";
      default:
        return "text-blue-600";
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
                Reconnaissance faciale
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>
            <div className="relative mb-6">
              <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-green-500 rounded-lg opacity-50"></div>
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
                className="flex-1"
                onClick={handleClose}
                disabled={isCapturing}
              >
                Annuler
              </Button>
              <Button
                className="flex-1"
                onClick={startCapture}
                disabled={status !== "ready" || isCapturing}
              >
                Scanner
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Positionnez votre visage dans le cadre et restez immobile pendant
              l'analyse
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FaceRecognitionModal;
