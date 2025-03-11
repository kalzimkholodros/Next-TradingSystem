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

interface PerformanceData {
  dates: string[];
  values: number[];
}

export default function DashboardPage() {
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [portfolioPerformance, setPortfolioPerformance] = useState<PerformanceData>({ dates: [], values: [] });
  const [bestCoin, setBestCoin] = useState<{ symbol: string; performance: PerformanceData } | null>(null);
  const [worstCoin, setWorstCoin] = useState<{ symbol: string; performance: PerformanceData } | null>(null);

  useEffect(() => {
    if (user) {
      fetchPerformanceData();
    }
  }, [user]);

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch(`/api/user/performance?userId=${user?.id}`);
      const data = await response.json();
      
      setPortfolioPerformance(data.portfolio);
      setBestCoin(data.bestCoin);
      setWorstCoin(data.worstCoin);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch performance data');
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(57, 255, 20, 0.1)',
        },
        ticks: {
          color: '#39FF14',
        }
      },
      x: {
        grid: {
          color: 'rgba(57, 255, 20, 0.1)',
        },
        ticks: {
          color: '#39FF14',
        }
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-[#39FF14] relative overflow-hidden">
        <div className="fixed inset-0 z-0 bg-black"></div>
        <Navbar />
        <main className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
            <p className="text-lg text-[#39FF14]/70">Please login to view your dashboard.</p>
          </div>
        </main>
      </div>
    );
  }

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
      {/* Simple Background */}
      <div className="fixed inset-0 z-0 bg-black"></div>

      <Navbar />

      {/* Main Content */}
      <main className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold mb-8">
              Your<span className="text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-[#39FF14]">Dashboard</span>
            </h1>
            <div className="absolute -inset-1 bg-[#39FF14]/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <p className="text-xl mb-12 text-[#39FF14]/80 max-w-2xl mx-auto">
            Track your portfolio performance and market analysis in real-time.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Portfolio Performance</h2>
            <Line
              data={{
                labels: portfolioPerformance.dates,
                datasets: [
                  {
                    label: 'Portfolio Value',
                    data: portfolioPerformance.values,
                    borderColor: '#39FF14',
                    tension: 0.4
                  }
                ]
              }}
              options={chartOptions}
            />
          </div>

          <div className="p-6 border border-[#39FF14]/20 rounded-xl bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Best & Worst Performers</h2>
            <div className="space-y-6">
              {bestCoin && (
                <div className="p-4 border border-[#39FF14]/20 rounded-lg">
                  <h3 className="text-lg font-bold text-green-400 mb-2">Best: {bestCoin.symbol}</h3>
                  <Line
                    data={{
                      labels: bestCoin.performance.dates,
                      datasets: [
                        {
                          label: 'Performance',
                          data: bestCoin.performance.values,
                          borderColor: '#39FF14',
                          tension: 0.4
                        }
                      ]
                    }}
                    options={chartOptions}
                  />
                </div>
              )}

              {worstCoin && (
                <div className="p-4 border border-[#39FF14]/20 rounded-lg">
                  <h3 className="text-lg font-bold text-red-400 mb-2">Worst: {worstCoin.symbol}</h3>
                  <Line
                    data={{
                      labels: worstCoin.performance.dates,
                      datasets: [
                        {
                          label: 'Performance',
                          data: worstCoin.performance.values,
                          borderColor: '#FF3939',
                          tension: 0.4
                        }
                      ]
                    }}
                    options={chartOptions}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-3 bg-[#39FF14]/10 border border-[#39FF14] rounded-lg 
                           hover:bg-[#39FF14]/20 hover:shadow-[0_0_30px_#39FF14] 
                           transition-all duration-300 font-semibold">
              View Detailed Analytics
            </button>
            <button className="px-8 py-3 bg-black border border-[#39FF14]/50 rounded-lg 
                           hover:border-[#39FF14] hover:shadow-[0_0_30px_#39FF14] 
                           transition-all duration-300 font-semibold">
              Download Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 