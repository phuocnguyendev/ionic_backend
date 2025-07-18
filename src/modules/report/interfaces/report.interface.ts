import { EnglishCenterResponse } from '../../english_center/dto/interfaces/english_center.interface';

export interface ReportData {
  report_id: string;
  center_id: string;
  report_type: string;
  content?: string | null;
  generated_at?: Date;
}

export interface ReportResponse extends Pick<ReportData, 'report_id' | 'center_id' | 'report_type' | 'content' | 'generated_at'> {}

export interface ReportCreateData extends Pick<ReportData, 'center_id' | 'report_type' | 'content'> {}

export interface ReportUpdateData extends Partial<Pick<ReportData, 'report_type' | 'content'>> {}

export interface ReportWithCenter extends ReportData {
  center?: EnglishCenterResponse;
}

// Utility types
export type ReportField = keyof ReportData;
export type ReportType = ReportData['report_type'];
export type ReportContent = ReportData['content'];
export type ReportOptional = Partial<ReportData>;
