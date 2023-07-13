import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { CreateOfferUseCase } from './create-offer.usecase';
import { OfferRepository } from '../repositories/offer.repository';
import { WalletRepository } from '../../wallet/repositories/wallet.repository';
import { createdOfferUsecase } from '../mocks/repository.mock';

describe('CreateOfferUseCase', () => {
  let createOfferUseCase: CreateOfferUseCase;
  let offerRepository: OfferRepository;
  let walletRepository: WalletRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateOfferUseCase,
        {
          provide: OfferRepository,
          useValue: {
            create: jest.fn(),
            userTodaysOffers: jest.fn(),
          },
        },
        {
          provide: WalletRepository,
          useValue: {
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    createOfferUseCase = moduleRef.get<CreateOfferUseCase>(CreateOfferUseCase);
    offerRepository = moduleRef.get<OfferRepository>(OfferRepository);
    walletRepository = moduleRef.get<WalletRepository>(WalletRepository);
  });

  describe('execute', () => {
    const createOfferDto: CreateOfferDto = {
      walletId: 'testWalletId',
      userId: 'testUserId',
      currencyId: 'testCurrencyId',
      price: 10,
      quantity: new Prisma.Decimal(1),
    };

    it('should create an offer when conditions are met', async () => {
      const walletMock = {
        id: 'testWalletId',
        userId: 'testUserId',
        quantity: new Prisma.Decimal(20),
        currencyId: 'testCurrencyId',
      };

      jest
        .spyOn(walletRepository, 'findOneOrFail')
        .mockResolvedValueOnce(walletMock);
      jest.spyOn(offerRepository, 'userTodaysOffers').mockResolvedValueOnce(3);
      jest
        .spyOn(offerRepository, 'create')
        .mockResolvedValueOnce(createdOfferUsecase);

      const result = await createOfferUseCase.execute(createOfferDto);

      expect(walletRepository.findOneOrFail).toHaveBeenCalledWith(
        'testWalletId',
      );
      expect(offerRepository.userTodaysOffers).toHaveBeenCalledWith(
        'testUserId',
      );
      expect(offerRepository.create).toHaveBeenCalledWith(createOfferDto);
      expect(result).toEqual(createdOfferUsecase);
    });

    it('should throw HttpException when wallet has insufficient funds', async () => {
      const walletMock = {
        id: 'testWalletId',
        userId: 'testWalletId',
        quantity: new Prisma.Decimal(0),
        currencyId: 'testCurrencyId',
      };

      jest
        .spyOn(walletRepository, 'findOneOrFail')
        .mockResolvedValueOnce(walletMock);

      await expect(
        createOfferUseCase.execute(createOfferDto),
      ).rejects.toThrowError(
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Insufficient funds in this wallet!',
          },
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw BadRequestException when user exceeds daily offer limit', async () => {
      const walletMock = {
        id: '1',
        userId: '1',
        quantity: new Prisma.Decimal(20),
        currencyId: 'testCurrencyId',
      };

      jest
        .spyOn(walletRepository, 'findOneOrFail')
        .mockResolvedValueOnce(walletMock);
      jest.spyOn(offerRepository, 'userTodaysOffers').mockResolvedValueOnce(5);

      await expect(
        createOfferUseCase.execute(createOfferDto),
      ).rejects.toThrowError(
        new BadRequestException('Daily limit for offers reached!', {
          description:
            'You can only create five offers per day. Please delete one or try again tomorrow.',
        }),
      );
    });
  });
});
