import { Module } from '@nestjs/common';
import { notificationController } from './notification.controller';
import { notificationService } from './notification.service';

@Module({
  imports: [],
  controllers: [notificationController],
  providers: [notificationService],
  exports: [notificationService],
})
export class notificationModule {}
