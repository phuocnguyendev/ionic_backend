import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TestSessionResponse } from '../interfaces/test-session.interface';

@Injectable()
export class TestSessionValidator {
  /**
   * Validates if session can be started
   */
  validateSessionCanBeStarted(session: TestSessionResponse): void {
    if (session.status !== 'not_started') {
      throw new HttpException(
        'Session cannot be started - invalid status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Validates if session can be paused
   */
  validateSessionCanBePaused(session: TestSessionResponse): void {
    if (session.status !== 'in_progress') {
      throw new HttpException(
        'Session cannot be paused - invalid status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Validates if session can be resumed
   */
  validateSessionCanBeResumed(session: TestSessionResponse): void {
    if (session.status !== 'paused') {
      throw new HttpException(
        'Session cannot be resumed - invalid status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Validates if session can be completed
   */
  validateSessionCanBeCompleted(session: TestSessionResponse): void {
    if (session.status !== 'in_progress' && session.status !== 'paused') {
      throw new HttpException(
        'Session cannot be completed - invalid status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Validates if user already has an active session for the test
   */
  validateNoActiveSessionExists(
    existingSessions: TestSessionResponse[],
    testId: string,
  ): void {
    const activeSession = existingSessions.find(
      (session) =>
        session.test_id === testId &&
        (session.status === 'not_started' ||
          session.status === 'in_progress' ||
          session.status === 'paused'),
    );

    if (activeSession) {
      throw new HttpException(
        'User already has an active session for this test',
        HttpStatus.CONFLICT,
      );
    }
  }

  /**
   * Validates if session exists
   */
  validateSessionExists(
    session: TestSessionResponse | null,
  ): TestSessionResponse {
    if (!session) {
      throw new HttpException('Test session not found', HttpStatus.NOT_FOUND);
    }
    return session;
  }
}
