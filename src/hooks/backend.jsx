import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const EventContext = createContext();

// Context Provider Component
export const EventProvider = ({ children }) => {
  const [bevents, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/events";

  // Fetch all events
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single event by ID
  const fetchEventById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.event;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching event:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create new event
  const createEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Refresh events list after creating
      await fetchEvents();
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error creating event:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh events (manual refresh)
  const refreshEvents = () => {
    fetchEvents();
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const value = {
    bevents,
    loading,
    error,
    fetchEvents,
    fetchEventById,
    createEvent,
    refreshEvents,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const UseEvents = () => {
  return useContext(EventContext);
};
