import { RoleResponse } from '../../role/interfaces/role.interface';

export interface PermissionData {
  permission_id: string;
  role_id: string;
  permission_type: string;
  resource_type: string;
  created_at?: Date;
}

export interface PermissionResponse extends PermissionData {
  role?: {
    role_id: string;
    role_name: string;
  };
}

export interface PermissionCreateData {
  role_id: string;
  permission_type: string;
  resource_type: string;
}

export interface PermissionUpdateData {
  role_id?: string;
  permission_type?: string;
  resource_type?: string;
}

export interface PermissionWithRole extends PermissionData {
  role?: RoleResponse;
}

// Permission types enum
export enum PermissionType {
  READ = 'read',
  WRITE = 'write',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage', // Full access
}

// Resource types enum
export enum ResourceType {
  USER = 'user',
  ROLE = 'role',
  TEST = 'test',
  COURSE = 'course',
  RESULT = 'result',
  QUESTION = 'question',
  CENTER = 'center',
  REPORT = 'report',
  SYSTEM = 'system',
}

// Permission check interface
export interface PermissionCheck {
  role_id: string;
  permission_type: string;
  resource_type: string;
}

// Utility types
export type PermissionField = keyof PermissionData;
export type PermissionOptional = Partial<PermissionData>;
