import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Project, ProjectStatus, ProjectProgressStatus } from './entities/project.entity';
import { ProjectMedia } from './entities/project-media.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { BulkPublishDto, BulkDeleteDto, BulkFeatureDto } from './dto/bulk-operations.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectMedia)
    private readonly mediaRepository: Repository<ProjectMedia>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const project = this.projectRepository.create(createProjectDto);
      
      // Handle scheduled publishing
      if (createProjectDto.scheduledPublishAt) {
        project.scheduledPublishAt = new Date(createProjectDto.scheduledPublishAt);
      }

      // Set published date if status is published
      if (project.status === ProjectStatus.PUBLISHED) {
        project.publishedAt = new Date();
      }

      return await this.projectRepository.save(project);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async findAll(query: QueryProjectsDto): Promise<{ projects: Project[]; total: number; page: number; limit: number }> {
    const { page = 1, limit = 10, search, category, status, progressStatus, difficulty, featured, tech, sortBy = 'createdAt', sortOrder = 'DESC' } = query;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.media', 'media')
      .orderBy(`project.${sortBy}`, sortOrder);

    // Search functionality
    if (search) {
      queryBuilder.andWhere(
        '(project.title ILIKE :search OR project.description ILIKE :search OR project.shortSummary ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Category filter
    if (category) {
      queryBuilder.andWhere('project.category = :category', { category });
    }

    // Status filter
    if (status) {
      queryBuilder.andWhere('project.status = :status', { status });
    }

    // Progress status filter
    if (progressStatus) {
      queryBuilder.andWhere('project.progressStatus = :progressStatus', { progressStatus });
    }

    // Difficulty filter
    if (difficulty) {
      queryBuilder.andWhere('project.difficulty = :difficulty', { difficulty });
    }

    // Featured filter
    if (featured !== undefined) {
      queryBuilder.andWhere('project.isFeatured = :featured', { featured });
    }

    // Technology filter
    if (tech) {
      queryBuilder.andWhere(':tech = ANY(project.techStack)', { tech });
    }

    // Handle scheduled publishing
    const now = new Date();
    queryBuilder.andWhere(
      '(project.scheduledPublishAt IS NULL OR project.scheduledPublishAt <= :now)',
      { now }
    );

    const [projects, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      projects,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['media'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    try {
      // Handle status changes
      if (updateProjectDto.status) {
        if (updateProjectDto.status === ProjectStatus.PUBLISHED && project.status !== ProjectStatus.PUBLISHED) {
          project.publishedAt = new Date();
        } else if (updateProjectDto.status === ProjectStatus.ARCHIVED && project.status !== ProjectStatus.ARCHIVED) {
          project.archivedAt = new Date();
        }
      }

      // Handle scheduled publishing
      if (updateProjectDto.scheduledPublishAt) {
        project.scheduledPublishAt = new Date(updateProjectDto.scheduledPublishAt);
      }

      Object.assign(project, updateProjectDto);
      return await this.projectRepository.save(project);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async duplicate(id: string): Promise<Project> {
    const originalProject = await this.findOne(id);
    
    const duplicatedProject = this.projectRepository.create({
      ...originalProject,
      id: undefined,
      title: `${originalProject.title} (Copy)`,
      status: ProjectStatus.DRAFT,
      publishedAt: undefined,
      archivedAt: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });

    return await this.projectRepository.save(duplicatedProject);
  }

  // Bulk operations
  async bulkPublish(bulkPublishDto: BulkPublishDto): Promise<Project[]> {
    const { projectIds, status } = bulkPublishDto;
    
    const projects = await this.projectRepository.findByIds(projectIds);
    
    if (projects.length !== projectIds.length) {
      throw new BadRequestException('Some projects not found');
    }

    const updateData: Partial<Project> = { status };
    if (status === ProjectStatus.PUBLISHED) {
      updateData.publishedAt = new Date();
    } else if (status === ProjectStatus.ARCHIVED) {
      updateData.archivedAt = new Date();
    }

    await this.projectRepository.update(projectIds, updateData);
    
    return await this.projectRepository.findByIds(projectIds);
  }

  async bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void> {
    const { projectIds } = bulkDeleteDto;
    
    const projects = await this.projectRepository.findByIds(projectIds);
    
    if (projects.length !== projectIds.length) {
      throw new BadRequestException('Some projects not found');
    }

    await this.projectRepository.remove(projects);
  }

  async bulkFeature(bulkFeatureDto: BulkFeatureDto): Promise<Project[]> {
    const { projectIds, isFeatured = true } = bulkFeatureDto;
    
    const projects = await this.projectRepository.findByIds(projectIds);
    
    if (projects.length !== projectIds.length) {
      throw new BadRequestException('Some projects not found');
    }

    await this.projectRepository.update(projectIds, { isFeatured });
    
    return await this.projectRepository.findByIds(projectIds);
  }

  // Statistics
  async getStatistics(): Promise<{
    total: number;
    published: number;
    draft: number;
    archived: number;
    featured: number;
    completed: number;
    inProgress: number;
    byCategory: Record<string, number>;
    byDifficulty: Record<string, number>;
  }> {
    const [
      total,
      published,
      draft,
      archived,
      featured,
      completed,
      inProgress,
      byCategory,
      byDifficulty,
    ] = await Promise.all([
      this.projectRepository.count(),
      this.projectRepository.count({ where: { status: ProjectStatus.PUBLISHED } }),
      this.projectRepository.count({ where: { status: ProjectStatus.DRAFT } }),
      this.projectRepository.count({ where: { status: ProjectStatus.ARCHIVED } }),
      this.projectRepository.count({ where: { isFeatured: true } }),
      this.projectRepository.count({ where: { progressStatus: ProjectProgressStatus.COMPLETED } }),
      this.projectRepository.count({ where: { progressStatus: ProjectProgressStatus.IN_PROGRESS } }),
      this.getCategoryStats(),
      this.getDifficultyStats(),
    ]);

    return {
      total,
      published,
      draft,
      archived,
      featured,
      completed,
      inProgress,
      byCategory,
      byDifficulty,
    };
  }

  private async getCategoryStats(): Promise<Record<string, number>> {
    const result = await this.projectRepository
      .createQueryBuilder('project')
      .select('project.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('project.category')
      .getRawMany();

    return result.reduce((acc, item) => {
      acc[item.category] = parseInt(item.count);
      return acc;
    }, {});
  }

  private async getDifficultyStats(): Promise<Record<string, number>> {
    const result = await this.projectRepository
      .createQueryBuilder('project')
      .select('project.difficulty', 'difficulty')
      .addSelect('COUNT(*)', 'count')
      .groupBy('project.difficulty')
      .getRawMany();

    return result.reduce((acc, item) => {
      acc[item.difficulty] = parseInt(item.count);
      return acc;
    }, {});
  }

  // Media management
  async addMedia(projectId: string, mediaData: Partial<ProjectMedia>): Promise<ProjectMedia> {
    const project = await this.findOne(projectId);
    
    // Get the highest order number for this project
    const lastMedia = await this.mediaRepository.findOne({
      where: { projectId },
      order: { order: 'DESC' },
    });

    const media = this.mediaRepository.create({
      ...mediaData,
      projectId,
      order: lastMedia ? lastMedia.order + 1 : 0,
    });

    return await this.mediaRepository.save(media);
  }

  async updateMediaOrder(projectId: string, mediaOrders: { id: string; order: number }[]): Promise<ProjectMedia[]> {
    await Promise.all(
      mediaOrders.map(({ id, order }) =>
        this.mediaRepository.update(id, { order })
      )
    );

    return await this.mediaRepository.find({
      where: { projectId },
      order: { order: 'ASC' },
    });
  }

  async removeMedia(mediaId: string): Promise<void> {
    const media = await this.mediaRepository.findOne({ where: { id: mediaId } });
    if (!media) {
      throw new NotFoundException(`Media with ID ${mediaId} not found`);
    }
    await this.mediaRepository.remove(media);
  }

  async setCoverImage(projectId: string, mediaId: string): Promise<Project> {
    const project = await this.findOne(projectId);
    const media = await this.mediaRepository.findOne({ 
      where: { id: mediaId, projectId } 
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${mediaId} not found in this project`);
    }

    project.coverImageId = mediaId;
    return await this.projectRepository.save(project);
  }

  // Scheduled publishing checker
  async checkScheduledPublishing(): Promise<void> {
    const now = new Date();
    
    const scheduledProjects = await this.projectRepository.find({
      where: {
        scheduledPublishAt: LessThanOrEqual(now),
        status: ProjectStatus.DRAFT,
      },
    });

    if (scheduledProjects.length > 0) {
      await this.projectRepository.update(
        scheduledProjects.map(p => p.id),
        {
          status: ProjectStatus.PUBLISHED,
          publishedAt: now,
        }
      );
    }
  }
}
