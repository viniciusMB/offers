import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create currencies
    const currency1 = await prisma.currency.create({
      data: {
        name: 'USD',
      },
    });

    const currency2 = await prisma.currency.create({
      data: {
        name: 'EUR',
      },
    });

    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    });

    // Create wallets
    const wallet1 = await prisma.wallet.create({
      data: {
        quantity: 100.0,
        currency: {
          connect: { id: currency1.id },
        },
        user: {
          connect: { id: user1.id },
        },
      },
    });

    const wallet2 = await prisma.wallet.create({
      data: {
        quantity: 200.0,
        currency: {
          connect: { id: currency2.id },
        },
        user: {
          connect: { id: user1.id },
        },
      },
    });

    const wallet3 = await prisma.wallet.create({
      data: {
        quantity: 500.0,
        currency: {
          connect: { id: currency1.id },
        },
        user: {
          connect: { id: user2.id },
        },
      },
    });

    await prisma.offer.createMany({
      data: [
        {
          price: 10,
          quantity: 5.0,
          currencyId: currency1.id,
          walletId: wallet1.id,
          userId: user1.id,
        },
        {
          price: 20,
          quantity: 10.0,
          currencyId: currency2.id,
          walletId: wallet2.id,
          userId: user1.id,
        },
        {
          price: 12,
          quantity: 4.0,
          currencyId: currency1.id,
          walletId: wallet3.id,
          userId: user2.id,
        },
      ],
    });

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
