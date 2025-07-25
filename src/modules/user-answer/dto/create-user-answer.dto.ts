import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateUserAnswerDto {
  @ApiProperty({
    description: 'ID của test result',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  result_id: string;

  @ApiProperty({
    description: 'ID của câu hỏi',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  question_id: string;

  @ApiProperty({
    description: 'ID của user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  user_id: string;

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
    example: '<p>This is my answer...</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  answer_content?: string;

  @ApiProperty({
    description: 'Nội dung câu trả lời (text thuần)',
    example: 'This is my answer...',
    required: false,
  })
  @IsOptional()
  @IsString()
  answer_text?: string;

  @ApiProperty({
    description: 'Thời gian làm câu này (giây)',
    example: 120,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  time_spent?: number;

  @ApiProperty({
    description: 'Đánh dấu để review lại',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_flagged?: boolean;
}
