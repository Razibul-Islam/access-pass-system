import { ethers } from "ethers";
import { Calendar, Clock, Edit, Star, Users, MapPin } from "lucide-react";
import ComContext from "../../../Context/ComContext";
import { useAccessPassSystem } from "../../../hooks/useAccessPassSystem";
import Loading from "../../../Components/Loading";

const EventCard = ({ event, setEventId, handleUpdateEvent }) => {
  const { loading } = useAccessPassSystem();

  let status;
  let maxPass = 0;

  const SD = Math.floor(new Date(event.startDate).getTime() / 1000);
  const ED = Math.floor(new Date(event.endDate).getTime() / 1000);

  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime < SD) {
    status = "Upcoming";
  } else if (currentTime > ED) {
    status = "Ended";
  } else {
    status = "Live";
  }

  for (let i = 0; i < event.maxPasses.length; i++) {
    maxPass += event.maxPasses[i];
  }

  const progressPercentage =
    maxPass && event?.sold ? (event.sold / maxPass) * 100 : "0";

  if (loading) {
    return <Loading />;
  }

  const handleEdit = () => {
    setEventId({ id: event.id, _id: event._id });
    handleUpdateEvent();
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 max-w-sm">
      {/* Premium Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">Premium</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`flex items-center space-x-1 backdrop-blur-sm rounded-full px-3 py-1.5 ${
            event.active
              ? "bg-green-500/20 text-green-100 border border-green-400/30"
              : "bg-gray-500/20 text-gray-100 border border-gray-400/30"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              event.active ? "bg-green-400" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-xs font-medium">{status}</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`https://ipfs.io/ipfs/${event.ipfsHash}`}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Floating Stats */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <Users className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">{maxPass}</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <MapPin className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 flex-1">
              {event.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2 shrink-0">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {event.rating}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Date & Duration */}
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Calendar className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {event.startDate}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-purple-100 rounded-lg">
              <Clock className="w-3 h-3 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {(event.duration / 86400).toFixed(0)} days
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Pass Sales
            </span>
            <span className="text-sm font-bold text-gray-900">
              {event.sold} / {maxPass}
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div
              className="absolute -top-1 bg-white rounded-full p-1 shadow-lg transition-all duration-300"
              style={{ left: `${Math.min(progressPercentage, 95)}%` }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-right">
            {progressPercentage}% sold
          </div>
        </div>

        {/* Price Tiers */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Pass Tiers</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-xs text-green-600 font-medium">
                {event.passTypeNames[0]}
              </div>
              <div className="text-sm font-bold text-green-800">
                {ethers.formatEther(event.price[0]).toString()} APS
              </div>
            </div>
            <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 font-medium">
                {event.passTypeNames[1]}
              </div>
              <div className="text-sm font-bold text-blue-800">
                {ethers.formatEther(event.price[1]).toString()} APS
              </div>
            </div>
            <div className="text-center p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-xs text-purple-600 font-medium">
                {event.passTypeNames[2]}
              </div>
              <div className="text-sm font-bold text-purple-800">
                {ethers.formatEther(event.price[2]).toString()} APS
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <button
            onClick={handleEdit}
            className="group/buy relative px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-medium text-sm hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/buy:translate-x-full transition-transform duration-1000"></div>
            <div className="relative flex items-center space-x-1">
              <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>Edit Event</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
