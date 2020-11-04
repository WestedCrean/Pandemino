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

  async create(createCourseSchema: Course): Promise<Course> {
    const course = new Course();
    
    try {
      course.name = createCourseSchema.name
      course.description = createCourseSchema.description
      course.lecturer = createCourseSchema.lecturer
      await this.coursesRepository.save(course);
      return course
    } catch (e) {
      throw new Error(e)
    }

    
  }

  // FIXME: add pagination
  findAll(): Promise<Course[]> {

    return this.coursesRepository.createQueryBuilder("course")
      .leftJoinAndSelect("course.lectures", "lectures").getMany();
  }

  findOne(id: string): Promise<Course> {

    return this.coursesRepository.createQueryBuilder("course")
      .leftJoinAndSelect("course.lectures", "lectures")
      .where("course.id = :id", { id })
      .getOne();

    //return this.coursesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}