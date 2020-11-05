import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "../lectures/lectures.entity"
import { Repository } from "typeorm"
import { Course } from "./courses.entity"

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
    ) {}

    async create(createCourseSchema: any): Promise<Course> {
        const course = new Course()
        try {
            course.name = createCourseSchema.name
            course.description = createCourseSchema.description
            course.lecturer = createCourseSchema.lecturer
            return this.coursesRepository.save(course)
        } catch (e) {
            throw new Error(e)
        }
    }

    // FIXME: add pagination
    findAll(): Promise<Course[]> {
        return this.coursesRepository
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.lectures", "lectures")
            .getMany()
    }

    findOne(id: string): Promise<Course> {
        return this.coursesRepository
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.lectures", "lectures")
            .where("course.id = :id", { id })
            .getOne()
    }

    search(querry: string): Promise<Course[]> {
        return this.coursesRepository.find({ where: { description: querry } })
    }

    async remove(id: string): Promise<void> {
        await this.coursesRepository.delete(id)
    }
}
