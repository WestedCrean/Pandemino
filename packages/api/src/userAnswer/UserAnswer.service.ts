import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Question } from "src/questions/questions.entity"
import { Repository } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"
import { UserAnswer } from "./UserAnswer.entity"


@Injectable()
export class UserAnswerService {
    constructor(
        @InjectRepository(UserAnswer)
        private userAnswerRepository: Repository<UserAnswer>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,

    ) {}

    async create(createUserAnswerSchema: any): Promise<UserAnswer> {
        const userAnswer = new UserAnswer()

        let question: Question
        let user: User

        try {
            question = await this.questionRepository.findOne(createUserAnswerSchema.questionId)
            user = await this.userRepository.findOne(createUserAnswerSchema.userId)
        } catch (e) {
            throw new Error(e)
        }
        userAnswer.answer = createUserAnswerSchema.answer
        userAnswer.question = question
        userAnswer.user = user

        await this.userAnswerRepository.save(userAnswer)
        return userAnswer
    }


    findAll(): Promise<UserAnswer[]> {
        return this.userAnswerRepository.find({ relations: ["user", "question" , "question.variants"] })

    }

    findOne(id: string): Promise<UserAnswer> {
        return this.userAnswerRepository.findOne(id, { relations: ["user", "question" , "question.variants"] })
    }

    async remove(id: string): Promise<void> {
        await this.userAnswerRepository.delete(id)
    }
}
