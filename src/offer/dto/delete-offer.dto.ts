import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOfferDto {
  @IsNotEmpty()
  @IsString()
  offerId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
