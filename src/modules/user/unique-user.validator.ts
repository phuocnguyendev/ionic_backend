import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/IUser';
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

    let user: IUser | null = null;

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
  async ensureUserExists(id: string) {
    const user = await this.userRepository.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  toUserResponse(user: any) {
    const { password, ...safe } = user;
    return safe;
  }
}
