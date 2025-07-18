import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Bell,
  Search,
  Download,
  Filter,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/ui/Button";
import monsteraImage from "../assets/image/monstera.jpg";
import ficusImage from "../assets/image/ficus-lyrata2.jpg";
import pothosImage from "../assets/image/Pothos_epipremnum_feuilles.jpg";
import me from "../assets/image/me.jpg"; // pdp
import DashboardHeader from "../components/layout/DashboardHeader";

interface PlantIrrigation {
  id: number;
  name: string;
  image: string;
  microcontroller: string;
  ipAddress: string;
  mode: "MANUEL" | "AUTOMATIQUE";
  date: string;
}

const Irrigations: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlants, setSelectedPlants] = useState<number[]>([]);

  // Fonction pour exporter en CSV
  const exportToCSV = () => {
    // Filtrer les plantes sélectionnées ou toutes si aucune sélection
    const plantsToExport =
      selectedPlants.length > 0
        ? plantIrrigations.filter((plant) => selectedPlants.includes(plant.id))
        : plantIrrigations;

    // Créer les en-têtes CSV
    const headers = ["Plante", "Microcontroller", "Adresse IP", "Mode", "Date"];

    // Créer les lignes de données
    const csvData = plantsToExport.map((plant) => [
      plant.name,
      plant.microcontroller,
      plant.ipAddress,
      plant.mode,
      plant.date,
    ]);

    // Combiner en-têtes et données
    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    // Créer et télécharger le fichier
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);

    // Nom du fichier avec timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename =
      selectedPlants.length > 0
        ? `irrigations_selection_${timestamp}.csv`
        : `irrigations_historique_${timestamp}.csv`;

    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Notification de succès (optionnel)
    console.log(
      `Export CSV réussi: ${plantsToExport.length} entrées exportées`
    );
  };

  const plantIrrigations: PlantIrrigation[] = [
    {
      id: 1,
      name: "Monstera",
      image: monsteraImage,
      microcontroller: "Arduino Uno",
      ipAddress: "192.168.1.101",
      mode: "MANUEL",
      date: "30/07",
    },
    {
      id: 2,
      name: "Pothos",
      image: pothosImage,
      microcontroller: "Arduino Uno",
      ipAddress: "192.168.1.101",
      mode: "MANUEL",
      date: "27/07",
    },
    {
      id: 3,
      name: "Ficus Lyrata",
      image: ficusImage,
      microcontroller: "Arduino Uno",
      ipAddress: "192.168.1.101",
      mode: "AUTOMATIQUE",
      date: "24/07",
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPlants(plantIrrigations.map((plant) => plant.id));
    } else {
      setSelectedPlants([]);
    }
  };

  const handleSelectPlant = (plantId: number, checked: boolean) => {
    if (checked) {
      setSelectedPlants([...selectedPlants, plantId]);
    } else {
      setSelectedPlants(selectedPlants.filter((id) => id !== plantId));
    }
  };

  const isAllSelected = selectedPlants.length === plantIrrigations.length;
  const isIndeterminate =
    selectedPlants.length > 0 &&
    selectedPlants.length < plantIrrigations.length;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="content ml-64 w-full max-w-[calc(100%-256px)] flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="px-8 pt-8 pb-14">
          <div className="flex flex-col">
            <div className="header flex justify-between mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Irrigations{" "}
              </h1>

              <div className="flex items-center gap-4">
                {/* <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <SlidersHorizontal className="h-5 w-5" />
                </button> */}

                <Button
                  onClick={exportToCSV}
                  className="w-60 flex items-center gap-2 bg-primary-green hover:bg-primary-green/90"
                >
                  <Download className="h-5 w-5" />
                  Exporter en CSV
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          ref={(input) => {
                            if (input) input.indeterminate = isIndeterminate;
                          }}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300 text-primary-green focus:ring-primary-green"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Plante
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Microcontroller
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Adresse IP
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Mode
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {plantIrrigations.map((plant) => (
                      <tr
                        key={plant.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedPlants.includes(plant.id)}
                            onChange={(e) =>
                              handleSelectPlant(plant.id, e.target.checked)
                            }
                            className="rounded border-gray-300 text-primary-green focus:ring-primary-green"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={plant.image}
                              alt={plant.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {plant.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {plant.microcontroller}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {plant.ipAddress}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              plant.mode === "AUTOMATIQUE"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            }`}
                          >
                            {plant.mode}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {plant.date}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <Eye className="h-4 w-4" />
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Historique d'irrigations de plantes
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Irrigations;
