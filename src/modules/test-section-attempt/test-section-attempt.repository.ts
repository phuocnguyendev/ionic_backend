import { Injectable } from '@nestjs/common';
import { test_section } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import {
  TestSectionAttemptCreateData,
  TestSectionAttemptResponse,
  TestSectionAttemptUpdateData,
} from './interfaces/test-section-attempt.interface';

@Injectable()
export class TestSectionAttemptRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(
    attempt_id: string,
  ): Promise<TestSectionAttemptResponse | null> {
    const attempt = await this.prisma.test_section_attempt.findUnique({
      where: { attempt_id },
      include: {
        test_session: {
          select: {
            session_id: true,
            user_id: true,
            test_id: true,
            status: true,
          },
        },
      },
    });

    return attempt as TestSectionAttemptResponse | null;
  }

  async findBySessionId(
    session_id: string,
  ): Promise<TestSectionAttemptResponse[]> {
    const attempts = await this.prisma.test_section_attempt.findMany({
      where: { session_id },
      orderBy: { created_at: 'asc' },
      include: {
        test_session: {
          select: {
            session_id: true,
            user_id: true,
            test_id: true,
            status: true,
          },
        },
      },
    });

    return attempts as TestSectionAttemptResponse[];
  }

  async findBySessionAndSection(
    session_id: string,
    section: test_section,
  ): Promise<TestSectionAttemptResponse | null> {
    const attempt = await this.prisma.test_section_attempt.findFirst({
      where: {
        session_id,
        section,
      },
      include: {
        test_session: {
          select: {
            session_id: true,
            user_id: true,
            test_id: true,
            status: true,
          },
        },
      },
    });

    return attempt as TestSectionAttemptResponse | null;
  }

  async create(
    data: TestSectionAttemptCreateData,
  ): Promise<TestSectionAttemptResponse> {
    const attempt = await this.prisma.test_section_attempt.create({
      data: {
        session_id: data.session_id,
        section: data.section,
        is_completed: data.is_completed || false,
      },
      include: {
        test_session: {
          select: {
            session_id: true,
            user_id: true,
            test_id: true,
            status: true,
          },
        },
      },
    });

    return attempt as TestSectionAttemptResponse;
  }

  async update(
    attempt_id: string,
    data: TestSectionAttemptUpdateData,
  ): Promise<TestSectionAttemptResponse> {
    const attempt = await this.prisma.test_section_attempt.update({
      where: { attempt_id },
      data,
      include: {
        test_session: {
          select: {
            session_id: true,
            user_id: true,
            test_id: true,
            status: true,
          },
        },
      },
    });

    return attempt as TestSectionAttemptResponse;
  }

  async delete(attempt_id: string): Promise<void> {
    await this.prisma.test_section_attempt.delete({
      where: { attempt_id },
    });
  }

  async deleteBySessionId(session_id: string): Promise<void> {
    await this.prisma.test_section_attempt.deleteMany({
      where: { session_id },
    });
  }

  // Utility methods
  async getCompletedSectionsBySession(
    session_id: string,
  ): Promise<test_section[]> {
    const completedAttempts = await this.prisma.test_section_attempt.findMany({
      where: {
        session_id,
        is_completed: true,
      },
      select: {
        section: true,
      },
    });

    return completedAttempts.map((attempt) => attempt.section);
  }

  async getSessionProgress(session_id: string): Promise<{
    total_sections: number;
    completed_sections: number;
    in_progress_sections: number;
    percentage_completed: number;
  }> {
    const allAttempts = await this.prisma.test_section_attempt.findMany({
      where: { session_id },
    });

    const total_sections = allAttempts.length;
    const completed_sections = allAttempts.filter(
      (attempt) => attempt.is_completed,
    ).length;
    const in_progress_sections = allAttempts.filter(
      (attempt) => attempt.start_time && !attempt.end_time,
    ).length;
    const percentage_completed =
      total_sections > 0 ? (completed_sections / total_sections) * 100 : 0;

    return {
      total_sections,
      completed_sections,
      in_progress_sections,
      percentage_completed: Math.round(percentage_completed * 100) / 100,
    };
  }
}
