import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from 'src/repository/baseRepository';
import {
  EnglishCenterData,
  EnglishCenterResponse,
} from './dto/interfaces/english_center.interface';

@Injectable()
export class EnglishCenterRepository extends BaseRepository<
  EnglishCenterData,
  any
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.english_center);
  }

  async findById(center_id: string): Promise<EnglishCenterResponse | null> {
    return this.model.findUnique({
      where: { center_id },
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
        logo_url: true,
      },
    });
  }

  async findByName(center_name: string): Promise<EnglishCenterData | null> {
    return this.model.findFirst({
      where: { center_name },
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
        logo_url: true,
      },
    });
  }

  async findAllCenters(): Promise<EnglishCenterResponse[]> {
    return this.model.findMany({
      orderBy: {
        center_name: 'asc',
      },
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
      },
    });
  }

  async paginateCenters(
    page: number,
    pageSize: number,
    searchText?: string,
  ): Promise<[EnglishCenterResponse[], number]> {
    const skip = (page - 1) * pageSize;
    const where = searchText
      ? { center_name: { contains: searchText, mode: 'insensitive' } }
      : undefined;

    const [data, count] = await Promise.all([
      this.model.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: {
          center_name: 'asc',
        },
        select: {
          center_id: true,
          center_name: true,
          address: true,
          contact_email: true,
          contact_phone: true,
          logo_url: true,
        },
      }),
      this.model.count({ where }),
    ]);

    return [data, count];
  }

  async createCenter(data: {
    center_name: string;
    address?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    logo_url?: string | null;
  }): Promise<EnglishCenterData> {
    return this.model.create({
      data,
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
        logo_url: true,
      },
    });
  }

  async updateCenter(
    center_id: string,
    data: Partial<{
      center_name: string;
      address?: string | null;
      contact_email?: string | null;
      contact_phone?: string | null;
      logo_url?: string | null;
    }>,
  ): Promise<EnglishCenterData> {
    return this.model.update({
      where: { center_id },
      data,
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
        logo_url: true,
      },
    });
  }

  async deleteCenter(center_id: string): Promise<EnglishCenterData> {
    return this.model.delete({
      where: { center_id },
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
        logo_url: true,
      },
    });
  }
}
