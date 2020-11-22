import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { ClosedQuestionsController } from "./closedQuestions.controller"
import { ClosedQuestion } from "./closedQuestions.entity"
import { ClosedQuestionsService } from "./closedQuestions.service"


@Module({
    imports: [TypeOrmModule.forFeature([ClosedQuestion, Quiz])],
    providers: [ClosedQuestionsService],
    controllers: [ClosedQuestionsController],
    exports: [ClosedQuestionsService],
})
export class ClosedQuestionsModule {}
