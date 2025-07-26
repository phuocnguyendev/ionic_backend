import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import {
  TestCreateData,
  TestData,
  TestResponse,
  TestUpdateData,
} from 'src/interfaces';
import { BaseRepository } from 'src/repository/baseRepository';

@Injectable()
export class TestRepository extends BaseRepository<TestData, any> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.test);
  }

  async findById(test_id: string): Promise<TestResponse | null> {
    return this.model.findUnique({
      where: { test_id },
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async findByName(
    test_name: string,
    center_id?: string,
  ): Promise<TestData | null> {
    return this.model.findFirst({
      where: {
        test_name,
        ...(center_id && { center_id }),
      },
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAllTests(): Promise<TestResponse[]> {
    return this.model.findMany({
      orderBy: {
        test_date: 'desc',
      },
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async paginateTests(
    page: number,
    pageSize: number,
    searchText?: string,
  ): Promise<[TestResponse[], number]> {
    const skip = (page - 1) * pageSize;
    const where = searchText
      ? { test_name: { contains: searchText, mode: 'insensitive' } }
      : undefined;

    const [data, count] = await Promise.all([
      this.model.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: {
          test_date: 'desc',
        },
        select: {
          test_id: true,
          test_name: true,
          test_quarter: true,
          test_date: true,
          duration: true,
          center_id: false,
          test_sections: true,
          logo_url: true,
          created_at: true,
          updated_at: true,
          center: {
            select: {
              center_id: true,
              center_name: true,
            },
          },
        },
      }),
      this.model.count({ where }),
    ]);

    return [data, count];
  }

  async findByCenter(center_id: string): Promise<TestResponse[]> {
    return this.model.findMany({
      where: { center_id },
      orderBy: {
        test_date: 'desc',
      },
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async findByQuarter(
    test_quarter: 'q1' | 'q2' | 'q3' | 'q4',
  ): Promise<TestResponse[]> {
    return this.model.findMany({
      where: { test_quarter },
      orderBy: {
        test_date: 'desc',
      },
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async createTest(createData: TestCreateData): Promise<TestResponse> {
    const test = await this.model.create({
      data: {
        test_name: createData.test_name,
        test_quarter: createData.test_quarter,
        test_date:
          createData.test_date instanceof Date
            ? createData.test_date
            : new Date(createData.test_date),
        duration: createData.duration,
        center_id: createData.center_id,
        test_sections: createData.test_sections,
        logo_url: createData.logo_url,
      },
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
    return test;
  }

  async updateTest(
    test_id: string,
    updateData: TestUpdateData,
  ): Promise<TestResponse> {
    const updatePayload: any = {};

    if (updateData.test_name !== undefined)
      updatePayload.test_name = updateData.test_name;
    if (updateData.test_quarter !== undefined)
      updatePayload.test_quarter = updateData.test_quarter;
    if (updateData.duration !== undefined)
      updatePayload.duration = updateData.duration;
    if (updateData.test_sections !== undefined)
      updatePayload.test_sections = updateData.test_sections;
    if (updateData.logo_url !== undefined)
      updatePayload.logo_url = updateData.logo_url;
    if (updateData.test_date !== undefined) {
      updatePayload.test_date =
        updateData.test_date instanceof Date
          ? updateData.test_date
          : new Date(updateData.test_date);
    }

    const test = await this.model.update({
      where: { test_id },
      data: updatePayload,
      select: {
        test_id: true,
        test_name: true,
        test_quarter: true,
        test_date: true,
        duration: true,
        center_id: false,
        test_sections: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
    return test;
  }

  async deleteTest(test_id: string): Promise<void> {
    await this.model.delete({
      where: { test_id },
    });
  }

  async hasTestResults(test_id: string): Promise<boolean> {
    const count = await this.prisma.test_result.count({
      where: { test_id },
    });
    return count > 0;
  }
}
