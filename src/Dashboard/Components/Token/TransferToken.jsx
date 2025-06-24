import React, { useState } from "react";
import { useAPSToken } from "../../../hooks/useAPSToken";

const TransferToken = () => {
  const { transfer } = useAPSToken();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      await transfer(to, amount);
      alert("Transfer successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-semibold text-purple-600">Transfer Token</h3>
      <input
        type="text"
        placeholder="To Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
      <button
        onClick={handleTransfer}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Transfer
      </button>
    </div>
  );
};

export default TransferToken;
