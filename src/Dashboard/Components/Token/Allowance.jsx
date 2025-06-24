import { useState } from "react";
import { useAPSToken } from "../../../hooks/useAPSToken";

export default function Allowance() {
  const [spender, setSpender] = useState("");
  const { getAllowance } = useAPSToken();

  const handleApprove = async () => {
    if (!spender) return;
    await getAllowance(spender);
    setSpender("");
  };
  return (
    <div className="mx-auto space-y-6 p-4">
      {/* Set Allowance */}
      <div className="bg-white shadow p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-semibold text-red-600">Set Allowance</h3>
        <input
          type="text"
          placeholder="Spender Address"
          value={spender}
          onChange={(e) => setSpender(e.target.value)}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
        />
        <button
          onClick={handleApprove}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full"
        >
          Approve Allowance
        </button>
      </div>
    </div>
  );
}
