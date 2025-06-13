// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { UseWeb3 } from "../contexts/Web3Context";
// import { useAPSToken } from "./useAPSToken";

// export const useAccessPassSystem = () => {
//   const { APSContract, account } = UseWeb3();
//   const { approveTokens, getAllowance } = useAPSToken();
//   const [events, setEvents] = useState([]);
//   const [userPasses, setUserPasses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Purchase event pass
//   const purchaseEventPass = async (eventId) => {
//     if (!APSContract || !account) {
//       throw new Error("Contract not initialized or wallet not connected");
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       // Get event details
//       const eventDetails = await getEventDetails(eventId);
//       const eventPrice = ethers.parseEther(eventDetails.price);

//       // Check current allowance
//       const currentAllowance = await getAllowance();
//       const currentAllowanceWei = ethers.parseEther(currentAllowance);

//       // Approve tokens if needed
//       if (currentAllowanceWei < eventPrice) {
//         console.log("Approving tokens...");
//         await approveTokens(eventDetails.price);
//       }

//       // Purchase pass
//       console.log("Purchasing pass...");
//       const tx = await APSContract.purchasePass(eventId);
//       await tx.wait();

//       // Refresh user passes
//       await refreshUserPasses();

//       return tx;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Renew expired pass
//   const renewPass = async (eventId) => {
//     try {
//       setLoading(true);
//       const tx = await APSContract.renewPass(eventId);
//       await tx.wait();
//       await refreshUserPasses();
//       return tx;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check if user has valid pass
//   const isPassValid = async (userAddress, eventId) => {
//     if (!APSContract) return false;
//     try {
//       return await APSContract.isPassValid(userAddress, eventId);
//     } catch (err) {
//       console.error("Error checking pass validity:", err);
//       return false;
//     }
//   };

//   // Get pass expiry
//   const getPassExpiry = async (userAddress, eventId) => {
//     if (!APSContract) return null;
//     try {
//       const expiry = await APSContract.getPassExpiry(userAddress, eventId);
//       return new Date(Number(expiry) * 1000);
//     } catch (err) {
//       console.error("Error getting pass expiry:", err);
//       return null;
//     }
//   };

//   // Get event details
//   const getEventDetails = async (eventId) => {
//     if (!APSContract) return null;
//     try {
//       const event = await APSContract.getEventDetails(eventId);
//       return {
//         price: ethers.formatEther(event.price),
//         duration: Number(event.duration),
//         maxPasses: Number(event.maxPasses),
//         ipfsHash: event.ipfsHash,
//         active: event.active,
//       };
//     } catch (err) {
//       console.error("Error getting event details:", err);
//       return null;
//     }
//   };

//   // Get all events
//   const getAllEvents = async () => {
//     if (!APSContract) return [];

//     try {
//       const nextEventId = await APSContract.nextEventId();
//       const eventsData = [];

//       for (let i = 1; i < nextEventId; i++) {
//         try {
//           const event = await getEventDetails(i);
//           if (event && event.active) {
//             eventsData.push({ id: i, ...event });
//           }
//         } catch (error) {
//           console.log(`Event ${i} not accessible:`, error.message);
//         }
//       }

//       return eventsData;
//     } catch (err) {
//       console.error("Error getting all events:", err);
//       return [];
//     }
//   };

//   // Get user passes
//   const getUserPasses = async (userAddress = account) => {
//     if (!APSContract || !userAddress) return [];

//     try {
//       const passes = await APSContract.getUserPasses(userAddress);
//       return passes.map((pass) => ({
//         active: pass.active,
//         expiry: new Date(Number(pass.expiry) * 1000),
//         eventId: Number(pass.eventId),
//         accessLevel: pass.accessLevel,
//         exists: pass.exists,
//       }));
//     } catch (err) {
//       console.error("Error getting user passes:", err);
//       return [];
//     }
//   };

//   // Refresh events data
//   const refreshEvents = async () => {
//     setLoading(true);
//     try {
//       const eventsData = await getAllEvents();
//       setEvents(eventsData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh user passes
//   const refreshUserPasses = async () => {
//     if (!account) return;

//     try {
//       const passes = await getUserPasses();
//       setUserPasses(passes);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Format duration helper
//   const formatDuration = (seconds) => {
//     const days = Math.floor(seconds / (24 * 3600));
//     const hours = Math.floor((seconds % (24 * 3600)) / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);

//     if (days > 0) return `${days} days`;
//     if (hours > 0) return `${hours} hours`;
//     return `${minutes} minutes`;
//   };

