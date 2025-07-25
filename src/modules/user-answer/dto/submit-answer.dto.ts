import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { test_section } from '@prisma/client';

export class SubmitAnswerDto {
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
  answer_content?: string;

  @ApiProperty({
    description: 'Nội dung câu trả lời (text thuần)',
    example: 'This is my answer...',
    required: false,
  })
  @IsOptional()
  answer_text?: string;

  @ApiProperty({
    description: 'Section của câu hỏi',
    enum: test_section,
    example: 'reading',
    required: false,
  })
  @IsOptional()
  @IsEnum(test_section)
  section?: test_section;

  @ApiProperty({
    description: 'ID của test',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  test_id?: string;
}
