import { Test, TestingModule } from '@nestjs/testing';
import { OfferRepository } from './offer.repository';

describe('OfferRepository', () => {
  let repository: OfferRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferRepository],
    }).compile();

    repository = module.get<OfferRepository>(OfferRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
