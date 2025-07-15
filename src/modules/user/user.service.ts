import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import { IUser } from 'src/interfaces/IUser';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UniqueUserValidator } from './unique-user.validator';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uniqueValidator: UniqueUserValidator,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.uniqueValidator.validate('email', createUserDto.email);
    await this.uniqueValidator.validate('username', createUserDto.username);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.create({
      data: { ...createUserDto, password: hashedPassword },
    });

    return this.uniqueValidator.toUserResponse(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.uniqueValidator.ensureUserExists(id);

    if (data.email && data.email !== user.email)
      await this.uniqueValidator.validate('email', data.email, id);
    if (data.username && data.username !== user.username)
      await this.uniqueValidator.validate('username', data.username, id);

    const updatedUser = await this.userRepository.update({
      where: { id },
      data,
    });

    return this.uniqueValidator.toUserResponse(updatedUser);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findUnique({
      where: { user_id: id },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.uniqueValidator.toUserResponse(user);
  }

  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<BaseResponse<IUser>> {
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

    return new BaseResponse<IUser>(data, count);
  }

  async remove(id: string) {
    await this.uniqueValidator.ensureUserExists(id);

    const deletedUser = await this.userRepository.delete({
      where: { id },
    });

    return this.uniqueValidator.toUserResponse(deletedUser);
  }
  async findUserToLogin(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
