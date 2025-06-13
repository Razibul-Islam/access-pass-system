import { Plus, Filter } from "lucide-react";
import EventCard from "./EventCard";

const EventContent = ({
  events,
  onCreateEvent,
  onViewEvent,
  onEditEvent,
  onBuyPass,
}) => {
  const defaultEvents = [
    {
      id: 1,
      name: "Tech Conference 2024",
      description: "Annual technology conference featuring industry leaders",
      price: 299,
      duration: "3 days",
      maxPasses: 1000,
      soldPasses: 750,
      status: "active",
      startDate: "2024-07-15",
      endDate: "2024-07-17",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      name: "Music Festival Summer",
      description: "Three-day music festival with top artists",
      price: 450,
      duration: "3 days",
      maxPasses: 5000,
      soldPasses: 3200,
      status: "active",
      startDate: "2024-08-10",
      endDate: "2024-08-12",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    },
  ];

  const eventsList = defaultEvents || events;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Events</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button
            onClick={onCreateEvent}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus size={20} />
            <span className="font-medium">Create Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onView={onViewEvent}
            onEdit={onEditEvent}
            onBuyPass={onBuyPass}
          />
        ))}
      </div>
    </div>
  );
};

export default EventContent;
