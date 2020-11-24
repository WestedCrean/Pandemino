import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Question } from "src/questions/questions.entity"
import { Repository } from "typeorm"
import { Variants } from "./variants.entity"



@Injectable()
export class VariantsService {
    constructor(
        @InjectRepository(Variants)
        private variantsRepository: Repository<Variants>,
        @InjectRepository(Question)
        private closedClestionRepository: Repository<Question>,

    ) {}


    async create(createVariant: any): Promise<Variants> {

        try {
            const closedQuestion = await this.closedClestionRepository.findOne(createVariant.closedQuestionId)

            let variant = new Variants()

            if(createVariant.isTrue != null){
                variant.isTrue = createVariant.isTrue
            }

            variant.content = createVariant.content
            variant.questions = closedQuestion

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
