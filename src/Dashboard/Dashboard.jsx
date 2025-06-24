import { Plus, Ticket, CheckCircle } from "lucide-react";
import StatsCards from "./Components/APS/StatesCard";
import { UseEvents } from "../hooks/backend";

const MainDashboard = ({ onCreateEvent, events }) => {
  const { bevents } = UseEvents();

  const margedEvents = events.map((item, index) => ({
    ...item,
    ...bevents[index],
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <button
          onClick={onCreateEvent}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span className="font-medium">Create Event</span>
        </button>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Ticket className="text-blue-600" size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    New pass purchased
                  </p>
                  <p className="text-sm text-gray-500">
                    Tech Conference 2024 - 2 hours ago
                  </p>
                </div>
                <CheckCircle className="text-green-500" size={20} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {margedEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <img
                  src={`https://ipfs.io/ipfs/${event.ipfsHash}`}
                  alt={event.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.startDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {event.priceFormatted} APS
                  </p>
                  <p className="text-sm text-gray-500">
                    {event.soldPasses} sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
