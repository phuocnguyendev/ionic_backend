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
import {
  ROLE_CREATE_SUCCESS,
  ROLE_DELETE_SUCCESS,
  ROLE_LOAD_SUCCESS,
  ROLE_UPDATE_SUCCESS,
} from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponse } from './interfaces/role.interface';
import { RoleService } from './role.service';

@ApiTags('roles')
@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @ResponseMessage(ROLE_CREATE_SUCCESS)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponse> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage(ROLE_LOAD_SUCCESS)
  async findAll(): Promise<RoleResponse[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ResponseMessage(ROLE_LOAD_SUCCESS)
  async findOne(@Param('id') role_id: string): Promise<RoleResponse> {
    return this.rolesService.findOne(role_id);
  }

  @Put()
  @ResponseMessage(ROLE_UPDATE_SUCCESS)
  async update(@Body() updateRoleDto: UpdateRoleDto): Promise<RoleResponse> {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage(ROLE_DELETE_SUCCESS)
  async remove(@Param('id') role_id: string): Promise<void> {
    return this.rolesService.remove(role_id);
  }
}
