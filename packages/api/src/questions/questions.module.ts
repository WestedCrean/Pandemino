import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { QuestionsController } from "./questions.controller"
import { Question } from "./questions.entity"
import { QuestionsService } from "./questions.service"


@Module({
    imports: [TypeOrmModule.forFeature([Question, Quiz])],
    providers: [QuestionsService],
    controllers: [QuestionsController],
    exports: [QuestionsService],
})
export class QuestionsModule {}
