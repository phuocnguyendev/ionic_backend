import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'uuid-role-id' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  role_id: string;

  @ApiProperty({
    example: 'read',
    description: 'Permission type: read, write, update, delete, manage',
  })
  @IsString()
  @IsNotEmpty()
  permission_type: string;

  @ApiProperty({
    example: 'test',
    description: 'Resource type: test, user, course, result, etc.',
  })
  @IsString()
  @IsNotEmpty()
  resource_type: string;
}
