import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './lectures.entity'

@Injectable()
export class LecturesService {

  constructor(
    @InjectRepository(Lecture)
    private lecturesRepository: Repository<Lecture>
  ) {}

  async create(createLectureSchema: Lecture): Promise<Lecture> {
    const lecture = new Lecture();
    
    lecture.name = createLectureSchema.name
    lecture.description = createLectureSchema.description

    await this.lecturesRepository.save(lecture);
    return lecture
  }

  // FIXME: add pagination
  findAll(): Promise<Lecture[]> {
    return this.lecturesRepository.find();
  }

  findOne(id: string): Promise<Lecture> {
    return this.lecturesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.lecturesRepository.delete(id);
  }
}