import { Calendar, Clock, Eye, Edit } from "lucide-react";

const EventCard = ({ event, onView, onEdit, onBuyPass }) => {
  const progressPercentage = (event.soldPasses / event.maxPasses) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={`https://ipfs.io/ipfs/${event.ipfsHash}`}
          alt={event.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {event.active && "Active"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar size={16} />
            <span className="text-sm">{event.startDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock size={16} />
            <span className="text-sm">
              {(event.duration / 86400).toFixed(2)} days
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Passes Sold</span>
            <span>
              {event.soldPasses} / {event.maxPasses}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {event.priceFormatted} APS
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(event)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(event)}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onBuyPass(event)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Buy Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
