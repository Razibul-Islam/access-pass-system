import { createContext, useContext, useEffect, useState } from "react";
import { useAccessPassSystem } from "../hooks/useAccessPassSystem";

const ComContx = createContext();

export default function ComContext({ children }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [Events, setEvents] = useState([]);
  const { createEvent, getAllEvents } = useAccessPassSystem();

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, [getAllEvents]);

  const handleSubmitEvent = async (eventData) => {
    await createEvent(
      eventData.price,
      eventData.duration,
      eventData.maxPasses,
      eventData.image
    );
    setShowCreateModal(false);
    console.log(eventData);

    return Promise.resolve();
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
    Events,
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
