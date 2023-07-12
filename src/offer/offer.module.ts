import { Module } from '@nestjs/common';
import { OfferRepository } from './repositories/offer.repository';
import { OfferController } from './offer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { CreateOfferUseCase } from './useCases/create-offer.usecase';

@Module({
  imports: [PrismaModule, WalletModule],
  controllers: [OfferController],
  providers: [OfferRepository, CreateOfferUseCase],
  exports: [OfferRepository, CreateOfferUseCase],
})
export class OfferModule {}
