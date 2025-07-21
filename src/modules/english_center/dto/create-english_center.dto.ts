import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateEnglishCenterDto {
  @ApiProperty({ 
    description: 'Tên trung tâm tiếng Anh', 
    example: 'ILA English Center',
    maxLength: 100 
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  center_name: string;

  @ApiProperty({ 
    description: 'Địa chỉ trung tâm', 
    example: '123 Nguyễn Văn Cừ, Quận 1, TP.HCM',
    maxLength: 255,
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiProperty({ 
    description: 'Email liên hệ', 
    example: 'contact@ila.edu.vn',
    maxLength: 100,
    required: false 
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  contact_email?: string;

  @ApiProperty({ 
    description: 'Số điện thoại liên hệ', 
    example: '028 1234 5678',
    maxLength: 20,
    required: false 
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  contact_phone?: string;

  @ApiProperty({ 
    description: 'Logo URL của trung tâm', 
    example: 'https://example.com/logo.png',
    required: false 
  })
  @IsOptional()
  @IsString()
  logo_url?: string;
}
