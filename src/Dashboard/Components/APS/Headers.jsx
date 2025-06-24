import { Search, Bell, Wallet, ChevronDown, Ticket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAPSToken } from "../../../hooks/useAPSToken";

const Header = ({ onNotificationClick, onProfileClick }) => {
  const { tokenInfo, balance } = useAPSToken();
  const [walletOpen, setWalletOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Ticket className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AccessPass
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64 transition-all duration-200"
            />
          </div>

          <button
            onClick={onNotificationClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          <button
            onClick={() => setWalletOpen(!walletOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Wallet size={20} />
          </button>
          {walletOpen && (
            <div className="absolute right-24 mt-2 top-12 w-fit bg-white text-gray-800 rounded shadow-lg p-4 z-10">
              <p className="text-sm text-gray-500">Balance</p>
              <p className="font-semibold text-lg">
                {balance} {tokenInfo?.symbol || ""}
              </p>
            </div>
          )}

          <div
            onClick={onProfileClick}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
