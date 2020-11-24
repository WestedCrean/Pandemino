import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "src/lectures/lectures.entity"
import { Repository } from "typeorm"
import { Quiz } from "./quiz.entity"



@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
    ) {}


    async create(createQuiz: any): Promise<File> {

        try {
            const quiz = new Quiz()

            quiz.name = createQuiz.name
            quiz.description = createQuiz.description
            quiz.startDate = createQuiz.startDate
            quiz.endDate = createQuiz.endDate
           
             

            const lecture = await this.lectureRepository.findOne(createQuiz.lectureId)
            quiz.lecture = lecture

            await this.quizRepository.save(quiz)
        } catch (e) {
            return null
        }

    }

    findAll(): Promise<Quiz[]> {
        return this.quizRepository.find({ relations: ["questions"] })
    }


    findOne(id: string): Promise<Quiz> {
        return this.quizRepository.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.quizRepository.delete(id)
    }
}
