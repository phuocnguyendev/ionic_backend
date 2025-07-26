import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { RoleData, RoleResponse } from 'src/interfaces';
import { BaseRepository } from 'src/repository/baseRepository';

@Injectable()
export class RoleRepository extends BaseRepository<RoleData, any> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.role);
  }

  async findByName(role_name: string): Promise<RoleData | null> {
    return this.model.findUnique({
      where: { role_name },
      select: {
        role_id: true,
        role_name: true,
      },
    });
  }

  async findById(role_id: string): Promise<RoleResponse | null> {
    return this.model.findUnique({
      where: { role_id },
      select: {
        role_id: true,
        role_name: true,
      },
    });
  }

  async findAllRoles(): Promise<RoleResponse[]> {
    return this.model.findMany({
      orderBy: {
        role_id: 'asc',
      },
      select: {
        role_id: true,
        role_name: true,
      },
    });
  }

  async createRole(data: { role_name: string }): Promise<RoleData> {
    return this.model.create({
      data,
      select: {
        role_id: true,
        role_name: true,
      },
    });
  }

  async updateRole(
    role_id: string,
    data: { role_name: string },
  ): Promise<RoleData> {
    return this.model.update({
      where: { role_id },
      data,
      select: {
        role_id: true,
        role_name: true,
      },
    });
  }

  async deleteRole(role_id: string): Promise<RoleData> {
    return this.model.delete({
      where: { role_id },
      select: {
        role_id: true,
        role_name: true,
      },
    });
  }
}
