import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { RedisService } from 'src/config/redis/redis.service';

@Module({
  controllers: [CacheController],
  providers: [CacheService, RedisService],
})
export class CacheModule {}
