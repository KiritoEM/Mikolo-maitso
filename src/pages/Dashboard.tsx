import React from 'react';

import { Bell, Search, Droplets, Sun, Thermometer } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import SensorCard from '../components/dashboard/SensorCard';
import PlantChart from '../components/dashboard/PlantChart';
import me from '../assets/image/me.jpg'; // pdp
import DashboardHeader from '../components/layout/DashboardHeader';

const Dashboard: React.FC = () => {
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const plantData = [186, 305, 237, 186, 209, 214];
  const waterData = [120, 50, 180, 90, 160, 140,];

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="content ml-64 w-full max-w-[calc(100%-256px)] flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="px-8 pt-8 pb-14">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Capteurs</h2>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SensorCard
              icon={<Droplets className="h-6 w-6" />}
              value="72 %"
              label="Taux d'humidité"
              iconBgColor="bg-teal-100 dark:bg-teal-900"
              iconColor="text-teal-600 dark:text-teal-400"
            />

            <SensorCard
              icon={<Sun className="h-6 w-6" />}
              value="750 lux"
              label="Intensité lumineuse"
              iconBgColor="bg-amber-100 dark:bg-amber-900"
              iconColor="text-amber-600 dark:text-amber-400"
            />

            <SensorCard
              icon={<Thermometer className="h-6 w-6" />}
              value="22.5 °C"
              label="Température actuelle"
              iconBgColor="bg-red-100 dark:bg-red-900"
              iconColor="text-red-600 dark:text-red-400"
            />
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlantChart
              title="Nombres de plantes"
              data={plantData}
              labels={monthLabels}
              color="#8CC63F"
            />

            <PlantChart
              title="Quantité d'eau"
              data={waterData}
              labels={monthLabels}
              color="#60A5FA"
              description="La quantité d'eau consommée par mois via le système d'irrigation"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;