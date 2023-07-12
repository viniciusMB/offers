import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferRepository } from './repositories/offer.repository';
import { CreateOfferUseCase } from './useCases/create-offer.usecase';

@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly createOfferUseCase: CreateOfferUseCase,
  ) {}

  @Get()
  todaysOffers(@Query('take') take = 1, @Query('skip') skip = 1) {
    take = take > 20 ? 20 : take;
    return this.offerRepository.todaysOffers(+take, +skip);
  }

  //TODO: Migrar lógica pra useCase
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto) {
    return this.createOfferUseCase.execute(createOfferDto);
  }
}
