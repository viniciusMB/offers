import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodaysOffersDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  take: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  skip: number;
}
