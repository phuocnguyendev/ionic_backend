import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import {
  PermissionCheck,
  PermissionCreateData,
  PermissionResponse,
  PermissionUpdateData,
} from './interfaces/permission.interface';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(permission_id: string): Promise<PermissionResponse | null> {
    return this.prisma.permission.findUnique({
      where: { permission_id },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    }) as Promise<PermissionResponse | null>;
  }

  async findAll(): Promise<PermissionResponse[]> {
    return this.prisma.permission.findMany({
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    }) as Promise<PermissionResponse[]>;
  }

  async findByRoleId(role_id: string): Promise<PermissionResponse[]> {
    return this.prisma.permission.findMany({
      where: { role_id },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    }) as Promise<PermissionResponse[]>;
  }

  async findByRoleAndResource(
    role_id: string,
    resource_type: string,
  ): Promise<PermissionResponse[]> {
    return this.prisma.permission.findMany({
      where: {
        role_id,
        resource_type,
      },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    }) as Promise<PermissionResponse[]>;
  }

  async checkPermission(check: PermissionCheck): Promise<boolean> {
    const permission = await this.prisma.permission.findFirst({
      where: {
        role_id: check.role_id,
        permission_type: check.permission_type,
        resource_type: check.resource_type,
      },
    });

    return !!permission;
  }

  async create(data: PermissionCreateData): Promise<PermissionResponse> {
    return this.prisma.permission.create({
      data,
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    }) as Promise<PermissionResponse>;
  }

  async update(
    permission_id: string,
    data: PermissionUpdateData,
  ): Promise<PermissionResponse> {
    return this.prisma.permission.update({
      where: { permission_id },
      data,
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    }) as Promise<PermissionResponse>;
  }

  async delete(permission_id: string): Promise<void> {
    await this.prisma.permission.delete({
      where: { permission_id },
    });
  }

  async deleteByRoleId(role_id: string): Promise<void> {
    await this.prisma.permission.deleteMany({
      where: { role_id },
    });
  }

  // Check if permission exists
  async exists(
    role_id: string,
    permission_type: string,
    resource_type: string,
  ): Promise<boolean> {
    const permission = await this.prisma.permission.findFirst({
      where: {
        role_id,
        permission_type,
        resource_type,
      },
    });

    return !!permission;
  }

  // Get all permissions for multiple roles (useful for checking user permissions)
  async findByRoleIds(role_ids: string[]): Promise<PermissionResponse[]> {
    return this.prisma.permission.findMany({
      where: {
        role_id: {
          in: role_ids,
        },
      },
      include: {
        role: {
          select: {
            role_id: true,
            role_name: true,
          },
        },
      },
    }) as Promise<PermissionResponse[]>;
  }

  // Get permissions grouped by resource type
  async getPermissionsByResource(): Promise<
    Record<string, PermissionResponse[]>
  > {
    const permissions = await this.findAll();

    return permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.resource_type]) {
          acc[permission.resource_type] = [];
        }
        acc[permission.resource_type].push(permission);
        return acc;
      },
      {} as Record<string, PermissionResponse[]>,
    );
  }
}
