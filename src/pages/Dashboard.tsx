import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Droplets, Sun, Thermometer } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import SensorCard from '../components/dashboard/SensorCard';
import PlantChart from '../components/dashboard/PlantChart';
import me from '../assets/image/me.jpg'; // pdp

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const plantData = [186, 305, 237, 186, 209, 214];
  const waterData = [120, 50, 180, 90, 160, 140,];
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="" // bg-white dark:bg-gray-800 border-b border-gray-50 dark:border-gray-700 
        >
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Bienvenue, {user?.username || 'Ravaka Erlivah'}
              </h1>
              <span className="text-3xl">👋</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>
              
              <img
                src={user?.profilePhoto || me }
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Capteurs</h2>
            
            <div className="">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;