import { useState, useEffect } from "react";
import {
  Ticket,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Shield,
  Zap,
  CheckCircle,
  Wallet,
  Share2,
  Eye,
  Clock,
} from "lucide-react";
import { UseEvents } from "../hooks/backend";
import { useAccessPassSystem } from "../hooks/useAccessPassSystem";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

export default function Event() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const { bevents } = UseEvents();
  const { events, loading } = useAccessPassSystem();
  const margedEvents = events.map((item, index) => ({
    ...item,
    ...bevents[index],
  }));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const speakers = [
    { name: "Vitalik Buterin", role: "Ethereum Founder", avatar: "VB" },
    { name: "Changpeng Zhao", role: "Binance CEO", avatar: "CZ" },
    { name: "Gavin Wood", role: "Polkadot Founder", avatar: "GW" },
    { name: "Silvio Micali", role: "Algorand Founder", avatar: "SM" },
  ];

  const schedule = [
    { time: "09:00", title: "Registration & Welcome", type: "general" },
    {
      time: "10:00",
      title: "Keynote: Future of Blockchain Access",
      speaker: "Vitalik Buterin",
      type: "keynote",
    },
    { time: "11:30", title: "Panel: Decentralized Identity", type: "panel" },
    { time: "13:00", title: "Lunch & Networking", type: "break" },
    {
      time: "14:30",
      title: "Workshop: Smart Contract Security",
      type: "workshop",
    },
    { time: "16:00", title: "Demo: NFT Ticketing Systems", type: "demo" },
    { time: "17:30", title: "Closing & Awards", type: "general" },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
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
              BlockChain Summit 2025
              <span className="block text-purple-400">Access Revolution</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Join the Future of Decentralized Event Management
              <span className="text-purple-400 font-semibold">
                {" "}
                — Secure, Transparent, Revolutionary
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                <span>March 15-17, 2025</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                <span>Crypto Valley, Zug</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 mr-2 text-teal-400" />
                <span>2000+ Attendees</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center">
                Get Your Pass
                <Wallet className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center">
                View Schedule
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Access",
                description:
                  "Blockchain-verified tickets prevent fraud and ensure authentic entry",
                color: "text-purple-400",
              },
              {
                icon: Zap,
                title: "Instant Verification",
                description:
                  "Smart contracts enable real-time validation and seamless entry",
                color: "text-blue-400",
              },
              {
                icon: Sparkles,
                title: "NFT Certificates",
                description:
                  "Receive unique digital certificates as proof of attendance",
                color: "text-teal-400",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Speakers", value: "50+", icon: Users },
              { label: "Sessions", value: "30+", icon: Calendar },
              { label: "Attendees", value: "2000+", icon: Eye },
              { label: "Countries", value: "40+", icon: MapPin },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Events</h2>
            <p className="text-xl text-gray-300">
              Join our exclusive blockchain and tech events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {margedEvents?.map((event, index) => (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 ${
                  hoveredEvent === index ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-10"></div>

                {/* Event Image */}
                {event?.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https://ipfs.io/ipfs/${event.ipfsHash}`}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}

                <div className="relative p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {event?.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {event?.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-purple-400 mr-3" />
                      <span className="text-gray-300 text-sm">
                        {new Date(event.startDate).toLocaleDateString()} -{" "}
                        {new Date(event.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-400 mr-3" />
                      <span className="text-gray-300 text-sm">
                        {event.duration / 86400} days
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-green-400 mr-3" />
                      <span className="text-gray-300 text-sm">
                        Max {event.maxPasses} passes
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-bold text-purple-400">
                      {event.priceFormatted} APS
                    </div>
                    <div className="text-sm text-gray-400">per pass</div>
                  </div>

                  <Link
                    to={`/events/${event._id}/${event.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Get Pass
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Speakers Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            World-Class Speakers
          </h2>
          <p className="text-xl text-gray-300">
            Learn from the pioneers of blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                {speaker.avatar}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {speaker.name}
              </h3>
              <p className="text-gray-400 mb-4">{speaker.role}</p>
              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Event Schedule
            </h2>
            <p className="text-xl text-gray-300">
              Three days of cutting-edge blockchain content
            </p>
          </div>

          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-2xl font-bold text-purple-400 min-w-[80px]">
                      {item.time}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      {item.speaker && (
                        <p className="text-gray-400">by {item.speaker}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === "keynote"
                        ? "bg-purple-500/20 text-purple-400"
                        : item.type === "panel"
                        ? "bg-blue-500/20 text-blue-400"
                        : item.type === "workshop"
                        ? "bg-teal-500/20 text-teal-400"
                        : item.type === "demo"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {item.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Secure your blockchain-verified pass today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center justify-center">
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center justify-center">
              <Share2 className="w-5 h-5 mr-2" />
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
