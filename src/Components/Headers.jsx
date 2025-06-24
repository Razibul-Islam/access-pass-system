import { useState } from "react";
import { UseWeb3 } from "../Context/Context";
import { useAPSToken } from "../hooks/useAPSToken.js";
import { Link, NavLink } from "react-router-dom";
import {
  Shield,
  Menu,
  X,
  Wallet,
  LogOut,
  Crown,
  Home,
  Calendar,
  CreditCard,
  Vault,
} from "lucide-react";

function Header() {
  const { connectWallet, disconnectWallet, isOwner, loading, account, error } =
    UseWeb3();
  const { balance, tokenInfo } = useAPSToken();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-4 h-4" />, end: true },
    { to: "/events", label: "Events", icon: <Calendar className="w-4 h-4" /> },
    {
      to: "/passes",
      label: "My Passes",
      icon: <CreditCard className="w-4 h-4" />,
    },
    { to: "/treasury", label: "Treasury", icon: <Vault className="w-4 h-4" /> },
  ];

  if (isOwner) {
    navItems.push({
      to: "/admin",
      label: "Admin",
      icon: <Crown className="w-4 h-4" />,
    });
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-purple-500/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Access Pass System
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Blockchain-Powered Access Control
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Wallet Connection */}
            <div className="ml-6">
              {loading ? (
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-400 border-t-transparent"></div>
                  <span className="text-purple-300 font-medium">
                    Connecting...
                  </span>
                </div>
              ) : error ? (
                <div className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg backdrop-blur-sm">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              ) : account ? (
                <div className="flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Connected</p>
                      <p className="font-mono text-sm text-white">
                        {account?.slice(0, 6)}...{account?.slice(-4)}
                      </p>
                      <p className="text-xs text-green-400 font-semibold">
                        {balance} {tokenInfo?.symbol || "TOKEN"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="group p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300 hover:scale-105"
                    title="Disconnect Wallet"
                  >
                    <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="group flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
            <ul className="space-y-2 mb-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      item.to === "/"
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Wallet Connection */}
            <div className="pt-4 border-t border-white/10">
              {loading ? (
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-400 border-t-transparent"></div>
                  <span className="text-purple-300 font-medium">
                    Connecting...
                  </span>
                </div>
              ) : error ? (
                <div className="px-4 py-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg backdrop-blur-sm">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              ) : account ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-green-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Connected</p>
                        <p className="font-mono text-sm text-white">
                          {account?.slice(0, 6)}...{account?.slice(-4)}
                        </p>
                        <p className="text-xs text-green-400 font-semibold">
                          {balance} {tokenInfo?.symbol || "TOKEN"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnect Wallet</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
