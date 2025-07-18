import { UserResponse } from '../../user/interfaces/user.interface';

export interface NotificationData {
  notification_id: string;
  user_id: string;
  notification_type: string;
  content?: string | null;
  sent_at?: Date;
}

export interface NotificationResponse extends Pick<NotificationData, 'notification_id' | 'user_id' | 'notification_type' | 'content' | 'sent_at'> {}

export interface NotificationCreateData extends Pick<NotificationData, 'user_id' | 'notification_type' | 'content'> {}

export interface NotificationUpdateData extends Partial<Pick<NotificationData, 'notification_type' | 'content'>> {}

export interface NotificationWithUser extends NotificationData {
  user?: UserResponse;
}

// Utility types
export type NotificationField = keyof NotificationData;
export type NotificationType = NotificationData['notification_type'];
export type NotificationOptional = Partial<NotificationData>;
