import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Testimonial, TestimonialStatus } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialsDto } from './dto/query-testimonials.dto';
import { BulkUpdateStatusDto, BulkDeleteDto } from './dto/bulk-operations.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialRepository.create(createTestimonialDto);
    return this.testimonialRepository.save(testimonial);
  }

  async findAll(query: QueryTestimonialsDto) {
    const {
      status,
      page = 1,
      limit = 10,
      rating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (rating) {
      where.rating = rating;
    }

    if (search) {
      where.clientName = Like(`%${search}%`);
    }

    const [testimonials, total] = await this.testimonialRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      testimonials,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepository.findOne({ where: { id } });
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return testimonial;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto): Promise<Testimonial> {
    await this.testimonialRepository.update(id, updateTestimonialDto);
    return this.findOne(id);
  }

  async approve(id: string, adminNotes?: string): Promise<Testimonial> {
    await this.testimonialRepository.update(id, {
      status: TestimonialStatus.APPROVED,
      approvedAt: new Date(),
      adminNotes,
    });
    return this.findOne(id);
  }

  async reject(id: string, adminNotes?: string): Promise<Testimonial> {
    await this.testimonialRepository.update(id, {
      status: TestimonialStatus.REJECTED,
      rejectedAt: new Date(),
      adminNotes,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.testimonialRepository.delete(id);
  }

  async bulkUpdateStatus(bulkUpdateDto: BulkUpdateStatusDto): Promise<Testimonial[]> {
    const { testimonialIds, status, adminNotes } = bulkUpdateDto;
    
    const updateData: any = { status };
    
    if (status === TestimonialStatus.APPROVED) {
      updateData.approvedAt = new Date();
    } else if (status === TestimonialStatus.REJECTED) {
      updateData.rejectedAt = new Date();
    }
    
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    await this.testimonialRepository.update(testimonialIds, updateData);
    
    return this.testimonialRepository.findByIds(testimonialIds);
  }

  async bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void> {
    const { testimonialIds } = bulkDeleteDto;
    await this.testimonialRepository.delete(testimonialIds);
  }

  async getStatistics() {
    const total = await this.testimonialRepository.count();
    const approved = await this.testimonialRepository.count({ where: { status: TestimonialStatus.APPROVED } });
    const pending = await this.testimonialRepository.count({ where: { status: TestimonialStatus.PENDING } });
    const rejected = await this.testimonialRepository.count({ where: { status: TestimonialStatus.REJECTED } });

    // Calculate average rating for approved testimonials
    const approvedTestimonials = await this.testimonialRepository.find({
      where: { status: TestimonialStatus.APPROVED },
      select: ['rating'],
    });

    const averageRating = approvedTestimonials.length > 0
      ? approvedTestimonials.reduce((sum, t) => sum + t.rating, 0) / approvedTestimonials.length
      : 0;

    // Rating distribution
    const ratingDistribution: { [key: number]: number } = {};
    for (let i = 1; i <= 5; i++) {
      ratingDistribution[i] = await this.testimonialRepository.count({
        where: { rating: i, status: TestimonialStatus.APPROVED },
      });
    }

    return {
      total,
      approved,
      pending,
      rejected,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      ratingDistribution,
    };
  }

  async getApprovedTestimonials(limit = 10): Promise<Testimonial[]> {
    return this.testimonialRepository.find({
      where: { status: TestimonialStatus.APPROVED },
      order: { approvedAt: 'DESC' },
      take: limit,
    });
  }
}
