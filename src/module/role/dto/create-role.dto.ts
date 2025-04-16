import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  role_name: string;
}
