export interface EnglishCenterData {
  center_id: string;
  center_name: string;
  address?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface EnglishCenterResponse extends Pick<EnglishCenterData, 'center_id' | 'center_name' | 'address' | 'contact_email' | 'contact_phone'> {}

export interface EnglishCenterCreateData extends Pick<EnglishCenterData, 'center_name' | 'address' | 'contact_email' | 'contact_phone'> {}

export interface EnglishCenterUpdateData extends Partial<Pick<EnglishCenterData, 'center_name' | 'address' | 'contact_email' | 'contact_phone'>> {}

// Utility types
export type EnglishCenterField = keyof EnglishCenterData;
export type EnglishCenterOptional = Partial<EnglishCenterData>;
export type EnglishCenterPublicData = Omit<EnglishCenterData, 'created_at' | 'updated_at'>;