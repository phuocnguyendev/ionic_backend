import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from 'src/config/elasticsearch/elasticsearch.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponse, RoleData } from './interfaces/role.interface';
import { RoleRepository } from './role.repository';
import { RoleValidator } from './role.validator';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly roleValidator: RoleValidator,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleResponse> {
    await this.roleValidator.validateRoleName(createRoleDto.role_name);

    const role = await this.roleRepository.createRole({
      role_name: createRoleDto.role_name,
    });

    return role;
  }

  async findAll(): Promise<RoleResponse[]> {
    return this.roleRepository.findAllRoles();
  }

  async findOne(role_id: string): Promise<RoleResponse> {
    return this.roleValidator.ensureRoleExists(role_id);
  }

  async update(updateRoleDto: UpdateRoleDto): Promise<RoleResponse> {
    const { role_id, role_name } = updateRoleDto;
    
    if (!role_name) {
      throw new Error('role_name là bắt buộc');
    }
    
    await this.roleValidator.ensureRoleExists(role_id);
    await this.roleValidator.validateRoleName(role_name, role_id);

    const role = await this.roleRepository.updateRole(role_id, { role_name });

    return role;
  }

  async remove(role_id: string): Promise<void> {
    await this.roleValidator.ensureRoleExists(role_id);
    await this.roleRepository.deleteRole(role_id);
  }

  async findByName(role_name: string): Promise<RoleData> {
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
      throw new Error(`Role với tên ${role_name} không tìm thấy`);
    }

    return result.hits.hits[0]._source as RoleData;
  }
}
