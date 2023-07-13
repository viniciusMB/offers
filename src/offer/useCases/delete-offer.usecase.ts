import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteOfferDto } from '../dto/delete-offer.dto';
import { OfferRepository } from '../repositories/offer.repository';

@Injectable()
export class DeleteOfferUseCase {
  constructor(private readonly offerRepository: OfferRepository) {}

  async execute(input: DeleteOfferDto) {
    const { userId, offerId } = input;
    const userOffer = await this.offerRepository.findOne(userId, offerId);

    if (!userOffer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Offer not found!',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.offerRepository.delete(userId, offerId);
    return result;
  }
}
