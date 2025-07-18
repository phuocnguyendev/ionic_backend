import { UserResponse } from '../../user/interfaces/user.interface';

export interface SystemLogData {
  log_id: string;
  action: string;
  user_id: string;
  created_at?: Date;
}

export interface SystemLogResponse extends Pick<SystemLogData, 'log_id' | 'action' | 'user_id' | 'created_at'> {}

export interface SystemLogCreateData extends Pick<SystemLogData, 'action' | 'user_id'> {}

export interface SystemLogWithUser extends SystemLogData {
  user?: UserResponse;
}

// Utility types
export type SystemLogField = keyof SystemLogData;
export type SystemAction = SystemLogData['action'];
export type SystemLogOptional = Partial<SystemLogData>;
