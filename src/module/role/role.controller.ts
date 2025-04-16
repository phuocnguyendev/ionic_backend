import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/core/customize';
import {
  ROLE_CREATE_SUCCESS,
  ROLE_DELETE_SUCCESS,
  ROLE_LOAD_SUCCESS,
  ROLE_UPDATE_SUCCESS,
} from 'src/utils/message';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @ResponseMessage(ROLE_CREATE_SUCCESS)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage(ROLE_LOAD_SUCCESS)
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ResponseMessage(ROLE_LOAD_SUCCESS)
  async findOne(@Param('id') role_id: string): Promise<Role> {
    return this.rolesService.findOne(role_id);
  }

  @Put()
  @ResponseMessage(ROLE_UPDATE_SUCCESS)
  async update(@Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage(ROLE_DELETE_SUCCESS)
  async remove(@Param('id') role_id: string): Promise<void> {
    return this.rolesService.remove(role_id);
  }
}
