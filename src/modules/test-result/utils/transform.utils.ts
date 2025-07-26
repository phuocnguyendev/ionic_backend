import { CreateTestResultDto, UpdateTestResultDto } from '../dto';
import {
  TestResultCreateData,
  TestResultUpdateData,
} from '../interfaces/test-result.interface';

/**
 * Transform CreateTestResultDto to TestResultCreateData
 * Converts string dates to Date objects
 */
export function transformCreateTestResultDto(
  dto: CreateTestResultDto,
): TestResultCreateData {
  return {
    ...dto,
    listening_completed_at: dto.listening_completed_at
      ? new Date(dto.listening_completed_at)
      : undefined,
    reading_completed_at: dto.reading_completed_at
      ? new Date(dto.reading_completed_at)
      : undefined,
    writing_completed_at: dto.writing_completed_at
      ? new Date(dto.writing_completed_at)
      : undefined,
    speaking_completed_at: dto.speaking_completed_at
      ? new Date(dto.speaking_completed_at)
      : undefined,
  };
}

/**
 * Transform UpdateTestResultDto to TestResultUpdateData
 * Converts string dates to Date objects if present
 */
export function transformUpdateTestResultDto(
  dto: UpdateTestResultDto,
): TestResultUpdateData {
  return {
    ...dto,
  };
}
