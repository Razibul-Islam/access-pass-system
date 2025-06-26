import { Outlet } from "react-router-dom";
import { UseCompCtx } from "../Context/ComContext";
import Header from "../Dashboard/Components/APS/Headers";
import Navigation from "../Dashboard/Components/APS/Navigation";
import CreateEventModal from "../Dashboard/Components/APS/CreateModal";
import UpdateModal from "../Dashboard/Components/APS/UpdateModal";

export default function Dashboard() {
  const {
    handleNotificationClick,
    handleProfileClick,
    showCreateModal,
    handleCloseModal,
    handleSubmitEvent,
    showUpdateModal,
    handleUpdateCloseEvent,
    handleSubmitUpdateEvent,
    eventId,
  } = UseCompCtx();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      <div className="flex">
        <Navigation />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEvent}
      />
      <UpdateModal
        isOpen={showUpdateModal}
        onClose={handleUpdateCloseEvent}
        onSubmit={handleSubmitUpdateEvent}
        eventId={eventId}
      />
    </div>
  );
}
