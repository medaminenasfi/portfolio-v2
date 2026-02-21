import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async uploadResume(file: Express.Multer.File, title?: string, description?: string): Promise<Resume> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validate file type (PDF only)
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 10MB');
    }

    // Deactivate all existing resumes
    await this.resumeRepository.update({}, { isActive: false });

    // Create new resume record
    const resume = this.resumeRepository.create({
      filename: file.filename!,
      originalName: file.originalname!,
      mimeType: file.mimetype!,
      size: file.size!,
      filePath: file.path!,
      title: title || file.originalname!,
      description: description || undefined,
      isActive: true,
    });

    return this.resumeRepository.save(resume);
  }

  async getCurrentResume(): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    if (!resume) {
      throw new NotFoundException('No active resume found');
    }

    return resume;
  }

  async getAllResumes(): Promise<Resume[]> {
    return this.resumeRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async updateResume(id: string, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    await this.resumeRepository.update(id, updateResumeDto);
    const updatedResume = await this.resumeRepository.findOne({ where: { id } });
    if (!updatedResume) {
      throw new NotFoundException('Resume not found after update');
    }
    return updatedResume;
  }

  async deleteResume(id: string): Promise<void> {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    // Delete file from filesystem
    try {
      await fs.unlink(resume.filePath);
    } catch (error) {
      console.warn('Could not delete file:', (error as Error).message);
    }

    // Delete from database
    await this.resumeRepository.delete(id);
  }

  async getResumeFilePath(id?: string): Promise<string> {
    let resume: Resume;

    if (id) {
      resume = await this.resumeRepository.findOne({ where: { id } }) as Resume;
      if (!resume) {
        throw new NotFoundException('Resume not found');
      }
    } else {
      resume = await this.getCurrentResume();
    }

    // Check if file exists
    try {
      await fs.access(resume.filePath);
    } catch (error) {
      throw new NotFoundException('Resume file not found on server');
    }

    return resume.filePath;
  }

  async serveResume(id?: string): Promise<{ filePath: string; filename: string; mimeType: string }> {
    const resume = id 
      ? await this.resumeRepository.findOne({ where: { id } })
      : await this.getCurrentResume();

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    return {
      filePath: resume.filePath,
      filename: resume.originalName,
      mimeType: resume.mimeType,
    };
  }

  async getResumeInfo(id?: string): Promise<Partial<Resume>> {
    const resume = id 
      ? await this.resumeRepository.findOne({ where: { id } })
      : await this.getCurrentResume();

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    // Return info without file path
    return {
      id: resume.id,
      filename: resume.filename,
      originalName: resume.originalName,
      mimeType: resume.mimeType,
      size: resume.size,
      title: resume.title,
      description: resume.description,
      isActive: resume.isActive,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  }
}
