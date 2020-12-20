import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoursesService } from "./courses.service"
import { CoursesController } from "./courses.controller"
import { Course } from "./courses.entity"
import { Lecture } from "src/lectures/lectures.entity"
import { UsersModule } from "src/users/users.module"
import { User } from "src/users/users.entity"
import { CourseCategory } from "src/courseCategory/courseCategory.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Course, Lecture, User, CourseCategory]), UsersModule],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
