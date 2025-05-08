import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { RedisService } from 'src/config/redis/redis.service';
import { IUserResponse } from './dto/response.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new HttpException(
        `Email ${createUserDto.email} đã tồn tại`,
        HttpStatus.CONFLICT,
      );
    }
    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });
    if (existingUserByUsername) {
      throw new HttpException(
        `Username ${createUserDto.username} đã tồn tại`,
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    await this.redisService.setData(
      `user:${user.user_id}`,
      JSON.stringify(user),
    );
    return user;
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { user_id },
    });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username: updateUserDto.username },
    });
    if (existingUserByUsername && existingUserByUsername.user_id !== user_id) {
      throw new HttpException('Username đã tồn tại', HttpStatus.CONFLICT);
    }
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: updateUserDto.email },
    });
    if (existingUserByEmail && existingUserByEmail.user_id !== user_id) {
      throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);
    }
    const updatedUser = await this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    }); 

    await this.redisService.setData(
      `user:${user_id}`,
      JSON.stringify(updatedUser),
    );
    return updatedUser;
  }

  async findOne(user_id: string) {
    const cachedUser = await this.redisService.getData(`user:${user_id}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await this.prisma.user.findUnique({
      where: { user_id },
    });
    if (user) {
      await this.redisService.setData(`user:${user_id}`, JSON.stringify(user));
    }
    return user;
  }

  async findAll(
    page: number = 1,
    pageSize: number = 30,
    searchText: string = '',
  ): Promise<IUserResponse> {
    const skip = (page - 1) * pageSize;

    const data = await this.prisma.user.findMany({
      skip,
      take: pageSize,
      where: {
        username: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
      select: {
        user_id: true,
        username: true,
        email: true,
        avatarURL: true,
        role_id: true,
      },
    });

    const count = await this.prisma.user.count({
      where: {
        username: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
    });

    return {
      Item: data,
      count,
    };
  }

  async remove(user_id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { user_id },
    });

    await this.redisService.removeData(`user:${user_id}`);
    return deletedUser;
  }
}
