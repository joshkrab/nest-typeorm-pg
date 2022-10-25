import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { RedisEntity } from 'src/entities/redis.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RedisService {
  constructor(
    @InjectRepository(RedisEntity)
    private redisRepository: Repository<RedisEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Cron('0 0 * * * *', { name: 'redis' })
  async writeRedisToDb(): Promise<any> {
    await this.redisRepository.clear();

    const keys = await this.cacheManager.store.keys();

    for (const key of keys) {
      const value: string | undefined = await this.cacheManager.get(key);
      await this.redisRepository.save({ key, value });
    }
    console.log('Redis saved');
    return this.redisRepository.find();
  }

  async getCacheFromDb(): Promise<any> {
    console.log('The service worked');
    return await this.redisRepository.find();
  }
}
