import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsUUID, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', maxLength: 50, example: 'Admin', })
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty({ description: 'The password of the user',example: 'Admin', })
  @IsString()
  password: string;

  @ApiProperty({ description: 'The email address of the user',example: 'Admin', })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The role ID of the user', format: 'uuid' })
  @IsUUID()
  role_id: string;

  @ApiProperty({ description: 'The avatar URL of the user', required: false, example: 'https://example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatarURL?: string;

  @ApiProperty({ description: 'The center ID', required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  center_id?: string;
}
