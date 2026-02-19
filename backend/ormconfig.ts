import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import configuration from './src/config/configuration';

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
  migrations: ['dist/migrations/*.js'],
});
