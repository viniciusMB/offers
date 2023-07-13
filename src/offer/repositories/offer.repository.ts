import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Offer } from '../models/offer.model';

@Injectable()
export class OfferRepository {
  constructor(private prismaService: PrismaService) {}

  async todaysOffers(take: number, skip: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

    return this.prismaService.offer.findMany({
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
        wallet: true,
      },
    });
  }

  async userTodaysOffers(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

    return this.prismaService.offer.count({
      where: {
        createdAt: {
          gte: today,
        },
        deleted: false,
        userId: userId,
      },
    });
  }

  async create(offer: Offer) {
    const { userId, currencyId, walletId, ...offerFormated } = offer;
    return this.prismaService.offer.create({
      data: {
        ...offerFormated,
        user: {
          connect: { id: userId },
        },
        currency: { connect: { id: currencyId } },
        wallet: { connect: { id: walletId } },
      },
    });
  }

  async delete(userId: string, offerId: string) {
    return this.prismaService.offer.updateMany({
      where: {
        id: offerId,
        userId: userId,
      },
      data: {
        deleted: true,
      },
    });
  }

  async findOne(userId: string, offerId: string) {
    return this.prismaService.offer.findFirst({
      where: {
        deleted: false,
        userId: userId,
        id: offerId,
      },
    });
  }
}
