import { createContext, useContext, useState } from "react";

const ComContx = createContext();

export default function ComContext({ children }) {
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

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const values = {
    showCreateModal,
    events,
    handleCreateEvent,
    handleCloseModal,
    handleSubmitEvent,
    handleViewEvent,
    handleEditEvent,
    handleBuyPass,
    handleNotificationClick,
    handleProfileClick,
  };

  return <ComContx.Provider value={values}>{children}</ComContx.Provider>;
}

export const UseCompCtx = () => {
  return useContext(ComContx);
};
