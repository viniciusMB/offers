import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Wallet } from './models/wallet.model';

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneOrFail(walletId: string): Promise<Wallet> {
    return this.prismaService.wallet.findUniqueOrThrow({
      where: { id: walletId },
    });
  }
}
