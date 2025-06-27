import { useEffect, useState } from "react";
import {
  Users,
  ChevronRight,
  Plus,
  MoreVertical,
  Shield,
  Clock,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";
import { UseWeb3 } from "../Context/Context";
import { useAccessPassSystem } from "../hooks/useAccessPassSystem";
import Loading from "../Components/Loading";

export default function Pass() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPass, setSelectedPass] = useState(null);
  const [passes, setPasses] = useState(null);
  const [events, setEvents] = useState([]);
  const { account } = UseWeb3();
  const { getUserPasses, loading, getEventDetails } = useAccessPassSystem();

  useEffect(() => {
    const fetchpasses = async () => {
      if (!account) return;
      const res = await getUserPasses(account);
      setPasses(res);
    };
    fetchpasses();
  }, [account]);

  console.log(passes);
  useEffect(() => {
    async function getEvents() {
      try {
        if (!passes || passes.length === 0) return;

        const eventIds = [...new Set(passes.map((pass) => pass.eventId))];
        const eventPromises = eventIds.map((eventId) =>
          getEventDetails(eventId)
        );
        const eventResults = await Promise.all(eventPromises);

        const combinedData = eventResults.map((event) => {
          const userPasses = passes.filter((pass) => pass.eventId === event.id);
          console.log(userPasses);
          return {
            ...event,
            userPasses,
            image: event.ipfsHash
              ? `https://ipfs.io/ipfs/${event.ipfsHash}`
              : null,
            status: event.active ? "active" : "expired",
          };
        });

        setEvents(combinedData);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }

    getEvents();
  }, [passes]);

  if (loading) {
    return <Loading />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "expired":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "upcoming":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPassTypeIcon = (passType) => {
    const icons = {
      0: "🥉",
      1: "🥈",
      2: "🥇",
    };
    return icons[passType] || "🎫";
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);
    return days > 0 ? `${days} days` : `${hours} hours`;
  };

  const filteredEvents = events?.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: "all", label: "All Passes", count: events?.length || 0 },
    {
      id: "active",
      label: "Active",
      count: events?.filter((e) => e.status === "active").length || 0,
    },
    {
      id: "upcoming",
      label: "Upcoming",
      count: events?.filter((e) => e.status === "upcoming").length || 0,
    },
    {
      id: "expired",
      label: "Expired",
      count: events?.filter((e) => e.status === "expired").length || 0,
    },
  ];

  console.log(filteredEvents);
  console.log(events);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            My Event Passes
          </h1>
          <p className="text-gray-300 text-lg">
            Manage your blockchain-verified event access passes
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <button className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl overflow-hidden">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 font-medium text-sm transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? "text-white bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b-2 border-purple-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.id
                          ? "bg-purple-500/30 text-purple-300 border border-purple-500/30"
                          : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents?.map((event) => (
            <div
              key={event.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Event Image */}
              {event.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(
                        event.status
                      )}`}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </div>
                  {/* Pass Type Indicators */}
                  <div className="absolute bottom-4 right-4 flex space-x-1">
                    {event?.userPasses?.map((passType, index) => (
                      <div
                        key={index}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-1 border border-white/30"
                      >
                        <span className="text-sm">
                          {getPassTypeIcon(passType.accessLevel)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {event.name}
                  </h3>
                  <button className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {event.duration && (
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="w-4 h-4 mr-2 text-green-400" />
                      Duration: {formatDuration(event.duration)}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-yellow-400" />
                    Passes: {event.passTypeNames.length}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {event.priceFormatted && event.priceFormatted[0] && (
                      <>
                        <span className="text-xs text-gray-400">From</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          ${event.priceFormatted[0]} APS
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedPass(event)}
                      className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      View Details
                      <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents?.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
              <span className="text-4xl">🎫</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No passes found
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {searchQuery
                ? "Try adjusting your search criteria to find your passes"
                : "You haven't purchased any event passes yet. Start exploring events!"}
            </p>
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center mx-auto">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Explore Events
            </button>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedPass && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800/90 to-purple-800/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
            <div className="relative">
              {selectedPass.image && (
                <>
                  <img
                    src={selectedPass.image}
                    alt={selectedPass.name}
                    className="w-full h-64 object-cover rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl"></div>
                </>
              )}
              <button
                onClick={() => setSelectedPass(null)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:text-purple-300 hover:bg-white/20 transition-all border border-white/20"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getStatusColor(
                    selectedPass.status
                  )}`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {selectedPass.status.charAt(0).toUpperCase() +
                    selectedPass.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedPass.name}
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                    <Shield className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="text-purple-300 text-sm font-medium">
                      Blockchain Verified
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Event ID</p>
                  <span className="text-lg font-bold text-white">
                    #{selectedPass.id}
                  </span>
                </div>
              </div>

              {/* Pass Types Owned */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Your Pass Types
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedPass.userPasses.map((passType, index) => {
                    const passTypeName = selectedPass.passTypeNames
                      ? selectedPass.passTypeNames[passType.accessLevel]
                      : `Type ${passType.accessLevel}`;

                    const price = selectedPass.priceFormatted
                      ? selectedPass.priceFormatted[index]
                      : null;

                    return (
                      <div
                        key={index}
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">
                            {getPassTypeIcon(passType.accessLevel)}
                          </span>
                          <span className="text-sm text-green-300 bg-green-500/20 px-2 py-1 rounded-full">
                            Owned
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {passTypeName}
                        </h4>
                        {price && (
                          <p className="text-purple-300 font-bold">
                            ${price} APS
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedPass.duration && (
                  <div className="flex items-center text-gray-300">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4 border border-green-500/30">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="font-semibold text-white">
                        {formatDuration(selectedPass.duration)}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center text-gray-300">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4 border border-yellow-500/30">
                    <Users className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Passes Owned</p>
                    <p className="font-semibold text-white">
                      {selectedPass.userPasses.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 hover:border-purple-500/30 transition-all duration-300">
                  Share Pass
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  Use Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
