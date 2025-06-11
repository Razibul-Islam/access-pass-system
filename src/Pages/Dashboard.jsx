import { useState } from "react";
import MainDashboard from "../Dashboard/Dashboard";
import Header from "../Dashboard/Components/Headers";
import Navigation from "../Dashboard/Components/Navigation";
import CreateEventModal from "../Dashboard/Components/CreateModal";
import EventContent from "../Dashboard/Components/EventContent";
import { Settings, Ticket, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState([]);

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleSubmitEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      soldPasses: 0,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    };
    setEvents((prev) => [...prev, newEvent]);
    setShowCreateModal(false);
  };

  const handleViewEvent = (event) => {
    console.log("View event:", event);
  };

  const handleEditEvent = (event) => {
    console.log("Edit event:", event);
  };

  const handleBuyPass = (event) => {
    console.log("Buy pass for:", event);
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleWalletClick = () => {
    console.log("Wallet clicked");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <MainDashboard onCreateEvent={handleCreateEvent} events={events} />
        );
      case "events":
        return (
          <EventContent
            events={events}
            onCreateEvent={handleCreateEvent}
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
            onBuyPass={handleBuyPass}
          />
        );
      case "passes":
        return (
          <div className="text-center py-16">
            <Ticket size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              My Passes
            </h3>
            <p className="text-gray-600">View and manage your event passes</p>
          </div>
        );
      case "analytics":
        return (
          <div className="text-center py-16">
            <TrendingUp size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics
            </h3>
            <p className="text-gray-600">Track your event performance</p>
          </div>
        );
      case "users":
        return (
          <div className="text-center py-16">
            <Users size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Users</h3>
            <p className="text-gray-600">Manage platform users</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-16">
            <Settings size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Settings
            </h3>
            <p className="text-gray-600">Configure your account settings</p>
          </div>
        );
      default:
        return (
          <MainDashboard onCreateEvent={handleCreateEvent} events={events} />
        );
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNotificationClick={handleNotificationClick}
        onWalletClick={handleWalletClick}
        onProfileClick={handleProfileClick}
      />

      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 p-8">{renderContent()}</main>
      </div>

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEvent}
      />
    </div>
  );
}
