import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Coin fiyatlarını güncelle (her istek geldiğinde %1 ile %5 arası değişim)
async function updateCoinPrices() {
  const coins = await prisma.coin.findMany();
  
  for (const coin of coins) {
    // -5% ile +5% arası rastgele değişim
    const changePercent = (Math.random() - 0.5) * 0.1;
    const newPrice = coin.price * (1 + changePercent);
    
    await prisma.coin.update({
      where: { id: coin.id },
      data: { price: newPrice }
    });
  }
}

export async function GET() {
  try {
    // Her GET isteğinde fiyatları güncelle
    await updateCoinPrices();
    const coins = await prisma.coin.findMany();
    return NextResponse.json(coins);
  } catch (error) {
    console.error('Error fetching coins:', error);
    return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
  }
}

// Coin satın alma
export async function POST(request: Request) {
  try {
    const { userId, coinId, amount } = await request.json();

    // Get user and coin
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const coin = await prisma.coin.findUnique({ where: { id: coinId } });

    if (!user || !coin) {
      return NextResponse.json({ error: 'User or coin not found' }, { status: 404 });
    }

    // Calculate total cost
    const totalCost = coin.price * amount;

    // Check if user has enough balance
    if (user.balance < totalCost) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Start transaction
    const transaction = await prisma.$transaction(async (prisma) => {
      // Update user balance
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { balance: user.balance - totalCost }
      });

      // Update or create user coin
      const userCoin = await prisma.userCoin.upsert({
        where: {
          userId_coinId: { userId, coinId }
        },
        update: {
          amount: { increment: amount }
        },
        create: {
          userId,
          coinId,
          amount
        }
      });

      return { user: updatedUser, userCoin };
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error buying coin:', error);
    return NextResponse.json({ error: 'Failed to process purchase' }, { status: 500 });
  }
} 