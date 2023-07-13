import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { DeleteOfferDto } from './dto/delete-offer.dto';
import { OfferRepository } from './repositories/offer.repository';
import { CreateOfferUseCase } from './useCases/create-offer.usecase';
import { DeleteOfferUseCase } from './useCases/delete-offer.usecase';

@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly createOfferUseCase: CreateOfferUseCase,
    private readonly deleteOfferUseCase: DeleteOfferUseCase,
  ) {}

  @Get()
  todaysOffers(@Query('take') take = 1, @Query('skip') skip = 1) {
    take = take > 20 ? 20 : take;
    return this.offerRepository.todaysOffers(+take, +skip);
  }

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto) {
    return this.createOfferUseCase.execute(createOfferDto);
  }

  @Delete()
  async delete(@Body() deleteOfferDto: DeleteOfferDto) {
    return this.deleteOfferUseCase.execute(deleteOfferDto);
  }
}
