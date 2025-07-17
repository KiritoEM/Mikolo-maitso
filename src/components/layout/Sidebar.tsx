import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, Leaf, Droplets, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../Logo';
import img from '../../assets/image/plants10.png';

const Sidebar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: Leaf, label: 'Plantes', path: '/plantes' },
    { icon: Droplets, label: 'Irrigations', path: '/irrigations' },
    { icon: Settings, label: 'Paramètres', path: '/parametres' },
  ];

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked, current isDarkMode:', isDarkMode);
    toggleTheme();
  };

  return (
    <div className="w-64 fixed h-screen bg-white dark:bg-gray-800 border-r border-gray-50 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-r-full mb-1 transition-colors ${
                isActive
                  ? 'bg-primary-green/10 text-primary-green'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <button 
          onClick={handleThemeToggle}
          className="flex items-center px-4 py-3 w-full rounded-r-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-5 w-5 mr-3" />
              Mode clair
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 mr-3" />
              Mode sombre
            </>
          )}
        </button>
      </div>
      
      <div className="p-7">
        <img
          src={img}
          alt="Plantes décoratives"
          className="w-full h-55 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Sidebar;