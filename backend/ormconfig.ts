import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import configuration from './src/config/configuration';
import { User } from './src/modules/auth/entities/user.entity';
import { Project } from './src/modules/projects/entities/project.entity';
import { ProjectMedia } from './src/modules/projects/entities/project-media.entity';
import { Testimonial } from './src/modules/testimonials/entities/testimonial.entity';
import { Resume } from './src/modules/resume/entities/resume.entity';
import { TechStack } from './src/modules/tech-stack/entities/tech-stack.entity';
import { WorkExperience } from './src/modules/resume-sections/entities/work-experience.entity';
import { Education } from './src/modules/resume-sections/entities/education.entity';
import { Skill } from './src/modules/resume-sections/entities/skills.entity';
import { Certification } from './src/modules/resume-sections/entities/certifications.entity';
import { Language } from './src/modules/resume-sections/entities/languages.entity';
import { ContactMessage } from './src/modules/contact/entities/contact-message.entity';
import { AnalyticsEvent, AnalyticsSummary } from './src/modules/analytics/entities/analytics.entity';

config();
const { database } = configuration();

export default new DataSource({
  type: 'postgres',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
  synchronize: false,
  entities: [
    User, 
    Project, 
    ProjectMedia, 
    Testimonial, 
    Resume, 
    TechStack,
    WorkExperience,
    Education,
    Skill,
    Certification,
    Language,
    ContactMessage,
    AnalyticsEvent,
    AnalyticsSummary
  ],
  migrations: ['dist/migrations/*.js'],
});
