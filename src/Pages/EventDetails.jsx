import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Ticket,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAccessPassSystem } from "../hooks/useAccessPassSystem";
import { UseEvents } from "../hooks/backend";
import Loading from "../Components/Loading";
import { ethers } from "ethers";

export default function EventDetails() {
  const { _id, id } = useParams();
  const [hoveredPass, setHoveredPass] = useState(null);
  const [Event, setEvent] = useState({});
  const [bevent, setBevent] = useState({});
  const { fetchEventById } = UseEvents();

  const { getEventDetails, loading, purchaseEventPass } = useAccessPassSystem();

  const handleEventsDetails = async (eventId) => {
    const res = await getEventDetails(eventId);
    setEvent(res);
  };

  const handlePurchaseEventPass = async (eventId, passType) => {
    await purchaseEventPass(eventId, passType);
  };

  const handleBevent = async (beventId) => {
    const res = await fetchEventById(beventId);
    setBevent(res);
  };

  useEffect(() => {
    if (_id && id && getEventDetails) {
      handleEventsDetails(id);
      handleBevent(_id);
    }
  }, [id, getEventDetails, _id]);

  if (loading) {
    return <Loading />;
  }
  const event = { ...Event, ...bevent };
  console.log(Event);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950">
      <div className="bg-black/20 backdrop-blur-sm sticky top-24 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/events"
              className="flex items-center text-white hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
            <button className="flex items-center text-white hover:text-purple-400 transition-colors">
              <Share2 className="w-5 h-5 mr-2" />
              Share Event
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={`https://ipfs.io/ipfs/${event.ipfsHash}`}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Category Badge */}
          {event.category && (
            <div className="absolute top-8 left-8">
              <span className="bg-purple-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-purple-500/50">
                {event.category}
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">{event.name}</h1>
            <div className="flex flex-wrap gap-6 text-gray-200">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                {new Date(event.startDate).toLocaleDateString()} -{" "}
                {new Date(event.endDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                {event.duration / 86400} days
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-yellow-400" />
                Multiple access tiers available
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                About This Event
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {event.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">
                Event Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">
                    {event.duration / 86400} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Passes</span>
                  <span className="text-white">
                    {event.maxPasses &&
                      event?.maxPasses[0] +
                        event?.maxPasses[1] +
                        event?.maxPasses[2]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Starting Price</span>
                  <span className="text-white">
                    {event.price &&
                      ethers.formatEther(event?.price[0]).toString()}
                    APS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Pass
            </h2>
            <p className="text-xl text-gray-300">
              Select the perfect access level for your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tier 1 */}
            {event?.price && (
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 cursor-pointer border-white/10 hover:border-emerald-500/50 ${
                  hoveredPass === "tier1" ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredPass("tier1")}
                onMouseLeave={() => setHoveredPass(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 opacity-10 rounded-2xl"></div>

                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Basic
                </div>

                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {event.passTypeNames[0] || "Standard Pass"}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        {ethers.formatEther(event.price[0]).toString()} APS
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      {event.maxPasses[0]} passes available
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Event Access
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Basic Support
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Digital Certificate
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    onClick={() =>
                      handlePurchaseEventPass(event.id, event.passTypeNames[0])
                    }
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Select {event.passTypeNames[0] || "Tier 1"}
                  </button>
                </div>
              </div>
            )}

            {/* Tier 2 */}
            {event.price && (
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 cursor-pointer border-white/10 hover:border-purple-500/50 ${
                  hoveredPass === "tier2" ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredPass("tier2")}
                onMouseLeave={() => setHoveredPass(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 opacity-10 rounded-2xl"></div>

                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>

                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {event.passTypeNames[1] || "Premium Pass"}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        {event.priceFormatted[1]} APS
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      {event.maxPasses[1]} passes available
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Everything in {event.passTypeNames[0]}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Priority Support
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Exclusive Content
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Networking Session
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    onClick={() =>
                      handlePurchaseEventPass(event.id, event.passTypeNames[1])
                    }
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Select {event.passTypeNames[1] || "Tier 2"}
                  </button>
                </div>
              </div>
            )}

            {/* Tier 3 */}
            {event.price && (
              <div
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 cursor-pointer border-white/10 hover:border-yellow-500/50 ${
                  hoveredPass === "tier3" ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredPass("tier3")}
                onMouseLeave={() => setHoveredPass(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 opacity-10 rounded-2xl"></div>

                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Premium
                </div>

                <div className="relative">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {event.passTypeNames[2] || "VIP Pass"}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-white">
                        {event.priceFormatted[2]} APS
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      {event.maxPasses[2]} passes available
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Everything in {event.passTypeNames[1]}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        VIP Treatment
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        1-on-1 Sessions
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Premium Materials
                      </span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">
                        Lifetime Access
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    onClick={() =>
                      handlePurchaseEventPass(event.id, event.passTypeNames[2])
                    }
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Select {event.passTypeNames[2] || "Tier 3"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
