import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"


import { User } from "../users/users.entity"
import { UserAnswer } from "./UserAnswer.entity"
import { Question } from "src/questions/questions.entity"
import { Variants } from "src/variants/variants.entity"
import { UserAnswerService } from "./UserAnswer.service"
import { UserAnswerController } from "./UserAnswer.controller"

@Module({
    imports: [TypeOrmModule.forFeature([User, Question, Variants, UserAnswer])],
    providers: [UserAnswerService],
    controllers: [UserAnswerController],
    exports: [UserAnswerService],
})
export class userAnswerModule {}
