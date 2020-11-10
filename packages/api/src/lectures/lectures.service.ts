import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './lectures.entity'
import { Course } from '../courses/courses.entity'

@Injectable()
export class LecturesService {

  constructor(
    @InjectRepository(Lecture)
    private lecturesRepository: Repository<Lecture>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>
  ) {}

  async create(createLectureSchema: any): Promise<Lecture> {
    const lecture = new Lecture();
    let course : Course

    lecture.name = createLectureSchema.name
    lecture.description = createLectureSchema.description
    lecture.isPublished = false

    try {
      course = await this.coursesRepository.findOne(createLectureSchema.course)
    } catch(e) {
      throw new Error(e)
    }

    lecture.createdAt = new Date();
    lecture.course = course

    await this.lecturesRepository.save(lecture);
    return lecture
  }

  async update(id: string, updateLectureSchema: any): Promise<void> {
    let lecture = null;

    try {
      lecture = await this.lecturesRepository.findOne(id);
    } catch(e) {
      throw new Error(e)
    }

    if(updateLectureSchema.name !== null){
      lecture.name = updateLectureSchema.name;
    }
    if(updateLectureSchema.description !== null){
      lecture.description = updateLectureSchema.description;
    }

    await this.lecturesRepository.save(lecture);
  }

  // FIXME: add pagination
  findAll(): Promise<Lecture[]> {
    return this.lecturesRepository.find({relations: ["course"]});
  }

  findOne(id: string): Promise<Lecture> {
    return this.lecturesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.lecturesRepository.delete(id);
  }
}