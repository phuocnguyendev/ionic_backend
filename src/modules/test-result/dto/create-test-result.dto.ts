import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsUUID, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateTestResultDto {
  @ApiProperty({ 
    description: 'ID của người dùng thực hiện test', 
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid' 
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ 
    description: 'ID của bài test', 
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid' 
  })
  @IsUUID()
  @IsNotEmpty()
  test_id: string;

  @ApiProperty({ 
    description: 'Điểm listening', 
    example: 7.5,
    minimum: 0,
    maximum: 9 
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  listening_score: number;

  @ApiProperty({ 
    description: 'Điểm reading', 
    example: 8.0,
    minimum: 0,
    maximum: 9 
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  reading_score: number;

  @ApiProperty({ 
    description: 'Điểm writing', 
    example: 6.5,
    minimum: 0,
    maximum: 9 
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  writing_score: number;

  @ApiProperty({ 
    description: 'Điểm speaking', 
    example: 7.0,
    minimum: 0,
    maximum: 9 
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  speaking_score: number;

  @ApiProperty({ 
    description: 'Phản hồi và nhận xét', 
    example: 'Cần cải thiện kỹ năng writing',
    required: false 
  })
  @IsOptional()
  @IsString()
  feedback?: string;
}
