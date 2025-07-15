import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ElasticsearchService } from 'src/config/elasticsearch/elasticsearch.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IRole } from '../../interfaces/IRole';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly prisma: PrismaService,
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

    return role;
  }

  async findAll(): Promise<IRole[]> {
    const roles = await this.prisma.role.findMany({
      orderBy: {
        role_id: 'asc',
      },
      include: {
        users: false,
        permissions: false,
      },
    });

    return roles;
  }

  async findOne(role_id: string): Promise<IRole> {
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
