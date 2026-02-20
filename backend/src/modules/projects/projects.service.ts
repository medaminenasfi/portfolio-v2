import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async create(createProjectDto: CreateProjectDto, userId?: string): Promise<Project> {
    try {
      // Generate slug from title if not provided
      const slug = createProjectDto.slug || this.generateSlug(createProjectDto.title);
      
      // Check if slug already exists
      const existingProject = await this.projectRepository.findOne({
        where: { slug },
      });
      
      if (existingProject) {
        // Generate unique slug by adding timestamp
        const uniqueSlug = `${slug}-${Date.now()}`;
        createProjectDto.slug = uniqueSlug;
      } else {
        createProjectDto.slug = slug;
      }
      
      // Convert string enums to proper enum types
      const projectData = {
        ...createProjectDto,
        category: createProjectDto.category as any,
        status: createProjectDto.status as any,
        user: { id: userId } as any,
      };
      
      const project = this.projectRepository.create(projectData);
      const savedProject = await this.projectRepository.save(project);
      console.log(`[PROJECTS] Project created: ${savedProject.title} (${savedProject.id})`);
      return savedProject;
    } catch (error: any) {
      console.error('[PROJECTS] Error creating project:', error.message);
      throw error;
    }
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    
    // Convert string enums to proper enum types
    const updateData = {
      ...updateProjectDto,
      category: updateProjectDto.category as any,
      status: updateProjectDto.status as any,
    };
    
    const updated = this.projectRepository.merge(project, updateData);
    return this.projectRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async count(): Promise<{ total: number }> {
    const total = await this.projectRepository.count();
    return { total };
  }
}
