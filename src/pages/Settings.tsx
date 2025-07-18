import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Bell, Search, User, Shield, Wifi, Database, Palette, Globe, HelpCircle, LogOut } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import me from '../assets/image/me.jpg'; // pdp
import ispm from '../assets/image/logo_ispm.png';
import LL from '../assets/image/Logo light.svg';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');

  const settingSections = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'connectivity', label: 'Connectivité', icon: Wifi },
    { id: 'data', label: 'Données', icon: Database },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'language', label: 'Langue', icon: Globe },
    { id: 'help', label: 'Aide', icon: HelpCircle },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informations personnelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom d'utilisateur"
            value={user?.username || ''}
            placeholder="Votre nom d'utilisateu"
          />
          <Input
            label="Email"
            type="email"
            value={user?.email || ''}
            placeholder="votre@email.com"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Photo de profil</h3>
        <div className="flex items-center gap-4">
          <img
            src={user?.profilePhoto || me}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <Button variant="secondary" className="mb-2">Changer la photo</Button>
            <p className="text-sm text-gray-600 dark:text-gray-400">JPG, PNG ou GIF. Max 5MB.</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Sauvegarder les modifications</Button>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mot de passe</h3>
        <div className="space-y-4">
          <Input
            label="Mot de passe actuel"
            type="password"
            placeholder="Votre mot de passe actuel"
          />
          <Input
            label="Nouveau mot de passe"
            type="password"
            placeholder="Nouveau mot de passe"
          />
          <Input
            label="Confirmer le nouveau mot de passe"
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Authentification à deux facteurs</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Reconnaissance faciale</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Utilisez votre visage pour vous connecter</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 dark:peer-focus:ring-primary-green/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-green"></div>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Mettre à jour la sécurité</Button>
      </div>
    </div>
  );

  const renderConnectivitySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connexion Wi-Fi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Réseau principal</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connecté • Signal fort</p>
            </div>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Capteurs IoT</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900 dark:text-white">Capteur d'humidité #1</p>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Zone Salon • Dernière mise à jour: il y a 2 min</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900 dark:text-white">Capteur de lumière #1</p>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Zone Cuisine • Dernière mise à jour: il y a 1 min</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Thème</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Mode sombre</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Basculer entre le thème clair et sombre</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-green/20 dark:peer-focus:ring-primary-green/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-green"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'security': return renderSecuritySection();
      case 'connectivity': return renderConnectivitySection();
      case 'appearance': return renderAppearanceSection();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">

            <div className=" flex flex-col md:flex-row  justify-between p-8">
              <div className="md:w-1/2 mb-8 md-0 ">
              <div className="relative">
                <img
                src= {LL}
                className="max-w-full h-auto"
                />
               </div>
               <br></br>
              <h1 className="text-4xl font-bold">
                Nous sommes{' '}
                <span className="text-green-500">des</span> <span className="text-green-500">ISPM</span>iens
              </h1>
              <p className="mt-6 text-gray-700 text-lg">
                IGGLIA et  ESIIA
              </p>

              </div>
              <div className="md:w-1/2 flex flex-col items-center">
               <div className="relative">
                <img
                src= {ispm}
                className="max-w-full h-auto"
                />
               </div>
            
              <h1 className="text-4xl font-bold">
                Meilleur{' '}
                <span className="text-green-500">ecole</span> en <span className="text-green-500">INFORMATIQUE</span>{' '}dans l'Ocean Indien
              </h1>
            
              </div>
            </div>
            
            </p>
          </div>
        );
    }
  };

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
                src={user?.profilePhoto || me}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Settings Navigation */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r rounded-r border-gray-50 dark:border-gray-700 overflow-y-auto">
              <div className="p-4">
                <nav className="space-y-1">
                  {settingSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-green/10 text-primary-green'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <section.icon className="h-5 w-5 mr-3" />
                      {section.label}
                    </button>
                  ))}
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-8"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Se déconnecter
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Settings Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-4xl">
                {renderSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;