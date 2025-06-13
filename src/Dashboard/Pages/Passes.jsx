import { Ticket } from "lucide-react";

export default function Passes() {
  return (
    <div className="text-center py-16">
      <Ticket size={64} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">My Passes</h3>
      <p className="text-gray-600">View and manage your event passes</p>
    </div>
  );
}
