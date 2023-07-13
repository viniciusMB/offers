import { Prisma } from '@prisma/client';

export const offersArray = [
  {
    id: '1',
    price: 10,
    quantity: 10,
    userId: '123',
    createdAt: '2023-07-13T10:30:00.000Z',
    deleted: false,
    currencyId: '456',
    walletId: '789',
  },
  {
    id: '456',
    price: 20,
    quantity: 10,
    userId: '123',
    createdAt: '2023-07-13T10:30:00.000Z',
    deleted: false,
    currencyId: '456',
    walletId: '789',
  },
];

export const oneOffer = offersArray[0];

export const createdOffer = {
  id: '1',
  deleted: false,
  createdAt: '2023-07-13T10:30:00.000Z',
  price: 10,
  quantity: new Prisma.Decimal(10),
  userId: '123',
  currencyId: '456',
  walletId: '789',
};

export const createdOfferUsecase = {
  id: '1',
  deleted: false,
  createdAt: new Date(),
  price: 10,
  quantity: new Prisma.Decimal(5),
  userId: '123',
  currencyId: 'testCurrencyId',
  walletId: '789',
};
