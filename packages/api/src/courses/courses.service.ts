import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/users.entity"
import { Repository } from "typeorm"
import { Course } from "./courses.entity"
import {CourseCategory} from "../courseCategory/courseCategory.entity"
import * as bcrypt from 'bcryptjs';


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(CourseCategory)
        private courseCategoryRepository: Repository<CourseCategory>,
    ) {}

    async create(createCourseSchema: any): Promise<Course> {
        const course = new Course()
        let user: User
        let courseCategory: CourseCategory
        
        try {
            user = await this.userRepository.findOne(createCourseSchema.userId)
        } catch (e) {
            throw new Error(e)
        }

        try {
            courseCategory = await this.courseCategoryRepository.findOne(createCourseSchema.courseCategoryId)
        } catch (e) {
            throw new Error(e)
        }

        try {

            const hashedPassword = await bcrypt.hash(createCourseSchema.password, 10);

            course.name = createCourseSchema.name
            course.description = createCourseSchema.description
            course.lecturer = user
            course.courseCategory = courseCategory
            course.password = hashedPassword
            course.createdAt = new Date()
            await this.coursesRepository.save(course)

            course.password = undefined
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

        if (updateCourseSchema.name !== null || updateCourseSchema.name !== "") {
            course.name = updateCourseSchema.name
        }
        if (updateCourseSchema.description !== null || updateCourseSchema.description !== "") {
            course.description = updateCourseSchema.description
        }
        if (updateCourseSchema.password !== null || updateCourseSchema.password !== "") {
            course.password = await bcrypt.hash(updateCourseSchema.password, 10);
        }

        if (updateCourseSchema.courseCategoryId !== null || updateCourseSchema.courseCategoryId !== "") {

            let courseCategory: CourseCategory
            try {
                courseCategory = await this.courseCategoryRepository.findOne(updateCourseSchema.courseCategoryId)
            } catch (e) {
                throw new Error(e)
            }
            course.courseCategory = courseCategory
        }



        await this.coursesRepository.save(course)        
    }

    // FIXME: add pagination
    findAll(): Promise<Course[]> {
        return this.coursesRepository.find({ relations: ["lectures", "lecturer", "userCourses", "userCourses.user", "courseCategory"] })
    }

    findOne(id: string): Promise<Course> {
        return this.coursesRepository.findOne(id, { relations: ["lectures", "lecturer", "userCourses", "userCourses.user", "courseCategory"] })

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
