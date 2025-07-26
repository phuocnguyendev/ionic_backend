import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserAnswerDto {
  @ApiProperty({
    description: 'ID của đáp án được chọn (cho câu trắc nghiệm)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  option_id?: string;

  @ApiProperty({
    description: 'Nội dung câu trả lời (HTML)',
    example: '<p>This is my updated answer...</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  answer_content?: string;

  @ApiProperty({
    description: 'Nội dung câu trả lời (text thuần)',
    example: 'This is my updated answer...',
    required: false,
  })
  @IsOptional()
  @IsString()
  answer_text?: string;

  @ApiProperty({
    description: 'Điểm cho câu trả lời này',
    example: 1.0,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  score?: number;

  @ApiProperty({
    description: 'Câu trả lời có đúng không',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  @ApiProperty({
    description: 'Thời gian làm câu này (giây)',
    example: 180,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  time_spent?: number;

  @ApiProperty({
    description: 'Thời điểm trả lời',
    example: '2025-07-25T10:30:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  answered_at?: Date;

  @ApiProperty({
    description: 'Đánh dấu để review lại',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_flagged?: boolean;
}
