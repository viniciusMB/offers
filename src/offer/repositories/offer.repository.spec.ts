import { Test, TestingModule } from '@nestjs/testing';
import { OfferRepository } from './offer.repository';

describe('OfferRepository', () => {
  let service: OfferRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferRepository],
    }).compile();

    service = module.get<OfferRepository>(OfferRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
