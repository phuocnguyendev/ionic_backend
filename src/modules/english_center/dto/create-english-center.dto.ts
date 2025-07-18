import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateEnglishCenterDto {
  @IsString()
  center_name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  contact_email?: string;

  @IsOptional()
  @IsString()
  contact_phone?: string;
}
