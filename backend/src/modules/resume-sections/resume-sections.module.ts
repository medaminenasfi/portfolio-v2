import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeSectionsService } from './resume-sections.service';
import { ResumeSectionsController } from './resume-sections.controller';
import { WorkExperience } from './entities/work-experience.entity';
import { Education } from './entities/education.entity';
import { Skill } from './entities/skills.entity';
import { Certification } from './entities/certifications.entity';
import { Language } from './entities/languages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperience, Education, Skill, Certification, Language])],
  controllers: [ResumeSectionsController],
  providers: [ResumeSectionsService],
  exports: [ResumeSectionsService],
})
export class ResumeSectionsModule {}
