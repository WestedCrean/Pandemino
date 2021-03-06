import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"
import { UserCourse } from "./userCourses.entity"
import * as bcrypt from "bcryptjs"


@Injectable()
export class UserCoursesService {
    constructor(
        @InjectRepository(UserCourse)
        private userCoursesRepository: Repository<UserCourse>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
    ) {}

    async create(createUserCourseSchema: any): Promise<UserCourse> {
        const userCourse = new UserCourse()

        let course: Course
        let user: User

        try {
            course = await this.coursesRepository.findOne(createUserCourseSchema.courseId)
            user = await this.userRepository.findOne(createUserCourseSchema.userId)

            //const hashedPassword = await bcrypt.hash(createUserCourseSchema.password, 10);
            const isPasswordMatching = await bcrypt.compare(
                createUserCourseSchema.password,
                course.password
            )

            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
        } catch (e) {
            throw new Error(e)
        }


        userCourse.course = course
        userCourse.user = user

        await this.userCoursesRepository.save(userCourse)
        return userCourse
    }

    // FIXME: add pagination
    findAll(): Promise<UserCourse[]> {
        return this.userCoursesRepository.find({ relations: ["course", "user", "course.lecturer"] })
        // return this.userCoursesRepository
        //     .createQueryBuilder("userCourse")
        //     .leftJoinAndSelect("userCourse.course", "courses")
        //     .leftJoinAndSelect("userCourse.user", "users")
        //     .getMany()
    }

    findOne(id: string): Promise<UserCourse> {
        return this.userCoursesRepository.findOne(id, { relations: ["course", "user", "course.lecturer"] })
    }

    async remove(id: string): Promise<void> {
        await this.userCoursesRepository.delete(id)
    }
}
