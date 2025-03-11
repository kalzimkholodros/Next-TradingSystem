import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Son 30 günlük performans verilerini oluştur
function generatePerformanceData(startValue: number) {
  const dates = [];
  const values = [];
  let currentValue = startValue;

  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);

    // Rastgele değişim (%10 artış veya azalış)
    const change = Math.random() < 0.5 ? 0.9 : 1.1;
    currentValue *= change;
    values.push(Number(currentValue.toFixed(2)));
  }

  return { dates, values };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Kullanıcının coinlerini getir
    const userCoins = await prisma.userCoin.findMany({
      where: { userId },
      include: {
        coin: true
      }
    });

    // Her coin için performans verisi oluştur
    const coinPerformances = userCoins.map(userCoin => ({
      symbol: userCoin.coin.symbol,
      performance: generatePerformanceData(userCoin.coin.price * userCoin.amount)
    }));

    // En iyi ve en kötü performans gösteren coinleri bul
    let bestCoin = null;
    let worstCoin = null;

    if (coinPerformances.length > 0) {
      bestCoin = coinPerformances.reduce((best, current) => {
        const bestReturn = (best.performance.values[best.performance.values.length - 1] / best.performance.values[0]) - 1;
        const currentReturn = (current.performance.values[current.performance.values.length - 1] / current.performance.values[0]) - 1;
        return currentReturn > bestReturn ? current : best;
      });

      worstCoin = coinPerformances.reduce((worst, current) => {
        const worstReturn = (worst.performance.values[worst.performance.values.length - 1] / worst.performance.values[0]) - 1;
        const currentReturn = (current.performance.values[current.performance.values.length - 1] / current.performance.values[0]) - 1;
        return currentReturn < worstReturn ? current : worst;
      });
    }

    // Toplam portföy değeri için performans verisi oluştur
    const totalValue = userCoins.reduce((sum, userCoin) => sum + userCoin.coin.price * userCoin.amount, 0);
    const portfolioPerformance = generatePerformanceData(totalValue);

    return NextResponse.json({
      portfolio: portfolioPerformance,
      bestCoin,
      worstCoin
    });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json({ error: 'Failed to fetch performance data' }, { status: 500 });
  }
} 