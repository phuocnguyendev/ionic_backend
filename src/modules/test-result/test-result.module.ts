import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TestModule } from '../test/test.module';
import { UserModule } from '../user/user.module';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';
import { TestResultValidator } from './validators/test-result.validator';
import { TestResultRepository } from './repositories';

@Module({
  imports: [PrismaModule, UserModule, TestModule],
  controllers: [TestResultController],
  providers: [TestResultService, TestResultRepository, TestResultValidator],
  exports: [TestResultService, TestResultRepository],
})
export class TestResultModule {}
