import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LecturesService } from "./lectures.service"
import { LecturesController } from "./lectures.controller"
import { Lecture } from "./lectures.entity"
import { CoursesModule } from "../courses/courses.module"
import { Course } from "../courses/courses.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Lecture, Course]), CoursesModule],
    providers: [LecturesService],
    controllers: [LecturesController],
    exports: [LecturesService],
})
export class LecturesModule {}
