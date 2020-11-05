import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/lectures/lectures.entity';
import { Repository } from 'typeorm';
import { Course } from './courses.entity'

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>
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

    return this.coursesRepository.find({ relations: ['lectures'] });
  }

  findOne(id: string): Promise<Course> {

    return this.coursesRepository.findOne(id, { relations: ['lectures'] });

    //return this.coursesRepository.findOne(id);
  }

  searchAll(querry: string): Promise<Course[]> {
    return this.coursesRepository
    .createQueryBuilder("course")
    .where(`UPPER(course.description) like UPPER('%${querry}%') 
          or UPPER(course.name) like UPPER('%${querry}%') 
          or UPPER(course.lecturer) like UPPER('%${querry}%')`).getMany();
    //find({ where: { description: querry } })
}

  async remove(id: string): Promise<void> {

    await this.coursesRepository.delete(id);
  }
}