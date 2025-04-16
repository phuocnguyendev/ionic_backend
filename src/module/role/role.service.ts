import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new role
   * @param createRoleDto - The DTO containing the role data
   * @returns The created role
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { role_name } = createRoleDto;
    const role = await this.prisma.role.create({
      data: {
        role_name,
      },
      include: {
        users: true,
        permissions: true,
      },
    });
    return role;
  }

  /**
   * Find all roles
   * @returns An array of roles
   */
  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({
      orderBy: {
        role_id: 'asc', // Corrected from "ASC" to "asc"
      },
      include: {
        users: true,
        permissions: true,
      },
    });
  }

  /**
   * Find a role by its ID
   * @param role_id - The ID of the role to find
   * @returns The found role
   * @throws NotFoundException if the role is not found
   */
  async findOne(role_id: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { role_id },
      include: {
        users: true,
        permissions: true,
      },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }

    // Nếu chưa có dữ liệu, trả về mảng rỗng
    return {
      ...role,
      users: role.users || [],
      permissions: role.permissions || [],
    };
  }
  /**
   * Update a role by its ID
   * @param role_id - The ID of the role to update
   * @param updateRoleDto - The DTO containing the updated role data
   * @returns The updated role
   * @throws NotFoundException if the role is not found
   */
  // role.service.ts

  async update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { role_id, role_name } = updateRoleDto;

    const role = await this.prisma.role.update({
      where: { role_id },
      data: { role_name },
      include: {
        users: true, // Bao gồm thông tin về users
        permissions: true, // Bao gồm thông tin về permissions
      },
    });
    return role;
  }

  /**
   * Remove a role by its ID
   * @param role_id - The ID of the role to remove
   * @throws NotFoundException if the role is not found
   */
  async remove(role_id: string): Promise<void> {
    const role = await this.prisma.role.findUnique({
      where: { role_id },
      include: {
        users: true,
        permissions: true,
      },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }
    await this.prisma.role.delete({
      where: { role_id },
    });
  }

  /**
   * Find a role by its name
   * @param role_name - The name of the role to find
   * @returns The found role
   * @throws NotFoundException if the role is not found
   */
  async findByName(role_name: string): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { role_name },
      include: {
        users: true,
        permissions: true,
      },
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${role_name} not found`);
    }
    return role;
  }
}
