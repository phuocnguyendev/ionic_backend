import { Inject, Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    this.redisClient.on('connect', () => {
      this.logger.log('Redis server connected');
    });

    this.redisClient.on('ready', () => {
      this.logger.log('Redis server is ready');
    });

    this.redisClient.on('error', (error) => {
      this.logger.error('Redis connection error: ' + error.message);
    });

    this.redisClient.on('close', () => {
      this.logger.log('Redis server connection closed');
    });

    this.redisClient.on('reconnecting', () => {
      this.logger.log('Reconnecting to Redis server...');
    });
  }
  /**
   * Retrieves data from Redis by the given key.
   * @param key - The key to search in Redis
   * @returns The value stored in Redis or null if not found
   */
  async getData(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  /**
   * Sets data in Redis with the given key and value.
   * @param key - The key to store in Redis
   * @param value - The value to associate with the key
   */
  async setData(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  /**
   * Removes data from Redis by the given key.
   * @param key - The key to remove from Redis
   */
  async removeData(key: string): Promise<void> {
    // Directly call del on the redisClient
    await this.redisClient.del(key);
  }
  /**
   * Checks if a key exists in Redis.
   * @param key - The key to check in Redis
   * @returns True if the key exists, false otherwise
   */
  async flushDbData() {
    await this.redisClient.flushdb();
  }
}
