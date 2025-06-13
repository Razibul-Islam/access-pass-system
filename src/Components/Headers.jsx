import { NavLink } from "react-router-dom";
import { UseWeb3 } from "../Context/Context";
import { useASPToken } from "../hooks/useAPSToken";

function Header() {
  const { connectWallet, disconnectWallet, isOwner, loading, account, error } =
    UseWeb3();
  const { balance, tokenInfo } = useASPToken();

  return (
    <header className="bg-blue-700 text-white p-4">
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-xl font-bold mb-4 md:mb-0">Access Pass System</h1>

        <ul className="flex flex-wrap gap-4 items-center justify-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/passes"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              My Passes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/treasury"
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              Treasury
            </NavLink>
          </li>
          {isOwner && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                Admin
              </NavLink>
            </li>
          )}

          <li>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </div>
            ) : error ? (
              <div className="p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                {error}
              </div>
            ) : account ? (
              <div className="flex items-center space-x-4 bg-green-100 text-black px-4 py-2 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Connected as:</p>
                  <p className="font-mono text-sm">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </p>
                  <p className="text-xs text-green-700 font-semibold">
                    Balance: {balance} {tokenInfo?.symbol || "TOKEN"}
                  </p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
