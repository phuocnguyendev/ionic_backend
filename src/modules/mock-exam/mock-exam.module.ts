import { Module } from '@nestjs/common';
import { mockexamController } from './mock-exam.controller';
import { mockexamService } from './mock-exam.service';

@Module({
  imports: [],
  controllers: [mockexamController],
  providers: [mockexamService],
  exports: [mockexamService],
})
export class mockexamModule {}
