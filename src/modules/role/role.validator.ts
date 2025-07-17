import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleData } from './interfaces/role.interface';

@Injectable()
export class RoleValidator {
  constructor(private readonly roleRepository: RoleRepository) {}

  async validateRoleName(role_name: string, excludeId?: string): Promise<void> {
    if (!role_name) return;

    const role = await this.roleRepository.findByName(role_name);

    if (role && role.role_id !== excludeId) {
      throw new HttpException(
        `Role với tên ${role_name} đã tồn tại`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async ensureRoleExists(role_id: string): Promise<RoleData> {
    const role = await this.roleRepository.findById(role_id);
    if (!role) {
      throw new HttpException(
        `Role với ID ${role_id} không tồn tại`,
        HttpStatus.NOT_FOUND,
      );
    }
    return role;
  }
}
