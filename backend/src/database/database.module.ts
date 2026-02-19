import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { AppConfiguration, DatabaseConfig } from '../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<AppConfiguration>,
      ): Promise<DataSourceOptions> => {
        const database = configService.getOrThrow<DatabaseConfig>('database');
        const env = configService.get<string>('app.env', 'development');

        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.name,
          logging: database.logging,
          synchronize: env !== 'production',
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
