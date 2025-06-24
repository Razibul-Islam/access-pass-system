import { Plus, Filter } from "lucide-react";
import EventCard from "./EventCard";
import { UseEvents } from "../../../hooks/backend.jsx";

const EventContent = ({
  events,
  onCreateEvent,
  onViewEvent,
  onEditEvent,
  onBuyPass,
}) => {
  const { bevents } = UseEvents();
  // const margedEvents = events.map((item, index) =>
  //   Object.assign({}, item, bevents[index])
  // );

  const margedEvents = events.map((item, index) => ({
    ...item,
    ...bevents[index],
  }));

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
        {margedEvents?.map((event) => (
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
