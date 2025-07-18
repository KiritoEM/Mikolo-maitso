import { Search } from "lucide-react";
import { getSession } from "../../lib/session";
import ReactAvatar from "react-avatar";

const DashboardHeader = () => {
  const session = getSession();
  return (
    <header>
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-s emibold text-gray-900 dark:text-white">
            Bienvenue, {session.sub.name ?? "Utilisateur"}
          </h1>
          <span className="text-2xl">👋</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 w-72 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* <button className="relative">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button> */}

          <ReactAvatar
            round
            textMarginRatio={0.18}
            name={session.sub.name ?? "Utilisateur"}
            maxInitials={2}
            className="!size-10"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
