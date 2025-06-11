const RecentActivity = ({ activities }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-h-[320px] overflow-y-auto">
    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
    <ul className="space-y-3 text-gray-700 text-sm">
      {activities.map(({ id, user, action, eventName, time }) => (
        <li key={id}>
          <strong>{user}</strong> {action} <em>{eventName}</em> -{" "}
          <span className="text-gray-400">{time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivity;
