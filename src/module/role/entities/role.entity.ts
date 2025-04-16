import { IsArray, IsString } from 'class-validator';

export class Role {
  @IsString()
  role_id: string;

  @IsString()
  role_name: string;

  @IsArray()
  users: any[];

  @IsArray()
  permissions: any[];
}
