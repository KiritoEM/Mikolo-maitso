import React from 'react';
import { X, Droplets, Sun, Leaf, Thermometer } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';

interface PlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: {
    image: string;
    name: string;
    scientificName: string;
    description: string;
    status: string;
    care: {
      humidity: string;
      light: string;
      nutrients: string;
      temperature: string;
    };
  };
}

const PlantModal: React.FC<PlantModalProps> = ({ isOpen, onClose, plant }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="relative">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <Dialog.Close className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full">
              <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </Dialog.Close>
          </div>

          <div className="p-6">
            <Tabs.Root defaultValue="details">
              <Tabs.List className="flex gap-4 mb-6">
                <Tabs.Trigger
                  value="details"
                  className="pb-2 text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-primary-green data-[state=active]:text-primary-green"
                >
                  Détails
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="guides"
                  className="pb-2 text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-primary-green data-[state=active]:text-primary-green"
                >
                  Guides
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="diagnostics"
                  className="pb-2 text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-primary-green data-[state=active]:text-primary-green"
                >
                  Diagnostiques
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="details">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      {plant.name}
                      <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {plant.status}
                      </span>
                    </h2>
                    <p className="text-gray-500 italic">{plant.scientificName}</p>
                  </div>
                  
                  <p className="text-gray-600">{plant.description}</p>  
                </div>
              </Tabs.Content>

              <Tabs.Content value="guides">
                <div className="text-gray-1000 py+1">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <Droplets className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Humidité</h3>
                        <p className="text-sm text-gray-600">{plant.care.humidity}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <Sun className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Lumière</h3>
                        <p className="text-sm text-gray-600">{plant.care.light}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <Leaf className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Nutriments</h3>
                        <p className="text-sm text-gray-600">{plant.care.nutrients}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <Thermometer className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Température</h3>
                        <p className="text-sm text-gray-600">{plant.care.temperature}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="diagnostics">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                    Diagnostic de la plante apres analyse
                    </h2>
                    <p className="text-gray-600">
                      Les feuilles jaunissent et les tiges sont molles, indiquant un exces d'arrosage et un debut de pourrissement des racines. Reduisez l'arrosage et assurez un bon drainage. Quelques taches brunes suggerent un air trop sec augmenter l'humidite. Aucun parasite detecte
                    </p>
                  </div> 
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PlantModal;