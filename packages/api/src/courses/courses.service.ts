import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "../users/users.entity";
import { Repository } from 'typeorm';
import { Course } from './courses.entity'

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCourseSchema: any): Promise<Course> {
    const course = new Course();
    let user : User;
    
    try {
      user = await this.userRepository.findOne(createCourseSchema.userId);
    } catch(e) {
      throw new Error(e)
    }

    try {
      course.name = createCourseSchema.name
      course.description = createCourseSchema.description
      course.lecturer = user;
      await this.coursesRepository.save(course);
      return course
    } catch (e) {
      throw new Error(e)
    }    
  }

  async update(id: string, updateCourseSchema: any): Promise<void> {
    let course = null;

    try {
      course = await this.coursesRepository.findOne(id);
    } catch(e) {
      throw new Error(e)
    }

    if(updateCourseSchema.name !== null){
      course.name = updateCourseSchema.name;
    }
    if(updateCourseSchema.description !== null){
      course.description = updateCourseSchema.description;
    }

    await this.coursesRepository.save(course);
  }

  // FIXME: add pagination
  findAll(): Promise<Course[]> {

    return this.coursesRepository.find({ relations: ['lectures', 'lecturer'] });
  }

  findOne(id: string): Promise<Course> {

    return this.coursesRepository.findOne(id, { relations: ['lectures', 'lecturer'] });

    //return this.coursesRepository.findOne(id);
  }

  //FIXME: added lecturer filtering
  searchAll(querry: string): Promise<Course[]> {
    return this.coursesRepository
    .createQueryBuilder("course")
      .leftJoinAndSelect("course.lecturer", "users.courses")
      .where(`UPPER(course.description) like UPPER('%${querry}%') 
             or UPPER(course.name) like UPPER('%${querry}%')`)
      .getMany();
        // 
    //find({ where: { description: querry } })
}

  async remove(id: string): Promise<void> {

    await this.coursesRepository.delete(id);
  }
}