import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DeleteOfferDto } from '../dto/delete-offer.dto';
import { DeleteOfferUseCase } from './delete-offer.usecase';
import { OfferRepository } from '../repositories/offer.repository';

describe('DeleteOfferUseCase', () => {
  let deleteOfferUseCase: DeleteOfferUseCase;
  let offerRepository: OfferRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteOfferUseCase,
        {
          provide: OfferRepository,
          useValue: {
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteOfferUseCase = moduleRef.get<DeleteOfferUseCase>(DeleteOfferUseCase);
    offerRepository = moduleRef.get<OfferRepository>(OfferRepository);
  });

  describe('execute', () => {
    it('should delete an offer and return the result', async () => {
      const userId = 'user-id';
      const offerId = 'offer-id';
      const deleteOfferDto: DeleteOfferDto = {
        userId,
        offerId,
      };
      const userOffer = { id: offerId, userId };

      offerRepository.findOne = jest.fn().mockResolvedValue(userOffer);

      offerRepository.delete = jest
        .fn()
        .mockResolvedValue({ message: 'Offer deleted successfully' });

      const result = await deleteOfferUseCase.execute(deleteOfferDto);

      expect(offerRepository.findOne).toHaveBeenCalledWith(userId, offerId);
      expect(offerRepository.delete).toHaveBeenCalledWith(userId, offerId);
      expect(result).toEqual({ message: 'Offer deleted successfully' });
    });

    it('should throw an HttpException if the offer is not found', async () => {
      const userId = 'user-id';
      const offerId = 'offer-id';
      const deleteOfferDto: DeleteOfferDto = {
        userId,
        offerId,
      };

      offerRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        deleteOfferUseCase.execute(deleteOfferDto),
      ).rejects.toThrowError(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Offer not found!',
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
