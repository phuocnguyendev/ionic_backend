import { RoleResponse } from '../../role/interfaces/role.interface';

export interface PermissionData {
  permission_id: string;
  role_id: string;
  permission_type: string;
  resource_type: string;
  created_at?: Date;
}

export interface PermissionResponse extends Pick<PermissionData, 'permission_id' | 'role_id' | 'permission_type' | 'resource_type'> {}

export interface PermissionCreateData extends Pick<PermissionData, 'role_id' | 'permission_type' | 'resource_type'> {}

export interface PermissionUpdateData extends Partial<Pick<PermissionData, 'permission_type' | 'resource_type'>> {}

export interface PermissionWithRole extends PermissionData {
  role?: RoleResponse;
}

// Utility types
export type PermissionField = keyof PermissionData;
export type PermissionType = PermissionData['permission_type'];
export type ResourceType = PermissionData['resource_type'];
export type PermissionOptional = Partial<PermissionData>;
