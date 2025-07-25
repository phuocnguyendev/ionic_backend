import { Injectable } from '@nestjs/common';
import {
  TestSessionCreateData,
  TestSessionUpdateData,
  TestSessionResponse,
} from './interfaces/test-session.interface';
import { TestSessionRepository } from './repositories';
import { TestSessionValidator } from './validators';

@Injectable()
export class TestSessionService {
  constructor(
    private readonly testSessionRepository: TestSessionRepository,
    private readonly testSessionValidator: TestSessionValidator,
  ) {}

  async findSessionById(session_id: string): Promise<TestSessionResponse> {
    const session =
      await this.testSessionRepository.findSessionById(session_id);
    return this.testSessionValidator.validateSessionExists(session);
  }

  async findSessionsByUser(user_id: string): Promise<TestSessionResponse[]> {
    return this.testSessionRepository.findSessionsByUser(user_id);
  }

  async createSession(
    createData: TestSessionCreateData,
  ): Promise<TestSessionResponse> {
    // Check if there's already an active session for this user and test
    const existingSessions =
      await this.testSessionRepository.findSessionsByUser(createData.user_id);

    this.testSessionValidator.validateNoActiveSessionExists(
      existingSessions,
      createData.test_id,
    );

    return this.testSessionRepository.createSession(createData);
  }

  async updateSession(
    session_id: string,
    updateData: TestSessionUpdateData,
  ): Promise<TestSessionResponse> {
    await this.findSessionById(session_id); // Validate session exists
    return this.testSessionRepository.updateSession(session_id, updateData);
  }

  async startSession(session_id: string): Promise<TestSessionResponse> {
    const session = await this.findSessionById(session_id);
    this.testSessionValidator.validateSessionCanBeStarted(session);

    return this.updateSession(session_id, {
      status: 'in_progress',
      start_time: new Date(),
    });
  }

  async pauseSession(session_id: string): Promise<TestSessionResponse> {
    const session = await this.findSessionById(session_id);
    this.testSessionValidator.validateSessionCanBePaused(session);

    return this.updateSession(session_id, {
      status: 'paused',
      pause_count: session.pause_count + 1,
    });
  }

  async resumeSession(session_id: string): Promise<TestSessionResponse> {
    const session = await this.findSessionById(session_id);
    this.testSessionValidator.validateSessionCanBeResumed(session);

    return this.updateSession(session_id, {
      status: 'in_progress',
    });
  }

  async completeSession(session_id: string): Promise<TestSessionResponse> {
    const session = await this.findSessionById(session_id);
    this.testSessionValidator.validateSessionCanBeCompleted(session);

    return this.updateSession(session_id, {
      status: 'completed',
      end_time: new Date(),
    });
  }

  async deleteSession(session_id: string): Promise<void> {
    await this.findSessionById(session_id); // Validate session exists
    await this.testSessionRepository.deleteSession(session_id);
  }
}
