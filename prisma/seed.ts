import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing coins
  await prisma.userCoin.deleteMany();
  await prisma.coin.deleteMany();

  // Create initial coins
  const coins = await Promise.all([
    prisma.coin.create({
      data: {
        symbol: 'A',
        name: 'Alpha Coin',
        price: 100
      }
    }),
    prisma.coin.create({
      data: {
        symbol: 'B',
        name: 'Beta Coin',
        price: 200
      }
    }),
    prisma.coin.create({
      data: {
        symbol: 'C',
        name: 'Gamma Coin',
        price: 300
      }
    }),
    prisma.coin.create({
      data: {
        symbol: 'X',
        name: 'Delta Coin',
        price: 400
      }
    })
  ]);

  console.log('Seeded coins:', coins);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 