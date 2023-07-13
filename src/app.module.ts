import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { OfferModule } from './offer/offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { OfferController } from './offer/offer.controller';

@Module({
  imports: [WalletModule, OfferModule, PrismaModule],
  controllers: [OfferController],
  providers: [],
})
export class AppModule {}
