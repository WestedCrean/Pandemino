import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ClosedQuestion } from "src/closedQuestions/closedQuestions.entity"
import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Repository } from "typeorm"
import { Variants } from "./variants.entity"



@Injectable()
export class VariantsService {
    constructor(
        @InjectRepository(Variants)
        private variantsRepository: Repository<Variants>,
        @InjectRepository(ClosedQuestion)
        private closedClestionRepository: Repository<ClosedQuestion>,

    ) {}


    async create(createVariant: any): Promise<Variants> {

        try {
            const closedQuestion = await this.closedClestionRepository.findOne(createVariant.closedQuestionId)

            let variant = new Variants()

            if(createVariant.isTrue != null){
                variant.isTrue = createVariant.isTrue
            }

            variant.content = createVariant.content
            variant.closedQuestion = closedQuestion

            await this.variantsRepository.save(variant)
            return variant
        } catch (e) {
            return null
        }

    }

    findAll(): Promise<Variants[]> {
        return this.variantsRepository.find()
    }


    findOne(id: string): Promise<Variants> {
        return this.variantsRepository.findOne(id)
    }

    async remove(id: string): Promise<void> {
        await this.variantsRepository.delete(id)
    }
}
