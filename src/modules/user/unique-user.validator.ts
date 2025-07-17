import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserData, UserResponse } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UniqueUserValidator {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(
    field: 'email' | 'username',
    value: string,
    excludeId?: string,
  ): Promise<void> {
    if (!value) return;

    let user: UserData | null = null;

    if (field === 'email') {
      user = await this.userRepository.findByEmail(value);
    } else if (field === 'username') {
      user = await this.userRepository.findByUsername(value);
    }

    if (user && user.user_id !== excludeId) {
      throw new HttpException(
        `${field === 'email' ? 'Email' : 'Username'} ${value} đã tồn tại`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async ensureUserExists(id: string): Promise<UserData> {
    const user = await this.userRepository.findUnique({
      where: { user_id: id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  toUserResponse(user: UserData): UserResponse {
    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      avatarURL: user.avatarURL,
      center_id: user.center_id,
    };
  }
}
