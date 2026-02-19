import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppConfig, AppConfiguration, DatabaseConfig } from '../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<AppConfiguration>,
      ): Promise<TypeOrmModuleOptions> => {
        const database = configService.getOrThrow<DatabaseConfig>('database');
        const appConfig = configService.getOrThrow<AppConfig>('app');

        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.name,
          logging: database.logging,
          synchronize: appConfig.env !== 'production',
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
