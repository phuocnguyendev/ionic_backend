import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisModule } from 'src/config/redis/redis.module';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
  imports: [RedisModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
