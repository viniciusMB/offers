import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { OfferRepository } from '../repositories/offer.repository';

@Injectable()
export class CreateOfferUseCase {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly walletService: WalletService,
  ) {}

  async execute(input: CreateOfferDto) {
    const { walletId, quantity, currencyId, userId } = input;

    const wallet = await this.walletService.findOneOrFail(walletId);

    if (wallet.quantity < quantity && wallet.currencyId !== currencyId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Insufficient funds in this wallet!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userTodaysOffers = await this.offerRepository.userTodaysOffers(
      userId,
    );

    if (userTodaysOffers >= 5)
      throw new BadRequestException('Daily limit for offers reached!', {
        description:
          'You can only create five offers per day. Please delete one or try again tomorrow.',
      });

    return this.offerRepository.create(input);
  }
}
