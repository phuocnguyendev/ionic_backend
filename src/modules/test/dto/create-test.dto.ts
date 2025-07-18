import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({ 
    description: 'Tên bài kiểm tra', 
    example: 'IELTS Mock Test Q1 2025',
    maxLength: 255 
  })
  @IsString()
  test_name: string;

  @ApiProperty({ 
    description: 'Quý của bài kiểm tra', 
    example: 'q1',
    enum: ['q1', 'q2', 'q3', 'q4'] 
  })
  @IsEnum(['q1', 'q2', 'q3', 'q4'])
  test_quarter: 'q1' | 'q2' | 'q3' | 'q4';

  @ApiProperty({ 
    description: 'Ngày thi (ISO date string)', 
    example: '2025-07-25T10:00:00.000Z',
    format: 'date-time' 
  })
  @IsDateString()
  test_date: string;

  @ApiProperty({ 
    description: 'Thời gian làm bài (phút)', 
    example: 180,
    minimum: 1,
    maximum: 480 
  })
  @IsNumber()
  duration: number;

  @ApiProperty({ 
    description: 'ID trung tâm tiếng Anh', 
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid' 
  })
  @IsUUID()
  center_id: string;

  @ApiProperty({ 
    description: 'Các phần thi', 
    example: ['listening', 'reading', 'writing', 'speaking'],
    isArray: true,
    enum: ['listening', 'reading', 'writing', 'speaking'] 
  })
  @IsArray()
  @IsEnum(['listening', 'reading', 'writing', 'speaking'], { each: true })
  test_sections: ('listening' | 'reading' | 'writing' | 'speaking')[];
}
