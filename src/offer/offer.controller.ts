import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private readonly walletService: WalletService,
  ) {}

  @Get()
  todaysOffers(@Query('take') take = 1, @Query('skip') skip = 1) {
    take = take > 20 ? 20 : take;
    return this.offerService.todaysOffers(+take, +skip);
  }

  //TODO: Migrar lógica pra useCase
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto) {
    const { walletId, quantity, currencyId, userId, price } = createOfferDto;
    const quantityFormated = new Prisma.Decimal(quantity); //TODO : colocar conversão direto no pipe
    const wallet = await this.walletService.findOneOrFail(walletId);
    if (
      wallet.quantity < quantityFormated &&
      wallet.currencyId !== currencyId
    ) {
      throw new Error('Bad request!');
    }

    const userTodaysOffers = await this.offerService.userTodaysOffers(userId);

    if (userTodaysOffers >= 5) throw new Error('Daily offers limit reached!'); // TODO: custom error

    return this.offerService.create({
      walletId,
      quantity,
      currencyId,
      userId,
      price,
    });
  }
}
