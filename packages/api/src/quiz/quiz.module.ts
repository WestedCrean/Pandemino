import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Lecture } from "src/lectures/lectures.entity"

import { QuizService } from "./quiz.service"
import { QuizContoller } from "./quiz.controller"
import { Quiz } from "./quiz.entity"
import { Question } from "src/questions/questions.entity"
import { Variants } from "src/variants/variants.entity"
import { LecturesModule } from "src/lectures/lectures.module"

@Module({
    imports: [TypeOrmModule.forFeature([Quiz, Lecture, Question, Variants]), LecturesModule],
    providers: [QuizService],
    controllers: [QuizContoller],
    exports: [QuizService],
})
export class QuizModule {}
