import { useState } from "react";
import { ScanLine } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import PlantCard from "../components/plants/PlantCard";
import PlantModal from "../components/plants/PlantModal";
import Button from "../components/ui/Button";
import monsteraImage from "../assets/image/monstera.jpg";
import ficusImage from "../assets/image/ficus-lyrata2.jpg";
import pothosImage from "../assets/image/Pothos_epipremnum_feuilles.jpg";
import DashboardHeader from "../components/layout/DashboardHeader";
import PlantScanner from "../components/PlantScanner";
import { savePlantScanned, scanPlant } from "../services/plantServices";
import { base64ToFile } from "../lib/file";
import usePlantScan from "../hooks/usePlantScan";
import { toast } from "react-toastify";

const Plants: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setStatus, setPlant } = usePlantScan();

  const plants = [
    {
      id: 1,
      image: monsteraImage,
      name: "Monstera",
      scientificName: "Monstera deliciosa",
      description:
        'Le Monstera, aussi appelé "plante fromage suisse" en raison de ses feuilles perforées, est une plante tropicale grimpante facile à entretenir. Elle apporte une touche exotique aux intérieurs.',
      status: "En bonne santé",
      care: {
        humidity:
          "Arrosage modéré, laisser sécher le sol en surface avant d'arroser.",
        light:
          "Lumière indirecte vive, tolère l'ombre mais éviter le soleil direct.",
        nutrients:
          "Engrais une fois par mois au printemps et en été, terreau riche et drainant.",
        temperature:
          "18-27°C, aime l'humidité, éviter les températures sous 10°C.",
      },
    },
    {
      id: 2,
      image: ficusImage,
      name: "Ficus lyrata",
      scientificName: "Ficus lyrata",
      description:
        "Reconnu pour ses grandes feuilles nervurées en forme de violon, le Ficus lyrata est une plante d'intérieur majestueuse qui peut atteindre plusieurs mètres de hauteur.",
      status: "En bonne santé",
      care: {
        humidity: "Maintenir une humidité constante, brumiser régulièrement.",
        light:
          "Lumière vive indirecte, quelques heures de soleil direct le matin.",
        nutrients: "Fertiliser tous les mois pendant la période de croissance.",
        temperature: "18-24°C, éviter les courants d'air.",
      },
    },
    {
      id: 3,
      image: pothosImage,
      name: "Pothos",
      scientificName: "Epipremnum aureum",
      description:
        "Plante suspendue populaire, le Pothos est très résistant et s'adapte à de nombreuses conditions. Ses tiges peuvent atteindre plusieurs mètres de long.",
      status: "En bonne santé",
      care: {
        humidity: "Tolère l'air sec, mais apprécie d'être brumisé.",
        light: "S'adapte à toutes les expositions sauf le plein soleil.",
        nutrients: "Peu exigeant, fertiliser légèrement au printemps.",
        temperature: "15-25°C, supporte les variations.",
      },
    },
  ];

  type IPlantResponse = {
    name: string;
  };

  const findMaxAggregate = (data: IPlantResponse[]) => {
    if (!data.length) return null;

    const counts = new Map<string, number>();

    for (const item of data) {
      counts.set(item.name, (counts.get(item.name) || 0) + 1);
    }

    let maxItem = "";
    let maxCount = 0;

    for (const [k, v] of counts) {
      if (v > maxCount) {
        maxCount = v;
        maxItem = k;
      }
    }

    return maxItem;
  };

  const handleRecognizePlant = async (imageData: string) => {
    try {
      setStatus("loading");

      // const blob = (await fetch("/test-plant.jfif")).blob();
      // const testImage = new File([await blob], "test.jfif", {
      //   type: (await blob).type,
      // });

      // const plantRecognizedResponse = await scanPlant(testImage);

      const plantRecognizedResponse = await scanPlant(
        await base64ToFile(imageData, "scanned_plant.jpg")
      );

      if (plantRecognizedResponse.status === "success") {
        console.log(plantRecognizedResponse.data);
        const predictedPlant = findMaxAggregate(
          plantRecognizedResponse.data.predictions
        );

        if (predictedPlant) {
          setStatus("success");
          setPlant({
            name: predictedPlant, 
          });

          const savePlantResponse = await savePlantScanned(predictedPlant, 0);

          if (savePlantResponse.status === "error") {
            console.error(savePlantResponse.message);
          }
        } else {
          setStatus("error");
        }
      } else {
        console.error(plantRecognizedResponse.message);
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de la reconnaissance:", error);
      setStatus("error");
    }
  };

  const handleCloseScanner = () => {
    setShowModal(false);
    setStatus("ready");
  };

  const handleOpenScanner = () => {
    setStatus("ready");
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="content ml-64 w-full max-w-[calc(100%-256px)] flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Plantes scannées
              </h1>

              <div className="flex items-center gap-4">
                <Button
                  className="w-60 flex items-center gap-2 bg-primary-green hover:bg-primary-green/90"
                  onClick={handleOpenScanner}
                >
                  <ScanLine className="h-5 w-5" />
                  Scanner une plante
                </Button>

                <PlantScanner
                  isOpen={showModal}
                  onClose={handleCloseScanner}
                  onSuccess={handleRecognizePlant}
                  onRecognize={(imageData: string) => handleRecognizePlant(imageData)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  image={plant.image}
                  name={plant.name}
                  scientificName={plant.scientificName}
                  description={plant.description}
                  onClick={() => setSelectedPlant(plant)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {selectedPlant && (
        <PlantModal
          isOpen={!!selectedPlant}
          onClose={() => setSelectedPlant(null)}
          plant={selectedPlant}
        />
      )}
    </div>
  );
};

export default Plants;
