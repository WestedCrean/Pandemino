import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Lecture } from "src/lectures/lectures.entity"
import { UsersModule } from "src/users/users.module"
import { User } from "src/users/users.entity"
import { CourseCategoryService } from "./courseCategory.service"
import { CourseCategoryController } from "./courseCategory.controller"
import { CourseCategory } from "./courseCategory.entity"
import { Course } from "src/courses/courses.entity"

@Module({
    imports: [TypeOrmModule.forFeature([CourseCategory, Course])],
    providers: [CourseCategoryService],
    controllers: [CourseCategoryController],
    exports: [CourseCategoryService],
})
export class CourseCategoryModule {}
