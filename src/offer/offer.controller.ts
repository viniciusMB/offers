import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { DeleteOfferDto } from './dto/delete-offer.dto';
import { TodaysOffersDto } from './dto/todays-offers-dto';
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

  @Get('/')
  todaysOffers(@Query() todaysOffersDto: TodaysOffersDto) {
    const { take = 1, skip = 0 } = todaysOffersDto;
    const takeFiltered = take > 20 ? 20 : take;
    return this.offerRepository.todaysOffers(+takeFiltered, +skip);
  }

  @Post('/')
  async create(@Body() createOfferDto: CreateOfferDto) {
    return this.createOfferUseCase.execute(createOfferDto);
  }

  @Delete('/')
  async delete(@Body() deleteOfferDto: DeleteOfferDto, @Res() res) {
    await this.deleteOfferUseCase.execute(deleteOfferDto);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
