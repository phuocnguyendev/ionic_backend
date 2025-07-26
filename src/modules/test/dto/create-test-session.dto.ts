import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIP, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status, STATUSES } from '../../../constants';

export class CreateTestSessionDto {
  @ApiProperty({
    description: 'ID của người dùng thực hiện test',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    description: 'ID của bài test',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  test_id: string;

  @ApiProperty({
    description: 'Trạng thái session',
    example: 'not_started',
    enum: STATUSES,
    required: false,
    default: Status.NOT_STARTED,
  })
  @IsOptional()
  @IsEnum(STATUSES)
  status?: Status;

  @ApiProperty({
    description: 'Địa chỉ IP của người dùng',
    example: '192.168.1.1',
    required: false,
  })
  @IsOptional()
  @IsIP()
  ip_address?: string;

  @ApiProperty({
    description: 'User agent của browser',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_agent?: string;
}
