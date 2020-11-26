import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LecturesService } from "./lectures.service"
import { LecturesController } from "./lectures.controller"
import { Lecture } from "./lectures.entity"
import { CoursesModule } from "../courses/courses.module"
import { Course } from "../courses/courses.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Variants } from "src/variants/variants.entity"
import { Question } from "src/questions/questions.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Lecture, Course, Quiz, Question, Variants]), CoursesModule],
    providers: [LecturesService],
    controllers: [LecturesController],
    exports: [LecturesService],
})
export class LecturesModule {}
