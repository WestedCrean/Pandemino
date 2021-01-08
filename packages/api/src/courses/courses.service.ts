import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/users.entity"
import { getRepository, Repository } from "typeorm"
import { Course } from "./courses.entity"
import * as bcrypt from "bcryptjs"
import { Lecture } from "src/lectures/lectures.entity"

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
            const hashedPassword = await bcrypt.hash(createCourseSchema.password, 10)

            course.name = createCourseSchema.name
            course.description = createCourseSchema.description
            course.lecturer = user
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
            course.password = await bcrypt.hash(updateCourseSchema.password, 10)
        }

        await this.coursesRepository.save(course)
    }

    async toggleLiveStream(id: number, desiredIsLive: boolean, lectureId: number): Promise<void> {
        console.log({ id, desiredIsLive, lectureId })

        if (desiredIsLive && !lectureId) {
            throw new HttpException("No lectureId supplied", HttpStatus.BAD_REQUEST)
        }

        console.log("before all")

        if (desiredIsLive) {
            try {
                console.log("before lecture")

                let lecture = await getRepository(Lecture)
                    .createQueryBuilder("lecture")
                    .where("lecture.id = :id", { id: lectureId })
                    .getOne()

                console.log("after lecture")
                console.log({ lecture })

                if (!lecture) {
                    throw new HttpException("No such lecture was found", HttpStatus.BAD_REQUEST)
                }
                let course = await this.coursesRepository
                    .createQueryBuilder("course")
                    .where("course.id = :id", { id })
                    .getOne()
                course.liveLecture = lecture
                await this.coursesRepository.save(course)
            } catch (e) {
                throw new HttpException(e, HttpStatus.BAD_REQUEST)
            }
        } else {
            // turn off all course livestreams
            console.log("before settting")

            try {
                let course = await this.coursesRepository
                    .createQueryBuilder("course")
                    .where("course.id = :id", { id })
                    .getOne()
                course.liveLecture = null
                await this.coursesRepository.save(course)
            } catch (e) {
                throw new HttpException(e, HttpStatus.BAD_REQUEST)
            }
        }
    }

    // FIXME: add pagination
    findAll(): Promise<Course[]> {
        return this.coursesRepository.find({ relations: ["lectures", "lecturer", "userCourses", "userCourses.user"] })
    }

    findOne(id: string): Promise<Course> {
        return this.coursesRepository.findOne(id, {
            relations: ["lectures", "lecturer", "liveLecture", "userCourses", "userCourses.user"],
        })
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
