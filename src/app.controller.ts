import { PrismaService } from './prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getFoods() {
    return this.prismaService.user.findMany();
  }
}
