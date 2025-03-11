import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userCoins = await prisma.userCoin.findMany({
      where: { userId },
      include: {
        coin: true
      }
    });

    return NextResponse.json(userCoins);
  } catch (error) {
    console.error('Error fetching user coins:', error);
    return NextResponse.json({ error: 'Failed to fetch user coins' }, { status: 500 });
  }
} 