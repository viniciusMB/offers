import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferRepository } from './repositories/offer.repository';
import { CreateOfferUseCase } from './useCases/create-offer.usecase';
import { DeleteOfferUseCase } from './useCases/delete-offer.usecase';
import { HttpStatus } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { DeleteOfferDto } from './dto/delete-offer.dto';
import { Prisma } from '@prisma/client';

describe('OfferController', () => {
  let controller: OfferController;
  let offerRepository: OfferRepository;
  let createOfferUseCase: CreateOfferUseCase;
  let deleteOfferUseCase: DeleteOfferUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [
        {
          provide: OfferRepository,
          useValue: {
            todaysOffers: jest.fn(),
          },
        },
        {
          provide: CreateOfferUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteOfferUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OfferController>(OfferController);
    offerRepository = module.get<OfferRepository>(OfferRepository);
    createOfferUseCase = module.get<CreateOfferUseCase>(CreateOfferUseCase);
    deleteOfferUseCase = module.get<DeleteOfferUseCase>(DeleteOfferUseCase);
  });

  describe('todaysOffers', () => {
    it('should call offerRepository.todaysOffers with correct parameters', () => {
      const take = 10;
      const skip = 0;

      controller.todaysOffers(take, skip);

      expect(offerRepository.todaysOffers).toHaveBeenCalledWith(10, 0);
    });
  });

  describe('create', () => {
    it('should call createOfferUseCase.execute with correct parameter', async () => {
      const createOfferDto: CreateOfferDto = {
        walletId: 'walletId',
        userId: 'userId',
        currencyId: 'currencyId',
        price: 100,
        quantity: new Prisma.Decimal(10.5),
      };

      await controller.create(createOfferDto);

      expect(createOfferUseCase.execute).toHaveBeenCalledWith(createOfferDto);
    });
  });

  describe('delete', () => {
    it('should call deleteOfferUseCase.execute and return HttpStatus.NO_CONTENT', async () => {
      const deleteOfferDto: DeleteOfferDto = {
        offerId: 'offerId',
        userId: 'userId',
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.delete(deleteOfferDto, res);

      expect(deleteOfferUseCase.execute).toHaveBeenCalledWith(deleteOfferDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
