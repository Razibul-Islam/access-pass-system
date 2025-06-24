import React, { useState } from "react";
import { useAPSToken } from "../../../hooks/useAPSToken";

const MintToken = () => {
  const { mint } = useAPSToken();
  const [amount, setAmount] = useState("");

  const handleMint = async () => {
    try {
      await mint(amount);
      alert("Minted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-semibold text-red-600">Mint Token</h3>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        onClick={handleMint}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Mint
      </button>
    </div>
  );
};

export default MintToken;
