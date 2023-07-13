import { Test, TestingModule } from '@nestjs/testing';
import { OfferRepository } from './offer.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { createdOffer, offersArray, oneOffer } from '../mocks/repository.mock';

const db = {
  offer: {
    findMany: jest.fn().mockResolvedValue(offersArray),
    findUnique: jest.fn().mockResolvedValue(oneOffer),
    findFirst: jest.fn().mockResolvedValue(oneOffer),
    create: jest.fn().mockReturnValue(createdOffer),
    save: jest.fn(),
    updateMany: jest.fn(),
    count: jest.fn().mockResolvedValue(5),
    delete: jest.fn().mockResolvedValue(oneOffer),
  },
};

describe('OfferRepository', () => {
  let repository: OfferRepository;
  let prismaService: PrismaService;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferRepository,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    repository = module.get(OfferRepository);
    prismaService = module.get(PrismaService);
  });

  describe('todaysOffers', () => {
    it("should return today's offers", async () => {
      const today = '2023-07-13T10:30:00.000Z';
      const take = 10;
      const skip = 0;

      const result = await repository.todaysOffers(take, skip);

      expect(result).toEqual(offersArray);
      expect(prismaService.offer.findMany).toHaveBeenCalledWith({
        skip,
        take,
        where: {
          createdAt: { gte: new Date() },
          deleted: false,
        },
        include: {
          user: true,
          currency: true,
          wallet: true,
        },
      });
    });
  });

  describe('userTodaysOffers', () => {
    it("should return the count of the user's offers for today", async () => {
      const today = '2023-07-13T10:30:00.000Z';
      const userId = '123';

      const expectedCount = 5;

      const result = await repository.userTodaysOffers(userId);

      expect(result).toBe(expectedCount);
      expect(prismaService.offer.count).toHaveBeenCalledWith({
        where: {
          createdAt: { gte: new Date() },
          deleted: false,
          userId,
        },
      });
    });
  });

  describe('create', () => {
    it('should create a new offer', async () => {
      const { createdAt, id, deleted, ...input } = createdOffer;
      const result = await repository.create(input);

      expect(result).toEqual(createdOffer);
      expect(prismaService.offer.create).toHaveBeenCalledWith({
        data: {
          price: createdOffer.price,
          quantity: createdOffer.quantity,
          user: { connect: { id: createdOffer.userId } },
          currency: { connect: { id: createdOffer.currencyId } },
          wallet: { connect: { id: createdOffer.walletId } },
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete an offer', async () => {
      const userId = '123';
      const offerId = '456';

      const result = await repository.delete(userId, offerId);

      expect(result).toBeUndefined();
      expect(prismaService.offer.updateMany).toHaveBeenCalledWith({
        where: {
          id: offerId,
          userId,
        },
        data: {
          deleted: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should find a specific offer', async () => {
      const userId = '123';
      const offerId = '456';

      const result = await repository.findOne(userId, offerId);

      expect(result).toEqual(offersArray[0]);
      expect(prismaService.offer.findFirst).toHaveBeenCalledWith({
        where: {
          deleted: false,
          userId,
          id: offerId,
        },
      });
    });
  });
});
