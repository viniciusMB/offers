import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  currencyId: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Prisma.Decimal(value))
  quantity: Prisma.Decimal;
}
