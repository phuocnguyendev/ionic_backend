import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis/redis.service';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  async get<T = any>(key: string): Promise<T | null> {
    const value = await this.redisService.getData(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttlSec?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (ttlSec) {
      await this.redisService.setData(key, data);
    } else {
      await this.redisService.setData(key, data);
    }
  }

  async remove(key: string): Promise<void> {
    await this.redisService.removeData(key);
  }
}
