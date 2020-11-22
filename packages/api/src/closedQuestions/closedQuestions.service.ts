import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "src/lectures/lectures.entity"
import { Repository } from "typeorm"
import { ClosedQuestion } from "./closedQuestions.entity"



@Injectable()
export class ClosedQuestionsService {
    constructor(
        @InjectRepository(ClosedQuestion)
        private closedQuestionRepository: Repository<ClosedQuestion>,

    ) {}


    async create(createQuiz: any): Promise<ClosedQuestion> {

        try {
            
        } catch (e) {
            return null
        }

    }

    findAll(): Promise<ClosedQuestion[]> {
        return this.closedQuestionRepository.find()
    }


    findOne(id: string): Promise<ClosedQuestion> {
        return this.closedQuestionRepository.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.closedQuestionRepository.delete(id)
    }
}
