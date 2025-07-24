import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from 'src/repository/baseRepository';
import {
  TestResultData,
  TestResultResponse,
} from './interfaces/test-result.interface';
import { formatScoreDisplay } from './utils/score.utils';

@Injectable()
export class TestResultRepository extends BaseRepository<TestResultData, any> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.test_result);
  }

  async findById(result_id: string): Promise<TestResultResponse | null> {
    const result = await this.model.findUnique({
      where: { result_id },
      select: {
        result_id: true,
        user_id: false,
        test_id: false,
        listening_score: true,
        reading_score: true,
        writing_score: true,
        speaking_score: true,
        overall_score: true,
        feedback: true,
        created_at: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      ...result,
      listening_score: formatScoreDisplay(result.listening_score),
      reading_score: formatScoreDisplay(result.reading_score),
      writing_score: formatScoreDisplay(result.writing_score),
      speaking_score: formatScoreDisplay(result.speaking_score),
      overall_score: formatScoreDisplay(result.overall_score),
    };
  }

  async findAllTestResults(): Promise<TestResultResponse[]> {
    const results = await this.model.findMany({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        result_id: true,
        user_id: false,
        test_id: false,
        listening_score: true,
        reading_score: true,
        writing_score: true,
        speaking_score: true,
        overall_score: true,
        feedback: true,
        created_at: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
          },
        },
      },
    });

    return results.map((result) => ({
      ...result,
      listening_score: formatScoreDisplay(result.listening_score),
      reading_score: formatScoreDisplay(result.reading_score),
      writing_score: formatScoreDisplay(result.writing_score),
      speaking_score: formatScoreDisplay(result.speaking_score),
      overall_score: formatScoreDisplay(result.overall_score),
    }));
  }

  async paginateTestResults(
    page: number,
    pageSize: number,
    searchText?: string,
  ): Promise<[TestResultResponse[], number]> {
    const skip = (page - 1) * pageSize;
    const where = searchText
      ? {
          OR: [
            {
              user: { username: { contains: searchText, mode: 'insensitive' } },
            },
            {
              test: {
                test_name: { contains: searchText, mode: 'insensitive' },
              },
            },
          ],
        }
      : undefined;

    const [data, count] = await Promise.all([
      this.model.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          result_id: true,
          user_id: false,
          test_id: false,
          listening_score: true,
          reading_score: true,
          writing_score: true,
          speaking_score: true,
          overall_score: true,
          feedback: true,
          created_at: true,
          user: {
            select: {
              user_id: true,
              username: true,
              email: true,
            },
          },
          test: {
            select: {
              test_id: true,
              test_name: true,
              test_quarter: true,
              test_date: true,
            },
          },
        },
      }),
      this.model.count({ where }),
    ]);

    const formattedData = data.map((result) => ({
      ...result,
      listening_score: formatScoreDisplay(result.listening_score),
      reading_score: formatScoreDisplay(result.reading_score),
      writing_score: formatScoreDisplay(result.writing_score),
      speaking_score: formatScoreDisplay(result.speaking_score),
      overall_score: formatScoreDisplay(result.overall_score),
    }));

    return [formattedData, count];
  }

  async findByUser(user_id: string): Promise<TestResultResponse[]> {
    return this.model.findMany({
      where: { user_id },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        result_id: true,
        user_id: false,
        test_id: false,
        listening_score: true,
        reading_score: true,
        writing_score: true,
        speaking_score: true,
        overall_score: true,
        feedback: true,
        created_at: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
          },
        },
      },
    });
  }

  async findByTest(test_id: string): Promise<TestResultResponse[]> {
    return this.model.findMany({
      where: { test_id },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        result_id: true,
        user_id: false,
        test_id: false,
        listening_score: true,
        reading_score: true,
        writing_score: true,
        speaking_score: true,
        overall_score: true,
        feedback: true,
        created_at: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
          },
        },
      },
    });
  }

  async createTestResult(createData: any): Promise<TestResultResponse> {
    const result = await this.model.create({
      data: createData,
      select: {
        result_id: true,
        user_id: false,
        test_id: false,
        listening_score: true,
        reading_score: true,
        writing_score: true,
        speaking_score: true,
        feedback: true,
        created_at: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
          },
        },
      },
    });

    return {
      ...result,
      overall_score: createData.overall_score,
    };
  }

  async updateTestResult(
    result_id: string,
    updateData: any,
  ): Promise<TestResultResponse> {
    const result = await this.model.update({
      where: { result_id },
      data: updateData,
      select: {
        result_id: true,
        user_id: false,
        test_id: false,
        listening_score: true,
        reading_score: true,
        writing_score: true,
        speaking_score: true,
        overall_score: true,
        feedback: true,
        created_at: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
          },
        },
      },
    });

    return result;
  }

  async deleteTestResult(result_id: string): Promise<void> {
    await this.model.delete({
      where: { result_id },
    });
  }
}
