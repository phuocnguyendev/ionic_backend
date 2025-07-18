import { Module } from '@nestjs/common';
import { answersampleController } from './answer-sample.controller';
import { answersampleService } from './answer-sample.service';

@Module({
  imports: [],
  controllers: [answersampleController],
  providers: [answersampleService],
  exports: [answersampleService],
})
export class answersampleModule {}
