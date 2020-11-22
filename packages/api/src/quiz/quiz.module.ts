import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Lecture } from "src/lectures/lectures.entity"

import { QuizService } from "./quiz.service"
import { QuizContoller } from "./quiz.controller"
import { Quiz } from "./quiz.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Quiz, Lecture])],
    providers: [QuizService],
    controllers: [QuizContoller],
    exports: [QuizService],
})
export class QuizModule {}
