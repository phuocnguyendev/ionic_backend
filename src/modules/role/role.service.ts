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
import { IRole } from '../../interfaces/IRole';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<IRole> {
    const { role_name } = createRoleDto;

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
      data: { role_name },
      include: {
        users: false,
        permissions: false,
      },
    });

    await this.redisService.setData(
      `role:${role.role_id}`,
      JSON.stringify(role),
    );
    return role;
  }

  async findAll(): Promise<IRole[]> {
    await this.redisService.flushDbData();
    const cachedRoles = await this.redisService.getData('role');
    if (cachedRoles) {
      return JSON.parse(cachedRoles);
    }

    const roles = await this.prisma.role.findMany({
      orderBy: {
        role_id: 'asc',
      },
      include: {
        users: false,
        permissions: false,
      },
    });

    await this.redisService.setData('roles', JSON.stringify(roles));

    return roles;
  }

  async findOne(role_id: string): Promise<IRole> {
    const cachedRole = await this.redisService.getData(`role:${role_id}`);
    if (cachedRole) {
      return JSON.parse(cachedRole);
    }

    const role = await this.prisma.role.findUnique({
      where: { role_id },
      include: {
        users: false,
        permissions: false,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }

    await this.redisService.setData(
      `role:${role.role_id}`,
      JSON.stringify(role),
    );

    return role;
  }

  async update(updateRoleDto: UpdateRoleDto): Promise<IRole> {
    const { role_id, role_name } = updateRoleDto;

    const role = await this.prisma.role.update({
      where: { role_id },
      data: { role_name },
      include: {
        users: false,
        permissions: false,
      },
    });

    await this.redisService.setData(`role:${role_id}`, JSON.stringify(role));

    return role;
  }

  async remove(role_id: string): Promise<void> {
    const role = await this.prisma.role.findUnique({
      where: { role_id },
      include: {
        users: false,
        permissions: false,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }

    await this.redisService.removeData(`role:${role_id}`);

    await this.prisma.role.delete({
      where: { role_id },
    });
  }

  async findByName(role_name: string): Promise<IRole> {
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

    return result.hits.hits[0]._source as IRole;
  }
}
