#!/bin/bash

# Array of modules to create
modules=(
  "course"
  "test-result"
  "notification" 
  "permission"
  "mock-exam"
  "student-evaluation"
  "test-history"
  "course-test"
  "course-enrollment"
  "system-log"
  "ai-recommendation"
  "answer-sample"
  "report"
  "test-and-center-review"
)

# Base directory
BASE_DIR="/Users/nguyenhuuphuoc/Downloads/Front-end/ionic/ionic_backend/src/modules"

# Function to create module structure
create_module() {
  local module_name=$1
  local pascal_name=$(echo $module_name | sed 's/-/ /g' | sed 's/\b\w/\U&/g' | sed 's/ //g')
  local camel_name=$(echo $pascal_name | sed 's/^./\l&/')
  
  echo "Creating $module_name module..."
  
  # Create directory
  mkdir -p "$BASE_DIR/$module_name/dto"
  mkdir -p "$BASE_DIR/$module_name/interfaces"
  
  # Create DTO files
  cat > "$BASE_DIR/$module_name/dto/create-$module_name.dto.ts" << EOF
import { IsString, IsOptional } from 'class-validator';

export class Create${pascal_name}Dto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for $module_name
}
EOF

  cat > "$BASE_DIR/$module_name/dto/update-$module_name.dto.ts" << EOF
import { PartialType } from '@nestjs/mapped-types';
import { Create${pascal_name}Dto } from './create-$module_name.dto';

export class Update${pascal_name}Dto extends PartialType(Create${pascal_name}Dto) {}
EOF

  # Create Service
  cat > "$BASE_DIR/$module_name/$module_name.service.ts" << EOF
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${pascal_name}Service {
  constructor() {}

  async create(createData: any): Promise<any> {
    // TODO: Implement creation logic
    throw new Error('Not implemented');
  }

  async findAll(): Promise<any[]> {
    // TODO: Implement find all logic
    throw new Error('Not implemented');
  }

  async findOne(id: string): Promise<any> {
    // TODO: Implement find one logic
    throw new Error('Not implemented');
  }

  async update(id: string, updateData: any): Promise<any> {
    // TODO: Implement update logic
    throw new Error('Not implemented');
  }

  async remove(id: string): Promise<void> {
    // TODO: Implement removal logic
    throw new Error('Not implemented');
  }
}
EOF

  # Create Controller
  cat > "$BASE_DIR/$module_name/$module_name.controller.ts" << EOF
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
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { Create${pascal_name}Dto } from './dto/create-$module_name.dto';
import { Update${pascal_name}Dto } from './dto/update-$module_name.dto';
import { ${pascal_name}Service } from './$module_name.service';

@ApiTags('${pascal_name}')
@Controller('$module_name')
export class ${pascal_name}Controller {
  constructor(private readonly ${camel_name}Service: ${pascal_name}Service) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: Create${pascal_name}Dto): Promise<any> {
    return this.${camel_name}Service.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.${camel_name}Service.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.${camel_name}Service.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: Update${pascal_name}Dto,
  ): Promise<any> {
    return this.${camel_name}Service.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.${camel_name}Service.remove(id);
  }
}
EOF

  # Create Module
  cat > "$BASE_DIR/$module_name/$module_name.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${pascal_name}Controller } from './$module_name.controller';
import { ${pascal_name}Service } from './$module_name.service';

@Module({
  imports: [],
  controllers: [${pascal_name}Controller],
  providers: [${pascal_name}Service],
  exports: [${pascal_name}Service],
})
export class ${pascal_name}Module {}
EOF

  echo "✅ Created $module_name module"
}

# Create all modules
for module in "${modules[@]}"; do
  create_module "$module"
done

echo "🚀 All base modules created successfully!"
echo "📝 Next steps:"
echo "1. Update each service to use proper interfaces"
echo "2. Add proper validation to DTOs"
echo "3. Implement business logic"
echo "4. Add repositories and validators where needed"
echo "5. Update app.module.ts to import new modules"
