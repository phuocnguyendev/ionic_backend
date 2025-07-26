import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestValidator } from './validators/test.validator';
import { TestRepository } from './repositories';

@Module({
  imports: [PrismaModule],
  controllers: [TestController],
  providers: [TestService, TestRepository, TestValidator],
  exports: [TestService, TestRepository],
})
export class TestModule {}
