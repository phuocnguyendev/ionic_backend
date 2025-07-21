import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ 
    description: 'Tên khóa học', 
    example: 'IELTS Foundation',
    maxLength: 255 
  })
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @ApiProperty({ 
    description: 'Mô tả khóa học', 
    example: 'Khóa học IELTS cơ bản dành cho người mới bắt đầu',
    required: false 
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Thời gian học (số giờ)', 
    example: 120,
    minimum: 1 
  })
  @IsNumber()
  duration: number;

  @ApiProperty({ 
    description: 'ID trung tâm tiếng Anh', 
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid' 
  })
  @IsString()
  @IsNotEmpty()
  center_id: string;

  @ApiProperty({ 
    description: 'Logo URL của khóa học', 
    example: 'https://example.com/course-logo.png',
    required: false 
  })
  @IsOptional()
  @IsString()
  logo_url?: string;
}
