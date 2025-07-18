import { Module } from '@nestjs/common';
import { testhistoryController } from './test-history.controller';
import { testhistoryService } from './test-history.service';

@Module({
  imports: [],
  controllers: [testhistoryController],
  providers: [testhistoryService],
  exports: [testhistoryService],
})
export class testhistoryModule {}
