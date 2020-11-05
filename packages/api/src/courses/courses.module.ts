import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoursesService } from "./courses.service"
import { CoursesController } from "./courses.controller"
import { Course } from "./courses.entity"
import { Lecture } from "src/lectures/lectures.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Course, Lecture])],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
