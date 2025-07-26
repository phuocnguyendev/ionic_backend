import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class JoinCourseDto {
  @ApiProperty({
    description: 'ID khóa học',
    example: 'ac9ab7d7-c2d2-4b1c-90f3-8e5b3b7a6c2f',
  })
  @IsUUID()
  course_id: string;
}
