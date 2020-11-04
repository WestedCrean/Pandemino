import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.entity'

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>
  ) {}

  async create(createCourseSchema: any): Promise<Course> {
    const course = new Course();
    
    try {
      course.name = createCourseSchema.name
      course.description = createCourseSchema.description
      course.lecturer = createCourseSchema.lecturer
      return this.coursesRepository.save(course);
    } catch (e) {
      throw new Error(e)
    }
  }

  // FIXME: add pagination
  findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findOne(id: string): Promise<Course> {
    return this.coursesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}