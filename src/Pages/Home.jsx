import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Shield,
  Zap,
  Users,
  Lock,
  Globe,
  ArrowRight,
  Check,
  Star,
  Sparkles,
  Ticket,
  CreditCard,
  Unlock,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Multiple concurrent passes",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Event-based & time-bound access",
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Admin dashboard for event creators",
    },
    { icon: <CreditCard className="w-6 h-6" />, text: "ERC-20 token payments" },
    { icon: <Globe className="w-6 h-6" />, text: "On-chain event logging" },
    {
      icon: <Lock className="w-6 h-6" />,
      text: "IPFS-protected content access",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      text: "Frontend auto-expiry notifications",
    },
  ];

  const steps = [
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Browse Events",
      desc: "See all live and upcoming events with pass options.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Purchase with Crypto",
      desc: "Buy your pass using ERC-20 tokens — no middlemen.",
    },
    {
      icon: <Unlock className="w-8 h-8" />,
      title: "Access Content",
      desc: "Use your pass to unlock event access or exclusive content via IPFS.",
    },
  ];

  const technologies = [
    { name: "Solidity", color: "bg-purple-500" },
    { name: "Ethers.js", color: "bg-blue-500" },
    { name: "React.js", color: "bg-cyan-500" },
    { name: "Tailwind CSS", color: "bg-emerald-500" },
    { name: "IPFS", color: "bg-orange-500" },
    { name: "Ethereum Testnet", color: "bg-indigo-500" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8">
              <Ticket className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-300 text-sm font-medium">
                Blockchain-Powered Access Control
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
              Take Control of Access with
              <span className="block text-purple-400">Blockchain</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Decentralized Event Passes, Secure Content Access, and Transparent
              Permission Management —
              <span className="text-purple-400 font-semibold">
                {" "}
                All Powered by Smart Contracts
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center">
                Explore Events
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center">
                Get Your Pass
                <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple steps to secure, decentralized access control
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border transition-all duration-500 ${
                  currentStep === index
                    ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/50 shadow-xl shadow-purple-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    currentStep === index
                      ? "bg-purple-500 text-white"
                      : "bg-white/10 text-purple-400"
                  }`}
                >
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                <div
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep === index
                      ? "bg-purple-500 text-white"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-r from-slate-800/50 to-purple-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Features Overview
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive blockchain-powered access control
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-500/30 transition-colors">
                    <Check className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-purple-400 mb-2">
                      {feature.icon}
                    </div>
                    <p className="text-white font-medium">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why APS Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why APS?
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-purple-500/20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Truly Decentralized Access
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                <span className="text-red-400 font-semibold">
                  No central authority.
                </span>{" "}
                <span className="text-red-400 font-semibold">
                  No fake tickets.
                </span>
                <br />
                APS ensures{" "}
                <span className="text-purple-400 font-semibold">
                  transparency
                </span>
                , <span className="text-blue-400 font-semibold">ownership</span>
                , and{" "}
                <span className="text-green-400 font-semibold">security</span>{" "}
                for all users and event organizers.
              </p>
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-sm text-gray-400">Transparent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">0</div>
                  <div className="text-sm text-gray-400">Middlemen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">∞</div>
                  <div className="text-sm text-gray-400">Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="py-24 bg-gradient-to-r from-slate-800/30 to-purple-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powered By
            </h2>
            <p className="text-xl text-gray-400">
              Built with cutting-edge blockchain technology
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 ${tech.color} rounded-full mr-3 group-hover:animate-pulse`}
                  ></div>
                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-16 border border-purple-500/30">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Now
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                🚀 Join the future of access control
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center">
                Explore Passes
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center">
                Admin Login
                <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </button>
              <button className="group bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 flex items-center">
                Docs
                <Globe className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
