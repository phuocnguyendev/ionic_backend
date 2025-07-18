import { Module } from '@nestjs/common';
import { EnglishCenterService } from './english_center.service';
import { EnglishCenterController } from './english_center.controller';

@Module({
  controllers: [EnglishCenterController],
  providers: [EnglishCenterService],
})
export class EnglishCenterModule {}
