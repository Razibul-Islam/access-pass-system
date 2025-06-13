import { Users } from "lucide-react";

export default function User() {
  return (
    <div className="text-center py-16">
      <Users size={64} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Users</h3>
      <p className="text-gray-600">Manage platform users</p>
    </div>
  );
}
