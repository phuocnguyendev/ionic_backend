import { Module } from '@nestjs/common';
import { reportController } from './report.controller';
import { reportService } from './report.service';

@Module({
  imports: [],
  controllers: [reportController],
  providers: [reportService],
  exports: [reportService],
})
export class reportModule {}
