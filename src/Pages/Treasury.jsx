import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Activity,
  PieChart,
  BarChart3,
  Download,
  Upload,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  RefreshCw,
} from "lucide-react";

export default function Treasury() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBalances, setShowBalances] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [transactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: "2.5",
      currency: "ETH",
      from: "0x1234...5678",
      to: "Treasury",
      timestamp: "2024-06-27T10:30:00Z",
      status: "completed",
      hash: "0xabc123...def456",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: "1000",
      currency: "USDC",
      from: "Treasury",
      to: "0x9876...5432",
      timestamp: "2024-06-27T09:15:00Z",
      status: "pending",
      hash: "0xdef789...abc123",
    },
    {
      id: 3,
      type: "revenue",
      amount: "150.75",
      currency: "USDC",
      from: "Event Sales",
      to: "Treasury",
      timestamp: "2024-06-27T08:45:00Z",
      status: "completed",
      hash: "0x123abc...789def",
    },
  ]);

  const [treasuryStats] = useState({
    totalBalance: "125,847.32",
    totalBalanceUSD: "125,847.32",
    monthlyRevenue: "12,450.85",
    monthlyExpenses: "8,320.45",
    activeInvestments: "45,200.00",
    pendingTransactions: 3,
    totalTransactions: 1247,
    growthRate: "+12.5%",
  });

  const [balances] = useState([
    {
      currency: "ETH",
      amount: "45.234",
      usdValue: "72,450.32",
      change: "+5.2%",
      changeType: "positive",
    },
    {
      currency: "USDC",
      amount: "25,847.00",
      usdValue: "25,847.00",
      change: "-1.1%",
      changeType: "negative",
    },
    {
      currency: "DAI",
      amount: "15,230.45",
      usdValue: "15,230.45",
      change: "+0.8%",
      changeType: "positive",
    },
    {
      currency: "WBTC",
      amount: "1.847",
      usdValue: "12,319.55",
      change: "+8.4%",
      changeType: "positive",
    },
  ]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case "withdrawal":
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case "revenue":
        return <TrendingUp className="w-4 h-4 text-blue-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: PieChart },
    { id: "transactions", label: "Transactions", icon: Activity },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Shield },
  ];

  const timeframes = [
    { id: "24h", label: "24H" },
    { id: "7d", label: "7D" },
    { id: "30d", label: "30D" },
    { id: "90d", label: "90D" },
    { id: "1y", label: "1Y" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Treasury Management
            </h1>
            <p className="text-gray-300 text-lg">
              Monitor and manage your organization's digital assets
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all">
              <Upload className="w-4 h-4 mr-2" />
              Deposit
            </button>
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all">
              <Send className="w-4 h-4 mr-2" />
              Transfer
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl overflow-hidden">
            <nav className="flex">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 font-medium text-sm transition-all duration-300 relative ${
                      activeTab === tab.id
                        ? "text-white bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-b-2 border-purple-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <Wallet className="w-6 h-6 text-green-400" />
                  </div>
                  <button
                    onClick={() => setShowBalances(!showBalances)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {showBalances ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {showBalances ? `$${treasuryStats.totalBalance}` : "****"}
                  </p>
                  <span className="text-green-400 text-sm font-medium">
                    {treasuryStats.growthRate}
                  </span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {showBalances ? `$${treasuryStats.monthlyRevenue}` : "****"}
                  </p>
                  <span className="text-blue-400 text-sm font-medium">
                    +15.2% from last month
                  </span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                    <DollarSign className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Active Investments
                  </p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {showBalances
                      ? `$${treasuryStats.activeInvestments}`
                      : "****"}
                  </p>
                  <span className="text-purple-400 text-sm font-medium">
                    4 active positions
                  </span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                    <Activity className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Pending Transactions
                  </p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {treasuryStats.pendingTransactions}
                  </p>
                  <span className="text-yellow-400 text-sm font-medium">
                    Awaiting confirmation
                  </span>
                </div>
              </div>
            </div>

            {/* Asset Balances */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Asset Balances</h3>
                <div className="flex items-center space-x-2">
                  {timeframes.map((timeframe) => (
                    <button
                      key={timeframe.id}
                      onClick={() => setSelectedTimeframe(timeframe.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedTimeframe === timeframe.id
                          ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {timeframe.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {balances.map((balance, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                          <span className="text-sm font-bold text-white">
                            {balance.currency}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {balance.currency}
                          </p>
                          <p className="text-xs text-gray-400">
                            {balance.currency === "ETH"
                              ? "Ethereum"
                              : balance.currency === "WBTC"
                              ? "Wrapped Bitcoin"
                              : balance.currency}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          balance.changeType === "positive"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {balance.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">
                        {showBalances ? balance.amount : "****"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {showBalances ? `$${balance.usdValue}` : "****"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <button className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
              <button className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
            </div>

            {/* Transactions List */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  Recent Transactions
                </h3>
              </div>

              <div className="divide-y divide-white/10">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-6 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-semibold text-white capitalize">
                              {tx.type}
                            </p>
                            {getStatusIcon(tx.status)}
                          </div>
                          <p className="text-sm text-gray-400">
                            {tx.from} → {tx.to}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(tx.timestamp)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            tx.type === "deposit" || tx.type === "revenue"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {tx.type === "deposit" || tx.type === "revenue"
                            ? "+"
                            : "-"}
                          {tx.amount} {tx.currency}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {tx.hash}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 text-center">
                <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Load More Transactions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Treasury Analytics
              </h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/20 rounded-xl">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    Analytics charts would be integrated here
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Connect your preferred charting library
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Treasury Settings
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">
                      Multi-signature Required
                    </p>
                    <p className="text-sm text-gray-400">
                      Require multiple signatures for withdrawals
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-all"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">
                      Auto-compound Rewards
                    </p>
                    <p className="text-sm text-gray-400">
                      Automatically reinvest staking rewards
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-all"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="font-semibold text-white">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-400">
                      Get notified of large transactions
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-all"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
