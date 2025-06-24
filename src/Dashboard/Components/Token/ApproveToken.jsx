import { useState } from "react";
import { useAPSToken } from "../../../hooks/useAPSToken";

const ApproveToken = () => {
  const { approve } = useAPSToken();

  const [amount, setAmount] = useState("");

  const handleApprove = async () => {
    if (!amount) {
      alert("Please enter amount");
      return;
    }
    if (parseFloat(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    try {
      await approve(amount);
      setAmount("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-semibold text-blue-600">Approve Token</h3>
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
