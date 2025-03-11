"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Line } from 'react-chartjs-2';
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
}

interface UserCoin {
  coinId: string;
  amount: number;
  coin: Coin;
}

interface TradeHistory {
  date: string;
  value: number;
}

export default function CoinsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [userCoins, setUserCoins] = useState<UserCoin[]>([]);
  const [buyAmount, setBuyAmount] = useState<{ [key: string]: number }>({});
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>([]);

  const calculateTotalPortfolioValue = () => {
    if (!user) return 0;
    const coinsValue = userCoins.reduce((total, userCoin) => {
      return total + (userCoin.amount * userCoin.coin.price);
    }, 0);
    return (user.balance || 0) + coinsValue;
  };

  useEffect(() => {
    fetchCoins();
    if (user) {
      fetchUserCoins();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      generateTradeHistory();
    }
  }, [user, userCoins]); // userCoins değiştiğinde de trade history'yi güncelle

  const generateTradeHistory = () => {
    const history: TradeHistory[] = [];
    const portfolioValue = calculateTotalPortfolioValue();
    let currentValue = portfolioValue;

    // Son 30 günün simüle edilmiş değerlerini oluştur
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      if (i === 0) {
        // Bugünün gerçek değeri
        history.push({
          date: date.toISOString().split('T')[0],
          value: portfolioValue
        });
      } else {
        // Geçmiş günler için simüle edilmiş değerler
        const change = (Math.random() - 0.5) * 0.1; // -5% ile +5% arası değişim
        currentValue = currentValue * (1 + change);
        
        history.push({
          date: date.toISOString().split('T')[0],
          value: currentValue
        });
      }
    }

    // Tarihe göre sırala
    history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setTradeHistory(history);
  };

  const fetchCoins = async () => {
    try {
      const response = await fetch('/api/coins');
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch coins');
      setLoading(false);
    }
  };

  const fetchUserCoins = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/user/coins?userId=${user.id}`);
      const data = await response.json();
      setUserCoins(data);
    } catch (err) {
      setError('Failed to fetch user coins');
    }
  };

  const handleBuy = async (coinId: string) => {
    if (!user) {
      setError('Please login to trade');
      return;
    }

    const amount = buyAmount[coinId];
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const response = await fetch('/api/coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          coinId,
          amount,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      fetchUserCoins();
      setBuyAmount({ ...buyAmount, [coinId]: 0 });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to buy coin');
    }
  };

  const chartData = {
    labels: tradeHistory.map(h => h.date),
    datasets: [
      {
        label: '30-Day Portfolio Value',
        data: tradeHistory.map(h => h.value),
        fill: false,
        borderColor: '#39FF14',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#39FF14]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#39FF14] relative overflow-hidden">
      {/* Simple Background */}
      <div className="fixed inset-0 z-0 bg-black"></div>

      <Navbar />

      {/* Main Content */}
      <main className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold mb-8">
              Crypto<span className="text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-[#39FF14]">Trading</span> Hub
            </h1>
            <div className="absolute -inset-1 bg-[#39FF14]/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <p className="text-xl mb-12 text-[#39FF14]/80 max-w-2xl mx-auto">
            Trade cryptocurrencies with real-time market data and advanced analytics.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!user && (
          <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm mb-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to Trading Dashboard</h2>
            <p className="text-lg text-[#39FF14]/70">Please login to start trading and see your portfolio.</p>
          </div>
        )}

        {user && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">Portfolio Overview</h2>
                <div className="space-y-2">
                  <p className="text-lg">Cash Balance: <span className="text-[#39FF14]">${(user.balance || 0).toFixed(2)}</span></p>
                  <p className="text-lg">Portfolio Value: <span className="text-[#39FF14]">${calculateTotalPortfolioValue().toFixed(2)}</span></p>
                </div>
              </div>
              
              <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">Your Coins</h2>
                <div className="grid grid-cols-2 gap-4">
                  {userCoins.map((userCoin) => (
                    <div key={userCoin.coinId} className="p-4 border border-[#39FF14]/20 rounded-lg">
                      <h3 className="text-lg font-bold">{userCoin.coin.symbol}</h3>
                      <p>Amount: {userCoin.amount}</p>
                      <p>Value: ${(userCoin.amount * userCoin.coin.price).toFixed(2)}</p>
                    </div>
                  ))}
                  {userCoins.length === 0 && (
                    <p className="col-span-2 text-center text-[#39FF14]/70">No coins in your portfolio yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coins.map((coin) => (
            <div key={coin.id} className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#39FF14]">{coin.symbol}</h2>
                  <p className="text-[#39FF14]/70">{coin.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${coin.price.toFixed(2)}</p>
                </div>
              </div>

              {user && (
                <div className="mt-4 space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={buyAmount[coin.id] || ''}
                      onChange={(e) => setBuyAmount({ ...buyAmount, [coin.id]: parseFloat(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 bg-black border border-[#39FF14]/20 rounded-md focus:border-[#39FF14] focus:outline-none"
                      placeholder="Amount"
                    />
                    <button
                      onClick={() => handleBuy(coin.id)}
                      className="px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14] rounded-md hover:bg-[#39FF14]/20 transition-colors"
                    >
                      Buy
                    </button>
                  </div>
                  {buyAmount[coin.id] && (
                    <p className="text-sm text-[#39FF14]/70">
                      Total: ${(buyAmount[coin.id] * coin.price).toFixed(2)}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 