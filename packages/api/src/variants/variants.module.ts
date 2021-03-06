import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Question } from "src/questions/questions.entity"


import { VariantsController } from "./variants.controller"
import { Variants } from "./variants.entity"
import { VariantsService } from "./variants.service"



@Module({
    imports: [TypeOrmModule.forFeature([Variants, Question])],
    providers: [VariantsService],
    controllers: [VariantsController],
    exports: [VariantsService],
})
export class VariantsModule {}
