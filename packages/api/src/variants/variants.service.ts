import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Repository } from "typeorm"
import { Variants } from "./variants.entity"



@Injectable()
export class VariantsService {
    constructor(
        @InjectRepository(Variants)
        private variantsRepository: Repository<Variants>,

    ) {}


    async create(createVariant: any): Promise<Variants> {

        try {
          
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
