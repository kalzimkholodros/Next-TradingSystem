"use client";

import Navbar from "../components/Navbar";

export default function Profile() {
  const userProfile = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "March 2024",
    totalInvested: "$85,450.00",
    totalProfit: "$39,142.43",
    profitPercentage: "+45.8%"
  };

  const portfolioDistribution = [
    { category: "Stocks", percentage: 45, value: "$56,066.59" },
    { category: "Crypto", percentage: 30, value: "$37,377.73" },
    { category: "ETFs", percentage: 15, value: "$18,688.86" },
    { category: "Commodities", percentage: 10, value: "$12,459.24" }
  ];

  const recentActivity = [
    { action: "Portfolio Rebalanced", date: "2024-03-20 14:30", status: "Completed" },
    { action: "Dividend Received", date: "2024-03-19 09:15", amount: "$245.50" },
    { action: "Stop Loss Triggered", date: "2024-03-18 15:45", asset: "NVDA" },
    { action: "Investment Strategy Updated", date: "2024-03-17 11:20", status: "Applied" }
  ];

  return (
    <div className="min-h-screen bg-black text-[#39FF14] relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img
          src="/matrix-bg.jpg"
          alt="Matrix Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.1),transparent_50%)] z-20"></div>

      <Navbar />

      <main className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-[#39FF14]/20 border-2 border-[#39FF14] flex items-center justify-center">
              <span className="text-4xl">{userProfile.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userProfile.name}</h1>
              <p className="text-[#39FF14]/70">Member since {userProfile.joinDate}</p>
              <p className="text-[#39FF14]/70">{userProfile.email}</p>
            </div>
          </div>

          {/* Investment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
              <h3 className="text-sm text-[#39FF14]/70 mb-2">Total Invested</h3>
              <p className="text-3xl font-bold">{userProfile.totalInvested}</p>
            </div>
            <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
              <h3 className="text-sm text-[#39FF14]/70 mb-2">Total Profit</h3>
              <p className="text-3xl font-bold">{userProfile.totalProfit}</p>
            </div>
            <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
              <h3 className="text-sm text-[#39FF14]/70 mb-2">ROI</h3>
              <p className="text-3xl font-bold text-green-400">{userProfile.profitPercentage}</p>
            </div>
          </div>
        </div>

        {/* Portfolio Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Portfolio Distribution</h2>
            <div className="space-y-4">
              {portfolioDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span>{item.category}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 bg-[#39FF14]/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#39FF14]/40 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm text-[#39FF14]/70 mt-1">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-[#39FF14]/10 rounded-lg">
                  <div>
                    <p className="font-bold">{activity.action}</p>
                    <p className="text-sm text-[#39FF14]/70">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && <p className="text-green-400">{activity.amount}</p>}
                    {activity.asset && <p className="text-[#39FF14]">{activity.asset}</p>}
                    {activity.status && <p className="text-[#39FF14]/70">{activity.status}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-[#39FF14]/10 border border-[#39FF14] rounded-lg 
                         hover:bg-[#39FF14]/20 hover:shadow-[0_0_30px_#39FF14] 
                         transition-all duration-300">
            Update Investment Strategy
          </button>
          <button className="px-6 py-3 bg-black border border-[#39FF14]/50 rounded-lg 
                         hover:border-[#39FF14] hover:shadow-[0_0_30px_#39FF14] 
                         transition-all duration-300">
            Download Reports
          </button>
          <button className="px-6 py-3 bg-black border border-[#39FF14]/50 rounded-lg 
                         hover:border-[#39FF14] hover:shadow-[0_0_30px_#39FF14] 
                         transition-all duration-300">
            Account Settings
          </button>
        </div>
      </main>
    </div>
  );
} 