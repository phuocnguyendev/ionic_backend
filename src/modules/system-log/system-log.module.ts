import { Module } from '@nestjs/common';
import { systemlogController } from './system-log.controller';
import { systemlogService } from './system-log.service';

@Module({
  imports: [],
  controllers: [systemlogController],
  providers: [systemlogService],
  exports: [systemlogService],
})
export class systemlogModule {}
