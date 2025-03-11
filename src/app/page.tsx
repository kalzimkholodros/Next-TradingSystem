"use client";

import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import type { UserCoin } from './store/useStore';
import { Line } from 'react-chartjs-2';
import Navbar from './components/Navbar';
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

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface PortfolioData {
  dates: string[];
  values: number[];
}

export default function Home() {
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({ dates: [], values: [] });
  const [bestCoin, setBestCoin] = useState<{ symbol: string; data: PortfolioData } | null>(null);
  const [worstCoin, setWorstCoin] = useState<{ symbol: string; data: PortfolioData } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated coins data
        const simulatedCoins = [
          { id: 'alpha', symbol: 'A', name: 'Alpha Coin', current_price: 100, price_change_percentage_24h: 5.2 },
          { id: 'beta', symbol: 'B', name: 'Beta Coin', current_price: 200, price_change_percentage_24h: -3.8 },
          { id: 'gamma', symbol: 'C', name: 'Gamma Coin', current_price: 300, price_change_percentage_24h: 2.1 },
          { id: 'delta', symbol: 'X', name: 'Delta Coin', current_price: 400, price_change_percentage_24h: -1.5 }
        ];

        setCoins(simulatedCoins);

        // Generate rising trend for Alpha Coin
        const bestData = generateTrendData(100, true);
        setBestCoin({
          symbol: 'A',
          data: bestData
        });

        // Generate falling trend for Beta Coin
        const worstData = generateTrendData(200, false);
        setWorstCoin({
          symbol: 'B',
          data: worstData
        });

        // Generate portfolio data if user is logged in
        if (user) {
          const portfolio = generatePortfolioData();
          setPortfolioData(portfolio);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const generateTrendData = (startPrice: number, isRising: boolean) => {
    const dates: string[] = [];
    const values: number[] = [];
    const days = 7;
    let currentPrice = startPrice;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);

      // Generate trend with some random noise
      const trendFactor = isRising ? 1.02 : 0.98; // 2% up or down per day
      const noise = (Math.random() * 0.02) - 0.01; // ±1% random noise
      currentPrice = currentPrice * (trendFactor + noise);
      values.push(Number(currentPrice.toFixed(2)));
    }

    return { dates, values };
  };

  const generatePortfolioData = () => {
    const dates: string[] = [];
    const values: number[] = [];
    const days = 7; // Reduced to 7 days
    const initialValue = user?.balance || 10000;

    // Calculate total portfolio value including coins
    const totalValue = coins.reduce((total, coin) => {
      const userCoin = user?.coins?.find((uc: UserCoin) => uc.coinId === coin.id);
      return total + (userCoin ? userCoin.amount * coin.current_price : 0);
    }, initialValue);

    // Generate simulated historical data starting from current total value
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);

      const randomChange = (Math.random() * 0.06) - 0.03; // ±3% daily change
      const value = i === days - 1 ? totalValue : values[values.length - 1] * (1 + randomChange);
      values.push(Number(value.toFixed(2)));
    }

    return { dates, values };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(57, 255, 20, 0.1)',
        },
        ticks: {
          color: '#39FF14',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5
        },
      },
      y: {
        grid: {
          color: 'rgba(57, 255, 20, 0.1)',
        },
        ticks: {
          color: '#39FF14',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#39FF14] relative overflow-hidden">
        <div className="fixed inset-0 z-0 bg-black"></div>
        <Navbar />
        <main className="relative z-40 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#39FF14]"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#39FF14] relative overflow-hidden">
      <div className="fixed inset-0 z-0 bg-black"></div>
      <Navbar />
      
      <main className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {error && (
          <div className="mb-8 p-4 border border-red-500 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* All Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Portfolio Performance */}
            <div className="p-4 border border-[#39FF14]/20 rounded-lg backdrop-blur-sm bg-black/20">
              <h2 className="text-xl font-bold mb-2">Portfolio (7d)</h2>
              <div className="h-[200px]">
                <Line
                  data={{
                    labels: portfolioData.dates,
                    datasets: [{
                      label: 'Value',
                      data: portfolioData.values,
                      borderColor: '#39FF14',
                      backgroundColor: 'rgba(57, 255, 20, 0.1)',
                      tension: 0.4,
                      fill: true,
                    }],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Best Performing Coin */}
            {bestCoin && (
              <div className="p-4 border border-[#39FF14]/20 rounded-lg backdrop-blur-sm bg-black/20">
                <h2 className="text-xl font-bold mb-2">Rising: {bestCoin.symbol}</h2>
                <div className="h-[200px]">
                  <Line
                    data={{
                      labels: bestCoin.data.dates,
                      datasets: [{
                        label: 'Price',
                        data: bestCoin.data.values,
                        borderColor: '#39FF14',
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        tension: 0.4,
                        fill: true,
                      }],
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            )}

            {/* Worst Performing Coin */}
            {worstCoin && (
              <div className="p-4 border border-[#39FF14]/20 rounded-lg backdrop-blur-sm bg-black/20">
                <h2 className="text-xl font-bold mb-2">Falling: {worstCoin.symbol}</h2>
                <div className="h-[200px]">
                  <Line
                    data={{
                      labels: worstCoin.data.dates,
                      datasets: [{
                        label: 'Price',
                        data: worstCoin.data.values,
                        borderColor: '#39FF14',
                        backgroundColor: 'rgba(57, 255, 20, 0.1)',
                        tension: 0.4,
                        fill: true,
                      }],
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Top Gainers and Losers Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-[#39FF14]/20 rounded-lg backdrop-blur-sm bg-black/20">
              <h2 className="text-2xl font-bold mb-4">Top Gainers (24h)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-[#39FF14]/20">
                      <th className="pb-2">Coin</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...coins]
                      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                      .slice(0, 5)
                      .map((coin) => (
                        <tr key={coin.id} className="border-b border-[#39FF14]/10">
                          <td className="py-2">{coin.symbol.toUpperCase()}</td>
                          <td className="py-2">${coin.current_price.toFixed(2)}</td>
                          <td className="py-2 text-[#39FF14]">+{coin.price_change_percentage_24h.toFixed(2)}%</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 border border-[#39FF14]/20 rounded-lg backdrop-blur-sm bg-black/20">
              <h2 className="text-2xl font-bold mb-4">Top Losers (24h)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-[#39FF14]/20">
                      <th className="pb-2">Coin</th>
                      <th className="pb-2">Price</th>
                      <th className="pb-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...coins]
                      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                      .slice(0, 5)
                      .map((coin) => (
                        <tr key={coin.id} className="border-b border-[#39FF14]/10">
                          <td className="py-2">{coin.symbol.toUpperCase()}</td>
                          <td className="py-2">${coin.current_price.toFixed(2)}</td>
                          <td className="py-2 text-red-500">{coin.price_change_percentage_24h.toFixed(2)}%</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
