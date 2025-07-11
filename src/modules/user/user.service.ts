import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { CacheService } from 'src/common/cache/cache.service';
import { IUserResponse } from './dto/response.dto';
import * as bcrypt from 'bcryptjs';
import { IUser } from 'src/interfaces/IUser';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkUnique('email', createUserDto.email);
    await this.checkUnique('username', createUserDto.username);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    await this.cacheService.set(`user:${user.user_id}`, user);
    return this.toUserResponse(user);
  }

  async update(user_id: string, data: UpdateUserDto) {
    const user = await this.ensureUserExists(user_id);

    if (data.email && data.email !== user.email)
      await this.checkUnique('email', data.email, user_id);
    if (data.username && data.username !== user.username)
      await this.checkUnique('username', data.username, user_id);

    const updatedUser = await this.userRepository.update({
      where: { user_id },
      data,
    });

    await this.cacheService.set(`user:${user_id}`, updatedUser);
    return this.toUserResponse(updatedUser);
  }

  async findOne(user_id: string) {
    const cacheKey = `user:${user_id}`;
    const cachedUser = await this.cacheService.get(cacheKey);
    if (cachedUser) return this.toUserResponse(cachedUser);

    const user = await this.userRepository.findUnique({ where: { user_id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.cacheService.set(cacheKey, user);
    return this.toUserResponse(user);
  }

  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<IUserResponse> {
    const skip = (page - 1) * pageSize;
    const where = searchText
      ? { username: { contains: searchText, mode: 'insensitive' } }
      : undefined;

    const [data, count] = await Promise.all([
      this.userRepository.findMany({
        skip,
        take: pageSize,
        where,
        select: {
          user_id: true,
          username: true,
          email: true,
          avatarURL: true,
          role_id: true,
        },
      }),
      this.userRepository.count({ where }),
    ]);

    return { ListModel: data, Count: count };
  }

  async remove(user_id: string) {
    await this.ensureUserExists(user_id);

    const deletedUser = await this.userRepository.delete({
      where: { user_id },
    });
    await this.cacheService.remove(`user:${user_id}`);
    return this.toUserResponse(deletedUser);
  }

  // ================= PRIVATE ====================

  private async checkUnique(
    field: 'email' | 'username',
    value: string,
    excludeUserId?: string,
  ) {
    if (!value) return;
    let user: IUser | null = null;
    if (field === 'email') user = await this.userRepository.findByEmail(value);
    if (field === 'username')
      user = await this.userRepository.findByUsername(value);
    if (user && user.user_id !== excludeUserId) {
      throw new HttpException(
        `${field === 'email' ? 'Email' : 'Username'} ${value} đã tồn tại`,
        HttpStatus.CONFLICT,
      );
    }
  }

  private async ensureUserExists(user_id: string) {
    const user = await this.userRepository.findUnique({ where: { user_id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  private toUserResponse(user: any) {
    const { password, ...safe } = user;
    return safe;
  }
}
