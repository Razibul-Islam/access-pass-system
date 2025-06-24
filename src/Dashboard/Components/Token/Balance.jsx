import { useAPSToken } from "../../../hooks/useAPSToken";

const Balance = () => {
  const { balance, tokenInfo } = useAPSToken();

  return (
    <div className="bg-white shadow p-6 rounded-2xl w-full">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Your Balance
      </h2>
      <p className="text-xl text-green-700 font-semibold">
        {balance} {tokenInfo?.symbol || "TOKEN"}
      </p>
    </div>
  );
};

export default Balance;
