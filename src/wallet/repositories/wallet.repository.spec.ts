import { Test, TestingModule } from '@nestjs/testing';
import { WalletRepository } from './wallet.repository';

describe('WalletRepository', () => {
  let repository: WalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletRepository],
    }).compile();

    repository = module.get<WalletRepository>(WalletRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
