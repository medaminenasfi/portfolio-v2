import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = configService.getOrThrow<number>('app.port');
  const appName = configService.get<string>('app.name', 'portfolio-api');
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 ${appName} is running at http://localhost:${port}/api`);
}

bootstrap();
