import { ethers } from "ethers";
import { UseWeb3 } from "../Context/Context";
import { useEffect, useState } from "react";

export const useASPToken = () => {
  const { TokenContract, account, setError, setLoading } = UseWeb3();

  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    decimals: 18,
    totalSupply: "0",
  });
  const [balance, setBalance] = useState("0");

  // Load token information
  const loadTokenInfo = async () => {
    if (!TokenContract) return;

    try {
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        TokenContract.name(),
        TokenContract.symbol(),
        TokenContract.decimals(),
        TokenContract.totalSupply(),
      ]);

      setTokenInfo({
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply: ethers.formatUnits(totalSupply, decimals),
      });
    } catch (err) {
      console.error("Error loading token info:", err);
      setError("Failed to load token information");
    }
  };

  // Load user balance
  const loadBalance = async () => {
    if (!TokenContract || !account) return;

    try {
      const userBalance = await TokenContract.balanceOf(account);
      // setBalance(ethers.formatUnits(userBalance, tokenInfo.decimals));
      setBalance(userBalance);
    } catch (err) {
      console.error("Error loading balance:", err);
      setError("Failed to load balance");
    }
  };

  // Get allowance
  const getAllowance = async (spenderAddress) => {
    if (!TokenContract || !account) return "0";

    try {
      const allowance = await TokenContract.allowance(account, spenderAddress);
      return ethers.formatUnits(allowance, tokenInfo.decimals);
    } catch (err) {
      console.error("Error getting allowance:", err);
      return "0";
    }
  };

  // Approve spending
  const approve = async (spenderAddress, amount) => {
    if (!TokenContract) throw new Error("Contract not initialized");

    try {
      setLoading(true);
      setError("");

      const amountInWei = ethers.parseUnits(
        amount.toString(),
        tokenInfo.decimals
      );
      const tx = await TokenContract.approve(spenderAddress, amountInWei);
      await tx.wait();

      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Transfer tokens
  const transfer = async (toAddress, amount) => {
    if (!TokenContract) throw new Error("Contract not initialized");

    try {
      setLoading(true);
      setError("");

      const amountInWei = ethers.parseUnits(
        amount.toString(),
        tokenInfo.decimals
      );
      const tx = await TokenContract.transfer(toAddress, amountInWei);
      await tx.wait();

      // Reload balance after transfer
      await loadBalance();
      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mint tokens (for testing)
  const mint = async (amount) => {
    if (!TokenContract) throw new Error("Contract not initialized");

    try {
      setLoading(true);
      setError("");

      const amountInWei = ethers.parseUnits(
        amount.toString(),
        tokenInfo.decimals
      );
      const tx = await TokenContract.mint(amountInWei);
      await tx.wait();

      // Reload balance after minting
      await loadBalance();
      return tx;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load data when contract is available
  useEffect(() => {
    if (TokenContract) {
      loadTokenInfo();
    }
  }, [TokenContract]);

  // Load balance when account or token info changes
  useEffect(() => {
    if (TokenContract && account && tokenInfo.decimals) {
      loadBalance();
    }
  }, [TokenContract, account, tokenInfo.decimals]);

  return {
    tokenInfo,
    balance,
    loadTokenInfo,
    loadBalance,
    getAllowance,
    approve,
    transfer,
    mint,
  };
};
