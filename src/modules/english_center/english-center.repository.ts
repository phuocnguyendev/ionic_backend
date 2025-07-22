import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from 'src/repository/baseRepository';
import {
  EnglishCenterData,
  EnglishCenterDetailResponse,
  EnglishCenterResponse,
} from './interfaces/english_center.interface';

@Injectable()
export class EnglishCenterRepository extends BaseRepository<
  EnglishCenterData,
  any
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.english_center);
  }

  async findById(
    center_id: string,
  ): Promise<EnglishCenterDetailResponse | null> {
    return this.model.findUnique({
      where: { center_id },
      select: {
        center_id: true,
        center_name: true,
        address: true,
        contact_email: true,
        contact_phone: true,
        logo_url: true,
        courses: {
          select: {
            course_id: true,
            course_name: true,
            duration: true,
            logo_url: true,
          },
        },
        tests: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
            duration: true,
            test_sections: true,
          },
        },
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
  async findAllCenters(
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
