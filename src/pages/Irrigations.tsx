import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Droplets, Clock, Play, Pause, Settings, Calendar, BarChart3 } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';

interface IrrigationZone {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'scheduled';
  lastWatered: string;
  nextWatering: string;
  waterAmount: string;
  duration: string;
  plants: number;
}

const Irrigations: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'zones' | 'schedule' | 'history'>('zones');
  
  const irrigationZones: IrrigationZone[] = [
    {
      id: 1,
      name: 'Zone Salon',
      status: 'active',
      lastWatered: 'Il y a 2h',
      nextWatering: 'Dans 6h',
      waterAmount: '250ml',
      duration: '5 min',
      plants: 3
    },
    {
      id: 2,
      name: 'Zone Cuisine',
      status: 'scheduled',
      lastWatered: 'Il y a 8h',
      nextWatering: 'Dans 2h',
      waterAmount: '180ml',
      duration: '3 min',
      plants: 2
    },
    {
      id: 3,
      name: 'Zone Balcon',
      status: 'inactive',
      lastWatered: 'Il y a 1j',
      nextWatering: 'Manuel',
      waterAmount: '400ml',
      duration: '8 min',
      plants: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'scheduled': return 'Programmé';
      case 'inactive': return 'Inactif';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Système d'irrigation</h1>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <Button className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurer
              </Button>
              
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>
              
              <img
                src={user?.profilePhoto || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Navigation Tabs */}
            <div className="flex gap-6 mb-8">
              <button
                onClick={() => setActiveTab('zones')}
                className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === 'zones'
                    ? 'border-primary-green text-primary-green'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Zones d'irrigation
                </div>
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === 'schedule'
                    ? 'border-primary-green text-primary-green'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Programmation
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'border-primary-green text-primary-green'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Historique
                </div>
              </button>
            </div>

            {/* Zones Tab */}
            {activeTab === 'zones' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {irrigationZones.map((zone) => (
                  <div key={zone.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{zone.name}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(zone.status)}`}>
                          {getStatusText(zone.status)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          {zone.status === 'active' ? (
                            <Pause className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          ) : (
                            <Play className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          )}
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                          <Settings className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Dernière irrigation:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{zone.lastWatered}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Prochaine irrigation:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{zone.nextWatering}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Quantité d'eau:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{zone.waterAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Durée:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{zone.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Plantes:</span>
                        <span className="text-gray-900 dark:text-white font-medium">{zone.plants}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Button variant="secondary" fullWidth className="text-sm">
                        Démarrer maintenant
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Programmation d'irrigation</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Configurez les horaires d'irrigation automatique pour vos zones
                  </p>
                  <Button>Créer une programmation</Button>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Historique d'irrigation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Consultez l'historique des irrigations et les statistiques de consommation d'eau
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Irrigations;