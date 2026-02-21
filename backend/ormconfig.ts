import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import configuration from './src/config/configuration';
import { User } from './src/modules/auth/entities/user.entity';
import { Project } from './src/modules/projects/entities/project.entity';
import { ProjectMedia } from './src/modules/projects/entities/project-media.entity';
import { Testimonial } from './src/modules/testimonials/entities/testimonial.entity';

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
  entities: [User, Project, ProjectMedia, Testimonial],
  migrations: ['dist/migrations/*.js'],
});
