import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import {
  APS_ABI,
  APS_Address,
  ERC20_Address,
  ERC_ABI,
} from "../utils/accounts";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [APSContract, setAPSContract] = useState(null);
  const [TokenContract, setTokenContract] = useState(null);
  const [error, setError] = useState(null);

  const checkOwnership = (contractOwner, userAccount) => {
    const userLower = userAccount.toLowerCase();
    const contractOwnerLower = contractOwner.toLowerCase();

    return userLower === contractOwnerLower;
  };

  useEffect(() => {
    const init = async () => {
      try {
        setError(null);

        if (!window.ethereum) {
          setLoading(false);
          return;
        }

        const Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(Provider);

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const currentAccount = accounts[0].toLowerCase();
          setAccount(currentAccount);

          const Signer = await Provider.getSigner();

          const contractInstance = new ethers.Contract(
            APS_Address,
            APS_ABI,
            Signer
          );

          const tokenContractInstance = new ethers.Contract(
            ERC20_Address,
            ERC_ABI,
            Signer
          );

          const contractOwner = await contractInstance.owner();

          setIsOwner(checkOwnership(contractOwner, currentAccount));

          setAPSContract(contractInstance);
          setTokenContract(tokenContractInstance);
        }
      } catch (err) {
        console.error("Error During Initializing", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleChangeAccount = async (accounts) => {
      try {
        setError(null);

        if (accounts.length > 0) {
          const newAccount = accounts[0].toLowerCase();
          setAccount(newAccount);

          if (APSContract) {
            const apsOwner = await APSContract.owner();

            setIsOwner(checkOwnership(apsOwner, newAccount));
          }
        } else {
          setAccount(null);
          setIsOwner(false);
        }
      } catch (err) {
        console.error("Error During changing account: ", err);
        setError(err.message);
      }
    };

    window.ethereum.on("accountsChanged", handleChangeAccount);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleChangeAccount);
    };
  }, [APSContract, TokenContract]);

  const connectWallet = async () => {
    try {
      setError(null);
      setLoading(false);

      if (!window.ethereum) {
        throw new Error("MetaMask not found. Please install MetaMask.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const newAccount = accounts[0].toLowerCase();
        setAccount(newAccount);

        const Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(Provider);

        const Signer = await Provider.getSigner();

        const contractInstance = new ethers.Contract(
          APS_Address,
          APS_ABI,
          Signer
        );

        const tokenContractInstance = new ethers.Contract(
          ERC20_Address,
          ERC_ABI,
          Signer
        );

        const contractOwner = await contractInstance.owner();

        setIsOwner(checkOwnership(contractOwner, newAccount));

        setAPSContract(contractInstance);
        setTokenContract(tokenContractInstance);
      }
    } catch (err) {
      console.error("Error During Connect Wallet: ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsOwner(false);
    setAPSContract(null);
    setTokenContract(null);
    setProvider(null);
    setError(null);
  };

  const value = {
    connectWallet,
    disconnectWallet,
    TokenContract,
    APSContract,
    isOwner,
    loading,
    account,
    provider,
    error,
    setError,
    setLoading,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const UseWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
