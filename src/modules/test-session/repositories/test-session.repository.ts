import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import {
  TestSessionCreateData,
  TestSessionResponse,
  TestSessionUpdateData,
} from 'src/interfaces';

@Injectable()
export class TestSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findSessionById(
    session_id: string,
  ): Promise<TestSessionResponse | null> {
    return this.prisma.test_session.findUnique({
      where: { session_id },
      include: {
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
            duration: true,
          },
        },
      },
    }) as Promise<TestSessionResponse | null>;
  }

  async findSessionsByUser(user_id: string): Promise<TestSessionResponse[]> {
    return this.prisma.test_session.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
      include: {
        test: {
          select: {
            test_id: true,
            test_name: true,
            test_quarter: true,
            test_date: true,
            duration: true,
          },
        },
      },
    }) as Promise<TestSessionResponse[]>;
  }

  async createSession(
    createData: TestSessionCreateData,
  ): Promise<TestSessionResponse> {
    const session = await this.prisma.test_session.create({
      data: {
        user_id: createData.user_id,
        test_id: createData.test_id,
        status: createData.status ?? 'not_started',
        ip_address: createData.ip_address,
        user_agent: createData.user_agent,
        pause_count: 0,
        total_pause_time: 0,
      },
      include: {
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
            duration: true,
          },
        },
      },
    });
    return session as TestSessionResponse;
  }

  async updateSession(
    session_id: string,
    updateData: TestSessionUpdateData,
  ): Promise<TestSessionResponse> {
    const updatePayload: any = {};

    if (updateData.status !== undefined)
      updatePayload.status = updateData.status;
    if (updateData.current_section !== undefined)
      updatePayload.current_section = updateData.current_section;
    if (updateData.start_time !== undefined) {
      updatePayload.start_time =
        updateData.start_time instanceof Date
          ? updateData.start_time
          : updateData.start_time
            ? new Date(updateData.start_time)
            : null;
    }
    if (updateData.end_time !== undefined) {
      updatePayload.end_time =
        updateData.end_time instanceof Date
          ? updateData.end_time
          : updateData.end_time
            ? new Date(updateData.end_time)
            : null;
    }
    if (updateData.pause_count !== undefined)
      updatePayload.pause_count = updateData.pause_count;
    if (updateData.total_pause_time !== undefined)
      updatePayload.total_pause_time = updateData.total_pause_time;

    const session = await this.prisma.test_session.update({
      where: { session_id },
      data: updatePayload,
      include: {
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
            duration: true,
          },
        },
      },
    });
    return session as TestSessionResponse;
  }

  async deleteSession(session_id: string): Promise<void> {
    await this.prisma.test_session.delete({
      where: { session_id },
    });
  }
}
