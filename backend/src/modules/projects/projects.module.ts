import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PublicProjectsController } from './public-media.controller';
import { Project } from './entities/project.entity';
import { ProjectMedia } from './entities/project-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectMedia])],
  controllers: [ProjectsController, PublicProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
