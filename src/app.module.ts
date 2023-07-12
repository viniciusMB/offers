import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { CurrencyModule } from './currency/currency.module';
import { OfferModule } from './offer/offer.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { OfferController } from './offer/offer.controller';

@Module({
  imports: [
    UserModule,
    WalletModule,
    CurrencyModule,
    OfferModule,
    PrismaModule,
  ],
  controllers: [AppController, OfferController],
  providers: [],
})
export class AppModule {}
