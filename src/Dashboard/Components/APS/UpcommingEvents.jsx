const UpcomingEvents = ({ events }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-h-[320px] overflow-y-auto">
    <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
    <ul className="space-y-3 text-gray-700 text-sm">
      {events.map(({ id, name, date }) => (
        <li key={id} className="flex justify-between">
          <span>{name}</span>
          <span className="text-gray-400">{date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingEvents;
