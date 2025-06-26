import { createContext, useContext, useEffect, useState } from "react";
import { useAccessPassSystem } from "../hooks/useAccessPassSystem";

const ComContx = createContext();

export default function ComContext({ children }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [Events, setEvents] = useState(null);
  const [eventId, setEventId] = useState({});
  const { createEvent, getAllEvents, updateEvent } = useAccessPassSystem();

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleUpdateEvent = () => {
    setShowUpdateModal(true);
  };
  const handleUpdateCloseEvent = () => {
    setShowUpdateModal(false);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, [getAllEvents]);

  console.log(Events);
  console.log(eventId);

  const handleSubmitEvent = async (eventData) => {
    await createEvent(
      eventData.eventName,
      eventData._price,
      eventData.duration,
      eventData._maxpass,
      eventData.ipfsHash,
      eventData.passTypeNames
    );
    setShowCreateModal(false);

    return Promise.resolve();
  };

  const handleSubmitUpdateEvent = async (eventData) => {
    const { eventId, _duration, _maxpasses, _price } = eventData;
    await updateEvent(eventId, _price, _duration, _maxpasses);
    setShowUpdateModal(false);
    return Promise.resolve();
  };

  const values = {
    showCreateModal,
    showUpdateModal,
    eventId,
    Events,
    handleCreateEvent,
    handleCloseModal,
    handleSubmitEvent,
    handleUpdateEvent,
    handleUpdateCloseEvent,
    handleSubmitUpdateEvent,
    setEventId,
  };

  return <ComContx.Provider value={values}>{children}</ComContx.Provider>;
}

export const UseCompCtx = () => {
  return useContext(ComContx);
};
