import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ElasticsearchService } from 'src/config/elasticsearch/elasticsearch.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { RedisService } from 'src/config/redis/redis.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  /**
   * Create a new role
   * @param createRoleDto - The DTO containing the role data
   * @returns The created role
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { role_name } = createRoleDto;

    // Kiểm tra xem role đã tồn tại hay chưa
    const existingRole = await this.prisma.role.findUnique({
      where: { role_name },
    });

    if (existingRole) {
      throw new HttpException(
        `Role with name ${role_name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.prisma.role.create({
      data: {
        role_name,
      },
      include: {
        users: true,
        permissions: true,
      },
    });

    const allRoles = await this.prisma.role.findMany({
      orderBy: {
        role_id: 'asc',
      },
      include: {
        users: true,
        permissions: true,
      },
    });

    await this.redisService.setData('roles', JSON.stringify(allRoles));

    return role;
  }

  /**
   * Find all roles
   * @returns An array of roles
   */
  async findAll(): Promise<Role[]> {
    const cachedRoles = await this.redisService.getData('roles');
    if (cachedRoles) {
      return JSON.parse(cachedRoles);
    }

    const roles = await this.prisma.role.findMany({
      orderBy: {
        role_id: 'asc',
      },
      include: {
        users: true,
        permissions: true,
      },
    });

    // Cache the roles in Redis for future use
    await this.redisService.setData('roles', JSON.stringify(roles));

    return roles;
  }

  /**
   * Find a role by its ID
   * @param role_id - The ID of the role to find
   * @returns The found role
   * @throws NotFoundException if the role is not found
   */
  async findOne(role_id: string): Promise<Role> {
    const cachedRole = await this.redisService.getData(`role:${role_id}`);
    if (cachedRole) {
      return JSON.parse(cachedRole);
    }

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

    // Cache the role in Redis
    await this.redisService.setData(
      `role:${role.role_id}`,
      JSON.stringify(role),
    );

    return role;
  }

  /**
   * Update a role by its ID
   * @param role_id - The ID of the role to update
   * @param updateRoleDto - The DTO containing the updated role data
   * @returns The updated role
   * @throws NotFoundException if the role is not found
   */
  async update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { role_id, role_name } = updateRoleDto;

    const role = await this.prisma.role.update({
      where: { role_id },
      data: { role_name },
      include: {
        users: true,
        permissions: true,
      },
    });

    // Update the role in the Redis cache
    await this.redisService.setData(`role:${role_id}`, JSON.stringify(role));

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

    // Remove the role from Redis cache
    await this.redisService.removeData(`role:${role_id}`);

    await this.prisma.role.delete({
      where: { role_id },
    });
  }

  /**
   * Find a role by its name using Elasticsearch
   * @param role_name - The name of the role to find
   * @returns The found role
   * @throws NotFoundException if the role is not found
   */
  async findByName(role_name: string): Promise<Role> {
    const result = await this.elasticsearchService.search('roles', {
      query: {
        match: { role_name },
      },
    });

    if (
      (typeof result.hits.total === 'object'
        ? result.hits.total.value
        : result.hits.total) === 0
    ) {
      throw new NotFoundException(`Role with name ${role_name} not found`);
    }

    return result.hits.hits[0]._source as Role;
  }
}
