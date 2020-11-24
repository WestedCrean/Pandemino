import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Repository } from "typeorm"
import { Question } from "./questions.entity"



@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private QuestionRepository: Repository<Question>,
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
    ) {}


    async create(createQuestion: any): Promise<Question> {

        try {
            let closedQuestions = new Question()
            closedQuestions.quiz = await this.quizRepository.findOne(createQuestion.quizId)

            if(createQuestion.isOpen == true){
                closedQuestions.multiple = false
                closedQuestions.isOpen = true
            } else {

                if(createQuestion.multiple != null){
                    closedQuestions.multiple = createQuestion.multiple
                }
            }

            closedQuestions.content = createQuestion.content

            await this.QuestionRepository.save(closedQuestions)
            return closedQuestions

        } catch (e) {
            return null
        }

    }

    findAll(): Promise<Question[]> {
        return this.QuestionRepository.find({ relations: ["variants"] })
    }


    findOne(id: string): Promise<Question> {
        return this.QuestionRepository.findOne(id, { relations: ["variants"] })
    }

    async remove(id: string): Promise<void> {
        await this.QuestionRepository.delete(id)
    }
}
