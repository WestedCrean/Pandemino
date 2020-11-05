import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Lecture } from "./lectures.entity"
import { Course } from "../courses/courses.entity"

@Injectable()
export class LecturesService {
    constructor(
        @InjectRepository(Lecture)
        private lecturesRepository: Repository<Lecture>,
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
    ) {}

    async create(createLectureSchema: any): Promise<Lecture> {
        const lecture = new Lecture()
        let course: Course

        lecture.name = createLectureSchema.name
        lecture.description = createLectureSchema.description
        lecture.isPublished = false

        try {
            course = await this.coursesRepository.findOne(createLectureSchema.courseId)
        } catch (e) {
            throw new Error(e)
        }

        lecture.course = course

        await this.lecturesRepository.save(lecture)
        return lecture
    }

    // FIXME: add pagination
    findAll(): Promise<Lecture[]> {
        return this.lecturesRepository.find()
    }

    findOne(id: string): Promise<Lecture> {
        return this.lecturesRepository.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.lecturesRepository.delete(id)
    }
}
