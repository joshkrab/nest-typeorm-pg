import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  // Conecting entity:
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async addUser(dto: CreateUserDto): Promise<string> {
    await this.userRepository.save(dto);
    const stringBody = JSON.stringify(dto);

    await this.cacheManager.set(dto.email, stringBody);
    await this.cacheManager.get(dto.email);

    return dto.email;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['bookings'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getByCacheKey(key: string): Promise<object> {
    const record = await this.cacheManager.get(key);
    if (!record) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return record;
  }

  async deleteByCacheKey(key: string): Promise<string> {
    await this.cacheManager.del(key);
    return `Record ${key} was deleted`;
  }

  async updateByCacheKey(
    key: string,
    dto: CreateUserDto,
  ): Promise<string | undefined> {
    const newBody = JSON.stringify(dto);
    await this.cacheManager.del(key);
    await this.cacheManager.set(key, newBody);
    return await this.cacheManager.get(key);
  }
}
