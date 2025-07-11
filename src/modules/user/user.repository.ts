import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUser } from 'src/interfaces/IUser';
import { BaseRepository } from 'src/repository/baseRepository';

@Injectable()
export class UserRepository extends BaseRepository<IUser, any> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string) {
    return this.model.findUnique({ where: { email } });
  }

  async findByUsername(username: string) {
    return this.model.findUnique({ where: { username } });
  }
}
