import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { TestService } from './test.service';
import { TestValidator } from './test.validator';

@Module({
  imports: [PrismaModule],
  controllers: [TestController],
  providers: [TestService, TestRepository, TestValidator],
  exports: [TestService, TestRepository],
})
export class TestModule {}
