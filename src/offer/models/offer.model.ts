import { Prisma } from '@prisma/client';

export interface Offer {
  price: number;
  quantity: number;
  walletId: string;
  userId: string;
  currencyId: string;
}
