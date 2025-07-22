import { EnglishCenterResponse } from 'src/interfaces';
import { RoleResponse } from '../../role/interfaces/role.interface';

export interface UserData {
  user_id: string;
  username: string;
  password?: string;
  email: string;
  avatar_url?: string | null;
  role_id: string;
  center_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserWithRole extends UserData {
  role?: RoleResponse;
}

export interface UserResponse
  extends Pick<
    UserData,
    'user_id' | 'username' | 'email' | 'avatar_url' | 'center_id'
  > {
  center?: Pick<EnglishCenterResponse, 'center_id' | 'center_name'>;
}

export interface UserCreateData
  extends Pick<
    UserData,
    'username' | 'email' | 'role_id' | 'center_id' | 'avatar_url'
  > {
  password: string;
}

export interface UserUpdateData
  extends Partial<
    Pick<UserData, 'username' | 'email' | 'avatar_url' | 'center_id'>
  > {}

// Utility types
export type UserPublicData = Omit<UserData, 'password'>;
export type UserSafeResponse = Omit<UserResponse, 'password'>;
