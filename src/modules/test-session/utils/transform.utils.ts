import { UpdateTestSessionDto } from '../../test/dto/update-test-session.dto';
import { TestSessionUpdateData } from '../interfaces/test-session.interface';

/**
 * Transform UpdateTestSessionDto to TestSessionUpdateData
 * Converts string dates to Date objects
 */
export function transformUpdateTestSessionDto(
  dto: UpdateTestSessionDto,
): TestSessionUpdateData {
  return {
    ...dto,
    start_time: dto.start_time ? new Date(dto.start_time) : undefined,
    end_time: dto.end_time ? new Date(dto.end_time) : undefined,
  };
}
