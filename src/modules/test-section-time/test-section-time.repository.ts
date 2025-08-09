import { Injectable } from '@nestjs/common';
import { test_section } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import {
  TestSectionTimeCreateData,
  TestSectionTimeResponse,
  TestSectionTimeUpdateData,
} from './interfaces/test-section-time.interface';

@Injectable()
export class TestSectionTimeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByTestId(test_id: string): Promise<TestSectionTimeResponse[]> {
    return this.prisma.test_section_time.findMany({
      where: { test_id },
      include: {
        test: {
          select: {
            test_id: true,
            test_name: true,
          },
        },
      },
    });
  }

  async findByTestAndSection(
    test_id: string,
    section: test_section,
  ): Promise<TestSectionTimeResponse | null> {
    return this.prisma.test_section_time.findFirst({
      where: {
        test_id,
        section,
      },
      include: {
        test: {
          select: {
            test_id: true,
            test_name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<TestSectionTimeResponse | null> {
    return this.prisma.test_section_time.findUnique({
      where: { id },
      include: {
        test: {
          select: {
            test_id: true,
            test_name: true,
          },
        },
      },
    });
  }

  async create(
    data: TestSectionTimeCreateData,
  ): Promise<TestSectionTimeResponse> {
    return this.prisma.test_section_time.create({
      data,
      include: {
        test: {
          select: {
            test_id: true,
            test_name: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: TestSectionTimeUpdateData,
  ): Promise<TestSectionTimeResponse> {
    return this.prisma.test_section_time.update({
      where: { id },
      data,
      include: {
        test: {
          select: {
            test_id: true,
            test_name: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.test_section_time.delete({
      where: { id },
    });
  }

  async deleteByTestId(test_id: string): Promise<void> {
    await this.prisma.test_section_time.deleteMany({
      where: { test_id },
    });
  }
}
