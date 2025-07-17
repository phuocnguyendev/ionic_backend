import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from 'src/repository/baseRepository';
import { UserData, UserResponse, UserWithRole } from './interfaces/user.interface';

@Injectable()
export class UserRepository extends BaseRepository<UserData, any> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string): Promise<UserWithRole | null> {
    return this.model.findUnique({ 
      where: { email },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    });
  }

  async findByUsername(username: string): Promise<UserData | null> {
    return this.model.findUnique({ where: { username } });
  }

  async paginateUsers(
    page: number,
    pageSize: number,
    searchText?: string,
  ): Promise<[UserResponse[], number]> {
    const skip = (page - 1) * pageSize;
    const where = searchText
      ? { username: { contains: searchText, mode: 'insensitive' } }
      : undefined;

    const [data, count] = await Promise.all([
      this.model.findMany({
        skip,
        take: pageSize,
        where,
        select: {
          user_id: true,
          username: true,
          email: true,
          avatarURL: true,
          center_id: true,
        },
      }),
      this.model.count({ where }),
    ]);

    return [data, count];
  }

  async findUserById(id: string): Promise<UserResponse | null> {
    return this.model.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        username: true,
        email: true,
        avatarURL: true,
        center_id: true,
      },
    });
  }

  async findUserByIdWithRole(id: string): Promise<UserWithRole | null> {
    return this.model.findUnique({
      where: { user_id: id },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    });
  }
}
