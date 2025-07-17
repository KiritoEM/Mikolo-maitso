import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, ScanLine, SlidersHorizontal } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import PlantCard from '../components/plants/PlantCard';
import PlantModal from '../components/plants/PlantModal';
import Button from '../components/ui/Button';
import monsteraImage from '../assets/image/monstera.jpg';
import ficusImage from '../assets/image/ficus-lyrata2.jpg';
import pothosImage from '../assets/image/Pothos_epipremnum_feuilles.jpg';
import me from '../assets/image/me.jpg'; // PDP kely par defaut
import DashboardHeader from '../components/layout/DashboardHeader';
import PlantScanner from '../components/PlantScanner';
import { scanPlant } from '../services/plantServices';


const Plants: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [showFaceRecognition, setShowFaceRecognition] = useState<boolean>(false);

  const plants = [
    {
      id: 1,
      image: monsteraImage,
      name: 'Monstera',
      scientificName: 'Monstera deliciosa',
      description: 'Le Monstera, aussi appelé "plante fromage suisse" en raison de ses feuilles perforées, est une plante tropicale grimpante facile à entretenir. Elle apporte une touche exotique aux intérieurs.',
      status: 'En bonne santé',
      care: {
        humidity: 'Arrosage modéré, laisser sécher le sol en surface avant d\'arroser.',
        light: 'Lumière indirecte vive, tolère l\'ombre mais éviter le soleil direct.',
        nutrients: 'Engrais une fois par mois au printemps et en été, terreau riche et drainant.',
        temperature: '18-27°C, aime l\'humidité, éviter les températures sous 10°C.',
      }
    },
    {
      id: 2,
      image: ficusImage,
      name: 'Ficus lyrata',
      scientificName: 'Ficus lyrata',
      description: 'Reconnu pour ses grandes feuilles nervurées en forme de violon, le Ficus lyrata est une plante d\'intérieur majestueuse qui peut atteindre plusieurs mètres de hauteur.',
      status: 'En bonne santé',
      care: {
        humidity: 'Maintenir une humidité constante, brumiser régulièrement.',
        light: 'Lumière vive indirecte, quelques heures de soleil direct le matin.',
        nutrients: 'Fertiliser tous les mois pendant la période de croissance.',
        temperature: '18-24°C, éviter les courants d\'air.',
      }
    },
    {
      id: 3,
      image: pothosImage,
      name: 'Pothos',
      scientificName: 'Epipremnum aureum',
      description: 'Plante suspendue populaire, le Pothos est très résistant et s\'adapte à de nombreuses conditions. Ses tiges peuvent atteindre plusieurs mètres de long.',
      status: 'En bonne santé',
      care: {
        humidity: 'Tolère l\'air sec, mais apprécie d\'être brumisé.',
        light: 'S\'adapte à toutes les expositions sauf le plein soleil.',
        nutrients: 'Peu exigeant, fertiliser légèrement au printemps.',
        temperature: '15-25°C, supporte les variations.',
      }
    },
  ];

  const handleRecognizePlant = async () => {
    const response = await fetch("/test-plant.jpg");
    if (!response.ok) {
      throw new Error("Image introuvable");
    }
    const blob = await response.blob();
    const file = new File([blob], "test-plant.jpg", { type: "image/jpeg" });

    const plantRecognizedResponse = await scanPlant(file);

    if (plantRecognizedResponse.status === 'success') {
      console.log(plantRecognizedResponse.data)
    }
    else {
      console.error(plantRecognizedResponse.message)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="content ml-64 w-full max-w-[calc(100%-256px)] flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Plantes scannées</h1>


              <div className="flex items-center gap-4">
                {/* <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <SlidersHorizontal className="h-5 w-5" />
                </button> */}

                {/* <PlantScanner
                  isOpen={showFaceRecognition}  
                  onClose={() => setShowFaceRecognition(false)}
                  onSuccess={() => }
                /> */}

                <Button className="w-60 flex items-center gap-2 bg-primary-green hover:bg-primary-green/90" onClick={handleRecognizePlant}>
                  <ScanLine className="h-5 w-5" />
                  Scanner une plante
                </Button>
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