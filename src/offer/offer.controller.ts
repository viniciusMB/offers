import { Controller, Get, Query } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  async todaysOffers(@Query('take') take = 1, @Query('skip') skip = 1) {
    take = take > 20 ? 20 : take;
    return this.offerService.todaysOffers(+take, +skip);
  }
}
