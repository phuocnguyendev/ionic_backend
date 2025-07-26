import { Module } from '@nestjs/common';
import { TestSessionController } from './test-session.controller';
import { TestSessionService } from './test-session.service';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { TestSessionRepository } from './repositories';
import { TestSessionValidator } from './validators';

@Module({
  imports: [PrismaModule],
  controllers: [TestSessionController],
  providers: [TestSessionService, TestSessionRepository, TestSessionValidator],
  exports: [TestSessionService, TestSessionRepository],
})
export class TestSessionModule {}
