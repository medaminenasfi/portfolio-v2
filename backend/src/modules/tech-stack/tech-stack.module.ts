import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStackService } from './tech-stack.service';
import { TechStackController } from './tech-stack.controller';
import { TechStack } from './entities/tech-stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechStack])],
  controllers: [TechStackController],
  providers: [TechStackService],
  exports: [TechStackService],
})
export class TechStackModule {}
