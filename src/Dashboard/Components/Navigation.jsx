import {
  Activity,
  Calendar,
  Ticket,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "events", label: "Events", icon: Calendar },
    { id: "passes", label: "My Passes", icon: Ticket },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="bg-white border-r border-gray-200 w-64 h-full overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to=""
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
