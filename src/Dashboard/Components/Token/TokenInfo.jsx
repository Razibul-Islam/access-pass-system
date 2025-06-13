import { useASPToken } from "../../../hooks/useAPSToken";
import Balance from "./Balance";

const TokenInfo = () => {
  const { tokenInfo } = useASPToken();

  if (!tokenInfo) return <p className="text-gray-500">Loading token info...</p>;

  return (
    <>
      <div className="bg-white shadow p-6 rounded-2xl space-y-2">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">
          Token Info
        </h2>
        <p>
          <span className="font-medium">Name:</span> {tokenInfo.name}
        </p>
        <p>
          <span className="font-medium">Symbol:</span> {tokenInfo.symbol}
        </p>
        <p>
          <span className="font-medium">Decimals:</span> {tokenInfo.decimals}
        </p>
        <p>
          <span className="font-medium">Total Supply:</span>{" "}
          {tokenInfo.totalSupply}
        </p>
      </div>
      <Balance />
    </>
  );
};

export default TokenInfo;