//   // Auto-refresh data when account changes
//   useEffect(() => {
//     if (account && APSContract) {
//       refreshEvents();
//       refreshUserPasses();
//     }
//   }, [account, APSContract, refreshEvents, refreshUserPasses]);

//   return {
//     events,
//     userPasses,
//     loading,
//     error,
//     purchaseEventPass,
//     renewPass,
//     isPassValid,
//     getPassExpiry,
//     getEventDetails,
//     getAllEvents,
//     getUserPasses,
//     refreshEvents,
//     refreshUserPasses,
//     formatDuration,
//   };
// };

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { UseWeb3 } from "../contexts/Web3Context";
import { useAPSToken } from "./useAPSToken";

export const useAccessPassSystem = () => {
  const { APSContract, account } = UseWeb3();
  const { approveTokens, getAllowance } = useAPSToken();
  const [events, setEvents] = useState([]);
  const [userPasses, setUserPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purchaseEventPass = async (eventId) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    try {
      setLoading(true);
      setError(null);

      const eventDetails = await getEventDetails(eventId);
      const eventPrice = ethers.parseEther(eventDetails.price);
      const currentAllowance = await getAllowance();
      const currentAllowanceWei = ethers.parseEther(currentAllowance);

      if (currentAllowanceWei < eventPrice) {
        await approveTokens(eventDetails.price);
      }

      const tx = await APSContract.purchasePass(eventId);
      await tx.wait();
      await refreshUserPasses();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const renewPass = async (eventId) => {
    try {
      setLoading(true);
      const tx = await APSContract.renewPass(eventId);
      await tx.wait();
      await refreshUserPasses();
      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isPassValid = async (userAddress, eventId) => {
    if (!APSContract) return false;
    try {
      return await APSContract.isPassValid(userAddress, eventId);
    } catch (err) {
      console.error("Error checking pass validity:", err);
      return false;
    }
  };

  const getPassExpiry = async (userAddress, eventId) => {
    if (!APSContract) return null;
    try {
      const expiry = await APSContract.getPassExpiry(userAddress, eventId);
      return new Date(Number(expiry) * 1000);
    } catch (err) {
      console.error("Error getting pass expiry:", err);
      return null;
    }
  };

  const getEventDetails = async (eventId) => {
    if (!APSContract) return null;
    try {
      const event = await APSContract.getEventDetails(eventId);
      return {
        price: ethers.formatEther(event.price),
        duration: Number(event.duration),
        maxPasses: Number(event.maxPasses),
        ipfsHash: event.ipfsHash,
        active: event.active,
      };
    } catch (err) {
      console.error("Error getting event details:", err);
      return null;
    }
  };

  const getAllEvents = async () => {
    if (!APSContract) return [];
    try {
      const nextEventId = await APSContract.nextEventId();
      const eventsData = [];
      for (let i = 1; i < nextEventId; i++) {
        try {
          const event = await getEventDetails(i);
          if (event && event.active) {
            eventsData.push({ id: i, ...event });
          }
        } catch (error) {
          console.log(`Event ${i} not accessible:`, error.message);
        }
      }
      return eventsData;
    } catch (err) {
      console.error("Error getting all events:", err);
      return [];
    }
  };

  const getUserPasses = async (userAddress = account) => {
    if (!APSContract || !userAddress) return [];
    try {
      const passes = await APSContract.getUserPasses(userAddress);
      return passes.map((pass) => ({
        active: pass.active,
        expiry: new Date(Number(pass.expiry) * 1000),
        eventId: Number(pass.eventId),
        accessLevel: pass.accessLevel,
        exists: pass.exists,
      }));
    } catch (err) {
      console.error("Error getting user passes:", err);
      return [];
    }
  };

  const refreshEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getAllEvents();
      setEvents(eventsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserPasses = async () => {
    if (!account) return;
    try {
      const passes = await getUserPasses();
      setUserPasses(passes);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDuration = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    return `${minutes} minutes`;
  };

  useEffect(() => {
    if (account && APSContract) {
      refreshEvents();
      refreshUserPasses();
    }
  }, [account, APSContract]);

  return {
    events,
    userPasses,
    loading,
    error,
    purchaseEventPass,
    renewPass,
    isPassValid,
    getPassExpiry,
    getEventDetails,
    getAllEvents,
    getUserPasses,
    refreshEvents,
    refreshUserPasses,
    formatDuration,
  };
};
