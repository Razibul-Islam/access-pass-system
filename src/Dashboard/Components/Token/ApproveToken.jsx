import { useState } from "react";
import { useASPToken } from "../../../hooks/useAPSToken";

const ApproveToken = () => {
  const { approve } = useASPToken();
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");

  const handleApprove = async () => {
    try {
      await approve(spender, amount);
      alert("Approved successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-semibold text-blue-600">Approve Token</h3>
      <input
        type="text"
        placeholder="Spender Address"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={handleApprove}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Approve
      </button>
    </div>
  );
};

export default ApproveToken;
