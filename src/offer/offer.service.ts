import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async todaysOffers(take: number, skip: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
    const offers = await this.prisma.offer.findMany({
      skip,
      take,
      where: {
        createdAt: {
          gte: today,
        },
        deleted: false,
      },
      include: {
        user: true,
        currency: true,
      },
    });

    return offers;
  }
}
