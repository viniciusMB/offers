import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteOfferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  offerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
