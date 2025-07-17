export interface RoleData {
  role_id: string;
  role_name: string;
}

export interface RoleCreateData extends Pick<RoleData, 'role_name'> {}

export interface RoleUpdateData extends Required<RoleData> {}

export interface RoleResponse extends RoleData {}

// Utility types
export type RoleField = keyof RoleData;
export type RoleOptional = Partial<RoleData>;
