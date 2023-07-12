import { Prisma } from '@prisma/client';

export interface Wallet {
  id: string;
  quantity: Prisma.Decimal;
  userId: string;
  currencyId: string;
}
