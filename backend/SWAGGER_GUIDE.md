# Swagger Documentation Guide

## Overview
Swagger is now configured in your NestJS backend! The documentation is available at:
```
http://localhost:3000/api/docs
```

## What's Already Done ✅
- Swagger configuration in `main.ts`
- Auth controller fully documented with decorators
- Login and Register DTOs enhanced with `@ApiProperty`
- JWT Bearer authentication configured
- Tags organized for all modules

## How to Add Swagger to Other Controllers

### 1. Import Swagger Decorators
```typescript
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
```

### 2. Add Controller Tag
```typescript
@ApiTags('projects')  // Replace with your module name
@Controller('projects')
export class ProjectsController {
  // ...
}
```

### 3. Document Each Endpoint

#### For GET endpoints:
```typescript
@Get()
@ApiOperation({ summary: 'Get all projects' })
@ApiResponse({ 
  status: 200, 
  description: 'Projects retrieved successfully',
  type: [Project]  // Array of Project entities
})
async findAll() {
  return this.projectsService.findAll();
}
```

#### For GET by ID endpoints:
```typescript
@Get(':id')
@ApiOperation({ summary: 'Get project by ID' })
@ApiParam({ 
  name: 'id', 
  description: 'Project ID', 
  type: 'number' 
})
@ApiResponse({ 
  status: 200, 
  description: 'Project retrieved successfully',
  type: Project
})
@ApiResponse({ 
  status: 404, 
  description: 'Project not found' 
})
async findOne(@Param('id') id: number) {
  return this.projectsService.findOne(id);
}
```

#### For POST endpoints:
```typescript
@Post()
@ApiOperation({ summary: 'Create a new project' })
@ApiBody({ type: CreateProjectDto })
@ApiResponse({ 
  status: 201, 
  description: 'Project created successfully',
  type: Project
})
@ApiResponse({ 
  status: 400, 
  description: 'Bad request - Invalid data' 
})
async create(@Body() createProjectDto: CreateProjectDto) {
  return this.projectsService.create(createProjectDto);
}
```

#### For PUT endpoints:
```typescript
@Put(':id')
@ApiOperation({ summary: 'Update project' })
@ApiParam({ 
  name: 'id', 
  description: 'Project ID', 
  type: 'number' 
})
@ApiBody({ type: UpdateProjectDto })
@ApiResponse({ 
  status: 200, 
  description: 'Project updated successfully',
  type: Project
})
@ApiResponse({ 
  status: 404, 
  description: 'Project not found' 
})
async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
  return this.projectsService.update(id, updateProjectDto);
}
```

#### For DELETE endpoints:
```typescript
@Delete(':id')
@ApiOperation({ summary: 'Delete project' })
@ApiParam({ 
  name: 'id', 
  description: 'Project ID', 
  type: 'number' 
})
@ApiResponse({ 
  status: 200, 
  description: 'Project deleted successfully' 
})
@ApiResponse({ 
  status: 404, 
  description: 'Project not found' 
})
async remove(@Param('id') id: number) {
  return this.projectsService.remove(id);
}
```

### 4. Protected Endpoints (Requires JWT)
```typescript
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')  // This must match the name in main.ts
@Post()
@ApiOperation({ summary: 'Create project (protected)' })
// ... other decorators
async create(@Body() createProjectDto: CreateProjectDto) {
  return this.projectsService.create(createProjectDto);
}
```

### 5. Enhance DTOs
Add `@ApiProperty` to all DTO properties:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project title',
    example: 'My Awesome Project',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Project description',
    example: 'A detailed description of the project',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Project technologies',
    example: ['React', 'Node.js', 'TypeScript'],
    type: [String],
  })
  technologies: string;

  @ApiProperty({
    description: 'Project URL',
    example: 'https://github.com/user/project',
    type: String,
    required: false,
  })
  url?: string;
}
```

### 6. Entity Documentation
Add `@ApiProperty` to your entities:

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @ApiProperty({
    description: 'Project ID',
    example: 1,
    type: 'number',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Project title',
    example: 'My Awesome Project',
    type: String,
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Project description',
    example: 'A detailed description',
    type: String,
  })
  @Column()
  description: string;
}
```

## Available Tags
- `auth` - Authentication endpoints
- `projects` - Project management
- `testimonials` - Testimonials management
- `resume` - Resume management
- `tech-stack` - Technology stack management
- `contact` - Contact form management
- `analytics` - Analytics endpoints
- `settings` - Application settings

## Testing Swagger
1. Start your backend: `npm run start:dev`
2. Navigate to: `http://localhost:3000/api/docs`
3. Test endpoints directly from the Swagger UI
4. For protected endpoints, click "Authorize" and enter your JWT token

## Quick Template for Controllers
```typescript
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { YourService } from './your.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { Entity } from './entities/entity.entity';

@ApiTags('your-module')
@Controller('your-module')
export class YourController {
  constructor(private readonly yourService: YourService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully', type: [Entity] })
  findAll() {
    return this.yourService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully', type: Entity })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id') id: number) {
    return this.yourService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new item' })
  @ApiBody({ type: CreateDto })
  @ApiResponse({ status: 201, description: 'Item created successfully', type: Entity })
  create(@Body() createDto: CreateDto) {
    return this.yourService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update item' })
  @ApiParam({ name: 'id', description: 'Item ID', type: 'number' })
  @ApiBody({ type: UpdateDto })
  @ApiResponse({ status: 200, description: 'Item updated successfully', type: Entity })
  @ApiResponse({ status: 404, description: 'Item not found' })
  update(@Param('id') id: number, @Body() updateDto: UpdateDto) {
    return this.yourService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item' })
  @ApiParam({ name: 'id', description: 'Item ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  remove(@Param('id') id: number) {
    return this.yourService.remove(id);
  }
}
```

## Next Steps
1. Apply these decorators to all your controllers
2. Enhance all DTOs with `@ApiProperty`
3. Add `@ApiProperty` to your entities
4. Test the documentation at `http://localhost:3000/api/docs`
5. Use the Swagger UI to test your API endpoints
