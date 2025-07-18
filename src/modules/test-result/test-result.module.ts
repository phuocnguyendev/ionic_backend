import { Module } from '@nestjs/common';
import { testresultController } from './test-result.controller';
import { testresultService } from './test-result.service';

@Module({
  imports: [],
  controllers: [testresultController],
  providers: [testresultService],
  exports: [testresultService],
})
export class testresultModule {}
