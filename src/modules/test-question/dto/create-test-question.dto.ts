import { ApiProperty } from '@nestjs/swagger';
import { test_section } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTestQuestionDto {
  @ApiProperty({ example: 'uuid-test-id' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  test_id: string;

  @ApiProperty({ enum: test_section, example: 'listening' })
  @IsEnum(test_section)
  section: test_section;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  part_number?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  question_number: number;

  @ApiProperty({ example: 'uuid-parent-question-id', required: false })
  @IsOptional()
  @IsUUID()
  parent_question_id?: string;

  @ApiProperty({
    example: '<p>What is the main topic of the conversation?</p>',
  })
  @IsString()
  @IsNotEmpty()
  content_html: string;

  @ApiProperty({
    example: 'Listen carefully and choose the best answer',
    required: false,
  })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiProperty({ example: 'multiple-choice', required: false })
  @IsOptional()
  @IsString()
  question_type?: string;

  @ApiProperty({ example: 'https://example.com/audio.mp3', required: false })
  @IsOptional()
  @IsString()
  audio_url?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ example: 1.0, required: false })
  @IsOptional()
  @IsNumber()
  marks?: number;

  @ApiProperty({ example: 'medium', required: false })
  @IsOptional()
  @IsString()
  difficulty_level?: string;

  @ApiProperty({ example: 150, required: false })
  @IsOptional()
  @IsNumber()
  word_limit_min?: number;

  @ApiProperty({ example: 250, required: false })
  @IsOptional()
  @IsNumber()
  word_limit_max?: number;

  @ApiProperty({ example: 1800, required: false })
  @IsOptional()
  @IsNumber()
  time_limit?: number;
}
