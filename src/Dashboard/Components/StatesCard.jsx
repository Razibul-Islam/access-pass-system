import { Calendar, Ticket, DollarSign, Users } from "lucide-react";

const StatsCards = ({ stats }) => {
  const defaultStats = [
    {
      label: "Total Events",
      value: "24",
      change: "+12%",
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Active Passes",
      value: "1,234",
      change: "+8%",
      icon: Ticket,
      color: "green",
    },
    {
      label: "Revenue",
      value: "$45,230",
      change: "+23%",
      icon: DollarSign,
      color: "purple",
    },
    {
      label: "Users",
      value: "892",
      change: "+15%",
      icon: Users,
      color: "orange",
    },
  ];

  const statsData = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
              <p
                className={`text-sm font-medium mt-1 ${
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
            <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
              <stat.icon className={`text-${stat.color}-600`} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
