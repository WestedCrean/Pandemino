import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/users.entity"
import { Repository } from "typeorm"
import { Course } from "./courses.entity"

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createCourseSchema: any): Promise<Course> {
        const course = new Course()
        let user: User

        try {
            user = await this.userRepository.findOne(createCourseSchema.userId)
        } catch (e) {
            throw new Error(e)
        }

        try {
            course.name = createCourseSchema.name
            course.description = createCourseSchema.description
            course.lecturer = user
            course.createdAt = new Date()
            await this.coursesRepository.save(course)
            return course
        } catch (e) {
            throw new Error(e)
        }
    }

    async update(id: string, updateCourseSchema: any): Promise<void> {
        let course = null

        try {
            course = await this.coursesRepository.findOne(id)
        } catch (e) {
            throw new Error(e)
        }

        if (updateCourseSchema.name !== null) {
            course.name = updateCourseSchema.name
        }
        if (updateCourseSchema.description !== null) {
            course.description = updateCourseSchema.description
        }

        await this.coursesRepository.save(course)
    }

    // FIXME: add pagination
    findAll(): Promise<Course[]> {
        return this.coursesRepository.find({ relations: ["lectures", "lecturer"] })
    }

    findOne(id: string): Promise<Course> {
        return this.coursesRepository.findOne(id, { relations: ["lectures", "lecturer"] })

        //return this.coursesRepository.findOne(id);
    }

    //FIXME: added lecturer filtering
    searchAll(querry: string): Promise<Course[]> {
        return this.coursesRepository
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.lecturer", "users")
            .where(
                `UPPER(course.description) like UPPER('%${querry}%') 
                or UPPER(course.name) like UPPER('%${querry}%')
                or UPPER(users.firstName) like UPPER('%${querry}%')
                or UPPER(users.lastName) like UPPER('%${querry}%')
                or UPPER(users.email) like UPPER('%${querry}%')
                `,
            )
            .getMany()
        //
        //find({ where: { description: querry } })
    }

    async remove(id: string): Promise<void> {
        await this.coursesRepository.delete(id)
    }
}
