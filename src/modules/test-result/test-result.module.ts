import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TestResultController } from './test-result.controller';
import { TestResultRepository } from './test-result.repository';
import { TestResultService } from './test-result.service';
import { TestResultValidator } from './test-result.validator';

@Module({
  imports: [PrismaModule],
  controllers: [TestResultController],
  providers: [TestResultService, TestResultRepository, TestResultValidator],
  exports: [TestResultService, TestResultRepository],
})
export class TestResultModule {}
