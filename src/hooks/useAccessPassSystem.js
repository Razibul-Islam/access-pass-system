import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { UseWeb3 } from "../Context/Context";
import { useAPSToken } from "./useAPSToken";

export const useAccessPassSystem = () => {
  const { APSContract, account } = UseWeb3();
  const { approve, getAllowance } = useAPSToken();
  const [events, setEvents] = useState([]);
  const [userPasses, setUserPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper Function
  const isEmpty = (v) => v === null || v === undefined || v === "";

  // Purchase a new event pass
  const purchaseEventPass = async (eventId, passType) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");
    if (isEmpty(eventId)) throw new Error("Event Id is Required");
    if (isEmpty(passType)) throw new Error("Pass Type is Required");
    try {
      setError(null);

      const eventDetails = await getEventDetails(eventId);

      if (!eventDetails) throw new Error("Event not found");

      const eventPriceWei = eventDetails.priceFormatted;
      const currentAllowance = await getAllowance(account);

      const currentAllowanceWei = ethers.parseEther(
        currentAllowance.toString()
      );

      // Check if approval is needed
      if (currentAllowanceWei < eventPriceWei) {
        const priceInEther = ethers.formatEther(eventPriceWei);
        await approve(priceInEther);
      }

      const tx = await APSContract.purchasePass(eventId, passType);
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

  // Renew an existing pass
  const renewPass = async (eventId) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(eventId)) throw new Error("Event Id is Required");

    try {
      setLoading(true);
      setError(null);

      const eventDetails = await getEventDetails(eventId);
      if (!eventDetails) throw new Error("Event not found");

      const eventPriceWei = eventDetails.price;
      const currentAllowance = await getAllowance();
      const currentAllowanceWei = ethers.parseEther(
        currentAllowance.toString()
      );

      // Check if approval is needed for renewal
      if (currentAllowanceWei < eventPriceWei) {
        const priceInEther = ethers.formatEther(eventPriceWei);
        await approve(priceInEther);
      }

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

  // Check if a pass is valid for a user
  const isPassValid = async (userAddress, eventId) => {
    if (!APSContract) return false;

    if (isEmpty(eventId)) throw new Error("Event Id is Required");

    if (isEmpty(userAddress)) throw new Error("User Address is Required");

    try {
      return await APSContract.isPassValid(userAddress, eventId);
    } catch (err) {
      console.error("Error checking pass validity:", err);
      return false;
    }
  };

  // Get pass expiry timestamp
  const getPassExpiry = async (userAddress, eventId) => {
    if (!APSContract) return null;

    if (isEmpty(userAddress)) throw new Error("User Address is Required");

    if (isEmpty(eventId)) throw new Error("Event Id is Required");

    try {
      const expiry = await APSContract.getPassExpiry(userAddress, eventId);
      return new Date(Number(expiry) * 1000);
    } catch (err) {
      console.error("Error getting pass expiry:", err);
      return null;
    }
  };

  // Get event details
  const getEventDetails = useCallback(
    async (eventId) => {
      if (!APSContract) return null;

      if (isEmpty(eventId)) throw new Error("Event Id is Required");

      try {
        const event = await APSContract.getEventDetails(eventId);

        return {
          price: event.price, // Keep as BigInt for calculations
          priceFormatted: event.price.map((p) =>
            ethers.formatEther(p.toString())
          ), // Human readable
          duration: Number(event.duration),
          maxPasses: event.maxPasses.map((m) => Number(m)),
          ipfsHash: event.ipfsHash,
          active: event.active,
          name: event.eventName,
          passTypeNames: event.passTypeNames,
        };
      } catch (err) {
        console.error("Error getting event details:", err);
        return null;
      }
    },
    [APSContract]
  );

  // Get Pass Type

  const getPassType = async (eventId) => {
    if (!APSContract) return null;

    if (isEmpty(eventId)) throw new Error("Event Id is Required");

    try {
      const passType = await APSContract.getPassTypesInfo(eventId);
      return passType;
    } catch (err) {
      console.error("Error during getting pass type :", err);
    }
  };

  const getActivePass = async (userAddress) => {
    if (!APSContract) return null;

    if (isEmpty(userAddress)) throw new Error("User Address is Required");

    try {
      const ActivepassType = await APSContract.getUserActivePassCount(
        userAddress
      );
      return ActivepassType;
    } catch (err) {
      console.error("Error while fetching active pass type:", err);
    }
  };

  // Get all active events
  const getAllEvents = useCallback(async () => {
    if (!APSContract) return [];
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [APSContract, getEventDetails]);

  // Get user's passes
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

  // Get user's active pass count
  const getUserActivePassCount = async (userAddress = account) => {
    if (!APSContract || !userAddress) return 0;
    try {
      const count = await APSContract.getUserActivePassCount(userAddress);
      return Number(count);
    } catch (err) {
      console.error("Error getting active pass count:", err);
      return 0;
    }
  };

  // Check if user already has a pass for an event
  const userHasPass = async (eventId, userAddress = account) => {
    if (!APSContract || !userAddress) return false;
    try {
      const passes = await getUserPasses(userAddress);
      return passes.some((pass) => pass.eventId === eventId && pass.exists);
    } catch (err) {
      console.error("Error checking if user has pass:", err);
      return false;
    }
  };

  // Check if user's pass is expired
  const isPassExpired = async (eventId, userAddress = account) => {
    if (!APSContract || !userAddress) return true;
    try {
      const passes = await getUserPasses(userAddress);
      const userPass = passes.find((pass) => pass.eventId === eventId);
      if (!userPass || !userPass.exists) return true;
      return userPass.expiry <= new Date();
    } catch (err) {
      console.error("Error checking pass expiry:", err);
      return true;
    }
  };

  // Refresh events list
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

  // Refresh user passes
  const refreshUserPasses = async () => {
    if (!account) return;
    try {
      const passes = await getUserPasses();
      setUserPasses(passes);
    } catch (err) {
      setError(err.message);
    }
  };

  // Format duration from seconds to human readable
  const formatDuration = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  };

  // Format time remaining until expiry
  const getTimeRemaining = (expiryDate) => {
    const now = new Date();
    const timeLeft = expiryDate.getTime() - now.getTime();

    if (timeLeft <= 0) return "Expired";

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  // Admin Functions

  // Create a new event (Admin only)
  const createEvent = async (
    eventName,
    _price,
    duration,
    _maxpass,
    ipfsHash,
    passTypeNames
  ) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");
    console.log({
      eventName,
      _price,
      duration,
      _maxpass,
      ipfsHash,
      passTypeNames,
    });
    // Add parameter validation
    if (isEmpty(eventName))
      throw new Error("Event Name is required and cannot be null");

    if (isEmpty(duration))
      throw new Error("Duration is required and cannot be null");

    if (isEmpty(ipfsHash))
      throw new Error("IPFS Hash is required and cannot be null or empty");

    try {
      setLoading(true);
      setError(null);

      // Convert price to Wei if it's in Ether
      // const prices = _price.map((p) => ethers.parseEther(p.toString()));

      console.log(_price);

      const tx = await APSContract.createEvent(
        eventName,
        _price,
        duration,
        _maxpass,
        ipfsHash,
        passTypeNames
      );
      await tx.wait();
      await refreshEvents();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing event (Admin only)
  const updateEvent = async (
    eventId,
    [price1, price2, price3],
    duration,
    [maxPasses1, maxPasses2, maxPasses3]
  ) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(eventId)) throw new Error("Event ID is required");
    if ([price1, price2, price3].some(isEmpty))
      throw new Error("All price values are required");
    if (isEmpty(duration)) throw new Error("Duration is required");
    if ([maxPasses1, maxPasses2, maxPasses3].some(isEmpty))
      throw new Error("All max pass values are required");

    try {
      setLoading(true);
      setError(null);

      // Convert price to Wei if it's in Ether
      const pricesWei = [price1, price2, price3].map((price) =>
        ethers.parseEther(price.toString())
      );
      const maxPasses = [maxPasses1, maxPasses2, maxPasses3];

      const tx = await APSContract.updateEvent(
        eventId,
        pricesWei,
        duration,
        maxPasses
      );
      await tx.wait();
      await refreshEvents();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deactivate an event (Admin only)
  const deactivateEvent = async (eventId) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(eventId)) throw new Error("Event Id is required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.deactivateEvent(eventId);
      await tx.wait();
      await refreshEvents();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Revoke a user's pass (Admin only)
  const revokePass = async (userAddress, eventId) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(userAddress)) throw new Error("User Address is required");
    if (isEmpty(eventId)) throw new Error("Event Id is required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.revokePass(userAddress, eventId);
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

  // Extend a user's pass (Admin only)
  const extendPass = async (userAddress, eventId, additionalTime) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(userAddress)) throw new Error("User Address is required");
    if (isEmpty(eventId)) throw new Error("Event Id is required");
    if (isEmpty(additionalTime)) throw new Error("Additional Time is required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.extendPass(
        userAddress,
        eventId,
        additionalTime
      );
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

  // Set payment token (Admin only)
  const setPaymentToken = async (tokenAddress) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(tokenAddress)) throw new Error("Token Address Is required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.setPaymentToken(tokenAddress);
      await tx.wait();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set treasury address (Admin only)
  const setTreasury = async (treasuryAddress) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(treasuryAddress))
      throw new Error("Treasury Address is Required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.setTreasury(treasuryAddress);
      await tx.wait();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add event manager (Admin only)
  const addEventManager = async (managerAddress) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(managerAddress)) throw new Error("Manager Address is Required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.addEventManager(managerAddress);
      await tx.wait();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove event manager (Admin only)
  const removeEventManager = async (managerAddress) => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    if (isEmpty(managerAddress)) throw new Error("Manager Address is Required");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.removeEventManager(managerAddress);
      await tx.wait();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Withdraw funds (Admin only)
  const withdrawFunds = async () => {
    if (!APSContract || !account)
      throw new Error("Contract not initialized or wallet not connected");

    try {
      setLoading(true);
      setError(null);

      const tx = await APSContract.withdrawFunds();
      await tx.wait();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if current account is admin
  const isAdmin = async () => {
    if (!APSContract || !account) return false;
    try {
      const owner = await APSContract.owner();
      return owner.toLowerCase() === account.toLowerCase();
    } catch (err) {
      console.error("Error checking admin status:", err);
      return false;
    }
  };

  // Check if address is event manager
  const isEventManager = async (address = account) => {
    if (!APSContract || !address) return false;
    try {
      return await APSContract.eventManagers(address);
    } catch (err) {
      console.error("Error checking event manager status:", err);
      return false;
    }
  };

  // Clear error state
  const clearError = () => {
    setError(null);
  };

  // Effect to refresh data when account or contract changes
  useEffect(() => {
    if (account && APSContract) {
      refreshEvents();
      refreshUserPasses();
    }
  }, [account, APSContract]);

  return {
    // State
    events,
    userPasses,
    loading,
    error,

    // Core functions
    purchaseEventPass,
    renewPass,
    isPassValid,
    getPassExpiry,
    getEventDetails,
    getAllEvents,
    getUserPasses,
    getPassType,
    getActivePass,
    isEventManager,
    isAdmin,
    withdrawFunds,
    removeEventManager,
    addEventManager,
    setTreasury,
    setPaymentToken,
    extendPass,
    revokePass,
    deactivateEvent,
    updateEvent,
    createEvent,

    // Additional utility functions
    getUserActivePassCount,
    userHasPass,
    isPassExpired,

    // Refresh functions
    refreshEvents,
    refreshUserPasses,

    // Helper functions
    formatDuration,
    getTimeRemaining,
    clearError,
  };
};
