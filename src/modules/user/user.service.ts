import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCreateData, UserResponse, UserWithRole } from './interfaces/user.interface';
import { UniqueUserValidator } from './unique-user.validator';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uniqueValidator: UniqueUserValidator,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    await this.uniqueValidator.validate('email', createUserDto.email);
    await this.uniqueValidator.validate('username', createUserDto.username);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const userData: UserCreateData = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = await this.userRepository.create({
      data: userData,
    });

    return this.uniqueValidator.toUserResponse(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    const user = await this.uniqueValidator.ensureUserExists(id);

    if (data.email && data.email !== user.email)
      await this.uniqueValidator.validate('email', data.email, id);
    if (data.username && data.username !== user.username)
      await this.uniqueValidator.validate('username', data.username, id);

    const updatedUser = await this.userRepository.update({
      where: { user_id: id },
      data,
    });

    return this.uniqueValidator.toUserResponse(updatedUser);
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<BaseResponse<UserResponse>> {
    const [data, count] = await this.userRepository.paginateUsers(
      page,
      pageSize,
      searchText,
    );

    return new BaseResponse<UserResponse>(data, count);
  }

  async remove(id: string): Promise<UserResponse> {
    await this.uniqueValidator.ensureUserExists(id);

    const deletedUser = await this.userRepository.delete({
      where: { user_id: id },
    });

    return this.uniqueValidator.toUserResponse(deletedUser);
  }

  async findUserToLogin(email: string): Promise<UserWithRole | null> {
    return await this.userRepository.findByEmail(email);
  }
}
