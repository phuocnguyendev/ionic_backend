import { IRole } from './IRole';

export interface IUser {
  user_id: string;
  username: string;
  password?: string;
  email: string;
  avatarURL?: string | null;
  role_id?: string;
  center_id?: string | null;
  role?: IRole;
}
