import {
  Activity,
  Calendar,
  Ticket,
  TrendingUp,
  Users,
  Settings,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navItems = [
    { id: "admin", label: "Dashboard", icon: Activity },
    { id: "events", label: "Events", icon: Calendar },
    { id: "passes", label: "My Passes", icon: Ticket },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <nav className="bg-white border-r border-gray-200 w-64 h-full overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <NavLink
                to={i === 0 ? `/${item.id}` : `/admin/${item.id}`}
                className={({ isActive }) => `
  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left 
  transition-all duration-300 ease-in-out
  ${
    isActive
      ? "bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 text-indigo-700 border border-indigo-200 shadow-md"
      : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900"
  }
`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
            >
              <div className="flex items-center space-x-3">
                <Plus size={20} className="text-indigo-500" />
                <span className="font-medium">Token Actions</span>
              </div>
              <ChevronDown
                size={18}
                className={`ml-auto transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <ul className="mt-2 ml-6 space-y-1">
                <li>
                  <NavLink
                    to="/admin/token-info"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm transition ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    Token Info
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/approve-token"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm transition ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    Approve Token
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/transfer-token"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm transition ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    Transfer Token
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/mint-token"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm transition ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    Mint Token
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
