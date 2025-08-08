import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { test_section } from '@prisma/client';
import {
  CreateTestSectionAttemptDto,
  UpdateTestSectionAttemptDto,
} from './dto';
import {
  TestSectionAttemptCreateData,
  TestSectionAttemptResponse,
  TestSectionAttemptUpdateData,
} from './interfaces/test-section-attempt.interface';
import { TestSectionAttemptRepository } from './test-section-attempt.repository';

@Injectable()
export class TestSectionAttemptService {
  constructor(
    private readonly testSectionAttemptRepository: TestSectionAttemptRepository,
  ) {}

  async findById(attempt_id: string): Promise<TestSectionAttemptResponse> {
    const attempt =
      await this.testSectionAttemptRepository.findById(attempt_id);
    if (!attempt) {
      throw new NotFoundException(
        `Test section attempt with ID ${attempt_id} not found`,
      );
    }
    return attempt;
  }

  async findBySessionId(
    session_id: string,
  ): Promise<TestSectionAttemptResponse[]> {
    return this.testSectionAttemptRepository.findBySessionId(session_id);
  }

  async findBySessionAndSection(
    session_id: string,
    section: test_section,
  ): Promise<TestSectionAttemptResponse> {
    const attempt =
      await this.testSectionAttemptRepository.findBySessionAndSection(
        session_id,
        section,
      );
    if (!attempt) {
      throw new NotFoundException(
        `Test section attempt for session ${session_id} and section ${section} not found`,
      );
    }
    return attempt;
  }

  async create(
    createData: CreateTestSectionAttemptDto,
  ): Promise<TestSectionAttemptResponse> {
    // Check if attempt already exists for this session and section
    const existing =
      await this.testSectionAttemptRepository.findBySessionAndSection(
        createData.session_id,
        createData.section,
      );

    if (existing) {
      throw new BadRequestException(
        `Test section attempt already exists for session ${createData.session_id} and section ${createData.section}`,
      );
    }

    const attemptData: TestSectionAttemptCreateData = {
      session_id: createData.session_id,
      section: createData.section,
      is_completed: createData.is_completed || false,
    };

    return this.testSectionAttemptRepository.create(attemptData);
  }

  async update(
    attempt_id: string,
    updateData: UpdateTestSectionAttemptDto,
  ): Promise<TestSectionAttemptResponse> {
    const existing =
      await this.testSectionAttemptRepository.findById(attempt_id);
    if (!existing) {
      throw new NotFoundException(
        `Test section attempt with ID ${attempt_id} not found`,
      );
    }

    const attemptUpdateData: TestSectionAttemptUpdateData = {
      start_time: updateData.status === 'in_progress' ? new Date() : undefined,
      end_time: updateData.is_completed ? new Date() : undefined,
      submitted_at: updateData.is_completed ? new Date() : undefined,
      is_completed: updateData.is_completed,
    };

    return this.testSectionAttemptRepository.update(
      attempt_id,
      attemptUpdateData,
    );
  }

  async startSection(attempt_id: string): Promise<TestSectionAttemptResponse> {
    const updateData: TestSectionAttemptUpdateData = {
      start_time: new Date(),
      is_completed: false,
    };

    return this.testSectionAttemptRepository.update(attempt_id, updateData);
  }

  async completeSection(
    attempt_id: string,
  ): Promise<TestSectionAttemptResponse> {
    const existing =
      await this.testSectionAttemptRepository.findById(attempt_id);
    if (!existing) {
      throw new NotFoundException(
        `Test section attempt with ID ${attempt_id} not found`,
      );
    }

    const now = new Date();
    const timeSpent = existing.start_time
      ? Math.floor((now.getTime() - existing.start_time.getTime()) / 1000)
      : null;

    const updateData: TestSectionAttemptUpdateData = {
      end_time: now,
      submitted_at: now,
      time_spent: timeSpent || undefined,
      is_completed: true,
    };

    return this.testSectionAttemptRepository.update(attempt_id, updateData);
  }

  async submitSection(
    attempt_id: string,
    autoSubmit: boolean = false,
  ): Promise<TestSectionAttemptResponse> {
    const existing =
      await this.testSectionAttemptRepository.findById(attempt_id);
    if (!existing) {
      throw new NotFoundException(
        `Test section attempt with ID ${attempt_id} not found`,
      );
    }

    const now = new Date();
    const timeSpent = existing.start_time
      ? Math.floor((now.getTime() - existing.start_time.getTime()) / 1000)
      : null;

    const updateData: TestSectionAttemptUpdateData = {
      end_time: now,
      submitted_at: now,
      time_spent: timeSpent || undefined,
      is_completed: true,
    };

    return this.testSectionAttemptRepository.update(attempt_id, updateData);
  }

  async delete(attempt_id: string): Promise<void> {
    const existing =
      await this.testSectionAttemptRepository.findById(attempt_id);
    if (!existing) {
      throw new NotFoundException(
        `Test section attempt with ID ${attempt_id} not found`,
      );
    }

    await this.testSectionAttemptRepository.delete(attempt_id);
  }

  async deleteBySessionId(session_id: string): Promise<void> {
    await this.testSectionAttemptRepository.deleteBySessionId(session_id);
  }

  // Utility methods
  async getCompletedSectionsBySession(
    session_id: string,
  ): Promise<test_section[]> {
    return this.testSectionAttemptRepository.getCompletedSectionsBySession(
      session_id,
    );
  }

  async getSessionProgress(session_id: string): Promise<{
    total_sections: number;
    completed_sections: number;
    in_progress_sections: number;
    percentage_completed: number;
  }> {
    return this.testSectionAttemptRepository.getSessionProgress(session_id);
  }

  // Initialize all sections for a test session
  async initializeSessionSections(
    session_id: string,
    sections: test_section[] = ['listening', 'reading', 'writing', 'speaking'],
  ): Promise<TestSectionAttemptResponse[]> {
    const results: TestSectionAttemptResponse[] = [];

    for (const section of sections) {
      const existing =
        await this.testSectionAttemptRepository.findBySessionAndSection(
          session_id,
          section,
        );

      if (!existing) {
        const attemptData: TestSectionAttemptCreateData = {
          session_id,
          section,
          is_completed: false,
        };

        const created =
          await this.testSectionAttemptRepository.create(attemptData);
        results.push(created);
      } else {
        results.push(existing);
      }
    }

    return results;
  }
}
