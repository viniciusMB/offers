import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { CurrencyModule } from './currency/currency.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [UserModule, WalletModule, CurrencyModule, OfferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
