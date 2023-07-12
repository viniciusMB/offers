import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create currencies
    const currency1 = await prisma.currency.create({
      data: {
        name: 'BTC',
      },
    });

    const currency2 = await prisma.currency.create({
      data: {
        name: 'LSK',
      },
    });

    // Create users
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        wallets: {
          create: [
            {
              quantity: 100.0,
              currency: {
                connect: { id: currency1.id },
              },
            },
            {
              quantity: 200.0,
              currency: {
                connect: { id: currency2.id },
              },
            },
          ],
        },
        offers: {
          create: [
            {
              price: 10,
              quantity: 5,
              currency: {
                connect: { id: currency1.id },
              },
            },
            {
              price: 20,
              quantity: 10,
              currency: {
                connect: { id: currency2.id },
              },
            },
          ],
        },
      },
    });

    await prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        wallets: {
          create: [
            {
              quantity: 500.0,
              currency: {
                connect: { id: currency1.id },
              },
            },
          ],
        },
        offers: {
          create: [
            {
              price: 15,
              quantity: 8,
              currency: {
                connect: { id: currency1.id },
              },
            },
          ],
        },
      },
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
