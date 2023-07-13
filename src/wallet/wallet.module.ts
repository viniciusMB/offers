import { Module } from '@nestjs/common';
import { WalletRepository } from './repositories/wallet.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [WalletRepository],
  exports: [WalletRepository],
})
export class WalletModule {}
