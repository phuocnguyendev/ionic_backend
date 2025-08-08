import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateQuestionOptionDto {
  @ApiProperty({ example: 'uuid-question-id' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  question_id: string;

  @ApiProperty({ example: '<p>Option A content</p>' })
  @IsString()
  @IsNotEmpty()
  content_html: string;

  @ApiProperty({ example: 'Option A content', required: false })
  @IsOptional()
  @IsString()
  content_text?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_correct: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  option_index?: number;

  @ApiProperty({ example: 'A', required: false })
  @IsOptional()
  @IsString()
  option_label?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_mixable?: boolean;

  @ApiProperty({ example: 'This is correct because...', required: false })
  @IsOptional()
  @IsString()
  explanation?: string;
}
