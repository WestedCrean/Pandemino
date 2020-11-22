import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Repository } from "typeorm"
import { ClosedQuestion } from "./closedQuestions.entity"



@Injectable()
export class ClosedQuestionsService {
    constructor(
        @InjectRepository(ClosedQuestion)
        private closedQuestionRepository: Repository<ClosedQuestion>,
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
    ) {}


    async create(createClosedQuestion: any): Promise<ClosedQuestion> {

        try {
            const quiz = await this.quizRepository.findOne(createClosedQuestion.quizId)

            let closedQuestions = new ClosedQuestion()

            if(createClosedQuestion.multiple != null){
                closedQuestions.multiple = createClosedQuestion.multiple
            }
            closedQuestions.content = createClosedQuestion.content
            closedQuestions.quiz = quiz

            await this.closedQuestionRepository.save(closedQuestions)
            return closedQuestions
        } catch (e) {
            return null
        }

    }

    findAll(): Promise<ClosedQuestion[]> {
        return this.closedQuestionRepository.find({ relations: ["variants"] })
    }


    findOne(id: string): Promise<ClosedQuestion> {
        return this.closedQuestionRepository.findOne(id, { relations: ["variants"] })
    }

    async remove(id: string): Promise<void> {
        await this.closedQuestionRepository.delete(id)
    }
}
