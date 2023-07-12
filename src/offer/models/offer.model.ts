import { Prisma } from '@prisma/client';

export interface Offer {
  price: number;
  quantity: Prisma.Decimal;
  walletId: string;
  userId: string;
  currencyId: string;
}
